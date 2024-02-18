import { Game } from "@database/schemas/Game";

import type { GameDocument } from "@database/schemas/Game";

export const addPlayer = async ({
  playerId,
  playerName,
  gameCode,
}: {
  playerId: string;
  playerName?: string;
  gameCode: string;
}): Promise<{ status: 200; message: string; game: GameDocument }> => {
  const game = await Game.findOne({
    gameCode,
  });

  if (!game) {
    throw { error: "There was an error finding this game.", status: 404 };
  }

  const alreadyAdded = game.players.find(
    ({ playerId: currentId }) => currentId === playerId.toString(),
  );

  if (alreadyAdded) {
    if (playerName) {
      alreadyAdded.playerName = playerName;
    }

    alreadyAdded.status = "active";

    if (!game.activePlayer) {
      game.activePlayer = playerId;
    }
  } else {
    game.players.push({
      playerId,
      playerName,
      points: 0,
      status: "active",
      order: game.players.length,
    });
  }

  if (!game.activePlayer) {
    game.activePlayer = playerId;
  }

  await game.save();

  return { game, status: 200, message: "Player added." };
};
