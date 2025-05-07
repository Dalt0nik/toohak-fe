import { useState } from "react";
import song from "/background_song.mp3";
import { Button } from "@mui/material";

const MusicBar = () => {
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
        ▶ Play
      </Button>
      <Button onClick={handlePause} disabled={!isPlaying}>
        ⏸ Pause
      </Button>
      <Button onClick={toggleMute}>{isMuted ? "🔊" : "🔇"}</Button>
    </div>
  );
};

export default MusicBar;
