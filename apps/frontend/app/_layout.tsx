import React, { useContext, useState, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { initialize } from "Api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext, UserProvider } from "Contexts/UserContext";
import { RevenueCatProvider } from "Contexts/RevenueCatContext";
import { Button } from "Components/Button";
import { Menu } from "Components/Menu";
import { Text } from "Components/Text";
import Purchases, { PRODUCT_CATEGORY } from "react-native-purchases";

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
  const [offerings, setOfferings] = useState([]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    (async () => {
      try {
        const products = await Purchases.getProducts(
          ["1_token", "3_token", "5_token"],
          PRODUCT_CATEGORY.NON_SUBSCRIPTION
        );

        setOfferings(products);
      } catch (caught) {
        console.error("Error fetching RevenueCat products", caught);
      }
    })();
  }, []);

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
            key="buy-tokens-action"
            label="🪙 Buy Tokens"
            onPress={async () => {
              await Purchases.purchaseStoreProduct(offerings[0]);
            }}
            variant="secondary"
          />,
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="label">Email</Text>
          <Text variant="body">{user?.email}</Text>
        </View>

        <View style={{ height: 20 }} />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="label">Tokens</Text>
          <Text>{user?.tokens || 0}</Text>
        </View>
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
