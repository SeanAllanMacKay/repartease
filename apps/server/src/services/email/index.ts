import sgMail from "@sendgrid/mail";

import accountCreated from "./accountCreated";
import attemptedSignUp from "./attemptedSignUp";
import accountVerified from "./accountVerified";

const SENDGRID_API_KEY: string = process.env["SENDGRID_API_KEY"] || "";
const SENDGRID_EMAIL_ADDRESS: string =
  process.env["SENDGRID_EMAIL_ADDRESS"] || "";

sgMail.setApiKey(SENDGRID_API_KEY);

type EmailFunctionResponse = {
  subject: string;
  html: string;
};

type EmailProps = {
  email: string;
  type: string;
} & { [key: string]: string };

type Email = {
  from: string;
  to: string;
} & EmailFunctionResponse;

type EmailReturn = {
  email: Email;
};

const emailTypes: {
  [key: string]: (props: any) => EmailFunctionResponse;
} = {
  attemptedSignUp,
  accountCreated,
  accountVerified,
};

export default async ({
  email: emailAddress,
  type,
  ...rest
}: EmailProps): Promise<EmailReturn | undefined> => {
  try {
    const email = {
      from: SENDGRID_EMAIL_ADDRESS,
      to: emailAddress,
      ...emailTypes[type](rest),
    };

    try {
      await sgMail.send(email);
      return { email };
    } catch (emailError) {
      console.error(emailError);
      throw { email };
    }
  } catch (caught: any) {}
};
