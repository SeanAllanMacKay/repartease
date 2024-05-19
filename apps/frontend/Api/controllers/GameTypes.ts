import { GET } from "../requests";

export const GameTypes = {
  getAll: async () => await GET({ endpoint: "/games/types" }),
};
