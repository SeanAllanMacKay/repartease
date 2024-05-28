import React, { useContext } from "react";
import { Redirect, Slot } from "expo-router";
import { UserContext } from "Contexts/UserContext";
import { Text } from "Components/Text";
import { Layout } from "Components/Layout";

export default () => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Layout>
      <Slot
        screenOptions={{
          headerShown: false,
        }}
      />
    </Layout>
  );
};
