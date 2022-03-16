import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center">
      <div className="mx-5 flex flex-col items-center gap-y-5">
        <Image
          className="rounded-full"
          src="https://cdn.discordapp.com/avatars/772690931539247104/5f0aa26a8e2b83c3d218989b3063615e.webp"
          alt="Enma Picture"
          width="128px"
          height="128px"
        />
        <h1 className="text-center text-xl">
          Enma is a music bot designed to be user friendly, simple to use.
        </h1>
        <h2>The music bot fit for every server needs.</h2>
        <Link href="/invite" passHref>
          <button className="btn btn-secondary">Add to Server</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
