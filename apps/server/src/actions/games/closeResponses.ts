import { Game } from "@database/schemas/Game";

export const closeResponses = async ({
  playerId,
  gameCode,
}: {
  playerId: string;
  gameCode: string;
}): Promise<{ status: 200; message: string; game: any }> => {
  const game = await Game.findOne({
    gameCode,
    players: { $elemMatch: { playerId, status: { $ne: "inactive" } } },
  });

  if (!game) {
    throw { error: "There was an error finding this game.", status: 404 };
  }

  if (
    game.rounds[game.rounds.length - 1].activePlayer?.toString() !==
    playerId.toString()
  ) {
    throw { error: "It is not your turn.", status: 403 };
  }

  game.rounds[game.rounds.length - 1].status = "voting";

  await game.save();

  return { status: 200, message: "Responses Closed.", game };
};
