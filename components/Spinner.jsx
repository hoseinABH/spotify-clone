import Image from 'next/image';

const Spinner = () => {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
          <Image
            src="/spotify-logo.jpg"
            layout="fill"
            objectFit="contain"
            className="animate-pulse"
            alt="Loading..."
          />
        </span>
        {/* <ThreeBounce size={23} color="#15883e" /> */}
      </div>
    </div>
  );
};

export default Spinner;
