import { RiotError } from "@/types";
import { invoke } from "@tauri-apps/api";

export const lolServices = async <D, P = Record<string, unknown>>(cmd:string, args?: P) => {
  const resStr = await invoke<string>(cmd, args as any);
  try {
    return JSON.parse(resStr) as (D & RiotError)
  } catch (error) {
    console.log(error);
  }
}