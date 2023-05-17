"use client";
import React from "react";
import useLocalStorage from "@/utils/useLocalStorage";
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import useGame from "@/utils/useGame";
import { Typography } from "@mui/material";
import Game from "./Game";

const Page = () => {
  const [token] = useLocalStorage("token", null);
  if (!token) {
    redirect("/");
  }
  const { gameState } = useGame();

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={2}
      position={"relative"}
    >
      {gameState ? (
        <Game />
      ) : (
        <Typography variant="h3">Loading game</Typography>
      )}
    </Box>
  );
};

export default Page;
