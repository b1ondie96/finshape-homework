"use client";

import React from "react";
//import Game from "./Game";
import { useQuery } from "@apollo/client";
import { NewGameResponse } from "@/types";
import { NEW_GAME } from "@/utils/Apollo";
import useLocalStorage from "@/utils/useLocalStorage";
import dynamic from "next/dynamic";
const Game = dynamic(() => import("./Game"), { ssr: false });
const Page = () => {
  const [token] = useLocalStorage("token", null);
  const { loading, error, data } = useQuery<NewGameResponse>(NEW_GAME, {
    context: { headers: { authorization: `Bearer ${token}` } },
  });

  return <>{data && <Game initialState={data.newGame} />}</>;
};

export default Page;
