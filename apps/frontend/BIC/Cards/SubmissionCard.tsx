import { Card } from "Components/Card";
import React from "react";
import { router } from "expo-router";

export const SubmissionCard = ({ item, currentRound, onPress, isSelected }) => {
  return (
    <Card
      isBlurred={currentRound?.status !== "voting"}
      title={`${item.response}`}
      onPress={onPress}
      isSelected={isSelected}
    />
  );
};
