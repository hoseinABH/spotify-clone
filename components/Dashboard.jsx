import SpotifyWebApi from 'spotify-web-api-node';

// components
import Body from './Body';
import Right from './Right';
import Sidebar from './Sidebar';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
  return (
    <main>
      <Sidebar />
      <Body spotifyApi={spotifyApi} />
      <Right />
    </main>
  );
};

export default Dashboard;
