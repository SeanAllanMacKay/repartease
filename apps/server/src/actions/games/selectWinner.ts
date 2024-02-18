import { Game } from "@database/schemas/Game";

import { getPrompt } from "@services/prompts";

export const selectWinner = async ({
  playerId,
  winnerId,
  gameCode,
}: {
  playerId: string;
  winnerId: string;
  gameCode: string;
}): Promise<{ status: 200; message: string }> => {
  const game = await Game.findOne({
    gameCode,
    players: { $elemMatch: { playerId, status: { $ne: "inactive" } } },
  });

  if (!game) {
    throw { error: "There was an error finding this game.", status: 404 };
  }

  const currentRound = game.rounds[game.rounds.length - 1];

  const winningResponse = currentRound.responses.find(
    ({ playerId: currentPlayerId }) =>
      currentPlayerId.toString() === winnerId.toString(),
  );

  winningResponse.isWinner = true;
  currentRound.status = "complete";

  const winningPlayer = game.players.find(
    ({ playerId }) => winnerId === playerId.toString(),
  );

  winningPlayer.points += 1;

  const playerIndex = game.players.findIndex(
    (player) => player.playerId === playerId.toString(),
  );

  let newTurnIndex = 0;

  if (playerIndex !== game.players.length - 1) {
    for (let i = playerIndex + 1; i < game.players.length; i++) {
      if (game.players[i].status !== "inactive") {
        newTurnIndex = i;

        break;
      }
    }
  }

  game.activePlayer = game?.players?.[newTurnIndex]?.playerId;

  game.rounds.push({
    prompt: await getPrompt(),
    responses: [],
    status: "submission",
  });

  await game.save();

  return { status: 200, message: "Response submitted." };
};
