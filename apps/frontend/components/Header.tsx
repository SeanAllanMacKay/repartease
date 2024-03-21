import { UserContext } from "Contexts/UserContext";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Text";
import React from "react";
import { Button } from "./Button";

export const Header = () => {
  const { user, onLogout } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text color="white" variant="header">
        Repartease
      </Text>

      {user ? (
        <Button
          label="Log Out"
          onPress={() => onLogout()}
          variant="secondary"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
});
