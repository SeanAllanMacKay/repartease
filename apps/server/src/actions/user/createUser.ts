import { ObjectId } from "mongodb";

import bcrypt from "bcryptjs";

import { User } from "@database/";

type CreateUserProps = {
  username: string;
  password: string;
};

export const createUser = async ({
  username,
  password,
}: CreateUserProps): Promise<any> => {
  try {
    const usernameTaken = await User.findOne({ username });

    if (usernameTaken) {
      throw { status: 409, error: "Username taken" };
    }

    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
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
