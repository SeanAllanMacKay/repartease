import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

export const Timer = ({ length }) => {
  const width = useSharedValue(100);

  useEffect(() => {
    width.value = withTiming(0, {
      duration: length * 1000,
      easing: Easing.linear,
    });
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.timer, animatedStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "black",
  },
  timer: {
    backgroundColor: "purple",
    borderRadius: 16,
    height: "100%",
  },
});
