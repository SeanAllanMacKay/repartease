import bcrypt from "bcryptjs";

import { User } from "@database/";

import { createUser } from "./createUser";

type LoginProps = {
  username: string;
  password: string;
};

export const login = async ({
  username,
  password,
}: LoginProps): Promise<any> => {
  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = (await createUser({ username, password })).user;
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw null;
      }
    }

    return {
      status: 200,
      message: "Logged in",
      user: { username: user.username, _id: user._id, games: [] },
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
