"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { login, setAccessToken } from "./useLogin";
import { useRouter } from "next/navigation";
import { User } from "./types/User";
import { AppContext } from "@/contexts/AppContext";
import { LoginResponse } from "@/__generated__/types";
import Cookies from "universal-cookie";

export default function AuthPage() {
  const { user, setUser, isSessionLoading } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Só redireciona se tiver usuário E não estiver carregando
    if (user && !isSessionLoading) {
      router.push("/platform");
    }
  }, [user, isSessionLoading, router]);

  async function signIn() {
    if (userName === "" || password === "") {
      setError("Username and password cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const loginResponse = await login(userName, password);
      handleLoginResponse(loginResponse);

      // Redireciona após login bem-sucedido
      router.push("/platform");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLoginResponse(loginResponse: LoginResponse) {
    // Salva o refresh token no cookie
    const cookies = new Cookies();
    cookies.set("refreshToken", loginResponse.refreshToken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
    });

    setUser(
      new User(
        loginResponse.userResponse.username,
        loginResponse.userResponse.accounts
      )
    );
    setAccessToken(loginResponse.token);
  }

  // Mostra loading se ainda estiver verificando sessão
  if (isSessionLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="h-screen flex w-full">
      <div className="bg-primary-foreground w-full h-full flex p-16"></div>
      <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tighter">
              Login
            </CardTitle>
            <CardDescription>
              Use your username and password to sign-in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text"
                id="username"
                placeholder="Ex. Spongebob"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                placeholder="your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && signIn()}
                disabled={isLoading}
              />
            </div>
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
            <Button
              className="mt-6 w-full"
              onClick={signIn}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Submit"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
