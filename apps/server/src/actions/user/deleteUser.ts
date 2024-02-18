import { User } from "@database/";

type DeleteUserProps = {
  userId: string;
};

export const deleteUser = async ({ userId }: DeleteUserProps): Promise<any> => {
  try {
    await User.findOneAndRemove({ _id: userId });

    return { status: 200, message: "User deleted" };
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
