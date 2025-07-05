import AppProvider from "@/contexts/AppContext";
import React from "react";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <AppProvider>{children}</AppProvider>
    </React.StrictMode>
  );
}
