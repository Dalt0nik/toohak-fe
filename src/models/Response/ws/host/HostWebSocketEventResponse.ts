import { GenericWebSocketEventResponse } from "../GenericWebSocketEventResponse";

export type HostWebSocketEventMessage = GenericWebSocketEventResponse<
  "player_joined" | "player_disconnected"
>;
