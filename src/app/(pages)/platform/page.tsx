"use client";

import LayoutPlatform from "./layout";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";

export default function Plataform({ children }: { children: React.ReactNode }) {
  const { user, disconnectUser } = useContext(AppContext);

  return (
    user && <LayoutPlatform logout={disconnectUser}>{children}</LayoutPlatform>
  );
}
