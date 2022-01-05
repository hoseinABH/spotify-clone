import Image from 'next/image';

// icons
import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
  MicrophoneIcon,
  FireIcon,
} from '@heroicons/react/solid';

const Sidebar = () => {
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black h-screen w-[90px] space-y-8">
      <Image
        src="/spotify.svg"
        width={45}
        height={45}
        objectFit="contain"
        alt="Spotify"
      />

      <div className="flex flex-col space-y-8">
        <HomeIcon className="sidebarIcon text-white opacity-[0.85]" />
        <FireIcon className="sidebarIcon" />
        <MicrophoneIcon className="sidebarIcon" />
        <ChartBarIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
        <DotsHorizontalIcon className="sidebarIcon" />
      </div>
    </section>
  );
};

export default Sidebar;
