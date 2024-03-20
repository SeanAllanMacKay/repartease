import React, { createContext, useState, useEffect } from "react";

import { User } from "api-abstraction";

import type { PropsWithChildren } from "react";

type UserType = {
  _id: string;
  email: string;
  games: string[];
};

export const UserContext = createContext<{
  user: UserType | undefined;
  login: (
    loginProps: { email: string; password: string },
    onLogin?: (user: UserType) => Promise<void>
  ) => Promise<void>;
  logout: (onLogout?: Promise<() => void>) => void;
  isLoading: boolean;
}>({
  user: undefined,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(undefined);

  const login = async (
    formValues: { email: string; password: string },
    onLogin?: (user: UserType) => Promise<void>
  ) => {
    try {
      setIsLoading(true);

      const { user } = await User.login(formValues);

      setUser(user);

      onLogin?.(user);
    } catch (caught) {
      console.error("Error logging in: ", caught);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (onLogout?: () => Promise<void>) => {
    try {
      setIsLoading(true);

      await User.logout();

      setUser(undefined);

      await onLogout?.();
    } catch (caught) {
      console.error(caught);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { user } = (await User.login()) || {};

        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      } catch (caught) {
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("CONTEXT", user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
