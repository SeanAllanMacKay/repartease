import React from "react";
import { StyleSheet, Text as RNText } from "react-native";
import { Link } from "expo-router";

import type { PropsWithChildren } from "react";
import { BlurView } from "expo-blur";

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

export type TextVariant = "header" | "title" | "body" | "label";

export const Text = ({
  children,
  variant = "body",
  color = "black",
  href,
  isUppercase = false,
  isCenter = false,
  isBlurred = false,
  font = undefined,
  size = 14,
}: PropsWithChildren<{
  variant?: TextVariant;
  color?: string;
  href?: string;
  isUppercase?: boolean;
  isCenter?: boolean;
  isBlurred?: boolean;
  font?: "Batuphat Script" | "Karmatic Arcade";
  size?: number;
}>) => {
  return (
    <ConditionallyWrappedLink href={href}>
      <RNText
        style={[
          styles.text,
          styles[variant],
          {
            color,
            textTransform: isUppercase ? "uppercase" : "none",
            textAlign: isCenter ? "center" : "auto",
            fontFamily: font,
            fontSize: size,
          },
        ]}
      >
        {children}
      </RNText>

      {isBlurred ? (
        <BlurView
          intensity={30}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      ) : null}
    </ConditionallyWrappedLink>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: 32 },
  title: { fontSize: 24 },
  body: { fontSize: 16 },
  label: {},
});
