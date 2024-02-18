"use client";
import { useContext, useEffect, useState } from "react";

import { Button } from "@/components/Button";

import { UserContext } from "@/contexts/UserContext";
import { GameContext } from "@/contexts/GameContext";

import { useNavigate } from "@/hooks";

import { Game } from "@repo/api-abstraction";

import { Table } from "@/components/Table";
import { TextInput } from "@/components/TextInput";
import { Form, FormField, useForm, isRequired } from "@/components/Form";

import { InactivePlayerView } from "./InactivePlayerView";
import { ActivePlayerView } from "./ActivePlayerView";

import styles from "./page.module.css";
import { Drawer } from "@/components/Drawer";
import { Icon } from "@/components/Icon";

const WaitingRoom = () => {
  const { user } = useContext(UserContext);
  const { game } = useContext(GameContext);

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const onCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const onLeaveGame = async () => {
    await Game.leave({ gameCode: game?.gameCode });

    navigate({ pathname: "/games", isReplace: true });
  };

  const isActivePlayer = user?._id === game?.activePlayer;

  return (
    <>
      <div className={styles.gameCode} onClick={onOpenMenu}>
        <Icon variant="menu" />

        <p> {game?.gameCode}</p>
      </div>

      <div className={styles.contentContainer}>
        {isActivePlayer ? <ActivePlayerView /> : <InactivePlayerView />}
      </div>

      <Drawer
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        title="Game Info"
        direction="top"
      >
        <div className={styles.drawerContent}>
          <div>
            <p className={styles.label}>Gamecode</p>
            <p className={styles.value}>{game?.gameCode}</p>
          </div>

          <div>
            <p className={styles.label}>Players</p>
            <Table
              columns={[
                {
                  label: "Name",
                  dataKey: "playerName",
                },
                { label: "Score", dataKey: "points" },
              ]}
              rows={game?.players ?? []}
            />
          </div>

          <Button
            icon="delete"
            variant="danger"
            label="Leave Game"
            onClick={onLeaveGame}
          />
        </div>
      </Drawer>
    </>
  );
};

export default WaitingRoom;
