import { GameContext } from "contexts/GameContext";
import React from "react";
import { useContext } from "react";
import { View } from "react-native";
import { Text } from "components/Text";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "api";
import { Form, useForm } from "components/Form";
import { FlatList } from "components/FlatList";
import { SubmissionCard } from "batteries-included/Cards/SubmissionCard";
import { Button } from "components/Button";
import { FormField } from "components/FormField";

type SelectResponseFormValues = {
  playerId: string;
};

export const ActivePlayer = () => {
  const { game } = useContext(GameContext);

  const queryClient = useQueryClient();
  const form = useForm<SelectResponseFormValues>();

  const closeReponsesMutation = useMutation({
    mutationKey: ["select-response"],
    mutationFn: async () => {
      await Game.closeResponses({ gameCode: game?.gameCode });
    },
  });

  const selectResponseMutation = useMutation({
    mutationKey: ["select-response"],
    mutationFn: async (args: SelectResponseFormValues) => {
      await Game.submitSelection({ ...args, gameCode: game?.gameCode });
    },
  });

  const onCloseResponses = () => {
    closeReponsesMutation.mutate();
  };

  const onSelectResponse = form.handleSubmit(
    (formValues: SelectResponseFormValues) => {
      selectResponseMutation.mutate(formValues);
    }
  );

  const currentRound = game?.rounds?.[game?.rounds?.length - 1];

  if ((currentRound?.responses?.length ?? 0) < 1) {
    return (
      <Text isCenter variant="title">
        Nobody's submitted an answer yet, tell them to hurry up.
      </Text>
    );
  }

  const isClosed = currentRound?.status === "voting";

  return (
    <>
      <Form form={form}>
        <FormField
          name="playerId"
          component={({ value, onChange }) => (
            <FlatList
              data={currentRound?.responses ?? []}
              card={(props) => (
                <SubmissionCard
                  {...props}
                  isSelected={value === props.item?.playerId}
                  currentRound={currentRound}
                  onPress={() =>
                    isClosed ? onChange(props.item?.playerId) : undefined
                  }
                />
              )}
            />
          )}
        />
      </Form>

      {!isClosed ? (
        <Button label="Close Submissions" onPress={onCloseResponses} />
      ) : (
        <Button label="Lock it in" onPress={onSelectResponse} />
      )}
    </>
  );
};
