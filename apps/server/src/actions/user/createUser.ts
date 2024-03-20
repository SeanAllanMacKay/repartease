import { ObjectId } from "mongodb";

import bcrypt from "bcryptjs";

import { User } from "@database/";

import { isEmailInvalid, isPasswordInvalid } from "@repartease/validators";

type CreateUserProps = {
  email: string;
  password: string;
};

export const createUser = async ({
  email,
  password,
}: CreateUserProps): Promise<any> => {
  try {
    if (isEmailInvalid(email)) {
      throw { status: 400, error: "Invalid email" };
    }

    if (isPasswordInvalid(password)) {
      throw { status: 400, error: "Invalid password" };
    }

    const emailTaken = await User.findOne({ email });

    if (emailTaken) {
      throw { status: 409, error: "Email taken" };
    }

    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      isVerified: false,
      games: [],
    });

    return { status: 201, message: "User created", user };
  } catch (caught: any) {
    const { status = 500, error = "There was an error creating this user" } =
      caught;

    console.log(caught);

    throw {
      status: status,
      error: error,
    };
  }
};
