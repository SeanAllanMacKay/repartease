import React from "react";
import { Slot, useLocalSearchParams } from "expo-router";
import { PusherProvider } from "Contexts/PusherContext";
import { GameProvider } from "Contexts/GameContext";

export default () => {
  const { gameCode } = useLocalSearchParams();

  return (
    <PusherProvider>
      <GameProvider gameCode={gameCode}>
        <Slot
          screenOptions={{
            headerShown: false,
          }}
        />
      </GameProvider>
    </PusherProvider>
  );
};
