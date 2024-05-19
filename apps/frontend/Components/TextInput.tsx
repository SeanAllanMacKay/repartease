import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";

export const TextInput = ({
  value,
  onChange,
  onBlur,
  isError = false,
  variant = "text",
  isMulti = false,
}: {
  onChange: (newValue: string) => void;
  value?: string;
  onBlur: () => void;
  isError?: boolean;
  variant?: "text" | "number" | "password";
  isMulti?: boolean;
}) => {
  return (
    <RNTextInput
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      style={[styles.container]}
      {...(isMulti
        ? {
            multiline: true,
            numberOfLines: 4,
          }
        : {})}
      secureTextEntry={variant === "password"}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 8,
  },
  outline: {},
  isError: {},
});
