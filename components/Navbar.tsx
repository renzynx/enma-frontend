import { useLogOutMutation, useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { getDataFromTree } from '@apollo/client/react/ssr';
import withApollo from 'lib/withApollo';
import Image from 'next/image';
import Link from 'next/link';
import useTheme from 'lib/hooks/useTheme';
import { themes } from 'lib/constants';

const Navbar = () => {
  const router = useRouter();
  const { data, loading, error } = useMeQuery();
  const [mutationLogOut] = useLogOutMutation();
  const { setTheme } = useTheme();

  let body;
  if (loading)
    body = (
      <Image
        className="rounded-full"
        src="https://cdn.discordapp.com/embed/avatars/0.png"
        alt="loading"
        width="35px"
        height="35px"
      />
    );
  if (error)
    body = (
      <button
        onClick={() => (window.location.href = process.env.NEXT_PUBLIC_LOGIN!)}
        className="btn btn-primary"
      >
        Login
      </button>
    );
  if (data)
    body = (
      <div className="">
        <div className="dropdown dropdown-end">
          <Image
            tabIndex={0}
            className="btn btn-circle btn-ghost btn-lg"
            alt={`${data.me.username}'s avatar`}
            src={
              data.me.avatar
                ? `https://cdn.discordapp.com/avatars/${data.me.uid}/${data.me.avatar}.webp`
                : 'https://cdn.discordapp.com/embed/avatars/0.png'
            }
            width="38px"
            height="38px"
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact p-2 bg-base-300 shadow rounded-box w-52"
          >
            <li>
              <Link href="/dashboard">My Servers</Link>
            </li>
            <li className="lg:hidden">
              <Link href="/commands">Commands</Link>
            </li>
            <li className="lg:hidden">
              <Link href="/invite">Invite Enma</Link>
            </li>
            <li>
              <p
                className="hover:text-red-400"
                onClick={async () => {
                  await mutationLogOut();
                  window.location.href = '/';
                  router.reload();
                }}
              >
                Sign out
              </p>
            </li>
          </ul>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full sticky top-0 z-50">
        <nav className="navbar mx-auto lg:max-w-[80%] md:max-w-[85%] sm:max-w-[95%] max-w-[95%]">
          <div className="flex-1">
            <Link href="/" passHref>
              <p className="font-semibold text-2xl cursor-pointer">Enma</p>
            </Link>
          </div>
          <div className="flex-1">
            <ul className="lg:flex gap-5  md:hidden sm:hidden hidden">
              <Link href="/commands" passHref>
                <li className="link link-hover link-primary">Commands</li>
              </Link>
              <Link href="/invite" passHref>
                <li className="link link-hover link-primary">Invite Enma</li>
              </Link>
            </ul>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end mr-5">
              <div
                className="btn btn-md gap-2 normal-case btn-ghost"
                tabIndex={0}
              >
                <SelectThemeSVG />
                <span className="hidden md:inline">Change Theme</span>
                <ArrowDownSVG />
              </div>
              <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px h-96 w-52 overflow-y-auto shadow-2xl mt-16">
                <ul className="menu menu-compact p-4" tabIndex={0}>
                  {themes.map((item, index) => (
                    <li key={index}>
                      <button onClick={() => setTheme(item)}>{item}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {body}
          </div>
        </nav>
      </div>
    </>
  );
};

const SelectThemeSVG = () => (
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    ></path>
  </svg>
);

const ArrowDownSVG = () => (
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1792 1792"
    className="ml-1 inline-block h-4 w-4 fill-current"
  >
    <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"></path>
  </svg>
);

export default Navbar;
