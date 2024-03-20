import { ActivePlayer } from "batteries-included/Game/ActivePlayer";
import { InactivePlayer } from "batteries-included/Game/InactivePlayer";
import { GameContext } from "contexts/GameContext";
import { UserContext } from "contexts/UserContext";
import React, { useContext, useState } from "react";
import { Text } from "components/Text";
import { View, StyleSheet, Pressable } from "react-native";
import { Waiting } from "batteries-included/Game/Waiting";
import { Timer } from "components/Timer";
import { Menu } from "components/Menu";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Button } from "components/Button";

const statusMapping = {
  active: "🟢",
  inactive: "🔴",
  away: "🟡",
};

export default function JoinGame() {
  const { user, isLoading: isUserLoading } = useContext(UserContext);
  const {
    game,
    isLoading: isGameLoading,
    onLeaveGame,
  } = useContext(GameContext);

  const isActive =
    game?.rounds?.[game?.rounds?.length - 1]?.activePlayer === user?._id;

  if (isUserLoading || isGameLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user || !game) {
    return <Text>Ya'll must have fucked up</Text>;
  }

  const isPlayable =
    game?.players?.filter(({ status }) => status === "active")?.length > 1;

  if (!isPlayable) {
    return <Waiting />;
  }

  const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);

  const handleBottomPadding = useSharedValue(8);

  const handleStyle = useAnimatedStyle(() => ({
    paddingBottom: handleBottomPadding.value,
  }));

  const currentRound = game?.rounds?.[game?.rounds?.length - 1];

  const prompt = currentRound?.prompt;

  const winningResponse = currentRound?.responses?.find(
    ({ isWinner }) => isWinner
  );

  return (
    <>
      <Pressable
        onHoverIn={() =>
          (handleBottomPadding.value = withTiming(24, {
            duration: 200,
          }))
        }
        onHoverOut={() =>
          (handleBottomPadding.value = withTiming(8, {
            duration: 200,
          }))
        }
        onPress={() => setIsGameMenuOpen(true)}
        style={styles.handleContainer}
      >
        <Animated.View style={[styles.handle, handleStyle]}>
          <Text variant="title">☰ {game.gameCode}</Text>
        </Animated.View>
      </Pressable>

      <Text variant="header" isCenter>
        {prompt}
      </Text>

      <View style={styles.separator} />

      {winningResponse ? (
        <>
          <Text variant="title">Winner: {winningResponse?.response}</Text>

          <Timer length={3.75} />
        </>
      ) : (
        <>{isActive ? <ActivePlayer /> : <InactivePlayer />}</>
      )}

      <Menu
        title={game.gameCode}
        isOpen={isGameMenuOpen}
        onClose={() => setIsGameMenuOpen(false)}
        actions={[
          <Button
            key="leave-game-action"
            label="Leave Game"
            onPress={onLeaveGame}
            variant="danger"
          />,
        ]}
      >
        <View style={[styles.row, styles.headerRow]}>
          <View style={styles.playerNameCell}>
            <Text>Player Name</Text>
          </View>

          <View style={styles.pointsCell}>
            <Text isCenter>Points</Text>
          </View>

          <View style={styles.statusCell}>
            <Text isCenter>Status</Text>
          </View>
        </View>

        {game?.players?.map(({ playerName, points, status }, index) => (
          <View
            style={[
              styles.row,
              ...(index === game?.players?.length - 1
                ? [styles.lastDataRow]
                : []),
            ]}
          >
            <View style={styles.playerNameCell}>
              <Text>{playerName}</Text>
            </View>

            <View style={styles.pointsCell}>
              <Text isCenter>{points}</Text>
            </View>

            <View style={styles.statusCell}>
              <Text isCenter>{statusMapping[status]}</Text>
            </View>
          </View>
        ))}
      </Menu>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "100%",
  },
  separator: {
    height: 48,
  },
  handleContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  handle: {
    borderColor: "black",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: "white",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  headerRow: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dataRow: {},
  lastDataRow: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomWidth: 3,
  },
  playerNameCell: {
    flex: 3,
    borderRightWidth: 3,
    borderRightColor: "black",
    padding: 8,
  },
  pointsCell: { flex: 1, padding: 8, borderRightWidth: 3 },
  statusCell: {
    flex: 1,
    padding: 8,
  },
});
