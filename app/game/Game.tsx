import { NewGameResponse } from "@/types";
import { NEW_GAME } from "@/utils/Apollo";
import useLocalStorage from "@/utils/useLocalStorage";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

const Game = () => {
  const [token] = useLocalStorage("token", null);
  //const [gameState, setGameState] = useState<GameState>();
  const { loading, error, data } = useQuery<NewGameResponse>(NEW_GAME, {
    context: { headers: { authorization: `Bearer ${token}` } },
  });
  const [processGame, { loading:processLoading }] = useMutation(CREATE_USER);
  console.log(data);
  return (
    <>
      {data?.newGame.state.map((row) =>
        row.map((cell) => <div key={crypto.randomUUID()}>{cell}</div>)
      )}
    </>
  );
};

export default Game;
