import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useQueueStore } from "./useQueueStore";

export const useGameMapStore = defineStore('lolGameMap', () => {
const queuesStore = useQueueStore();

  const gameMaps = ref<LolSpace.GameMap[]>();
  const customMaps = computed(() => queuesStore.customQueues?.map(queue => {
    const map = gameMaps.value?.find(m => m.id === queue.mapId && m.gameMode === queue.gameMode);
    return {
      ...map,
      ...queue,
    }
  }))

  const getGameMap = async () => {
    const res = await lolServices<LolSpace.GameMap[]>({
      method: LolSpace.Method.get,
      url: "lol-maps/v2/maps"
    });
    
    if (res?.httpStatus) {
      gameMaps.value = undefined;
    }
    else {
      gameMaps.value = res;
    }
    return res;
  };
  return {
    gameMaps,
    customMaps,
    getGameMap,
  };
});