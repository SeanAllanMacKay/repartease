import React from "react";
import { Slot, useLocalSearchParams } from "expo-router";
import { PusherProvider } from "contexts/PusherContext";
import { GameProvider } from "contexts/GameContext";

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
