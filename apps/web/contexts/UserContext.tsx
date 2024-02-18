import { createContext, useState, useEffect } from "react";

import { useNavigate } from "@/hooks";

import { User } from "@repo/api-abstraction";

import type { PropsWithChildren } from "react";

type UserType = {
  _id: string;
  username: string;
  games: string[];
};

export const UserContext = createContext<{
  user: UserType | undefined;
  login: (loginProps: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (updateProps: { username: string }) => Promise<void>;
  isLoading: boolean;
}>({
  user: undefined,
  login: async () => {},
  logout: () => {},
  updateUser: async () => {},
  isLoading: true,
});

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (loginProps: { username: string; password: string }) => {
    setIsLoading(true);

    const { user: newUser } = await User.login(loginProps);

    if (newUser) {
      setUser(newUser);

      navigate({ pathname: "/games", isReplace: true });
    }

    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);

    await User.logout();

    setUser(undefined);

    setIsLoading(false);
  };

  const updateUser = async (updateProps: { username: string }) => {
    const { user: newUser } = await User.update({
      ...updateProps,
      userId: user?._id,
    });

    if (newUser) {
      setUser(newUser);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { user: newUser } = await User.get();

        if (newUser) {
          setUser(newUser);
        }
      } catch (caught) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, logout, updateUser, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
