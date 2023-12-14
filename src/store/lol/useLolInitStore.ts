import { useLobbyStore, useSelectTimerStore } from "@/store/lol/common";
import { useChampSelectStore } from "@/store/lol/useChampSelectStore";
import { LolSpace } from "@/types/lol";
import { invoke } from "@tauri-apps/api";
import { reactive, ref } from "vue";
import { EventCallback, UnlistenFn, listen } from '@tauri-apps/api/event';
import { defineStore } from "pinia";

export const useLolInitStore = defineStore("lolInit", () => {
  const lobbyStore = useLobbyStore();
  const selectTimerStore = useSelectTimerStore();
  const selectStore = useChampSelectStore();

  const currentSummoner = ref<LolSpace.Summoner>();
  const clientUrl = ref("");
  const clientToken = ref("")

  const eventUnListeners = ref<UnlistenFn[]>([]);

  const lcuLoaded:EventCallback<LolSpace.EventLcuLoaded> = (event) => {
    clientToken.value = event.payload?.token;
    clientUrl.value = event.payload?.url;
  }
  const summonerLoaded:EventCallback<LolSpace.Summoner> = (event) => {
    console.log(event.id, event.payload);
  }
  const initialize = async() => {
    await invoke("initialize_lol");
    eventUnListeners.value.push(await listen('lcu_loaded', lcuLoaded));
    eventUnListeners.value.push(await listen('/lol-summoner/v1/current-summoner', summonerLoaded));
    eventUnListeners.value.push(await listen('/lol-lobby/v2/lobby', summonerLoaded));
    eventUnListeners.value.push(await listen('/lol-champ-select/v1/session', summonerLoaded));
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