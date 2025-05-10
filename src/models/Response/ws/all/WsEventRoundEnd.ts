import { WsEventGeneric } from "@models/Response/ws/WsEventGeneric.ts";
import { AllEventTypes } from "@models/Response/ws/all/WsEventAll.ts";
import { WsRoundEnd } from "@models/Response/ws/all/WsRoundEnd.ts";

export interface WsEventRoundEnd
  extends WsEventGeneric<AllEventTypes.ROUND_END> {
  roundEnd: WsRoundEnd;
}
