import { useLobbyStore } from "@/store/lol/common";
import { useChampSelectStore } from "@/store/lol/useChampSelectStore";
import { LolSpace } from "@/types/lol";
import { invoke } from "@tauri-apps/api";
import { reactive, ref } from "vue";
import { EventCallback, UnlistenFn, listen } from '@tauri-apps/api/event';
import { defineStore } from "pinia";
import { lolServices } from "@/views/Lol/services/client";
import { GTEvent } from "@/types/event";

export const useLolInitStore = defineStore("lolInit", () => {
  const lobbyStore = useLobbyStore();
  const selectStore = useChampSelectStore();

  const currentSummoner = ref<LolSpace.Summoner>();
  const clientUrl = ref("");
  const clientToken = ref("")

  const eventUnListeners = ref<UnlistenFn[]>([]);

  const getCurrentSummoner = async() => {
    let res = await lolServices<LolSpace.Summoner>({
      method: LolSpace.Method.get,
      url: "lol-summoner/v1/current-summoner",
    });

    currentSummoner.value = res;
  }

  const lcuLoaded:EventCallback<LolSpace.EventLcuLoaded> = (event) => {
    clientToken.value = event.payload?.token;
    clientUrl.value = event.payload?.url;
  }
  // const _eventLoaded:GTEvent.LolEventCallback<LolSpace.Summoner> = (event) => {
  //   console.log(event.id, event.payload);
  // }
  const lobbyLoaded:GTEvent.LolEventCallback<LolSpace.LobbySession> = async(event) => {
    if (!event.payload?.data) return;
    lobbyStore.setLobbySession(event.payload?.data);
  }
  const champSelectLoaded:GTEvent.LolEventCallback<LolSpace.ChampSelectSession> = async(event) => {
    if (!event.payload?.data) return;
    selectStore.setChampSelectSession(event.payload?.data);
  }
  const initialize = async() => {
    await invoke("initialize_lol");
    eventUnListeners.value.push(await listen('lcu_loaded', lcuLoaded));
    await Promise.all([
      getCurrentSummoner(),
      lobbyStore.getLobbySession(),
      selectStore.getChampSelectSession(),
    ]);
    await Promise.all([
      eventUnListeners.value.push(await listen('/lol-lobby/v2/lobby', lobbyLoaded)),
      eventUnListeners.value.push(await listen('/lol-champ-select/v1/session', champSelectLoaded)),
    ]);
  }
  const unMountListeners = () => {
    for (const unListener of eventUnListeners.value) {
      unListener();
    }
  }

  return {
    currentSummoner,
    clientUrl: reactive(clientUrl),
    clientToken,
    unMountListeners,
    initialize,
  }
})