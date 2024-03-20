import React from "react";
import { Tabs, Tab } from "components/Tabs";
import { RejoinGameTab } from "batteries-included/tabs/RejoinGameTab";
import { JoinNewGameTab } from "batteries-included/tabs/JoinNewGameTab";
import { View } from "react-native";

export default function JoinGame() {
  return (
    <View style={{ height: "100%", paddingVertical: 24 }}>
      <Tabs>
        <Tab id="new-game" label="Join New Game">
          <JoinNewGameTab />
        </Tab>

        <Tab id="rejoin-game" label="Rejoin Game">
          <RejoinGameTab />
        </Tab>
      </Tabs>
    </View>
  );
}
