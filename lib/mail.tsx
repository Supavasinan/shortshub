import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
const sender = process.env.RESEND_EMAIL;
import { VerificationEmail } from "@/templates/email/verification-email"
import { ResetPasswordEmail } from "@/templates/email/reset-password-email";


export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  token: string,
) => {
  if (!sender) return console.log("Please set RESEND_EMAIL environment variable");

  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Reset your password",
    react: <ResetPasswordEmail name={name} resetPasswordLink={resetLink} />
  });
};

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string
) => {
  if (!sender) return console.log("Please set RESEND_EMAIL environment variable");


  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Confirm your email",
    react: <VerificationEmail name={name} verifyEmailLink={confirmLink} />,
  });
};
