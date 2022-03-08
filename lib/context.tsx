import { createContext } from "react";
import { IGuildContext } from "./types";

export const GuildContext = createContext<IGuildContext>({
  setGuild: () => {},
});
