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
import LoginResponseDto from "./types/LoginResponseDto";
import { redirect } from "next/navigation";
import ApiResponse from "@/services/ApiResponse";
import { User } from "./types/User";
import { AppContext } from "@/contexts/AppContext";

export default function AuthPage() {
  const { user, setUser } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) redirect("/platform");
  }, [user]);

  function signIn() {
    if (userName === "" || password === "") {
      console.log("Usernmane or Password cannot be empty");
      return;
    }

    login(userName, password).then((loginResponse) =>
      handleLoginResponse(loginResponse)
    );
  }

  function handleLoginResponse(
    loginResponse: ApiResponse<LoginResponseDto | undefined>
  ) {
    if (loginResponse.Status !== 200) {
      console.log("Error");
      return;
    }
    setUser(new User(userName));
    setAccessToken(loginResponse.Data?.token!);
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
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password"> Password: </Label>
              <Input
                id="password"
                placeholder="your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="mt-6 w-full" onClick={() => signIn()}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
