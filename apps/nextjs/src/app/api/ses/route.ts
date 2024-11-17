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
    console.error(error.stack);
  }
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const checkVerificationStatus = async (email: string) => {
  const params = {
    Identities: [email],
  };

  let data = await ses
    .getIdentityVerificationAttributes(params, function (err, data) {
      const verificationAttributes = data.VerificationAttributes;
      if (err) {
        console.error(err, err.stack, "err");
        return false;
      } else if (
        verificationAttributes &&
        verificationAttributes[email] &&
        verificationAttributes[email].VerificationStatus === "Success"
      )
        return true;
      else return false;
    })
    .promise();

  if (data) {
    return true;
  }

  return false;
};
const verifyEmail = async (email: string) => {
  const params = {
    EmailAddress: email,
  };

  ses.verifyEmailIdentity(params, function (err, data) {
    if (err) {
      console.error(err, err.stack, "err verify");
      return err;
    } else return "Verification email sent";
  });
};
// change this to the "to" email that you want
const adminMail = "kirtida.bobal@gmail.com";
// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({ SES: ses });
export const testMail = async (
  userEmail: string,
  data: {
    title: string;
    category: string;
    amount: number;
    dueAt: Date;
  },
) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail,
      to: userEmail,
      subject: "Bill Reminder",
      html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
    <div style="padding:20px;">
      <div style="max-width: 500px;">
        <h2>Bill Reminder</h2>
        <p>Hi there,<br/>
        <br/>
        You have a bill due soon. Here are the details:<br/> 
        <br/>
        <b>Title:</b> ${data.title}<br/>
        <b>Category:</b> ${data.category}<br/>
        <b>Amount:</b> ${data.amount}<br/>
        <b>Due Date:</b> ${new Date(data.dueAt).toLocaleDateString()}<br/>
        <br/>
        </p>
      </div>
    </div>
  </body>
</html>`,
    });
    return response?.messageId
      ? { ok: true }
      : { ok: false, msg: "Failed to send email" };
  } catch (error: any) {
    console.error("ERROR", error.message);
    return { ok: false, msg: "Failed to send email" };
  }
};

export async function POST(request: NextRequest, response: NextResponse) {
  //get query params
  try {
    const session = await auth();
    // const result = await testMail("kirtida.bobal@gmail.com");
    const verified = await checkVerificationStatus(session?.user?.email!);
    if (verified) {
      let data = await request.json();
      const result = await testMail(session?.user?.email!, data);
      return NextResponse.json({ result });
    }
    const result = await verifyEmail(session?.user?.email!);
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("ERROR", error.message);
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
