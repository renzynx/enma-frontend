import { GuildsQuery } from "generated/graphql";
import { GuildContext } from "lib/context";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

const Menu: FC<GuildsQuery> = ({ guilds }) => {
  const { setGuild } = useContext(GuildContext);
  const router = useRouter();

  return (
    <div className="gap-5 mt-10 flex flex-col mx-10 my-20">
      {guilds &&
        guilds.included.map(({ id, name, icon }, index) => (
          <div
            onClick={() => setGuild({ id, name, icon })}
            key={index}
            className="shadow-lg outline-2 outline-offset-2 shadow-base-300 border-t-4 border-t-base-300 box-border flex flex-row items-center justify-between p-5  border-opacity-30 rounded-md"
          >
            <Image
              className="rounded-full"
              src={
                icon
                  ? `https://cdn.discordapp.com/icons/${id}/${icon}.webp`
                  : "https://cdn.discordapp.com/embed/avatars/0.png"
              }
              alt={`${name}'s icon`}
              width="80px"
              height="80px"
            />
            <p className="text-center text-lg font-semibold">{name}</p>
            <div className="gap-5 grid">
              <button className="btn btn-active">Settings</button>
              <button
                className="btn btn-primary"
                onClick={() => router.push(`/dashboard/${id}/music`)}
              >
                Music
              </button>
            </div>
          </div>
        ))}
      {guilds &&
        guilds.excluded.map(({ id, name, icon }, index) => (
          <div
            key={index}
            className="shadow-lg outline-2 outline-offset-2 shadow-base-300 border-t-4 border-t-base-300 box-border flex flex-row items-center justify-between p-5  border-opacity-30 rounded-md"
          >
            <Image
              className="rounded-full"
              src={
                icon
                  ? `https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=128`
                  : "https://cdn.discordapp.com/embed/avatars/0.png"
              }
              alt={`${name}'s icon`}
              width="80px"
              height="80px"
            />
            <p className="text-center text-lg font-semibold">{name}</p>
            <button className="btn btn-error">Invite</button>
          </div>
        ))}
    </div>
  );
};

export default Menu;
