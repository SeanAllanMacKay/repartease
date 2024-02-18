import { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from "@/hooks";

import { usePathname } from "next/navigation";

import { Game } from "@repo/api-abstraction";

import { SocketContext } from "./SocketContext";

import type { PropsWithChildren } from "react";
import { UserContext } from "./UserContext";

type GameType = {
  _id: string;
  gameCode: string;
  owner: string;
  players: {
    order: number;
    playerName: string;
    playerId: string;
    points: number;
    status: "active" | "inactive";
  }[];
  status: "active" | "waiting" | "complete";
  activePlayer: string;
  rounds: {
    prompt: string;
    activePlayer?: string;
    responses: { response: string; playerId: string; isWinner?: boolean }[];
    status: "submission" | "voting" | "complete";
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export const GameContext = createContext<{
  game: GameType | undefined;
  startGame: (startProps: { gameCode: string }) => Promise<void>;
  leaveGame: (updateProps: {
    playerId: string;
    gameCode: string;
  }) => Promise<void>;
  isLoading: boolean;
}>({
  game: undefined,
  startGame: async () => {},
  leaveGame: async () => {},
  isLoading: true,
});

export const GameProvider = ({
  children,
  gameCode,
}: PropsWithChildren<{ gameCode?: string }>) => {
  const navigate = useNavigate();
  const pathname = usePathname();

  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const [game, setGame] = useState<GameType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const startGame = async () => {
    if (game) {
      setIsLoading(true);

      const { game: newGame } = await Game.start({ gameCode: game.gameCode });

      if (newGame) {
        setGame(newGame);

        navigate({ pathname: `/games/${game.gameCode}/game`, isReplace: true });
      }

      setIsLoading(false);
    }
  };

  const leaveGame = async () => {
    if (game) {
      setIsLoading(true);

      await Game.leave({ gameCode: game.gameCode });

      setGame(undefined);

      setIsLoading(false);

      navigate({ pathname: "/games", isReplace: true });
    }
  };

  const fetchGame = async () => {
    if (game) {
      setIsLoading(true);

      const { game: newGame } = await Game.get({ gameCode: game.gameCode });

      if (newGame) {
        setGame(newGame);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (gameCode) {
        setIsLoading(true);

        const { game: newGame } = await Game.get({ gameCode });

        if (newGame) {
          setGame(newGame);
        }

        setIsLoading(false);
      }
    })();
  }, [gameCode]);

  const onUpdateGame = async () => {
    console.log("updating game", game?.gameCode)
    if (game?.gameCode) {
      await fetchGame();
    }
  };

  const setListeners = () => {
    if (socket) {
      socket.emit("join-room", {
        gameCode: game?.gameCode,
        userId: user?._id,
      });

      socket.on("update-game", onUpdateGame);
    }
  };

  useEffect(() => {
    setListeners();

    return () => {
      socket?.emit("leave-room", {
        gameCode: game?.gameCode,
        userId: user?._id,
      });
    };
  }, [socket]);

  return (
    <GameContext.Provider value={{ game, startGame, leaveGame, isLoading, updateGame:onUpdateGame }}>
      {children}
    </GameContext.Provider>
  );
};
