import { TextInput } from "@/components/TextInput";
import { Form, FormField, useForm, isRequired } from "@/components/Form";
import { Button } from "@/components/Button";

import { Game } from "@repo/api-abstraction";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "@/contexts/GameContext";
import { UserContext } from "@/contexts/UserContext";

import styles from "./page.module.css";

export const InactivePlayerView = () => {
  const { user } = useContext(UserContext);

  const { game,updateGame } = useContext(GameContext);

  const activePlayer = game?.players?.find(
    (player) => player.playerId === game?.activePlayer,
  );
  const isSubmissionsClosed =
    game?.rounds?.[game?.rounds?.length - 1]?.status !== "submission";

  const [isSubmitted, setIsSubmitted] = useState(
    game?.rounds?.[game?.rounds?.length - 1]?.responses?.some(
      (response) => response.playerId === user?._id,
    ),
  );

  const form = useForm();

  const response = form.watch("response");

  const onSubmit = form.handleSubmit(async (formValues) => {
    try {
      if (game) {
        await Game.submitResponse({
          ...formValues,
          gameCode: game.gameCode,
        });

        

        await updateGame();
      }
    } catch (caught) {}
  });

  useEffect(() => {
    setIsSubmitted(
      game?.rounds?.[game?.rounds?.length - 1]?.responses?.some(
        (response) => response.playerId === user?._id,
      ),
    );
  }, [game]);

  return (
    <>
      {!isSubmitted ? (
        <h3 className={styles.prompt}>
          {game?.rounds?.[game?.rounds?.length - 1]?.prompt}
        </h3>
      ) : null}

      {!isSubmitted && !isSubmissionsClosed ? (
        <>
          <Form form={form}>
            <FormField
              name="response"
              label="Response"
              component={TextInput}
              validate={{ isRequired }}
            />
          </Form>

          <Button label="Submit" onClick={onSubmit} isDisabled={!response} />
        </>
      ) : isSubmitted ? (
        <p className={styles.prompt}>
          You did your part, now tell {activePlayer?.playerName} to hurry up and
          pick their favorite.
        </p>
      ) : (
        <p className={styles.prompt}>
          Too slow, or {activePlayer?.playerName} is a dick. Either way, better
          luck next time.
        </p>
      )}
    </>
  );
};
