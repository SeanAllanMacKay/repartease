import { Game } from "@repo/api-abstraction";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "@/contexts/GameContext";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "@/components/Button";

import styles from "./page.module.css";
import { Icon } from "@/components/Icon";

export const ActivePlayerView = () => {
  const { user } = useContext(UserContext);

  const { game, updateGame } = useContext(GameContext);

  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const isSubmissionsClosed =
    game?.rounds?.[game?.rounds?.length - 1]?.status !== "submission";

  const onCloseSubmissions = async () => {
    if (game) {
      await Game.closeResponses({ gameCode: game.gameCode });

      await updateGame();
    }
  };

  const onPickFavorite = async () => {
    if (game && selectedPlayerId) {
      await Game.submitSelection({
        gameCode: game?.gameCode,
        playerId: selectedPlayerId,
      });

      await updateGame();
    }
  };

  const onSelectResponse = ({ playerId }) => {
    setSelectedPlayerId(playerId);
  };

  const currentSubmissions =
    game?.rounds?.[game?.rounds?.length - 1]?.responses;

  return (
    <>
      <h3 className={styles.prompt}>
        {game?.rounds?.[game?.rounds?.length - 1]?.prompt}
      </h3>

      {currentSubmissions?.map(({ response, playerId }) => (
        <button
          onClick={
            isSubmissionsClosed
              ? () => onSelectResponse({ playerId })
              : undefined
          }
          className={`${styles.submissionContainer} ${
            !isSubmissionsClosed ? styles.hidden : ""
          }`}
        >
          {playerId === selectedPlayerId ? (
            <div className={styles.iconContainer}>
              <Icon variant="selected" color="green" weight="fill" />
            </div>
          ) : (
            <div className={styles.iconPlaceholder}></div>
          )}

          <h4 className={!isSubmissionsClosed ? styles.hidden : undefined}>
            {response}
          </h4>
        </button>
      ))}

      {isSubmissionsClosed ? (
        <Button
          label="Lock it in"
          onClick={onPickFavorite}
          isDisabled={!selectedPlayerId}
        />
      ) : (
        <>
          <Button
            label="Close Submissions"
            onClick={onCloseSubmissions}
            isDisabled={!currentSubmissions?.length}
          />
        </>
      )}
    </>
  );
};
