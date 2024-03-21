import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "Components/Text";
import { GameContext } from "Contexts/GameContext";
import { useContext } from "react";

export const Waiting = () => {
  const { game } = useContext(GameContext);

  return (
    <View>
      <Text variant="title" isCenter>
        Oops, you need friends to play this game.
      </Text>

      <Text isCenter>
        If you have those, invite them to play by using this game code:
      </Text>

      <View style={styles.separator} />
      <Text variant="header" isCenter>
        {game?.gameCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 32,
  },
});
