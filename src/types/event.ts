import { EventCallback } from "@tauri-apps/api/event";

export namespace GTEvent {
  export interface LolEventPayload<T = any> {
    uri: string;
    eventType: "CREATE"|"DELETE"|"UPDATE";
    data: T;
  }
  export type LolEventCallback<T> = EventCallback<LolEventPayload<T>>
}