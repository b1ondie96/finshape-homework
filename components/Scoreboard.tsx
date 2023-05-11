"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import { gql, useQuery } from "@apollo/client";
import { AllScores } from "@/types";
import { GET_SCORES } from "@/utils/Apollo";

export default function Scoreboard() {
  const { loading, error, data } = useQuery<AllScores>(GET_SCORES);
  if (loading) return <p>Loading...</p>;
  if (error) return <Alert severity="error">Error 😢</Alert>;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="scoreboard">
        <TableBody>
          {data?.allScores.map((score, index) => {
            return (
              <TableRow key={score.id}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell>{score.player.name}</TableCell>
                <TableCell>{score.score}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
