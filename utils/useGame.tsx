import { GameState, NewGameResponse } from "@/types";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { PROCESS_GAME, CREATE_SCORE, NEW_GAME } from "./Apollo";
import useLocalStorage from "./useLocalStorage";
type UseGame = [
  GameState | undefined,
  (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<NewGameResponse>>
];
const useGame = (): UseGame => {
  const [token] = useLocalStorage("token", null);
  const context = { headers: { authorization: `Bearer ${token}` } };
  const [gameState, setGameState] = useState<GameState>();
  const { data, refetch } = useQuery<NewGameResponse>(NEW_GAME, {
    context: { headers: { authorization: `Bearer ${token}` } },
  });
  useEffect(() => {
    if (data) {
      setGameState(data.newGame);
    }
  }, [data]);
  const [processGame, { loading }] = useMutation(PROCESS_GAME, {
    context: context,
  });
  const [createScore] = useMutation(CREATE_SCORE, {
    context: context,
    variables: { score: gameState?.score || 0 },
  });
  const updateGame = useCallback(
    async (ev: KeyboardEvent) => {
      if (!gameState?.finished && !loading && ev.key.includes("Arrow")) {
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
    },
    [gameState]
  );
  useEffect(() => {
    if (gameState?.finished) {
      createScore();
    }
    if (typeof window !== "undefined" && !gameState?.finished) {
      window.addEventListener("keydown", updateGame);
    }
    return () => window.removeEventListener("keydown", updateGame);
  }, [processGame, gameState, createScore, updateGame]);

  return [gameState, refetch];
};

export default useGame;
