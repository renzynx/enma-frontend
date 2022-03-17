import { MenuProps } from 'lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Menu: FC<MenuProps> = ({ guilds }) => {
  const router = useRouter();

  if (!guilds)
    return (
      <div className="my-20 text-2xl text-center">
        You don&apos;t have any guild available, you can try to create one and
        come back here.
        <p>Or if you think this is a mistake please logout and login again.</p>
      </div>
    );

  return (
    <div className="place-items-center gap-10 mx-10 my-20 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
      {guilds.map(({ id, name, icon, exclude }, index) => (
        <div
          key={index}
          className="bg-base-300 shadow-lg card card-bordered card-compact"
        >
          <figure>
            <Image
              src={
                icon
                  ? `https://cdn.discordapp.com/icons/${id}/${icon}.webp`
                  : 'https://cdn.discordapp.com/embed/avatars/0.png'
              }
              alt={`${name}'s icon`}
              width="350px"
              height="225px"
            />
          </figure>
          <div className="card-body">
            <p className="card-title">{name}</p>
            <div className="card-actions justify-end">
              {exclude ? (
                <Link
                  href={`https://discord.com/api/oauth2/authorize?client_id=772690931539247104&permissions=137475968320&redirect_uri=https%3A%2F%2Fbackend.renzynx.space%2Flogin%2Fcallback&response_type=code&scope=bot%20identify%20guilds&guild_id=${id}`}
                  passHref
                >
                  <button className="btn btn-error">Invite Enma</button>
                </Link>
              ) : (
                <>
                  <button className="btn btn-accent">Settings</button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => router.push(`/dashboard/${id}/music`)}
                  >
                    Music
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
