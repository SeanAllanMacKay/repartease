import { User } from "@database/";

type UpdateUserProps = {
  username: string;
  userId: string;
};

export const updateUser = async ({
  userId,
  username,
}: UpdateUserProps): Promise<any> => {
  try {
    let user = await User.findOne({ _id: userId });

    if (!user) {
      throw { status: 404, error: "User not found" };
    }

    if (user.username === username) {
      return {
        status: 304,
        message: "Username not changed",
        user: { username: username, _id: userId, games: user.games },
      };
    }

    const comparison = await User.findOne({ username });

    if (comparison) {
      throw { status: 409, error: "Username already taken" };
    }

    user.username = username;

    await user.save();

    return {
      status: 200,
      message: "User updated",
      user: { username: username, _id: userId, games: user.games },
    };
  } catch (caught: any) {
    const { status = 500, error = "There was an error updating this user." } =
      caught;

    console.log(caught);

    throw {
      status: status,
      error: error,
    };
  }
};
