"use client";
import { useContext } from "react";

import { useNavigate } from "@/hooks";

import { Button } from "@/components/Button";

import { UserContext } from "@/contexts/UserContext";

import styles from "./page.module.css";

const Games = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const onJoinGame = () => {
    navigate({ pathname: "/games/join-game" });
  };

  const onNewGame = () => {
    navigate({ pathname: "/games/create-game" });
  };

  return (
    <div className={styles.container}>
      <Button label="Join Game" variant="secondary" onClick={onJoinGame} />

      <Button label="Create Game" onClick={onNewGame} />
    </div>
  );
};

export default Games;
