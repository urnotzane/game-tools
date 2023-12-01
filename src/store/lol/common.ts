import { LolSpace } from "@/types/lol.ts";
import { lolServices } from "@/views/Lol/services/client.ts";
import { formatChampSplash } from "@/views/Lol/utils.ts";
import { invoke } from "@tauri-apps/api";
import { defineStore } from "pinia";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

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
  const selectTimerStore = useSelectTimerStore();
  const gameConfig = ref<LolSpace.GameConfig>();
  const interval = ref<number>();

  const blueMembers = computed(() => gameConfig.value?.customTeam100);
  const redMembers = computed(() => gameConfig.value?.customTeam200);

  const getLobbySession = async () => {
    const res = await lolServices<LolSpace.LobbySession>({
      method: LolSpace.Method.get,
      url: "/lol-lobby/v2/lobby"
    });
    console.log('getLobbySession', res);

    if (res?.httpStatus) {
      gameConfig.value = undefined
    } else {
      gameConfig.value = res?.gameConfig;
    }
  }

  onMounted(() => {
    interval.value = setInterval(() => {
      getLobbySession();
    }, 500);
  })

  onUnmounted(() => {
    clearInterval(interval.value);
  });

  watch(() => selectTimerStore.selectStage, (selectStage) => {
    if (selectStage) {
      clearInterval(interval.value);
    }
  })
  return {
    gameConfig,
    blueMembers,
    redMembers,
    getLobbySession
  }
});

export const useSelectTimerStore = defineStore('lolChampsSelectTimer', () => {
  const selectStage = ref<LolSpace.ChampSelectTimer['phase']>();
  const interval = ref<number>();

  const getSelectTimer = async () => {
    const res = await lolServices<LolSpace.ChampSelectTimer>({
      method: LolSpace.Method.get,
      url: "/lol-champ-select/v1/session/timer"
    });
    console.log('getSelectTimer', res);
    if (res?.httpStatus) {
      selectStage.value = undefined
    } else {
      selectStage.value = res?.phase;
    }
  }

  onMounted(() => {
    interval.value = setInterval(() => {
      getSelectTimer();
    }, 500);
  })

  onUnmounted(() => {
    clearInterval(interval.value);
  })
  return {
    selectStage,
    getSelectTimer,
  }
})
