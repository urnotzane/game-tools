import { LolSpace } from "@/types/lol.ts";
import { lolServices } from "@/views/Lol/services/client.ts";
import { invoke } from "@tauri-apps/api";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const useLolChampsStore = defineStore("lolChamps", () => {
  const champs = ref<Record<string, LolSpace.Champion>>({});
  const lolVersion = ref<string>();

  const getChamps = async () => {
    console.log('getChamps');

    const res = await invoke<{
      data: Record<string, LolSpace.Champion>;
      version: string;
    }>("get_champs");
    champs.value = Object.values(res.data).reduce((pre, cur) => {
      pre[cur.key] = cur;
      return pre
    }, {} as typeof champs.value);

    lolVersion.value = res.version;
  }

  onMounted(() => {
    getChamps();
  })
  return {
    champs,
    lolVersion,
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
      url: "/lol-lobby/v2/lobby"
    });
    if (res?.httpStatus) return;
    gameConfig.value = res?.gameConfig;
  }

  onMounted(() => {
    getLobbySession();
  })
  return {
    gameConfig,
    blueMembers,
    redMembers,
    getLobbySession
  }
});
