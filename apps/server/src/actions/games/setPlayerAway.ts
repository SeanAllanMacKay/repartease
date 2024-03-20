import { Game } from "@database/schemas/Game";

import type { GameDocument } from "@database/schemas/Game";

export const setPlayerAway = async ({
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

  const player = game.players.find(
    (player) => player.playerId === playerId.toString()
  );

  player.status = "away";

  await game.save();

  return { game, status: 200, message: "Player removed." };
};
