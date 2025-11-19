"use client";

import { postAuthRefreshToken } from "@/__generated__/api";
import { userLogout } from "@/app/auth/api/logout.api";
import { User } from "@/app/auth/types/User";
import { FinansAxiosApi } from "@/services/FinansAxiosApi";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useRef } from "react";
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
  const isInitialized = useRef(false);
  const router = useRouter();

  useEffect(() => {
    // Previne execução duplicada do StrictMode

    console.log("isInitialized.current", isInitialized.current);
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeSession = async () => {
      try {
        const cookies = new Cookies();
        const token = cookies.get("refreshToken");

        if (!token) {
          setIsSessionLoading(false);
          return;
        }

        const response = await postAuthRefreshToken({ refreshToken: token });

        FinansAxiosApi.setTokenJwt(response.token);
        setUser(
          new User(
            response.userResponse.username,
            response.userResponse.accounts
          )
        );
        setAccountId(response.userResponse.accounts[0]?.id);
      } catch (error) {
        console.error("Erro ao renovar sessão:", error);
        // Limpa cookies inválidos
        const cookies = new Cookies();
        cookies.remove("refreshToken", { path: "/" });
        setUser(undefined);
        setAccountId(undefined);
      } finally {
        setIsSessionLoading(false);
      }
    };

    initializeSession();
  }, []);

  async function disconnectUser() {
    try {
      await userLogout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      // Limpa estado primeiro
      setUser(undefined);
      setAccountId(undefined);

      // Limpa cookies
      const cookies = new Cookies();
      cookies.remove("refreshToken", { path: "/" });

      // Redireciona usando router
      router.push("/auth");
    }
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
