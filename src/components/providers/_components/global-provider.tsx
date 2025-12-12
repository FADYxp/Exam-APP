"use client";

import { createContext, useState } from "react";

type GlobalContextType = {
  duration: number;
  setDuration: (duration: number) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  duration: 0,
  setDuration: () => {},
});

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [duration, setDuration] = useState(0);
  const value = {
    duration,
    setDuration,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
