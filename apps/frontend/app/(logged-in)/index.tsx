import React from "react";
import { Button } from "components/Button";
import { View } from "react-native";

export default function LoggedIn() {
  return (
    <>
      <Button label="Join Game" variant="secondary" href="join-game" />

      <View style={{ height: 24 }} />

      <Button label="Start Game" href="start-game" />
    </>
  );
}
