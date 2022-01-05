import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

const Poster = ({ track, selectTrack }) => {
  const { albumUrl, uri, title, artist } = track;
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    selectTrack(track);

    if (uri === playingTrack.uri) {
      setPlay(!play);
    }
  };

  return (
    <div className="track-card" onClick={handlePlay}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={albumUrl}
        alt={title}
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />
      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {uri === playingTrack.uri && play ? (
            <BsFillPauseFill className="text-white text-xl" />
          ) : (
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[15px]">
          <h4 className="font-extrabold truncate w-44">{title}</h4>
          <h6>{artist}</h6>
        </div>
      </div>
    </div>
  );
};

export default Poster;
