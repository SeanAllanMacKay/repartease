import { Game } from "@database/schemas/Game";

import type { GameDocument } from "@database/schemas/Game";

export const leaveGame = async ({
  playerId,
  gameCode,
}: {
  playerId: string;
  gameCode: string;
}): Promise<{ status: 200; message: string; game: GameDocument }> => {
  const game = await Game.findOne({
    gameCode,
    "players.playerId": playerId,
  });

  if (!game) {
    throw { error: "There was an error finding this game.", status: 404 };
  }

  const playerIndex = game.players.findIndex(
    (player) => player.playerId === playerId.toString()
  );

  const nextPlayer = game.players.reduce(
    (newIndex, { status }, index) => {
      if (index > playerIndex && status === "inactive") {
        return index;
      }

      return newIndex;
    },
    game.players.findIndex((player) => player.status === "active")
  );

  game.rounds[game.rounds.length - 1].activePlayer =
    game?.players?.[nextPlayer]?.playerId;

  await game.save();

  return { game, status: 200, message: "Turn changed." };
};
