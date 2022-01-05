import { useEffect, useState } from 'react';
import Search from './Search';

// nextAuth
import { useSession } from 'next-auth/react';
import Poster from './Poster';

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
    </section>
  );
};

export default Body;
