import { invoke } from "@tauri-apps/api";

export interface ServiceData<T = any> {
  code: number;
  data: T;
}
export const service = <T = any, D = Record<string, unknown>>(cmd: string, args?: D) => invoke<ServiceData<T>>(cmd, args as any);