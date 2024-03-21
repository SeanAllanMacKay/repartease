import React from "react";
import { Button } from "Components/Button";
import { Form, useForm } from "Components/Form";
import { FormField } from "Components/FormField";
import { TextInput } from "Components/TextInput";

import { isRequiredInvalid } from "@repartease/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "Api";
import { router } from "expo-router";

type JoinGameFormValues = { gameCode: string; playerName: string };

export const JoinNewGameTab = () => {
  const queryClient = useQueryClient();

  const form = useForm<JoinGameFormValues>();

  const mutation = useMutation({
    mutationKey: ["join-new-game"],
    mutationFn: async (args: JoinGameFormValues) => {
      const { game } = await Game.join(args);

      return game;
    },
    onSuccess: ({ gameCode }) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });

      router.replace(`/game/${gameCode}`);
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    mutation.mutate(values);
  });

  return (
    <>
      <Form form={form}>
        <FormField
          name="gameCode"
          label="Game Code"
          validate={{
            isRequiredInvalid,
            isGameCode: (value) =>
              value.length !== 6
                ? "That's not what our game codes look like."
                : undefined,
          }}
          component={TextInput}
          helper="Ask whoever created the game for the code."
        />

        <FormField
          name="playerName"
          label="Player Name"
          validate={{ isRequiredInvalid }}
          component={TextInput}
          helper="This can be whatever you want, it's just for this game"
        />
      </Form>

      <Button label="Join Game" onPress={onSubmit} />
    </>
  );
};
