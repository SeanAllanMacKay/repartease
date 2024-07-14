import React, { ReactElement, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { Text } from "./Text";
import { Button } from "./Button";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const Menu = ({
  title,
  children,
  onClose,
  isOpen,
  actions,
  position = "bottom",
}: PropsWithChildren<{
  title: string;
  onClose: () => void;
  isOpen: boolean;
  actions?: Array<ReactElement>;
  position?: "bottom" | "right";
}>) => {
  const [viewSize, setViewSize] = useState({ height: 0, width: 0 });
  const { height, width } = useWindowDimensions();

  const isBottom = position === "bottom";

  const minHeight = isBottom
    ? Math.min(viewSize.height, height - 48)
    : height - 100;
  const minWidth = isBottom
    ? Math.min(viewSize.width, width)
    : Math.min(width - 50, Math.max(viewSize.width, 400));

  const offset = useSharedValue(isBottom ? -height : -width);
  const shade = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() =>
    isBottom
      ? {
          bottom: offset.value,
        }
      : { right: offset.value }
  );

  const shadeStyle = useAnimatedStyle(() => ({
    opacity: shade.value,
  }));

  useEffect(() => {
    offset.value = withTiming(isOpen ? 0 : isBottom ? -height : -width, {
      duration: 300,
    });

    shade.value = withTiming(isOpen ? 0.25 : 0, { duration: 300 });
  }, [height, isOpen]);

  const styles = StyleSheet.create({
    pressable: {
      width,
      height,
      top: 0,
      position: "absolute",
    },
    bottomPressable: { left: -((width - viewSize.width) / 2) + 3 },
    container: {
      borderTopLeftRadius: 16,
      borderLeftWidth: 3,
      borderTopWidth: 3,
      borderColor: "black",
      width: isBottom ? "100%" : undefined,
      height: isBottom ? undefined : "100%",
      position: "absolute",
      backgroundColor: "white",
    },
    children: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    bottomContainer: {
      borderTopRightRadius: 16,
      borderRightWidth: 3,
      minHeight,
      minWidth,
    },
    rightContainer: {
      top: 48,
      borderBottomLeftRadius: 16,
      borderBottomWidth: 3,
      minWidth,
      minHeight,
    },
    header: {
      padding: 16,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      padding: 16,
      flex: 1,
    },
    actions: {
      padding: 16,
    },
    actionSpacing: {
      marginBottom: 16,
    },
  });

  return (
    <>
      <Pressable
        pointerEvents={!isOpen ? "none" : "auto"}
        style={[
          styles.pressable,
          ...(isBottom ? [styles.bottomPressable] : []),
        ]}
        onPress={() => onClose()}
      >
        <Animated.View
          style={[
            {
              width: width + 100,
              height: height + 100,
              backgroundColor: "#000000",
              opacity: 0,
            },
            shadeStyle,
          ]}
        />
      </Pressable>

      <Animated.View
        style={[
          styles.container,
          containerStyle,
          ...(isBottom
            ? [styles.bottomContainer]
            : [styles.rightContainer, { maxHeight: height - 48 }]),
        ]}
      >
        <View
          style={[styles.children]}
          onLayout={(event) => {
            const { height, width } = event.nativeEvent.layout;

            setViewSize({ height, width });
          }}
        >
          <View style={styles.header}>
            <Text variant="title">{title}</Text>

            <Button
              variant="secondary"
              onPress={onClose}
              label="✖️"
              size="small"
            />
          </View>

          <View style={styles.body}>{children}</View>

          {actions?.length ? (
            <View style={styles.actions}>
              {actions.map((action, index) =>
                index !== actions?.length - 1 ? (
                  <View style={styles.actionSpacing} key={`actions-${index}`}>
                    {action}
                  </View>
                ) : (
                  action
                )
              )}
            </View>
          ) : null}
        </View>
      </Animated.View>
    </>
  );
};
