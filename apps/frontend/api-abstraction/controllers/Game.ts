import { GET, POST, DELETE, PUT } from "../requests";

type ArgsWithGameCode = { gameCode: string };

export const Game = {
  create: async ({ playerName }: { playerName: string }) =>
    await POST({ endpoint: "/games", body: { playerName } }),

  start: async ({ gameCode }: ArgsWithGameCode) =>
    await POST({ endpoint: `/games/${gameCode}/start-game` }),

  get: async ({ gameCode }: ArgsWithGameCode) =>
    await GET({ endpoint: `/games/${gameCode}` }),

  getList: async ({
    page = 1,
    pageSize = 20,
  }: {
    page?: number;
    pageSize?: number;
  }) => await GET({ endpoint: `/games?page=${page}&pageSize=${pageSize}` }),

  join: async ({
    gameCode,
    playerName,
  }: ArgsWithGameCode & { playerName: string }) =>
    await POST({
      endpoint: `/games/${gameCode}/players`,
      body: { playerName },
    }),

  leave: async ({ gameCode }: ArgsWithGameCode) =>
    await DELETE({ endpoint: `/games/${gameCode}/players` }),

  pause: async ({ gameCode }: ArgsWithGameCode) =>
    await PUT({ endpoint: `/games/${gameCode}` }),

  end: async ({ gameCode }: ArgsWithGameCode) =>
    await DELETE({ endpoint: `/games/${gameCode}` }),

  submitResponse: async ({
    gameCode,
    response,
  }: ArgsWithGameCode & { response: string }) =>
    await POST({
      endpoint: `/games/${gameCode}/submit-response`,
      body: { response },
    }),

  closeResponses: async ({ gameCode }: ArgsWithGameCode) =>
    await POST({ endpoint: `/games/${gameCode}/close-responses` }),

  submitSelection: async ({
    gameCode,
    playerId,
  }: ArgsWithGameCode & { playerId: string }) =>
    await POST({
      endpoint: `/games/${gameCode}/select-winner`,
      body: { playerId },
    }),

  getPrevious: async () =>
    await GET({
      endpoint: `/games`,
    }),
};
