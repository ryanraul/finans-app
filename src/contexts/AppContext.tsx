"use client";

import { userLogout } from "@/app/(pages)/auth/api/logout.api";
import { User } from "@/app/(pages)/auth/types/User";
import { FinansAxiosApi } from "@/services/FinansAxiosApi";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  disconnectUser: () => void;
}

export const AppContext = createContext({} as IAppContext);

export function useAuth() {
  return useContext(AppContext);
}

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  //TODO - Implement accordion with account ids on the side bar
  const [accountId, setAccountId] = useState<number>();
  const _ = new FinansAxiosApi();

  useEffect(() => {
    FinansAxiosApi.get<{ username: string }>("/user/profile").then(
      (response) => {
        if (response.Data?.username) {
          const userResponse = new User(response.Data?.username);
          setUser(userResponse);
        }
      }
    );
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
        setUser,
        disconnectUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
