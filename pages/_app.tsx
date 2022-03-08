import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PartialGuild } from "lib/types";
import { useState } from "react";
import { GuildContext } from "lib/context";

function MyApp({ Component, pageProps }: AppProps) {
  const [guild, setGuild] = useState<PartialGuild>();

  const updateGuild = (guild: PartialGuild) => setGuild(guild);

  return (
    <GuildContext.Provider value={{ guild, setGuild: updateGuild }}>
      <Component {...pageProps} />
    </GuildContext.Provider>
  );
}

export default MyApp;
