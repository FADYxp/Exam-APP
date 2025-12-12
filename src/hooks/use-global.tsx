import { GlobalContext } from "@/components/providers/_components/global-provider";
import { useContext } from "react";

export function useGlobal() {
  return useContext(GlobalContext);
}
