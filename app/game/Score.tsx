import { GameState } from "@/types";
import { USER_TOPSCORE } from "@/utils/Apollo";
import { useAuth } from "@/utils/useAuth";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import CountUp from "react-countup";
const Score = ({ score }: { score: number }) => {
  const { user } = useAuth() || {};
  const { loading, data, refetch } = useQuery<any>(USER_TOPSCORE, {
    variables: { id: user?.userid },
  });

  return (
    <Box display={"inline-flex"} gap={2}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        bgcolor={"#a71bc5"}
        p={2}
        borderRadius={2}
      >
        SCORE
        <Typography>
          <CountUp
            start={0}
            end={score || 0}
            decimals={0}
            preserveValue
            decimal="."
            duration={0.4}
          />
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        bgcolor={"#a71bc5"}
        p={2}
        borderRadius={2}
        onClick={() => refetch()}
        sx={{ cursor: "pointer" }}
      >
        YOUR BEST
        {loading ? (
          "loading"
        ) : (
          <Typography>
            <CountUp
              start={0}
              end={data?.allScores[0]?.score || 0}
              decimals={0}
              preserveValue
              decimal="."
              duration={1}
            />
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Score;
