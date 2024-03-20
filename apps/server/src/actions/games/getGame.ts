import { Game } from "@database/schemas/Game";

import { obfuscate } from "src/utilities";

export const getGame = async ({
  playerId,
  gameCode,
}: {
  playerId: string;
  gameCode: string;
}): Promise<{ status: 200; message: string; game: any }> => {
  const game = await Game.findOne({
    gameCode,
    players: { $elemMatch: { playerId: playerId.toString() } },
  });

  if (!game) {
    throw { error: "There was an error fetching this game.", status: 404 };
  }

  const { _id, owner, players, status, rounds, createdAt, updatedAt } = game;

  const currentRound = rounds.pop();

  if (currentRound.status === "submission") {
    const obfuscatedAnswers = currentRound.responses.map(
      ({ response, ...rest }) => ({
        ...rest,
        response: obfuscate(response),
      })
    );

    currentRound.responses = obfuscatedAnswers;
  }

  return {
    game: {
      _id,
      owner,
      status,
      rounds: [...rounds, currentRound],
      createdAt,
      updatedAt,
      gameCode,
      players,
    },
    status: 200,
    message: "Game fetched.",
  };
};
