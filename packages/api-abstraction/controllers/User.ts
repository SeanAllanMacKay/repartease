import { GET, POST, PUT } from "../requests";

export const User = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) =>
    await POST<{
      user: { _id: string; username: string; games: string[] };
      token: string;
    }>({
      endpoint: "/user/login",
      body: { username, password },
    }),

  logout: async () => await POST({ endpoint: "/user/logout" }),

  get: async () => await GET({ endpoint: "/user" }),

  update: async ({ userId, username }: { userId: string; username: string }) =>
    await PUT<{
      user: { _id: string; username: string; games: string[] };
    }>({
      endpoint: `/user/${userId}`,
      body: { username },
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
