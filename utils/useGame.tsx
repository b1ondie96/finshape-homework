import { GameState, NewGameResponse } from "@/types";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { PROCESS_GAME, CREATE_SCORE, NEW_GAME } from "./Apollo";
import useLocalStorage from "./useLocalStorage";

const useGame = (): [
  GameState | undefined,
  (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<NewGameResponse>>
] => {
  const [token] = useLocalStorage("token", null);
  const [gameState, setGameState] = useState<GameState>();
  const context = { headers: { authorization: `Bearer ${token}` } };
  const { data, refetch } = useQuery<NewGameResponse>(NEW_GAME, {
    context: { headers: { authorization: `Bearer ${token}` } },
  });
  useEffect(() => {
    if (data) {
      setGameState(data.newGame);
    }
  }, [data]);
  const [processGame, { loading: processLoading }] = useMutation(PROCESS_GAME, {
    context: context,
  });
  const [createScore] = useMutation(CREATE_SCORE, {
    context: context,
    variables: { score: gameState?.score || 0 },
  });
  useEffect(() => {
    if (gameState?.finished) {
      createScore();
    }
    const updateGame = async (ev: KeyboardEvent) => {
      if (!gameState?.finished && !processLoading) {
        try {
          const { data } = await processGame({
            variables: {
              state: gameState?.state,
              score: gameState?.score,
              direction: ev.key.slice(5),
            },
          });
          setGameState(data.processGame);
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (typeof window !== "undefined" && !gameState?.finished) {
      window.addEventListener("keydown", updateGame);
    }
    return () => window.removeEventListener("keydown", updateGame);
  }, [processGame, gameState, createScore]);

  return [gameState, refetch];
};

export default useGame;
