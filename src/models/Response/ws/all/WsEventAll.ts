import { WsEventHostDisconnected } from "./WsEventHostDisconnected";
import { WsEventPlayerDisconnected } from "./WsEventPlayerDisconnected";
import { WsEventPlayerJoined } from "./WsEventPlayerJoined";
import { WsEventRoundEnd } from "./WsEventRoundEnd";

export enum AllEventTypes {
  PLAYER_JOINED = "player_joined",
  PLAYER_DISCONNECTED = "player_disconnected",
  HOST_DISCONNECTED = "host_disconnected",
  ROUND_END = "round_end",
}

export type WsEventAll =
  | WsEventPlayerJoined
  | WsEventPlayerDisconnected
  | WsEventHostDisconnected
  | WsEventRoundEnd;
