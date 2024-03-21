import { User } from "@database/schemas";

type UpdateUserProps = {
  email: string;
  userId: string;
};

export const updateUser = async ({
  userId,
  email,
}: UpdateUserProps): Promise<any> => {
  try {
    let user = await User.findOne({ _id: userId });

    if (!user) {
      throw { status: 404, error: "User not found" };
    }

    if (user.email === email) {
      return {
        status: 304,
        message: "Email not changed",
        user: { email: email, _id: userId, games: user.games },
      };
    }

    const comparison = await User.findOne({ email });

    if (comparison) {
      throw { status: 409, error: "Email already taken" };
    }

    user.email = email;

    await user.save();

    return {
      status: 200,
      message: "User updated",
      user: { email: email, _id: userId, games: user.games },
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
