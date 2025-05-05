import { GenericWebSocketEventResponse } from "../GenericWebSocketEventResponse";

export enum PlayerEventType {
  NEW_QUESTION = "new_question",
}

export type PlayerWebSocketEventResponse =
  GenericWebSocketEventResponse<PlayerEventType>;
