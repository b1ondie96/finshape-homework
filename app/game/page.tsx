"use client";

import React, { useEffect, useRef } from "react";
import useLocalStorage from "@/utils/useLocalStorage";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";

const Game = dynamic(() => import("./Game"), { ssr: false });
const Page = () => {
  const [token] = useLocalStorage("token", null);
  if (!token) {
    redirect("/");
  }

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={2}
      position={"relative"}
    >
      {<Game />}
    </Box>
  );
};

export default Page;
