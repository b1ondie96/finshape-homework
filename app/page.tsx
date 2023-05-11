"use client";

import Link from "next/link";
import Scoreboard from "../components/Scoreboard";
import { useAuth } from "@/utils/useAuth";
import Button from "@mui/material/Button";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useLocalStorage from "@/utils/useLocalStorage";

export default function Home() {
  const { user } = useAuth() || {};
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const [value, setValue] = useLocalStorage("token", null);
  const [username, setname] = useLocalStorage("username", null);
  console.log(value, username);
  console.log(user)
  return (
    <>
      {" "}
      <LoginModal
        open={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <Scoreboard />
      {user ? (
        <>
          Welcome back, {user?.username}
          <Link href="/game">
            <Button variant="contained">New Game</Button>
          </Link>
        </>
      ) : (
        <>
          <p>Login or register to play</p>
          <Button variant="contained" onClick={() => setIsLoginModalOpen(true)}>
            Log in
          </Button>
          <Link href="/register">
            <Button variant="contained" color="secondary">
              Register
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
