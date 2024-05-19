import { POST } from "../requests";

export const Validate = {
  phoneNumber: async ({ phoneNumber }: { phoneNumber: string }) =>
    await POST({
      endpoint: "/validate/phone-number",
      body: { phoneNumber },
    }),
};
