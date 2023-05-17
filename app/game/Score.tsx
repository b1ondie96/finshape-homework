import useGame from "@/utils/useGame";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import React from "react";
import CountUp from "react-countup";
const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#a71bc5",
  borderRadius: 8,
  padding: "16px",
});
const Value = ({ score }: { score: number }) => {
  return (
    <CountUp
      start={0}
      end={score}
      decimals={0}
      preserveValue
      decimal="."
      duration={0.4}
    />
  );
};
const Score = () => {
  const { gameState, hiscore } = useGame();
  return (
    <Box display={"inline-flex"} gap={2}>
      <StyledBox>
        SCORE
        <Value score={gameState?.score || 0} />
      </StyledBox>
      <StyledBox>
        YOUR BEST
        <Value score={hiscore || 0} />
      </StyledBox>
    </Box>
  );
};

export default Score;
