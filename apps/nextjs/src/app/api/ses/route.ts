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
    const result = await testMail("kirtida.bobal@gmail.com");
    return NextResponse.json({ result });
  } catch (error: any) {
    console.log("ERROR", error.message);
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
