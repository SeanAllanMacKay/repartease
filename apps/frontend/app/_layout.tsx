import React, { useContext, useState, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initialize } from "Api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext, UserProvider } from "Contexts/UserContext";
import { RevenueCatProvider } from "Contexts/RevenueCatContext";
import { Button } from "Components/Button";
import { Menu } from "Components/Menu";
import { Text } from "Components/Text";

const queryClient = new QueryClient();

const API_URL = process.env.EXPO_PUBLIC_API_URL;

initialize({
  config: { host: API_URL },
});

SplashScreen.preventAutoHideAsync();

const Content = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Karmatic Arcade": require("../assets/karmatic_arcade.ttf"),
  });

  const { user, onLogout } = useContext(UserContext);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          title: "Repartease",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            fontFamily: "Karmatic Arcade",
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
    <RevenueCatProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Content />
        </UserProvider>
      </QueryClientProvider>
    </RevenueCatProvider>
  );
}
