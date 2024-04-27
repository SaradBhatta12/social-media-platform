import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import User from "@/models/user.models";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const POST = async (request) => {
  const { email } = await request.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ message: "User not found" });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Registration verification....... process",
    text: `
<div>
<h1>Forgot Password</h1>
<p>Dear User,</p>
<p>If you requested to reset your password, please click the following link:</p>
<p><a href="http://localhost:3000/newpassword">Reset Password</a></p>
<p>If you did not request a password reset, you can ignore this email.</p>
<p>Thank you!</p>
</div>
    `,
  };

  mailOptions.to = email;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return NextResponse.json({ message: "Email sent successfully" });
};
