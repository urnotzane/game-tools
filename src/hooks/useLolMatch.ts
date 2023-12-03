import { useLobbyStore, useSelectTimerStore } from "@/store/lol/common";
import { useChampSelectStore } from "@/store/lol/useChampSelectStore";
import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { invoke } from "@tauri-apps/api";
import { useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

export const useLolMatch = () => {
  const lobbyStore = useLobbyStore();
  const selectTimerStore = useSelectTimerStore();
  const selectStore = useChampSelectStore();
  
  const currentSummoner = ref<LolSpace.Summoner>();
  const clientUrl = ref("");
  const clientToken = ref("")
  
  const getCurrentSummoner = async () => {
    const res = await lolServices<LolSpace.Summoner>({
      method: LolSpace.Method.get,
      url: "/lol-summoner/v1/current-summoner"
    });
    if (res?.httpStatus) {
      currentSummoner.value = undefined;
      return;
    };
    currentSummoner.value = res;
  }
  const getRemoteData = async () => {
    const res = await invoke<LolSpace.RemoteData>('get_token');
    clientUrl.value = `https://127.0.0.1:${res.port}`;
    clientToken.value = res.remote_token;
  }

  const checkClient = async () => {
    await getRemoteData();
    if (!clientToken.value) {
      throw new Error('未找到客户端');
    }
    await getCurrentSummoner();
  }

  const checkLobby = async () => {
    await lobbyStore.getLobbySession();
  }

  const checkMatchStatus = async () => {
    await selectTimerStore.getSelectTimer();
  }

  const checkSelect = async () => {
    if (selectTimerStore?.selectStage !== 'BAN_PICK') return;
    await selectStore?.getChampSelectSession();
  }

  const lolLifeTimer = useIntervalFn(async() => {
    lolLifeTimer.pause();
    try {
      console.time('checkClient');
      await checkClient();
      console.timeEnd('checkClient');
      console.time('checkMatchStatus');
      await checkMatchStatus();
      console.timeEnd('checkMatchStatus');
      await checkSelect();
      console.time('checkLobby');
      await checkLobby();
      console.timeEnd('checkLobby');
    } catch (error) {
      console.log(error);
    }
    lolLifeTimer.resume();
  }, 500, {
    immediate: true,
  });

  return {
    currentSummoner,
    clientUrl,
    clientToken,
  }
}