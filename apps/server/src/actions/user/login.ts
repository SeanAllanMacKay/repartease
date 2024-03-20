import bcrypt from "bcryptjs";

import { User } from "@database/";

import { createUser } from "./createUser";

type LoginProps = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginProps): Promise<any> => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = (await createUser({ email, password })).user;
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw null;
      }
    }

    return {
      status: 200,
      message: "Logged in",
      user: { email: user.email, _id: user._id, games: user.games },
    };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error logging you into this account",
    } = caught;

    console.log(caught);

    throw {
      status: status,
      error: error,
    };
  }
};
