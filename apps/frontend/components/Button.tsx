import React, { PropsWithChildren } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  ReduceMotion,
} from "react-native-reanimated";
import { Text } from "./Text";
import { Link } from "expo-router";
import { spacing, colors } from "@repartease/style";
import type { TextVariant } from "./Text";

const springConfig = {
  duration: 400,
  dampingRatio: 0.5,
  stiffness: 100,
  overshootClamping: true,
  reduceMotion: ReduceMotion.System,
};

const ConditionallyWrappedLink = ({
  href,
  children,
}: PropsWithChildren<{ href?: string }>) => {
  return href ? (
    <Link href={href} asChild>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export const Button = ({
  label,
  onPress,
  variant = "primary",
  href,
  isFluid,
  labelVariant = "body",
  size = "medium",
}: {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  href?: string;
  isFluid?: boolean;
  labelVariant?: TextVariant;
  size?: "small" | "medium" | "large";
}) => {
  const isPressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      borderLeftWidth: withSpring(isPressed.value ? 2 : 6, springConfig),
      borderBottomWidth: withSpring(isPressed.value ? 2 : 8, springConfig),
      borderRightWidth: 2,
      borderTopWidth: 2,
      borderTopLeftRadius: withSpring(isPressed.value ? 8 : 10, springConfig),
      borderTopRightRadius: withSpring(isPressed.value ? 8 : 8, springConfig),
      borderBottomRightRadius: withSpring(
        isPressed.value ? 8 : 13,
        springConfig
      ),
      borderBottomLeftRadius: withSpring(
        isPressed.value ? 8 : 14,
        springConfig
      ),
    };
  });

  return (
    <ConditionallyWrappedLink href={href}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (isPressed.value = true)}
        onPressOut={() => (isPressed.value = false)}
        style={[...(isFluid ? [{ flex: 1 }] : [])]}
      >
        <Animated.View
          style={[styles.button, styles[variant], styles[size], animatedStyles]}
        >
          <Text
            variant={labelVariant}
            isUppercase
            color={variant === "secondary" ? "black" : "white"}
          >
            {label}
          </Text>
        </Animated.View>
      </Pressable>
    </ConditionallyWrappedLink>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "black",
    alignItems: "center",
  },
  primary: { backgroundColor: colors.primary.regular },
  secondary: { backgroundColor: "white" },
  tertiary: {},
  danger: { backgroundColor: "red" },
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
});
