import { useEffect } from "react";
import { Platform } from "react-native";

import Purchases, { LOG_LEVEL } from "react-native-purchases";

const APIKeys = {
  google: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
};

export const RevenueCatProvider = () => {
  useEffect(() => {
    const setup = async () => {
      if (APIKeys.google && Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      }
    };

    Purchases.setLogLevel(LOG_LEVEL.WARN);

    setup().catch(console.log);
  }, []);
};
