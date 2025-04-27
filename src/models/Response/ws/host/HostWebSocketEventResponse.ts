import { GenericWebSocketEventResponse } from "../GenericWebSocketEventResponse";

export enum HostEventTypes {
  PLAYER_JOINED = "player_joined",
  PLAYER_DISCONNECTED = "player_disconnected",
}

export type HostWebSocketEventMessage =
  GenericWebSocketEventResponse<HostEventTypes>;
