import { config } from "..";
import { isSuccess } from "./";

import type { APIResponse } from "./";

type DELETEProps = { endpoint: string };

export const DELETE = async ({
  endpoint,
}: DELETEProps): Promise<APIResponse> => {
  try {
    const response = await fetch(`${config?.host ?? ""}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (isSuccess(response.status)) {
      return await response.json();
    } else {
      throw { response };
    }
  } catch (error: any) {
    const { response } = error;

    const { errorMessage } = await response.json();
    throw errorMessage;
  }
};
