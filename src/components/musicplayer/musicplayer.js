import { useEffect, useRef, useState } from "react";
import {
  PauseSvg,
  PlayerNextSvg,
  PlayerPrevSvg,
  PlaySvg,
  ReleasesSvg,
} from "../../assets/svg";
import { formatPlayerTime, get_src_uri } from "../../api/utils";
import AudioPlayer from "react-h5-audio-player";
import playerStore from "../../zstore/playerStore";

const PlayerControls = ({ playerRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (playerRef.current) {
      const audioElement = playerRef.current.audio.current;
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  };

  useEffect(() => {
    const audioEle = playerRef.current?.audio?.current;
    if (audioEle) {
      const handlePlayPauseEvent = () => setIsPlaying(!audioEle.paused);
      audioEle.addEventListener("play", handlePlayPauseEvent);
      audioEle.addEventListener("pause", handlePlayPauseEvent);
      return () => {
        audioEle.removeEventListener("play", handlePlayPauseEvent);
        audioEle.removeEventListener("pause", handlePlayPauseEvent);
      };
    }
  }, [playerRef]);

  return (
    <div className="mt-[10px] flex justify-center items-center w-full gap-[10px]">
      <PlayerPrevSvg className="w-6 h-6 fill-white" />
      <span onClick={handlePlayPause}>
        {isPlaying ? (
          <PauseSvg className="w-6 h-6 fill-white" />
        ) : (
          <PlaySvg className="w-6 h-6 fill-white" />
        )}
      </span>
      <PlayerNextSvg className="w-6 h-6 fill-white" />
    </div>
  );
};

const Duration = ({ playerRef }) => {
  const [remainingTime, setRemainingTime] = useState("-00:00");

  useEffect(() => {
    const audioEle = playerRef.current?.audio?.current;
    if (audioEle) {
      const handleTimeUpdate = () => {
        const remaining = audioEle.duration - audioEle.currentTime;
        setRemainingTime(formatPlayerTime(remaining || 0));
      };

      audioEle.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audioEle.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [playerRef]);

  return (
    <span className="text-sm ml-[10px] w-[45px] flex-shrink-0">
      {remainingTime}
    </span>
  );
};

const MusicPlayer = () => {
  const song = playerStore((state) => state.song);

  const musicPlayerContainerRef = useRef(null);
  const playerRef = useRef(null);

  const toggle = () => {
    if (musicPlayerContainerRef.current) {
      const bottom = musicPlayerContainerRef.current.style.bottom;
      musicPlayerContainerRef.current.style.bottom =
        bottom === "0px" ? "-260px" : "0px";
    }
  };

  if (song === null) return;

  return (
    <div
      ref={musicPlayerContainerRef}
      className="sticky p-5 border border-[#222227] bg-[#16151a] h-[260px] m2lg:w-screen m2lg:z-20 m2lg:fixed m2lg:left-0 m2lg:bottom-[-260px]"
    >
      <button
        onClick={toggle}
        className="hidden m2lg:flex fixed -translate-x-1/2 left-1/2 rounded-t-xl bg-[#16151a] h-[40px] w-[90px] bottom-0 items-center justify-center text-sm border border-[#222227]"
      >
        <ReleasesSvg className="w-[18px] h-[18px] fill-[#25a56a] mr-2" /> Player
      </button>
      <div className="w-full flex justify-center">
        <img
          className="w-[90px] h-[90px] rounded-xl"
          src={get_src_uri(song.album.thumbnail300x300)}
          alt="thumbnail"
        />
      </div>
      <div className="w-full flex justify-center mt-[10px]">
        <div className="max-w-64 truncate text-center">
          <span className="text-white font-medium">{song.original_name}</span>
          <span> - {song.album.title}</span>
        </div>
      </div>
      <PlayerControls playerRef={playerRef} />

      <div className="flex justify-center items-center mt-[10px]">
        <AudioPlayer
          ref={playerRef}
          autoPlay
          crossOrigin="*"
          src={get_src_uri(song.url)}
          showJumpControls={false}
          showSkipControls={false}
          customVolumeControls={[]}
          customAdditionalControls={[]}
          customControlsSection={["SEEK_BAR"]}
        />
        <Duration playerRef={playerRef} />
      </div>
    </div>
  );
};

export default MusicPlayer;
