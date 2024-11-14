import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";

import { auth } from "@acme/auth";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
AWS.config.getCredentials(function (error) {
  if (error) {
    console.log(error.stack);
  }
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const checkVerificationStatus = async (email: string) => {
  const params = {
    Identities: [email],
  };

  ses.getIdentityVerificationAttributes(params, function (err, data) {
    const verificationAttributes = data.VerificationAttributes;
    if (err) {
      console.log(err, err.stack);
      return false;
    } else if (
      verificationAttributes &&
      verificationAttributes[email] &&
      verificationAttributes[email].VerificationStatus === "Success"
    )
      return true;
    else return false;
  });

  console.log("checkVerificationStatus", email);
  return false;
};
const verifyEmail = async (email: string) => {
  const params = {
    EmailAddress: email,
  };

  ses.verifyEmailIdentity(params, function (err, data) {
    if (err) {
      console.log(err, err.stack, "err verify");
      return err;
    } else return "Verification email sent";
  });
};
// change this to the "to" email that you want
const adminMail = "kirtida.bobal@gmail.com";
// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({ SES: ses });
export const testMail = async (userEmail: string) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail,
      to: userEmail,
      subject: "Test Mail",
      html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
    <div style="padding:20px;">
      <div style="max-width: 500px;">
        <h2>Test Mail</h2>
        <p>Hi there,<br/>
        <br/>This is a test mail.</p>
      </div>
    </div>
  </body>
</html>`,
    });
    console.log("did get it api", response?.messageId);
    return response?.messageId
      ? { ok: true }
      : { ok: false, msg: "Failed to send email" };
  } catch (error: any) {
    console.log("ERROR", error.message);
    return { ok: false, msg: "Failed to send email" };
  }
};

export async function GET(request: NextRequest) {
  //get query params
  try {
    const session = await auth();
    console.log("userEmail", session?.user?.email);
    // const result = await testMail("kirtida.bobal@gmail.com");
    const verified = await checkVerificationStatus(session?.user?.email!);
    if (verified) {
      const result = await testMail(session?.user?.email!);
      return NextResponse.json({ result });
    }
    const result = await verifyEmail(session?.user?.email!);
    return NextResponse.json({ result });
  } catch (error: any) {
    console.log("ERROR", error.message);
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
