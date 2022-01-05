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
    <main>
      <Sidebar />
      <Body spotifyApi={spotifyApi} selectTrack={selectTrack} />
      <Right />
    </main>
  );
};

export default Dashboard;
