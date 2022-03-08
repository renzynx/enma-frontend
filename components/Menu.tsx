import { GuildsQuery } from "generated/graphql";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

const Menu: FC<GuildsQuery> = ({ guilds }) => {
  const router = useRouter();

  if (!guilds?.included && !guilds?.excluded)
    return (
      <div className="my-20 text-2xl text-center">
        You don&quot;t have any guild available, you can try to create one and
        come back here.
      </div>
    );

  return (
    <div className="gap-5 mt-10 flex flex-col mx-10 my-20">
      {guilds &&
        guilds.included.map(({ id, name, icon }, index) => (
          <div
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
            <Link
              href={`https://discord.com/api/oauth2/authorize?client_id=772690931539247104&permissions=137475968320&redirect_uri=https%3A%2F%2Fbackend.renzynx.space%2Flogin%2Fcallback&response_type=code&scope=bot%20identify%20guilds&guild_id=${id}`}
              passHref
            >
              <button className="btn btn-error">Invite Enma</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Menu;
