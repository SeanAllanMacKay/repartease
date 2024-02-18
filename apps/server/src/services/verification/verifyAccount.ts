const verifySid = process.env.TWILIO_VID;

import { client } from ".";

export const verifyAccount = async ({
  to,
  verificationCode,
}: {
  to: string;
  verificationCode: string;
}) => {
  try {
    return await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to, code: verificationCode });
  } catch (caught) {
    console.error(caught);

    throw caught;
  }
};
