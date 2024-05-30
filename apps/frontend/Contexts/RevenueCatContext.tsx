import React, { useEffect } from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

import type { ReactNode } from "react";

const APIKeys = {
  google: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
};

export const RevenueCatProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    (async () => {
      try {
        if (APIKeys.google && Platform.OS == "android") {
          await Purchases.configure({ apiKey: APIKeys.google });
        }
      } catch (caught) {
        console.error("Error initializing RevenueCat", caught);
      }
    })();

    if (Platform.OS !== "web") {
      Purchases.setLogLevel(LOG_LEVEL.WARN);
    }
  }, []);

  return <>{children}</>;
};
