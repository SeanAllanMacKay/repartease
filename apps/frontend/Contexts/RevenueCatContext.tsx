import React, { useEffect } from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

import type { ReactNode } from "react";

const APIKeys = {
  google: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
};

export const RevenueCatProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const setup = async () => {
      if (APIKeys.google && Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      }
    };

    if (Platform.OS !== "web") {
      Purchases.setLogLevel(LOG_LEVEL.WARN);
    }

    setup().catch(console.log);
  }, []);

  return <>{children}</>;
};
