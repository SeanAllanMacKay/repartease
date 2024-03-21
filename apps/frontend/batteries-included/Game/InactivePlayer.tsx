import { GameContext } from "contexts/GameContext";
import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "contexts/UserContext";
import { Game } from "api";
import { Form } from "components/Form";
import { FormField } from "components/FormField";
import { isRequiredInvalid } from "@repartease/validators";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { Text } from "components/Text";

type ResponseFormValues = {
  response: string;
};

export const InactivePlayer = () => {
  const { user } = useContext(UserContext);
  const { game } = useContext(GameContext);

  const currentRound = game?.rounds?.[game?.rounds?.length - 1];

  const isPreviouslySubmitted = Boolean(
    currentRound?.responses?.find(({ playerId }) => playerId === user?._id)
  );

  const [isSubmitted, setIsSubmitted] = useState(isPreviouslySubmitted);
  const form = useForm<ResponseFormValues>();

  const mutation = useMutation({
    mutationKey: ["submit-response"],
    mutationFn: async (args: ResponseFormValues) => {
      await Game.submitResponse({ ...args, gameCode: game?.gameCode });
    },
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const onSubmit = form.handleSubmit((formValues: ResponseFormValues) => {
    mutation.mutate(formValues);
  });

  const activePlayer = game?.players?.find(
    ({ playerId }) =>
      game?.rounds?.[game?.rounds?.length - 1]?.activePlayer === playerId
  );

  return (
    <>
      {!isSubmitted ? (
        <>
          <Form form={form}>
            <FormField
              name="response"
              label="Response"
              validate={{
                isRequiredInvalid,
              }}
              component={(props) => <TextInput {...props} isMulti />}
              helper="Say something funny. Or don't, I'm not your boss."
            />
          </Form>

          <View style={[styles.buttonContainer]}>
            <Button label="Submit Response" onPress={onSubmit} />
          </View>
        </>
      ) : (
        <Text variant="title" isCenter>
          You've done your part. Tell {activePlayer?.playerName} to hurry up and
          pick their favorite answer.
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
