import React, { createContext, useState, useEffect } from "react";

import { User } from "Api";

import type { PropsWithChildren } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

type UserType = {
  _id: string;
  email: string;
  games: string[];
};

export const UserContext = createContext<{
  user: UserType | undefined;
  onSignUp: (loginProps: { email: string; password: string }) => Promise<void>;
  onLogin: (loginProps: { email: string; password: string }) => Promise<void>;
  onLogout: () => void;
  isLoading: boolean;
}>({
  user: undefined,
  onSignUp: async () => {},
  onLogin: async () => {},
  onLogout: () => {},
  isLoading: true,
});

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return User.login();
    },
    staleTime: Infinity,
    retry: false,
  });

  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: async ({
      dispatch,
      ...restArgs
    }:
      | { dispatch: "login"; email: string; password: string }
      | { dispatch: "logout" }) => {
      switch (dispatch) {
        case "login":
          const { email, password } = restArgs;
          return await User.login({ email, password });
        case "logout":
          return await User.logout();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      queryClient.setQueryData(["user"], null);

      router.replace("/login");
    },
  });

  const signUpMutation = useMutation({
    mutationKey: ["user", "sign-up"],
    mutationFn: async ({
      ...restArgs
    }: {
      email: string;
      password: string;
    }) => {
      const { email, password } = restArgs;

      return await User.signUp({ email, password });
    },
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      queryClient.setQueryData(["user"], user);
    },
  });

  const onSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signUpMutation.mutate({ email, password });
  };

  const onLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    mutation.mutate({ dispatch: "login", email, password });
  };

  const onLogout = () => {
    mutation.mutate({ dispatch: "logout" });
  };

  return (
    <UserContext.Provider
      value={{
        user: query.data?.user,
        onSignUp,
        onLogin,
        onLogout,
        isLoading: query.isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
