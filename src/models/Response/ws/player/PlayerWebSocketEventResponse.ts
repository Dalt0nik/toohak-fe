import { GenericWebSocketEventResponse } from "../GenericWebSocketEventResponse";

export enum PlayerEventType {
  TEMP_PLACEHOLDER = "",
}

export type PlayerWebSocketEventResponse =
  GenericWebSocketEventResponse<PlayerEventType>;
