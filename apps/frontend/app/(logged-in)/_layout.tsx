import React, { useContext, useEffect } from "react";
import { Redirect, Slot } from "expo-router";
import { UserContext } from "contexts/UserContext";
import { Text } from "components/Text";
import { Layout } from "components/Layout";

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
