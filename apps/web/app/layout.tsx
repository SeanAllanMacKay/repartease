"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";

import { UserProvider } from "@/contexts/UserContext";

import { Header } from "@/components/Header/Header";

const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string;
const AUTH0_CLIENT = process.env.NEXT_PUBLIC_AUTH0_CLIENT as string;
const AUTH0_SUCCESS_REDIRECT = process.env
  .NEXT_PUBLIC_AUTH0_SUCCESS_REDIRECT as string;

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("AUTH0", { AUTH0_DOMAIN, AUTH0_CLIENT });
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT}
        authorizationParams={{
          redirect_uri: AUTH0_SUCCESS_REDIRECT,
        }}
      >
        <UserProvider>
          <html lang="en">
            <body className={inter.className}>
              <Header />

              <main>
                <div>{children}</div>
              </main>
            </body>
          </html>
        </UserProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
}
