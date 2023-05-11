"use client";

import Link from "next/link";
import Scoreboard from "../components/Scoreboard";
import { useAuth } from "@/utils/useAuth";
import Button from "@mui/material/Button";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";
import { Box } from "@mui/material";

export default function Home() {
  const { user, logout } = useAuth() || {};
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <>
      <LoginModal
        open={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={4}
      >
        <Scoreboard />
        {user ? (
          <>
            Welcome back, {user?.username}
            <Box display={"flex"} gap={2}>
              <Link href="/game">
                <Button variant="contained">New Game</Button>
              </Link>
              <Button onClick={logout}>Logout</Button>
            </Box>
          </>
        ) : (
          <>
            <p>Login or register to play</p>
            <Box display={"flex"} gap={2}>
              <Button
                variant="contained"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Log in
              </Button>
              <Link href="/register">
                <Button variant="contained" color="secondary">
                  Register
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
