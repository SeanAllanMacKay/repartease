import { ObjectId } from "mongodb";

import { User } from "@database/schemas";

import { createUser } from "./createUser";

type ValidateUsernameProps = {
  username: string;
  userId: string;
};

export const validateUsername = async ({
  userId,
  username,
}: ValidateUsernameProps): Promise<any> => {
  try {
    let user = await User.findOne({
      username,
      ...(userId ? { _id: { $ne: userId } } : {}),
    });

    if (user) {
      throw {
        status: 409,
        error: "That one's taken, try being a bit more original.",
      };
    }

    return { status: 200, message: "Username available" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error validating this username.",
    } = caught;

    console.log(caught);

    throw {
      status: status,
      error: error,
    };
  }
};
