import { RiotError } from "@/types";
import { LolSpace } from "@/types/lol";
import { invoke } from "@tauri-apps/api";

export const lolServices = async <D, P = Record<string, unknown>>(config:LolSpace.ServiceParams<P>) => {
  const resStr = await invoke<string>("send_lol_req_cmd", {
    method: config.method,
    url: config.url,
    data: JSON.stringify(config.data)
  });
  try {
    return JSON.parse(resStr) as (D & RiotError)
  } catch (error) {
    console.log(error);
  }
}
