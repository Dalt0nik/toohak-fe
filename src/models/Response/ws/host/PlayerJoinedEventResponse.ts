import { HostWebSocketEventMessage } from "./HostWebSocketEventResponse";

export interface PlayerJoinedEventMessage extends HostWebSocketEventMessage {
  player: string;
}
