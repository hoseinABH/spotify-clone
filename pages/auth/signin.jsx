import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// components
import Spinner from '../../components/Spinner';

// nextAuth
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

const Signin = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (session) return <Spinner />;

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <Head>
        <title>Login - Spotify</title>
        <meta name="description" content="Spotify - Music Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="/spotify-logo.jpg"
        width={400}
        height={200}
        objectFit="contain"
        alt="Welcome To Spotify"
        className="animate-pulse"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button className="spotify-btn" onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Signin;
