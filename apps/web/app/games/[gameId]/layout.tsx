"use client";

import { useParams } from "next/navigation";

import { GameProvider } from "@/contexts/GameContext";
import { SocketProvider } from "@/contexts/SocketContext";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();

  return (
    <SocketProvider>
      <GameProvider gameCode={params?.gameId as string | undefined}>
        {children}
      </GameProvider>
    </SocketProvider>
  );
}
