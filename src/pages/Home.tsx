import React from "react";
import { Typography, Box, Button } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute", // Positions the text absolutely
        top: "10rem", // Distance from the top
        left: "5rem", // Distance from the left
        textAlign: "left",
      }}
    >
      <Typography variant="h1">Untitled Kahoot game</Typography>
      <Typography variant="h3" gutterBottom>
        Test if your audience were listening...
      </Typography>
      <Button
        variant="outlined"
        sx={{
          marginTop: "1rem",
        }}
      >
        JOIN A GAME
      </Button>
    </Box>
  );
};

export default Home;
