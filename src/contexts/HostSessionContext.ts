import { createContext, Dispatch } from "react";
import { HostSessionState, HostSessionAction } from "./HostSessionProvider";

export const HostSessionContext = createContext<
  [HostSessionState, Dispatch<HostSessionAction>] | null
>(null);
