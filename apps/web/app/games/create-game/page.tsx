"use client";
import { useContext, useEffect } from "react";

import { Button } from "@/components/Button";
import { Form, FormField, useForm, isRequired } from "@/components/Form";
import { TextInput } from "@/components/TextInput";

import { UserContext } from "@/contexts/UserContext";

import { useNavigate } from "@/hooks";

import { Game } from "@repo/api-abstraction";

import styles from "./page.module.css";

type FormValues = {
  playerName: string;
};

const CreateGame = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { handleSubmit, formState, reset, ...restForm } = useForm<FormValues>({
    defaultValues: { playerName: user?.username },
  });

  const onNewGame = handleSubmit(async (values) => {
    try {
      const { game } = await Game.create(values);

      navigate({
        pathname: `/games/${game.gameCode}/game`,
        isReplace: true,
      });
    } catch (caught) {}
  });

  useEffect(() => {
    if (user && !restForm.getValues().playerName) {
      reset({ playerName: user.username });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Form<FormValues> form={{ ...restForm, handleSubmit, formState, reset }}>
        <FormField
          name="playerName"
          label="Player Name"
          component={TextInput}
          helper="This can be whatever you want, it's just for this game"
          validate={{ isRequired }}
        />
      </Form>

      <Button label="Create Game" onClick={onNewGame} />
    </div>
  );
};

export default CreateGame;
