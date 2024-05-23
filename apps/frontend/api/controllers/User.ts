import { GET, POST, PUT } from "../requests";
import { config } from "../config";

export const User = {
  signUp: async ({ email, password }: { email: string; password: string }) => {
    try {
      return await POST<{
        user: { _id: string; email: string; games: string[] };
        token: string;
      }>({
        endpoint: "/user",
        body: { email, password },
      });
    } catch (caught) {
      console.error(caught);
      throw caught;
    }
  },

  login: async ({
    email,
    password,
  }: { email?: string; password?: string } = {}) => {
    try {
      return await POST<{
        user: { _id: string; email: string; games: string[] };
        token: string;
      }>({
        endpoint: "/user/login",
        body: { email, password },
      });
    } catch (caught) {
      console.error(caught);
      throw caught;
    }
  },

  logout: async () => await POST({ endpoint: "/user/logout" }),

  get: async () => await GET({ endpoint: "/user" }),

  update: async ({ userId, email }: { userId: string; email: string }) =>
    await PUT<{
      user: { _id: string; email: string; games: string[] };
    }>({
      endpoint: `/user/${userId}`,
      body: { email },
    }),

  validateUsername: async ({
    username,
    userId,
  }: {
    username: string;
    userId?: string;
  }) =>
    await POST({
      endpoint: "/user/validate-username",
      body: { username, userId },
    }),
};
