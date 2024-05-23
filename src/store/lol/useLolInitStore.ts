import { useLobbyStore } from "@/store/lol/common";
import { useChampSelectStore } from "@/store/lol/useChampSelectStore";
import { LolSpace } from "@/types/lol";
import { invoke } from "@tauri-apps/api";
import { reactive, ref } from "vue";
import { EventCallback, UnlistenFn, listen } from '@tauri-apps/api/event';
import { defineStore } from "pinia";
import { lolServices } from "@/views/Lol/services/client";
import { GTEvent } from "@/types/event";
import { useGameMapStore } from "./useMapStore";
import { useQueueStore } from "./useQueueStore";

export const useLolInitStore = defineStore("lolInit", () => {
  const lobbyStore = useLobbyStore();
  const selectStore = useChampSelectStore();
  const mapStore = useGameMapStore();
  const queueStore = useQueueStore();

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
    clientToken.value = event.payload?.token || '';
    clientUrl.value = event.payload?.url || '';
  }
  const initLolData = () => {
    // 地图数据
    mapStore.getGameMap();
    // 游戏模式
    queueStore.getQueue();
    queueStore.getCustomQueues();

  }
  // const _eventLoaded:GTEvent.LolEventCallback<LolSpace.Summoner> = (event) => {
  //   console.log(event.id, event.payload);
  // }
  const lobbyLoaded:GTEvent.LolEventCallback<LolSpace.LobbySession> = async(event) => {
    if (!event.payload?.data) return;
    console.log('[lobbyLoaded]', event.payload?.data);
    
    lobbyStore.setLobbySession(event.payload?.data);
  }
  const champSelectLoaded:GTEvent.LolEventCallback<LolSpace.ChampSelectSession> = async(event) => {
    if (!event.payload?.data) return;
    selectStore.setChampSelectSession(event.payload?.data);
  }
  const initialize = async() => {
    await invoke("initialize_lol");
    // 订阅LCU已加载事件
    eventUnListeners.value.push(await listen('lcu_loaded', lcuLoaded));
    await Promise.all([
      getCurrentSummoner(),
      // 玩家现在所在游戏房间的数据
      lobbyStore.getLobbySession(),
      // 玩家当前房间的bp数据
      selectStore.getChampSelectSession(),
    ]);
    // 加载游戏其他数据
    initLolData();
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