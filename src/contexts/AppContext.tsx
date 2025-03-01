"use client";

import { postAuthRefreshToken } from "@/__generated__/api";
import { userLogout } from "@/app/auth/api/logout.api";
import { User } from "@/app/auth/types/User";
import { FinansAxiosApi } from "@/services/FinansAxiosApi";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

interface IAppContext {
  user: User | undefined;
  accountId: number | undefined;
  isSessionLoading: boolean;
  setUser: (user: User | undefined) => void;
  disconnectUser: () => void;
  setAccountId: (accountId: number) => void;
}

export const AppContext = createContext({} as IAppContext);

export function useAuth() {
  return useContext(AppContext);
}

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [accountId, setAccountId] = useState<number>();
  const [isSessionLoading, setIsSessionLoading] = useState<boolean>(true);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("refreshToken");

    if (!token) {
      setIsSessionLoading(false);
      return;
    }

    setIsSessionLoading(true);

    postAuthRefreshToken({ refreshToken: token }).then((response) => {
      FinansAxiosApi.setTokenJwt(response.token);
      setUser(
        new User(response.userResponse.username, response.userResponse.accounts)
      );

      setIsSessionLoading(false);
    });
  }, []);

  async function disconnectUser() {
    userLogout();
    setUser(undefined);
    redirect("/auth");
  }

  return (
    <AppContext.Provider
      value={{
        user,
        accountId,
        isSessionLoading,
        setUser,
        disconnectUser,
        setAccountId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
