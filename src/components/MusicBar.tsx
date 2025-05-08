import { useState } from "react";
import song from "/background_song.mp3";
import { Box, Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const MusicBar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
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
    <Box
      sx={{ display: "flex", gap: theme.spacing(1), justifyContent: "center" }}
    >
      <Button size="small" onClick={handlePlay} disabled={isPlaying}>
        <PlayArrowIcon /> {t("MusicBar.play")}
      </Button>
      <Button size="small" onClick={handlePause} disabled={!isPlaying}>
        <PauseIcon /> {t("MusicBar.pause")}
      </Button>
      <Button size="small" onClick={toggleMute}>
        {isMuted ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </Button>
    </Box>
  );
};

export default MusicBar;
