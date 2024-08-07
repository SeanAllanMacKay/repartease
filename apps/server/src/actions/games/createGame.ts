import { Game } from "@database/schemas/Game";
import { User } from "@database/schemas/User";

import { getPrompt } from "@services/prompts";

import type { GameDocument } from "@database/schemas/Game";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const characterArray = characters.split("");

const generateGameCode = () => {
  let gameCode = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characterArray.length);

    gameCode += characterArray[randomIndex];
  }

  return gameCode;
};

export const createGame = async ({
  playerName,
  playerId,
}: {
  playerName: string;
  playerId: string;
}): Promise<{ status: 200; message: string; game: GameDocument }> => {
  const user = await User.findOne({ _id: playerId });

  if (!user) {
    throw { error: "There was an error creating the game.", status: 500 };
  }

  if (!user?.tokens) {
    throw { error: "Not enough tokens.", status: 400 };
  }

  const players = [
    { order: 1, playerId, playerName, points: 0, status: "active" },
  ];

  const gameCode = generateGameCode();

  const now = new Date();

  const game = await Game.create({
    owner: playerId,
    gameCode,
    players,
    status: "active",
    variant: "repartease",
    rounds: [
      {
        prompt: await getPrompt({ variant: "repartease", pastPrompts: [] }),
        responses: [],
        status: "submission",
        activePlayer: playerId,
      },
    ],
    createdAt: now,
    updatedAt: now,
  });

  if (!game) {
    throw { error: "There was an error creating the game.", status: 500 };
  }

  user.tokens = user.tokens - 1;

  user.games.push(game._id);

  await user.save();

  return { game, status: 200, message: "Game created successfully." };
};
