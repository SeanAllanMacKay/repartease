export type APIResponseSuccess = {
  message?: string;
};

export type APIResponseError = {
  error?: string;
};

export type APIResponse = { code?: number } & (
  | APIResponseSuccess
  | APIResponseError
);
