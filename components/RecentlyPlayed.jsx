import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

const RecentlyPlayed = ({ track, selectTrack }) => {
  const { title, artist, uri, albumUrl } = track;
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    selectTrack(track);

    if (uri === playingTrack.uri) {
      setPlay(!play);
    }
  };

  return (
    <div className="flex items-center space-x-3" onClick={handlePlay}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={albumUrl}
        alt={title}
        className="rounded-full w-[52px] h-[52px]"
      />
      <div>
        <h4 className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px]">
          {title}
        </h4>
        <p className="text-xs text-[#686868] font-semibold cursor-pointer hover:underline">
          {artist}
        </p>
      </div>
    </div>
  );
};

export default RecentlyPlayed;
