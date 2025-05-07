import { useState } from "react";
import song from "/background_song.mp3";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const MusicBar = () => {
  const { t } = useTranslation();
  const [audio] = useState(() => {
    const newAudio = new Audio(song);
    newAudio.loop = true;
    newAudio.volume = 0.5;
    return newAudio;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audio.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div>
      <Button onClick={handlePlay} disabled={isPlaying}>
        ▶ {t("MusicBar.play")}
      </Button>
      <Button onClick={handlePause} disabled={!isPlaying}>
        ⏸ {t("MusicBar.pause")}
      </Button>
      <Button onClick={toggleMute}>{isMuted ? "🔊" : "🔇"}</Button>
    </div>
  );
};

export default MusicBar;
