import React from "react";
import { View, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    center: {
      flex: 1,
      maxWidth: Math.min(width * 0.9, 800),
      flexDirection: "column",
      justifyContent: "center",
      maxHeight: height,
      height: "100%",
    },
    content: {},
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.center]}>{children}</View>
    </View>
  );
};
