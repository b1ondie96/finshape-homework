"use client";
import { GameContextProvider } from "@/utils/useGame";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameContextProvider>{children}</GameContextProvider>;
}
