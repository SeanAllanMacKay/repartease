import { useFormContext, Controller } from "react-hook-form";
import React from "react";
import { Text } from "./Text";
import { View, StyleSheet } from "react-native";

export const FormField = ({
  name,
  validate,
  onChange,
  helper,
  error,
  dependsOn,
  label,
  component: Component,
  unregisterOnUnmount = true,
  ...restProps
}: {
  name: string;
  label?: string;
  helper?: string;
  error?: string;
  validate?: Record<
    string,
    (
      value: any,
      allValues: any
    ) => Promise<string | undefined> | string | undefined
  >;
  onChange?: (value: any) => void;
  dependsOn?: string[];
  component: React.FC<any>;
  unregisterOnUnmount?: boolean;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate, deps: dependsOn }}
      shouldUnregister={unregisterOnUnmount}
      render={({
        field: { onChange: onFieldChange, onBlur, value },
        fieldState: { error },
      }) => {
        const onComponentChange = (newValue: any) => {
          onFieldChange(newValue);

          if (onChange) {
            onChange(newValue);
          }
        };

        return (
          <View style={[styles.container]}>
            <Text variant="body">{label}</Text>

            <Component
              onChange={onComponentChange}
              onBlur={onBlur}
              value={value}
              isError={!!error}
              {...restProps}
            />

            <View style={[styles.underContainer]}>
              {error ? (
                <Text variant="label" color="red">
                  {error.message}
                </Text>
              ) : helper ? (
                <Text variant="label">{helper}</Text>
              ) : null}
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 16,
  },
  underContainer: {
    minHeight: 16,
  },
});
