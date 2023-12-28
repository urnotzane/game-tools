import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { formatChampSplash } from "@/views/Lol/utils";
import { invoke } from "@tauri-apps/api";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const useLolChampsStore = defineStore("lolChamps", () => {
  const champs = ref<Record<string, LolSpace.Champion>>({});
  const lolVersion = ref<string>();
  const randomChampBg = ref();

  const getChamps = async () => {
    const res = await invoke<{
      data: Record<string, LolSpace.Champion>;
      version: string;
    }>("get_champs");
    const champsList = Object.values(res.data);
    champs.value = champsList.reduce((pre, cur) => {
      pre[cur.key] = cur;
      return pre
    }, {} as typeof champs.value);

    lolVersion.value = res.version;

    const random = Math.round(Math.random() * champsList.length);
    randomChampBg.value = formatChampSplash(champsList[random].id);

    return res;
  }

  onMounted(() => {
    getChamps();
  })
  return {
    champs,
    lolVersion,
    randomChampBg,
    getChamps,
  }
});

export const useLobbyStore = defineStore('lolLobby', () => {
  const gameConfig = ref<LolSpace.GameConfig>();

  const blueMembers = computed(() => gameConfig.value?.customTeam100);
  const redMembers = computed(() => gameConfig.value?.customTeam200);

  const getLobbySession = async () => {
    const res = await lolServices<LolSpace.LobbySession>({
      method: LolSpace.Method.get,
      url: "lol-lobby/v2/lobby"
    });

    if (res?.httpStatus) {
      gameConfig.value = undefined
    } else {
      gameConfig.value = res?.gameConfig;
    }
    return res;
  }

  const setLobbySession = (data?: LolSpace.LobbySession) => {
    gameConfig.value = data?.gameConfig;
  }

  return {
    gameConfig,
    blueMembers,
    redMembers,
    getLobbySession,
    setLobbySession,
  }
});

export const useSelectTimerStore = defineStore('lolChampsSelectTimer', () => {
  const selectStage = ref<LolSpace.ChampSelectTimer['phase']>();

  const getSelectTimer = async () => {
    const res = await lolServices<LolSpace.ChampSelectTimer>({
      method: LolSpace.Method.get,
      url: "/lol-champ-select/v1/session/timer"
    });
    if (res?.httpStatus) {
      selectStage.value = undefined
    } else {
      selectStage.value = res?.phase;
    }
    return res;
  }

  return {
    selectStage,
    getSelectTimer,
  }
})
