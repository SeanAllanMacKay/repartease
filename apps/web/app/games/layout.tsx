"use client";

import { useContext, useEffect } from "react";

import { useNavigate } from "@/hooks";

import { UserContext } from "@/contexts/UserContext";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate({ pathname: "/" });
    }
  }, [user, isLoading]);

  return children;
}
