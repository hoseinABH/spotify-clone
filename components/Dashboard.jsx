import SpotifyWebApi from 'spotify-web-api-node';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '../atoms/playerAtom';

// components
import Body from './Body';
import Right from './Right';
import Sidebar from './Sidebar';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const selectTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body spotifyApi={spotifyApi} selectTrack={selectTrack} />
      <Right spotifyApi={spotifyApi} selectTrack={selectTrack} />
    </main>
  );
};

export default Dashboard;
