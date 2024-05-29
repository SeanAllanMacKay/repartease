import { User } from "@database/schemas";

import { isEmailInvalid } from "@repartease/validators";

import send from "@services/email";

type RequestAccountDeletionProps = {
  email: string;
  reason?: string;
};

export const requestAccountDeletion = async ({
  email,
  reason,
}: RequestAccountDeletionProps): Promise<any> => {
  try {
    if (isEmailInvalid(email)) {
      throw { status: 400, error: "Invalid email" };
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw { status: 404, error: "Email not found" };
    }

    send({
      email: "seanallanmackau@gmail.com",
      type: "requestAccountDeletion",
      emailAddress: email,
      reason,
    });

    send({
      email,
      type: "accountDeletionStarted",
    });

    return { status: 200, message: "User account deletion initiated", user };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error initiating account deletion",
    } = caught;

    console.log(caught);

    throw {
      status: status,
      error: error,
    };
  }
};
