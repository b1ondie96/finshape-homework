import { GameState } from "@/types";
import useGame from "@/utils/useGame";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";
import React from "react";
import Score from "./Score";

const Game = () => {
  const [gameState, refetch] = useGame();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
    >
      {gameState?.finished && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2 } }}
          bgcolor={"rgba(0,0,0,0.5)"}
          width={"100%"}
          height={"100%"}
        >
          <Typography
            fontSize={"32px"}
            fontWeight={900}
            textTransform={"uppercase"}
          >
            Game over
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => refetch()}
          >
            New game
          </Button>
        </Box>
      )}

      <Score score={gameState?.score || 0} />
      <LayoutGroup>
        <AnimatePresence>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            {gameState?.state.map((row, rowIndex) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  gap={2}
                  key={rowIndex}
                >
                  {row.map((cell, cellIndex) => (
                    <Box
                      component={motion.div}
                      layout
                      initial={{
                        scale: cell > 0 ? 0.8 : 1,
                        originX: 0,
                        originY: 0,
                      }}
                      animate={{ scale: 1, originX: 1, originY: 1 }}
                      exit={{ scale: 0.8, originX: 0, originY: 0 }}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      fontSize={"25px"}
                      width={"75px"}
                      height={"75px"}
                      border={"2px solid white"}
                      bgcolor={cell > 0 ? `hsl(${cell ** 2},69%,69%)` : "black"}
                      p={2}
                      borderRadius={2}
                      key={`${rowIndex}/${cellIndex}/${cell}`}
                    >
                      {cell > 0 ? cell : ""}
                    </Box>
                  ))}
                </Box>
              );
            })}
          </Box>
        </AnimatePresence>
      </LayoutGroup>
    </Box>
  );
};

export default Game;
