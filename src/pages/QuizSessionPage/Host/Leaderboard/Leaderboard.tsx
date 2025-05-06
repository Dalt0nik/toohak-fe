import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { CARD_BACKGROUND_PURPLE } from "@assets/styles/constants";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { PlayerScoreResponse } from "@models/Response/PlayerScoreResponse";

interface LeaderboardProps {
  oldPoints: PlayerScoreResponse[];
  newPoints: PlayerScoreResponse[];
}

const enum AnimationStates {
  INITIAL,
  NEW,
  SORTED,
}

const Leaderboard: React.FC<LeaderboardProps> = ({ oldPoints, newPoints }) => {
  const sortedOldPoints = useMemo(
    () => [...oldPoints].sort((a, b) => b.score - a.score),
    [oldPoints],
  );

  const sortedNewPoints = useMemo(
    () => [...newPoints].sort((a, b) => b.score - a.score),
    [newPoints],
  );

  const [displayState, setDisplayState] = useState<AnimationStates>(
    AnimationStates.INITIAL,
  );
  const [displayPoints, setDisplayPoints] = useState(sortedOldPoints);

  const scoreChanges = useMemo(() => {
    const changes: Record<string, { oldScore: number; newScore: number }> = {};

    const allPlayerIds = new Set([
      ...oldPoints.map((p) => p.id),
      ...newPoints.map((p) => p.id),
    ]);

    allPlayerIds.forEach((id) => {
      const oldPlayer = oldPoints.find((p) => p.id === id);
      const newPlayer = newPoints.find((p) => p.id === id);

      const oldScore = oldPlayer?.score ?? 0;
      const newScore = newPlayer?.score ?? 0;

      changes[id] = {
        oldScore,
        newScore,
      };
    });

    return changes;
  }, [oldPoints, newPoints]);

  useEffect(() => {
    setDisplayState(AnimationStates.INITIAL);
    setDisplayPoints(sortedOldPoints);

    const scoreUpdateTimeout = setTimeout(() => {
      setDisplayState(AnimationStates.NEW);

      const reorderTimeout = setTimeout(() => {
        setDisplayPoints(sortedNewPoints);
        setDisplayState(AnimationStates.SORTED);
      }, 1000); // Delay before sorting

      return () => clearTimeout(reorderTimeout);
    }, 800); // Short delay before showing new scores

    return () => clearTimeout(scoreUpdateTimeout);
  }, [oldPoints, newPoints, sortedOldPoints, sortedNewPoints]);

  const getDisplayScore = (id: string) => {
    if (displayState === AnimationStates.INITIAL) {
      return scoreChanges[id]?.oldScore ?? 0;
    } else {
      return scoreChanges[id]?.newScore ?? 0;
    }
  };

  const hasScoreChanged = (id: string) => {
    const change = scoreChanges[id];
    return change && change.oldScore !== change.newScore;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", px: 2 }}>
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
                key={player.id}
                layout
                layoutId={player.id}
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
                  {displayState === AnimationStates.SORTED && (
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

                  <Typography variant="h6">{player.nickname}</Typography>

                  {hasScoreChanged(player.id) &&
                  displayState !== AnimationStates.INITIAL ? (
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
                        {getDisplayScore(player.id)}
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
                      {getDisplayScore(player.id)}
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
