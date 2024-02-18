import { formatISO } from "date-fns";

import { Game } from "@database/schemas/Game";

export const getActiveGames = async ({
  playerId,
}: {
  playerId: string;
}): Promise<{ status: 200; message: string; games: any }> => {
  const games = await Game.find(
    {
      $and: [{ players: { $elemMatch: { playerId } } }],
    },
    {
      gameCode: 1,
      gameType: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      players: 1,
      owner: 1,
      _id: 1,
      activePlayer: 1,
      rounds: 1,
    },
  );

  return {
    games: games ?? [],
    status: 200,
    message: "Games fetched.",
  };
};
