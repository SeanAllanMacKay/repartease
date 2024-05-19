import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "Components/Button";
import type {
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";

export type TabRouteType = { key: string; title: string };

export type TabBarProps = SceneRendererProps & {
  navigationState: NavigationState<TabRouteType>;
  onChangeTab: (newIndex: number) => void;
};

export const TabBar = ({
  onChangeTab,
  navigationState: { index: currentIndex, routes },
}: TabBarProps) => {
  return (
    <View style={styles.container}>
      {routes.map(({ key, title }) => {
        const routeIndex = routes.findIndex(
          ({ key: routeId }) => routeId === key
        );

        const isActive = routeIndex === currentIndex;

        return (
          <Button
            label={title}
            onPress={() => onChangeTab(routeIndex)}
            variant={isActive ? "primary" : "secondary"}
            isFluid
            key={key}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 16,
    padding: 4,
  },
});
