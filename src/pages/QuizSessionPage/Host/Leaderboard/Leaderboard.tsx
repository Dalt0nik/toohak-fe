import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { CARD_BACKGROUND_PURPLE } from "@assets/styles/constants";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { PlayerScoreResponse } from "@models/Response/PlayerScoreResponse";

interface LeaderboardProps {
  oldPoints: PlayerScoreResponse[];
  newPoints: PlayerScoreResponse[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ oldPoints, newPoints }) => {
  const sortedOldPoints = [...oldPoints].sort((a, b) => b.score - a.score);
  const sortedNewPoints = [...newPoints].sort((a, b) => b.score - a.score);

  const [displayState, setDisplayState] = useState<
    "initial" | "new" | "sorted"
  >("initial");
  const [displayPoints, setDisplayPoints] = useState(sortedOldPoints);

  const [scoreChanges, setScoreChanges] = useState<
    Record<
      string,
      {
        oldScore: number;
        newScore: number;
      }
    >
  >({});

  useEffect(() => {
    setDisplayState("initial");
    setDisplayPoints(sortedOldPoints);

    const changes: Record<string, { oldScore: number; newScore: number }> = {};

    const allPlayerIds = new Set([
      ...oldPoints.map((p) => p.playerId),
      ...newPoints.map((p) => p.playerId),
    ]);

    allPlayerIds.forEach((id) => {
      const oldPlayer = oldPoints.find((p) => p.playerId === id);
      const newPlayer = newPoints.find((p) => p.playerId === id);

      const oldScore = oldPlayer?.score ?? 0;
      const newScore = newPlayer?.score ?? 0;

      changes[id] = {
        oldScore,
        newScore,
      };
    });

    setScoreChanges(changes);

    const scoreUpdateTimeout = setTimeout(() => {
      setDisplayState("new");

      const reorderTimeout = setTimeout(() => {
        setDisplayPoints(sortedNewPoints);
        setDisplayState("sorted");
      }, 1000); // Delay before sorting

      return () => clearTimeout(reorderTimeout);
    }, 800); // Short delay before showing new scores

    return () => clearTimeout(scoreUpdateTimeout);
  }, [oldPoints, newPoints]);

  const getDisplayScore = (playerId: string) => {
    if (displayState === "initial") {
      return scoreChanges[playerId]?.oldScore ?? 0;
    } else {
      return scoreChanges[playerId]?.newScore ?? 0;
    }
  };

  const hasScoreChanged = (playerId: string) => {
    const change = scoreChanges[playerId];
    return change && change.oldScore !== change.newScore;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", px: 2 }}>
      <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
        Leaderboar
      </Typography>

      <LayoutGroup>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            position: "relative",
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayPoints.slice(0, 5).map((player, index) => (
              <motion.div
                key={player.playerId}
                layout
                layoutId={player.playerId}
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: {
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.6,
                  },
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: CARD_BACKGROUND_PURPLE,
                    borderRadius: "12px",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                    px: 4,
                    py: 2.5,
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {displayState === "sorted" && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "8px",
                        backgroundColor:
                          index === 0
                            ? "#ffd700"
                            : index === 1
                              ? "#c0c0c0"
                              : index === 2
                                ? "#cd7f32"
                                : "transparent",
                      }}
                    />
                  )}

                  <Typography variant="h6">{player.playerName}</Typography>

                  {hasScoreChanged(player.playerId) &&
                  displayState !== "initial" ? (
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.4, times: [0, 0.5, 1] },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          display: "block",
                          textAlign: "right",
                          minWidth: "40px",
                        }}
                      >
                        {getDisplayScore(player.playerId)}
                      </Typography>
                    </motion.div>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        display: "block",
                        textAlign: "right",
                        minWidth: "40px",
                      }}
                    >
                      {getDisplayScore(player.playerId)}
                    </Typography>
                  )}
                </Paper>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </LayoutGroup>
    </Box>
  );
};

export default Leaderboard;
