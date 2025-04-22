import { HostWebSocketEventMessage } from "./HostWebSocketEventResponse";

export interface PlayerDisconnectedEventResponse
  extends HostWebSocketEventMessage {
  player: string;
}
