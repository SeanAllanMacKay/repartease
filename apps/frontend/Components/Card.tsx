import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Text } from "./Text";
import { BlurView } from "expo-blur";

export type CardProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isBlurred?: boolean;
  isSelected?: boolean;
};

export const Card = ({
  title,
  subtitle,
  onPress,
  isBlurred,
  isSelected,
}: CardProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container]}>
        <View style={[styles.titleContainer]}>
          <View style={styles.title}>
            {isSelected !== undefined ? (
              <View style={[styles.checkboxWrapper]}>
                {isSelected ? (
                  <Text variant="title">✅</Text>
                ) : (
                  <Text variant="title">⬜</Text>
                )}
              </View>
            ) : null}

            <Text isBlurred={isBlurred} variant="title">
              {title}
            </Text>
          </View>

          {subtitle ? <Text isBlurred={isBlurred}>{subtitle}</Text> : null}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 0,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    marginBottom: 0,
    display: "flex",
    flexDirection: "row",
  },
  checkboxWrapper: {
    marginRight: 16,
  },
});
