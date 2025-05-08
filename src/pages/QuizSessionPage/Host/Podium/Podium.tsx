import React, { useMemo, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { motion, useAnimate } from "framer-motion";
import { PlayerScoreResponse } from "@models/Response/PlayerScoreResponse";
import { CARD_BACKGROUND_PURPLE } from "@assets/styles/constants";

interface PodiumProps {
  newPoints: PlayerScoreResponse[];
}

interface PodiumStep {
  player: PlayerScoreResponse;
  index: number;
  left: string;
  height: number;
  color: string;
  position: number;
  podiumClass: string;
  infoClass: string;
}

const Podium: React.FC<PodiumProps> = ({ newPoints }) => {
  const topPlayers = useMemo(() => {
    const sorted = [...newPoints].sort((a, b) => b.score - a.score);
    return sorted.slice(0, 3);
  }, [newPoints]);

  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate([
      [
        ".podium-3",
        { height: 150, opacity: 1 },
        { type: "spring", stiffness: 200, damping: 20, delay: 0.8 },
      ],
      [
        ".info-3",
        { y: 0, opacity: 1, scale: 1 },
        { type: "spring", stiffness: 300, damping: 20, at: "<", delay: 0.5 },
      ],
      [
        ".podium-2",
        { height: 200, opacity: 1 },
        { type: "spring", stiffness: 200, damping: 20, delay: 0.2 },
      ],
      [
        ".info-2",
        { y: 0, opacity: 1, scale: 1 },
        { type: "spring", stiffness: 300, damping: 20, at: "<" },
      ],
      [
        ".podium-1",
        { height: 250, opacity: 1 },
        { type: "spring", stiffness: 300, damping: 20, delay: 0.3 },
      ],
      [
        ".info-1",
        { y: 0, opacity: 1, scale: 1 },
        { type: "spring", stiffness: 300, damping: 20, at: "<" },
      ],
    ]);
  }, [animate]);

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  };

  const podiumSteps = useMemo(() => {
    const positions = [
      {
        index: 1,
        position: 2,
        left: "25%",
        height: 200,
        color: "#c0c0c0",
        podiumClass: "podium-2",
        infoClass: "info-2",
      },
      {
        index: 0,
        position: 1,
        left: "50%",
        height: 250,
        color: "#ffd700",
        podiumClass: "podium-1",
        infoClass: "info-1",
      },
      {
        index: 2,
        position: 3,
        left: "75%",
        height: 150,
        color: "#cd7f32",
        podiumClass: "podium-3",
        infoClass: "info-3",
      },
    ];

    const steps: PodiumStep[] = [];

    for (const pos of positions) {
      if (pos.index < topPlayers.length) {
        steps.push({
          ...pos,
          player: topPlayers[pos.index],
        });
      }
    }

    return steps;
  }, [topPlayers]);

  return (
    <Box
      ref={scope}
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        height: 500,
        position: "relative",
      }}
    >
      {/* Podium platform */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: 50,
          backgroundColor: "#35261a",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 -4px 8px rgba(0,0,0,0.2)",
          zIndex: 2,
        }}
      />

      {/* Podium steps */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {podiumSteps.map(
          ({ player, position, left, color, podiumClass, infoClass }) => (
            <Box
              key={player.id}
              sx={{
                position: "absolute",
                bottom: 50,
                left,
                transform: "translateX(-50%)",
                width: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 6 - position,
              }}
            >
              {/* Player info */}
              <motion.div
                className={infoClass}
                initial={{ y: -50, opacity: 0, scale: 0.5 }}
                style={{
                  marginBottom: 12,
                  width: "100%",
                }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    backgroundColor: CARD_BACKGROUND_PURPLE,
                    borderRadius: "16px",
                    p: 3,
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    minWidth: 140,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -25,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 36,
                    }}
                  >
                    {getMedalEmoji(position - 1)}
                  </div>

                  <Typography variant="h5" noWrap sx={{ maxWidth: 140 }}>
                    {player.nickname}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                    {player.score} pts
                  </Typography>
                </Paper>
              </motion.div>

              {/* Podium step */}
              <motion.div
                className={podiumClass}
                initial={{ height: 0, opacity: 0 }}
                style={{
                  width: "100%",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: color,
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "15px",
                      background: "rgba(255,255,255,0.3)",
                    },
                  }}
                />
              </motion.div>
            </Box>
          ),
        )}
      </Box>
    </Box>
  );
};

export default Podium;
