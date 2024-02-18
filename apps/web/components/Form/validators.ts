import { User } from "@repo/api-abstraction";

import debounce from "lodash.debounce";

export const isRequired = (value?: string) =>
  value && value.length > 0 ? undefined : "Required";

export const isPassword = (value?: string | undefined) =>
  value?.length === 1
    ? "Come on, you know you can't have a password that short."
    : value?.length < 3
      ? "That's still way too short."
      : value?.length < 5
        ? "Are you even trying here?"
        : value?.length < 7
          ? "You're over halfway there."
          : value?.length === 9
            ? "You're literally 1 away."
            : value?.length < 10
              ? "You're really close now."
              : undefined;

export const validateUsername = debounce(
  async (
    value: string,
    _allValues?: Record<string, string>,
    userId?: string,
  ) => {
    try {
      await User.validateUsername({ username: value, userId });

      return undefined;
    } catch (caught: any) {
      const {
        error = "I'm not sure what happened, but it was probably something you did.",
      } = caught;

      return error;
    }
  },
  500,
);
