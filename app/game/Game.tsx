import { GameState } from "@/types";
import { CREATE_SCORE, PROCESS_GAME } from "@/utils/Apollo";
import useLocalStorage from "@/utils/useLocalStorage";
import { useMutation } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Game = ({ initialState }: { initialState: GameState }) => {
  const [token] = useLocalStorage("token", null);
  const [gameState, setGameState] = useState<GameState>(initialState);
  const context = { headers: { authorization: `Bearer ${token}` } };

  const [processGame] = useMutation(PROCESS_GAME, {
    context: context,
  });
  const [createScore] = useMutation(CREATE_SCORE, {
    context: context,
    variables: { score: gameState.score },
  });
  useEffect(() => {
    if (gameState.finished) {
      createScore();
    }
    const updateGame = async (ev: KeyboardEvent) => {
      if (!gameState.finished) {
        try {
          const { data } = await processGame({
            variables: {
              state: gameState.state,
              score: gameState.score,
              direction: ev.key.slice(5),
            },
          });
          setGameState(data.processGame);
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (typeof window !== "undefined" && !gameState.finished) {
      window.addEventListener("keydown", updateGame);
    }
    return () => window.removeEventListener("keydown", updateGame);
  }, [processGame, gameState, createScore]);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        {gameState?.state.map((row, index) => {
          return (
            <Box display={"flex"} flexDirection={"row"} gap={2} key={index}>
              {row.map((cell) => (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  fontSize={"25px"}
                  width={"75px"}
                  height={"75px"}
                  border={"2px solid white"}
                  p={2}
                  borderRadius={2}
                  key={crypto.randomUUID()}
                >
                  {cell > 0 ? cell : ""}
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
      <Typography>{gameState.score}</Typography>
    </>
  );
};

export default Game;
