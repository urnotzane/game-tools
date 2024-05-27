import { RiotError } from "@/types";
import { LolSpace } from "@/types/lol";
import { invoke } from "@tauri-apps/api";

export const lolServices = async <D, P = Record<string, unknown>>(config:LolSpace.ServiceParams<P>) => {
  try {
    const resData = await invoke<D>("send_lol_req_cmd", {
      method: config.method,
      url: config.url,
      data: config.data,
    });
    return resData as (D & RiotError)
  } catch (error) {
    console.log(error);
  }
}
