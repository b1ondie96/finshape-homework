"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/utils/Apollo";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "@/utils/useAuth";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "2048",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CookiesProvider>
        <ApolloProvider client={apolloClient()}>
          <AuthProvider>
            <body className={inter.className}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Link href="/">
                  <Typography variant="h1">2048</Typography>
                </Link>
              </Box>
              {children}
            </body>
          </AuthProvider>
        </ApolloProvider>
      </CookiesProvider>
    </html>
  );
}
