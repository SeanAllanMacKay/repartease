import { Game } from "@database/schemas/Game";

import { getPrompt } from "@services/prompts";

export const startGame = async ({
  playerId,
  gameCode,
}: {
  playerId: string;
  gameCode: string;
}): Promise<{ status: 200; message: string }> => {
  const game = await Game.findOne({
    gameCode,
    players: { $elemMatch: { playerId, status: { $ne: "inactive" } } },
  });

  if (!game) {
    throw { error: "There was an error finding this game.", status: 404 };
  }

  if (!game.rounds.length) {
    game.rounds.push({
      prompt: await getPrompt(),
      responses: [],
      status: "submission",
    });
  }

  game.status = "active";

  await game.save();

  return { status: 200, message: "Game started." };
};
