import { WsEventHostDisconnected } from "./WsEventHostDisconnected";
import { WsEventPlayerDisconnected } from "./WsEventPlayerDisconnected";
import { WsEventPlayerJoined } from "./WsEventPlayerJoined";

export enum AllEventTypes {
  PLAYER_JOINED = "player_joined",
  PLAYER_DISCONNECTED = "player_disconnected",
  HOST_DISCONNECTED = "host_disconnected",
}

export type WsEventAll =
  | WsEventPlayerJoined
  | WsEventPlayerDisconnected
  | WsEventHostDisconnected;
