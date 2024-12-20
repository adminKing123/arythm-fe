import { useEffect, useRef, useState } from "react";
import {
  HeartSvg,
  OpenPlaylistSvg,
  PauseSvg,
  PlayerNextSvg,
  PlayerPrevSvg,
  PlaySvg,
  ReleasesSvg,
  VolumeFullSvg,
  VolumeMuteSvg,
} from "../../assets/svg";
import { formatPlayerTime, get_src_uri } from "../../api/utils";
import AudioPlayer from "react-h5-audio-player";
import playerStore from "../../zstore/playerStore";
import styles from "./musicplayer.module.css";
import authConfigStore from "../../zstore/authConfigStore";

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
      <PlayerPrevSvg className="w-6 h-6 fill-white hover:fill-[#25a56a] transition-colors duration-300" />
      <span onClick={handlePlayPause}>
        {isPlaying ? (
          <PauseSvg className="w-6 h-6 fill-white hover:fill-[#25a56a] transition-colors duration-300" />
        ) : (
          <PlaySvg className="w-6 h-6 fill-white hover:fill-[#25a56a] transition-colors duration-300" />
        )}
      </span>
      <PlayerNextSvg className="w-6 h-6 fill-white hover:fill-[#25a56a] transition-colors duration-300" />
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

const VolumeControl = ({ playerRef }) => {
  const sliderRef = useRef(null);
  const prevVolume = useRef(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const sliderEl = sliderRef.current;

    if (sliderEl && playerRef?.current?.audio?.current) {
      const audioElement = playerRef.current.audio.current;
      const initialVolume = audioElement.volume * 100;
      setVolume(audioElement.volume);
      sliderEl.value = initialVolume;
      const progress = (initialVolume / sliderEl.max) * 100;
      sliderEl.style.background = `linear-gradient(to right, #25a56a ${progress}%, #363636 ${progress}%)`;

      const handleInput = (event) => {
        const tempSliderValue = event.target.value;
        const progress = (tempSliderValue / sliderEl.max) * 100;
        sliderEl.style.background = `linear-gradient(to right, #25a56a ${progress}%, #363636 ${progress}%)`;
        audioElement.volume = tempSliderValue / 100;
        setVolume(audioElement.volume);

        localStorage.setItem("volume", audioElement.volume);
      };
      sliderEl.addEventListener("input", handleInput);
      return () => {
        sliderEl.removeEventListener("input", handleInput);
      };
    }
  }, [playerRef]);

  const toggle = (value) => {
    const audioElement = playerRef?.current?.audio?.current;
    const sliderEl = sliderRef.current;
    if (audioElement && sliderEl) {
      const tempvolume = value
        ? prevVolume.current
          ? prevVolume.current
          : 0.25
        : 0;
      audioElement.volume = tempvolume;
      sliderEl.value = tempvolume * 100;
      const progress = ((tempvolume * 100) / sliderEl.max) * 100;
      sliderEl.style.background = `linear-gradient(to right, #25a56a ${progress}%, #363636 ${progress}%)`;
      prevVolume.current = volume;
      setVolume(tempvolume);
      localStorage.setItem("volume", audioElement.volume);
    }
  };

  return (
    <div className="flex items-center">
      {volume ? (
        <VolumeFullSvg
          onClick={() => toggle(0)}
          className="w-6 h-6 fill-white hover:fill-[#25a56a] transition-colors duration-300"
        />
      ) : (
        <VolumeMuteSvg
          onClick={() => toggle(1)}
          className="w-6 h-6 fill-white hover:fill-[#25a56a] transition-colors duration-300"
        />
      )}
      <input
        ref={sliderRef}
        type="range"
        className={`${styles.seek} w-[100px] 2lg:w-[70px]`}
        min={0}
        max={100}
      />
    </div>
  );
};

const LikeSongButton = () => {
  const user = authConfigStore((state) => state.user);
  const addingInHistory = playerStore((state) => state.addingInHistory);
  const isLiked = playerStore((state) => state.isLiked);
  const setLike = playerStore((state) => state.setLike);
  const addingInLiked = playerStore((state) => state.addingInLiked);

  const handleClick = () => {
    if (!addingInLiked) {
      setLike(!isLiked);
    }
  };

  if (user)
    return (
      <HeartSvg
        onClick={handleClick}
        className={`w-6 h-6 ${
          addingInHistory
            ? "fill-[#c0c0c0]"
            : isLiked
            ? "fill-red-600"
            : "fill-white"
        } hover:fill-[#25a56a] transition-colors duration-300`}
      />
    );
  return;
};

const ExtraOptions = ({ playerRef }) => {
  return (
    <div className="flex items-center gap-1">
      <LikeSongButton />
      <OpenPlaylistSvg
        className="w-6 h-6 fill-white hover:fill-[#25a56a] transition-colors duration-300"
        title="Open Playlist"
      />
    </div>
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
      className="border border-[#222227] bg-[#16151a] p-5 w-screen z-20 fixed left-0 bottom-[-260px] h-[290px] sm:h-[260px] 2lg:sticky 2lg:w-[280px]"
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
          volume={parseFloat(localStorage.getItem("volume")) || 1}
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
      <div className="mt-[10px] flex justify-between items-center">
        <VolumeControl playerRef={playerRef} />
        <ExtraOptions playerRef={playerRef} />
      </div>
    </div>
  );
};

export default MusicPlayer;
