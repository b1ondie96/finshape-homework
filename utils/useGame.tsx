import {
  GameState,
  NewGameResponse,
  ProcessGame,
  IGameContext,
  UserScores,
} from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { PROCESS_GAME, CREATE_SCORE, NEW_GAME, USER_TOPSCORE } from "./Apollo";
import useLocalStorage from "./useLocalStorage";
import { useAuth } from "./useAuth";

const GameContext = createContext<IGameContext>({
  gameState: undefined,
  newGame: async () => {},
  updateGame: async () => {},
  hiscore: 0,
});

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth() || {};
  const [token] = useLocalStorage("token", null);
  const context = { headers: { authorization: `Bearer ${token}` } };
  const [gameState, setGameState] = useState<GameState | undefined>();
  const { data: newGameData, refetch } = useQuery<NewGameResponse>(NEW_GAME, {
    context: { headers: { authorization: `Bearer ${token}` } },
  });
  useEffect(() => {
    if (newGameData) {
      setGameState(newGameData.newGame);
    }
  }, [newGameData]);
  const [processGame, { loading }] = useMutation<ProcessGame>(PROCESS_GAME, {
    context: context,
  });
  const { data: hiscore, refetch: fetchHiscore } = useQuery<UserScores>(
    USER_TOPSCORE,
    {
      variables: { id: user?.userid },
    }
  );
  const [createScore] = useMutation(CREATE_SCORE, {
    context: context,
    variables: { score: gameState?.score || 0 },
  });
  const newGame = async () => {
    const { data } = await refetch();
    setGameState(data?.newGame);
  };
  const updateGame = useCallback(
    async (ev: KeyboardEvent) => {
      if (!gameState?.finished && !loading && ev.key.includes("Arrow")) {
        try {
          const { data: processedGameData } = await processGame({
            variables: {
              state: gameState?.state,
              score: gameState?.score,
              direction: ev.key.slice(5),
            },
          });
          if (processedGameData?.processGame.finished) {
            await createScore();
            if (
              gameState &&
              hiscore &&
              gameState?.score > hiscore?.allScores[0].score
            ) {
              await fetchHiscore();
            }
          }
          setGameState(processedGameData?.processGame);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [gameState, loading, processGame, createScore, fetchHiscore, hiscore]
  );

  return (
    <GameContext.Provider
      value={{
        gameState,
        newGame,
        updateGame,
        hiscore: hiscore?.allScores[0].score || 0,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
const useGame = () => useContext(GameContext);
export default useGame;
