import React, {
  createContext,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { Platform } from "react-native";
import PusherJS from "pusher-js";
import { Pusher as PusherNative } from "@pusher/pusher-websocket-react-native";

const Pusher = Platform.OS === "web" ? PusherJS : PusherNative;

const pusher =
  Platform.OS === "web"
    ? new Pusher("457f510eb94f9d09eeff", {
        cluster: "us2",
        channelAuthorization: { endpoint: "/api/pusher/auth" },
      })
    : Pusher.getInstance();

export const PusherContext = createContext<typeof pusher | null>(null);

export const PusherProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
  );
};
