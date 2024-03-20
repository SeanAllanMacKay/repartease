import React from "react";
import { PropsWithChildren } from "react";
import { ScrollView, View, StyleSheet } from "react-native";

export type TabProps = PropsWithChildren<{
  id: string;
  label: string;
  isScrollView?: boolean;
}>;

export const Tab = ({ children, isScrollView = false }: TabProps) => {
  const Wrapper = isScrollView ? ScrollView : View;

  return <Wrapper style={styles.container}>{children}</Wrapper>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flex: 1,
  },
});
