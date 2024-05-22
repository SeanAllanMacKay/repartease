import React, {
  createContext,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { Platform } from "react-native";
import PusherJS from "pusher-js";
import { Pusher as PusherNative } from "@pusher/pusher-websocket-react-native";

const PUSHER_KEY = process.env.EXPO_PUBLIC_PUSHER_KEY;
const PUSHER_CLUSTER = process.env.EXPO_PUBLIC_PUSHER_CLUSTER;

const Pusher = Platform.OS === "web" ? PusherJS : PusherNative;

const pusher =
  Platform.OS === "web"
    ? new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER,
        channelAuthorization: { endpoint: "/pusher/auth" },
      })
    : Pusher.getInstance();

export const PusherContext = createContext<typeof pusher | null>(null);

export const PusherProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
  );
};
