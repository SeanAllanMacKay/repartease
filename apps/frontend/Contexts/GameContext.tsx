import React, { createContext, useEffect, useContext } from "react";
import { PusherContext } from "./PusherContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Game } from "Api";
import { Platform } from "react-native";
import { UserContext } from "./UserContext";
import { router } from "expo-router";

import type { PropsWithChildren } from "react";

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
  isLoading: boolean;
  onLeaveGame: () => void;
}>({
  game: undefined,
  isLoading: true,
  onLeaveGame: () => {},
});

export const GameProvider = ({
  children,
  gameCode,
}: PropsWithChildren<{
  gameCode: string;
}>) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const PUSHER_KEY = process.env.EXPO_PUBLIC_PUSHER_KEY;
  const PUSHER_CLUSTER = process.env.EXPO_PUBLIC_PUSHER_CLUSTER;

  const queryClient = useQueryClient();

  const { user } = useContext(UserContext);
  const pusher = useContext(PusherContext);

  const query = useQuery({
    queryKey: ["games", gameCode],
    queryFn: async () => {
      const { game } = await Game.get({ gameCode });

      return game;
    },
    staleTime: Infinity,
  });

  const onStartGame = () => {};

  const onAddPlayer = ({ playerId, playerName }) => {
    queryClient.setQueryData(["games", gameCode], ({ players, ...rest }) => {
      const isNewPlayer = !players.find(
        ({ playerId: currentPlayerId }) => currentPlayerId === playerId
      );

      if (isNewPlayer) {
        const newPlayers = [...players].push({
          playerId,
          playerName,
          status: "active",
          points: 0,
        });

        return { ...rest, players: newPlayers };
      }
    });
  };

  const onRemovePlayer = ({ playerId }) => {
    queryClient.setQueryData(["games", gameCode], ({ players, ...rest }) => {
      return {
        ...rest,
        players: players.map(
          ({ playerId: currentPlayerId, ...restPlayer }) => ({
            playerId: currentPlayerId,
            ...restPlayer,
            status: currentPlayerId === playerId ? "inactive" : rest?.status,
          })
        ),
      };
    });
  };

  const onSubmitResponse = ({ playerId, response }) => {
    queryClient.setQueryData(["games", gameCode], ({ rounds, ...rest }) => {
      const newRounds = rounds.map(({ responses, ...restRound }, index) => ({
        ...restRound,
        responses:
          index === rounds?.length - 1
            ? [...responses, { playerId, response }]
            : responses,
      }));

      return {
        ...rest,
        rounds: newRounds,
      };
    });
  };

  const onSelectWinner = ({ winnerId, newRound }) => {
    queryClient.setQueryData(
      ["games", gameCode],
      ({ players, rounds, ...rest }) => {
        const newRounds = rounds.map(({ responses, ...restRound }) => ({
          ...restRound,
          responses: responses.map(({ playerId, ...restResponse }) => ({
            ...restResponse,
            playerId,
            isWinner: winnerId === playerId,
          })),
        }));

        return {
          ...rest,
          rounds: newRounds,
          players: players.map(({ playerId, points, ...restPlayer }) => ({
            ...restPlayer,
            playerId,
            points: winnerId === playerId ? points + 1 : points,
          })),
        };
      }
    );

    setTimeout(() => {
      queryClient.setQueryData(["games", gameCode], ({ rounds, ...rest }) => {
        return {
          ...rest,
          rounds: [...rounds, newRound],
        };
      });
    }, 4000);
  };

  const onCloseResponses = ({ round }) => {
    queryClient.setQueryData(["games", gameCode], ({ rounds, ...rest }) => {
      const newRounds = [...rounds];

      newRounds[rounds.length - 1] = round;

      return {
        ...rest,
        rounds: newRounds,
      };
    });
  };

  const onSetPlayerAway = ({ id }) => {
    queryClient.setQueryData(["games", gameCode], ({ players, ...rest }) => {
      return {
        ...rest,
        players: players.map(({ playerId, status, ...restPlayer }) => ({
          ...restPlayer,
          playerId,
          status: playerId === id ? "away" : status,
        })),
      };
    });
  };

  const onSetPlayerActive = ({ id }) => {
    queryClient.setQueryData(["games", gameCode], ({ players, ...rest }) => {
      return {
        ...rest,
        players: players.map(({ playerId, status, ...restPlayer }) => ({
          ...restPlayer,
          playerId,
          status: playerId === id ? "active" : status,
        })),
      };
    });
  };

  const onLeaveGame = async () => {
    await Game.leave({ gameCode });

    queryClient.invalidateQueries({ queryKey: ["games", gameCode] });

    router.replace("/");
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      const channel = pusher?.subscribe(gameCode);

      channel.bind("start-game", onStartGame);
      channel.bind("add-player", onAddPlayer);
      channel.bind("remove-player", onRemovePlayer);
      channel.bind("submit-response", onSubmitResponse);
      channel.bind("close-responses", onCloseResponses);
      channel.bind("select-winner", onSelectWinner);

      const presenceChannel = pusher?.subscribe(`presence-${gameCode}`);

      presenceChannel.bind("pusher:member_removed", onSetPlayerAway);
      presenceChannel.bind("pusher:member_added", onSetPlayerActive);
    } else {
      (async () => {
        try {
          await pusher.init({
            apiKey: PUSHER_KEY,
            cluster: PUSHER_CLUSTER,
            onAuthorizer: async (channelName: string, socketId: string) => {
              const response = await fetch(`${API_URL}/pusher/auth`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  socket_id: socketId,
                  channel_name: channelName,
                }),
              });

              const body = await response.json();

              return body;
            },
          });

          await pusher?.subscribe({
            channelName: gameCode,
            onEvent: ({ eventName, data: stringData }) => {
              const data = JSON.parse(stringData);

              if (eventName === "start-game") {
                onStartGame();
              }

              if (eventName === "add-player") {
                onAddPlayer(data);
              }

              if (eventName === "remove-player") {
                onRemovePlayer(data);
              }

              if (eventName === "submit-response") {
                onSubmitResponse(data);
              }

              if (eventName === "close-responses") {
                onCloseResponses(data);
              }

              if (eventName === "select-winner") {
                onSelectWinner(data);
              }
            },
          });

          await pusher?.subscribe({
            channelName: `presence-${gameCode}`,
            onEvent: ({ eventName, data: stringData }) => {
              const data = JSON.parse(stringData);

              switch (eventName) {
                case "pusher_internal:member_added":
                  onSetPlayerActive({ id: data?.user_id });
                  break;
                case "pusher_internal:member_removed":
                  onSetPlayerAway({ id: data?.user_id });
                  break;
                default:
                  console.log("Unhandled pusher event: ", {
                    eventName,
                    data,
                  });
                  break;
              }
            },
          });

          await pusher.connect();
        } catch (err) {
          console.log(err);
        }
      })();
    }

    return () => {
      if (Platform.OS === "web") {
        pusher.unsubscribe(gameCode);
        pusher.unsubscribe(`presence-${gameCode}`);
      } else {
        (async () => {
          await pusher.unsubscribe({ channelName: gameCode });
          await pusher.unsubscribe({ channelName: `presence-${gameCode}` });
        })();
      }
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        game: query.data,
        isLoading: query.isLoading,
        onLeaveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
