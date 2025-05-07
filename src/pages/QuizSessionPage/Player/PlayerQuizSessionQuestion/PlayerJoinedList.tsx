import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface PlayerJoinedListProps {
  players: string[];
  isConnected: boolean;
  onDisconnect: () => void;
  onReconnect: () => void;
}

const PlayerJoinedList: React.FC<PlayerJoinedListProps> = ({
  players,
  isConnected,
  onDisconnect,
  onReconnect,
}) => (
  <Card
    elevation={3}
    sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Joined Players
      </Typography>
      <List>
        {players.length > 0 ? (
          players.map((nickname) => (
            <ListItem
              key={nickname}
              sx={{ mb: 1, borderRadius: 1, boxShadow: 1 }}
            >
              <ListItemText primary={nickname} />
            </ListItem>
          ))
        ) : (
          <Typography color="text.secondary">No one has joined yet</Typography>
        )}
      </List>
    </CardContent>

    <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
      {isConnected ? (
        <Button variant="outlined" color="error" onClick={onDisconnect}>
          Disconnect
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={onReconnect}>
          Reconnect
        </Button>
      )}
    </CardActions>
  </Card>
);

export default PlayerJoinedList;
