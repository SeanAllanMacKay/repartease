import { config } from "..";
import { isSuccess } from "./";

import type { APIResponse } from "./";

type PUTProps = {
  endpoint: string;
  body?: { [key: string]: any };
};

export const PUT = async <T = {}>({
  endpoint,
  body,
}: PUTProps): Promise<APIResponse & T> => {
  try {
    const response = await fetch(`${config?.host ?? ""}/api${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
