"use client";
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import startCase from "lodash.startcase";

import { Button } from "@/components/Button";
import { Form, FormField, useForm, isRequired } from "@/components/Form";
import { TextInput } from "@/components/TextInput";
import { Table } from "@/components/Table";
import { Tabs, Tab } from "@/components/Tabs";

import { UserContext } from "@/contexts/UserContext";

import { useNavigate } from "@/hooks";

import { Game } from "@repo/api-abstraction";

import styles from "./page.module.css";

type FormValues = {
  playerName: string;
};

const JoinGame = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { handleSubmit, formState, reset, ...restForm } = useForm<FormValues>({
    defaultValues: { playerName: user?.username },
  });

  const queryFn = async () => {
    const { games } = await Game.getPrevious();

    return games;
  };

  const query = useQuery({ queryKey: ["games"], queryFn });

  const onJoinNewGame = handleSubmit(async (values) => {
    try {
      onJoinGame(values);
    } catch (caught) {}
  });

  const onJoinGame = async (values) => {
    try {
      const { game } = await Game.join(values);

      navigate({
        pathname: `/games/${game.gameCode}/game`,
        isReplace: true,
      });
    } catch (caught) {}
  };

  useEffect(() => {
    if (user && !restForm.getValues().playerName) {
      reset({ playerName: user.username });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Tabs>
        <Tab tabKey="joint-new-game" label="Join New Game">
          <div className={styles.tabContent}>
            <Form<FormValues>
              form={{ ...restForm, handleSubmit, formState, reset }}
            >
              <FormField
                name="gameCode"
                label="Game Code"
                component={TextInput}
                helper="Ask whoever created the game for the code."
                validate={{
                  isRequired,
                  isGameCode: (value) =>
                    value.length !== 6
                      ? "That's not what our game codes look like."
                      : undefined,
                }}
                transform={(value) => value?.toUpperCase() || ""}
              />

              <FormField
                name="playerName"
                label="Player Name"
                component={TextInput}
                helper="This can be whatever you want, it's just for this game"
                validate={{ isRequired }}
              />
            </Form>

            <Button label="Join Game" onClick={onJoinNewGame} />
          </div>
        </Tab>

        <Tab tabKey="join-previous-game" label="Previous Games">
          <div className={styles.tabContent}>
            <Table
              columns={[
                {
                  label: "Game Code",
                  dataKey: "gameCode",
                  format: ({ value }) => (
                    <p
                      className={styles.gameCode}
                      onClick={() => onJoinGame({ gameCode: value })}
                    >
                      {value}
                    </p>
                  ),
                },
                {
                  label: "Started",
                  dataKey: "createdAt",
                  format: ({ value }) =>
                    format(new Date(value), "MMM dd, yyyy"),
                },
                {
                  label: "status",
                  dataKey: "status",
                  format: ({ value }) => startCase(value),
                },
              ]}
              rows={query.data ?? []}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default JoinGame;
