import { config } from "..";
import { isSuccess } from "./";

import type { APIResponse } from "./";

type POSTProps = {
  endpoint: string;
  body?: { [key: string]: any };
};

export const POST = async <T = {}>({
  endpoint,
  body,
}: POSTProps): Promise<APIResponse & T> => {
  try {
    const response = await fetch(`${config?.host ?? ""}/api${endpoint}`, {
      method: "POST",
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
  } catch (caught: any) {
    const { response } = caught;

    if (response?.json) {
      throw await response?.json?.();
    }

    throw caught;
  }
};
