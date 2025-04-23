import { GenericWebSocketEventResponse } from "../GenericWebSocketEventResponse";

export enum AllEventTypes {
  HOST_DISCONNECTED = "host_disconnected",
}

export type AllWebSocketEventResponse =
  GenericWebSocketEventResponse<"host_disconnected">;
