import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { formatChampSplash } from "@/views/Lol/utils";
import { invoke } from "@tauri-apps/api";
import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

export const useLolChampsStore = defineStore("lolChamps", () => {
  const champs = ref<Record<number, LolSpace.Champion>>({});
  const lolVersion = ref<string>();
  const randomChampBg = ref();
  const randomChampId = ref("");
  const randomChamp = ref<LolSpace.ChampDetail>();
  const randomChampSpellsSummary = ref<string>();

  const getChamps = async () => {
    const res = await invoke<{
      data: Record<string, LolSpace.Champion>;
      version: string;
    }>("get_champs");
    const champsList = Object.values(res.data);

    champs.value = champsList.reduce((pre, cur) => {
      pre[+cur.key] = cur;
      return pre
    }, {} as typeof champs.value);

    lolVersion.value = res.version;

    const random = Math.round(Math.random() * champsList.length);
    const id = champsList[random].id;
    randomChampBg.value = formatChampSplash(id);
    randomChampId.value = id;

    return res;
  }
  const getChamp = async (id: string) => {
    if (!id) return;
    const res = await invoke<LolSpace.ChampWrapper>("get_champs", { id });

    randomChamp.value = res.data[id];

    return randomChamp.value;
  }
  /**
   * 通过gpt获取某个英雄技能简介
   * @param id 英雄id
   * @returns 
   */
  const getChampSpellsSummary = async(id: string) => {
    if (!id) return;
    const res = await invoke<LolSpace.GptRes>("get_spells_summary", { id });

    randomChampSpellsSummary.value = res.data?.choices[0]?.message.content;

    console.log('res.data', res);
    

    return randomChampSpellsSummary.value;
  }

  watch(randomChampId, () => {
    getChampSpellsSummary(randomChampId.value);
  });
  onMounted(() => {
    getChamps();
  })
  return {
    champs,
    lolVersion,
    randomChampBg,
    randomChampId,
    randomChamp,
    randomChampSpellsSummary,
    getChamps,
    getChamp,
    getChampSpellsSummary,
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
