import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '../atoms/playerAtom';

// components
import Body from './Body';
import Right from './Right';
import Sidebar from './Sidebar';
import Player from './Player';

// nextAuth
import { useSession } from 'next-auth/react';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);
  const { data: session } = useSession();
  const { accessToken } = session;

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const selectTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body spotifyApi={spotifyApi} selectTrack={selectTrack} />
      <Right spotifyApi={spotifyApi} selectTrack={selectTrack} />

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
