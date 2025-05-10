import { WsPlayer } from "@models/Response/ws/all/WsPlayer.ts";
import { WsQuestionOption } from "@models/Response/ws/player/WsQuestion.ts";

export interface WsRoundEnd {
  players: WsPlayer[];
  correctOption: WsQuestionOption;
}
