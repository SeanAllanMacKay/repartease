import { Game } from "@database/schemas/Game";

export const submitResponse = async ({
  playerId,
  gameCode,
  response,
}: {
  playerId: string;
  gameCode: string;
  response: string;
}): Promise<{ status: 200; message: string }> => {
  const game = await Game.findOne({
    gameCode,
    players: { $elemMatch: { playerId, status: { $ne: "inactive" } } },
  });

  if (!game) {
    throw { error: "There was an error finding this game.", status: 404 };
  }

  game.rounds[game.rounds.length - 1].responses.push({ playerId, response });

  await game.save();

  return { status: 200, message: "Response submitted." };
};
