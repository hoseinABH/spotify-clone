import Image from 'next/image';

const Sidebar = () => {
  const clickHandler = () => {
    console.log('read');
  };
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-red-500 h-screen w-[90px] space-y-8">
      <Image
        src="/spotify.svg"
        width={45}
        height={45}
        objectFit="contain"
        alt="Spotify"
      />

      <div></div>
    </section>
  );
};

export default Sidebar;
