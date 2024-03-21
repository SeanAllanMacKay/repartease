import React, { useContext, useState } from "react";
import { Stack, Slot } from "expo-router";
import { initialize } from "api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext, UserProvider } from "contexts/UserContext";
import { Header } from "components/Header";
import { Button } from "components/Button";
import { View } from "react-native";
import { Menu } from "components/Menu";
import { Text } from "components/Text";

const queryClient = new QueryClient();

const API_URL = process.env.EXPO_PUBLIC_API_URL;

initialize({
  config: { host: API_URL },
});

const Content = () => {
  const { user, onLogout } = useContext(UserContext);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (
    <>
      <Stack
        screenOptions={{
          title: "Repartease",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <>
              {user ? (
                <Button
                  label="🙂"
                  isFluid={false}
                  variant="secondary"
                  labelVariant="title"
                  size="small"
                  onPress={() => setIsAccountMenuOpen(true)}
                />
              ) : null}
            </>
          ),
        }}
      />

      <Menu
        position="right"
        title="Account"
        isOpen={isAccountMenuOpen}
        onClose={() => setIsAccountMenuOpen(false)}
        actions={[
          <Button
            key="log-out-action"
            label="Logout"
            onPress={() => {
              onLogout();
              setIsAccountMenuOpen(false);
            }}
            variant="danger"
          />,
        ]}
      >
        <Text>Email: {user?.email}</Text>
      </Menu>
    </>
  );
};

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Content />
      </UserProvider>
    </QueryClientProvider>
  );
}
