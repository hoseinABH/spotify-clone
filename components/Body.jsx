import { useEffect, useState } from 'react';

// components
import Search from './Search';
import Poster from './Poster';
import Track from './Track';

// nextAuth
import { useSession } from 'next-auth/react';

const Body = ({ spotifyApi, selectTrack }) => {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // search results
  useEffect(() => {
    if (!accessToken) return;
    if (!search) {
      setResults([]);
    } else {
      spotifyApi.searchTracks(search).then((res) => {
        setResults(
          res.body.tracks.items.map((track) => {
            return {
              id: track.id,
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
              popularity: track.popularity,
            };
          })
        );
      });
    }
  }, [accessToken, search, spotifyApi]);

  // new Release
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken, spotifyApi]);

  return (
    <section className="ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />

      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {results.length === 0
          ? newReleases.slice(0, 4).map((track) => {
              return (
                <Poster
                  key={track.id}
                  track={track}
                  selectTrack={selectTrack}
                />
              );
            })
          : results.slice(0, 4).map((track) => {
              return (
                <Poster
                  key={track.id}
                  track={track}
                  selectTrack={selectTrack}
                />
              );
            })}
      </div>

      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* Genres */}
        <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
            All Genres
          </button>
        </div>

        {/* Tracks */}
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {results.length === 0 ? 'New Releases' : 'Tracks'}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {results.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      selectTrack={selectTrack}
                    />
                  ))
              : results
                  .slice(4, results.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      selectTrack={selectTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
