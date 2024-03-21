import { Card } from "Components/Card";
import React from "react";
import { router } from "expo-router";

export const GameCard = ({ item }) => {
  const owner = item?.players.find(({ playerId }) => playerId === item?.owner);

  const rounds = item.rounds.length;

  const onPress = () => {
    router.push(`/game/${item?.gameCode}`);
  };

  return (
    <Card
      title={`${owner.playerName}'s game`}
      subtitle={`Rounds: ${rounds}/20`}
      onPress={onPress}
    />
  );
};
