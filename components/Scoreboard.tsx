"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import { useQuery } from "@apollo/client";
import { AllScores } from "@/types";
import { GET_SCORES } from "@/utils/Apollo";
import { TableHead, Typography } from "@mui/material";

export default function Scoreboard() {
  const { loading, error, data } = useQuery<AllScores>(GET_SCORES);
  const cellStyle = { color: "white" };
  if (loading) return <p>Loading scoreboard</p>;
  if (error) return <Alert severity="error">Error 😢</Alert>;
  return (
    <TableContainer
      sx={{
        maxWidth: "max-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography fontSize={24} textTransform={"uppercase"}>
        Leaderboard
      </Typography>

      <Table aria-label="scoreboard">
        <TableBody>
          {data?.allScores.map((score, index) => {
            return (
              <TableRow key={score.id}>
                <TableCell sx={cellStyle}>{index + 1}.</TableCell>
                <TableCell sx={cellStyle}>{score.player.name}</TableCell>
                <TableCell sx={cellStyle}>{score.score}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
