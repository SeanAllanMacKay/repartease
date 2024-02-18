"use client";
import { useContext, useState } from "react";

import { Button } from "@/components/Button";

import { UserContext } from "@/contexts/UserContext";
import { GameContext } from "@/contexts/GameContext";

import { useNavigate } from "@/hooks";

import { Game } from "@repo/api-abstraction";

import { Table } from "@/components/Table";

import styles from "./page.module.css";

const WaitingRoom = () => {
  const { user } = useContext(UserContext);
  const { game } = useContext(GameContext);

  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onStartGame = async () => {
    try {
      if (game) {
        if (
          (game?.players?.filter(({ status }) => status === "active")?.length ??
            0) < 2
        ) {
          setError(
            "You need at least 2 players to start the game. Do you not have any friends?",
          );
        }

        await Game.start({ gameCode: game.gameCode });

        navigate({
          pathname: `/games/${game?.gameCode}/game`,
          isReplace: true,
        });
      }
    } catch (caught) {}
  };

  const onLeaveGame = async () => {
    try {
      await Game.leave({ gameCode: game.gameCode });

      navigate({ pathname: "/games", isReplace: true });
    } catch (caught) {}
  };

  return (
    <div className={styles.container}>
      <div style={{ width: "100%" }}>
        <h2 style={{ textAlign: "center", margin: "0 0 16px 0" }}>
          GameCode: {game?.gameCode}
        </h2>

        <Table
          columns={[
            { label: "Name", dataKey: "playerName" },
            { label: "Points", dataKey: "points" },
          ]}
          rows={game?.players ?? []}
        />
      </div>

      {user?._id === game?.activePlayer ? (
        <div className={styles.startGameContainer}>
          <Button label="Start Game" onClick={onStartGame} />

          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
      ) : null}

      <Button label="Leave Game" variant="secondary" onClick={onLeaveGame} />
    </div>
  );
};

export default WaitingRoom;
