import React from "react";
import { Button } from "components/Button";
import { Form, useForm } from "components/Form";
import { FormField } from "components/FormField";
import { TextInput } from "components/TextInput";

import { isRequiredInvalid } from "@repartease/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "api";
import { router } from "expo-router";

type PlayerFormValues = { playerName: string };

export default function StartGame() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-game"],
    mutationFn: async (formValues: PlayerFormValues) => {
      const { game } = await Game.create(formValues);

      return game;
    },
    onSuccess: ({ gameCode }) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });

      router.replace(`/game/${gameCode}`);
    },
  });

  const form = useForm<PlayerFormValues>();

  const onSubmit = form.handleSubmit(async (values) => {
    mutation.mutate(values);
  });

  return (
    <>
      <Form form={form}>
        <FormField
          name="playerName"
          label="Player Name"
          validate={{ isRequiredInvalid }}
          component={TextInput}
          helper="This can be whatever you want, it's just for this game"
        />
      </Form>

      <Button label="Start Game" onPress={onSubmit} />
    </>
  );
}
