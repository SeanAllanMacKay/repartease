const verifySid = process.env.TWILIO_VID;

import { client } from "./";

export const sendVerification = async ({
  to,
  channel = "email",
}: {
  to: string;
  channel?: "sms" | "email";
}) => {
  try {
    return await client.verify.v2
      .services(verifySid)
      .verifications.create({ to, channel });
  } catch (caught) {
    console.error(caught);

    throw caught;
  }
};
