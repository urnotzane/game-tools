import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useGameMapStore = defineStore('lolGameMap', () => {
  const gameMaps = ref<LolSpace.GameMap[]>();
  const getGameMap = async () => {
    const res = await lolServices<LolSpace.GameMap[]>({
      method: LolSpace.Method.get,
      url: "/lol-maps/v1/maps"
    });
    
    if (res?.httpStatus) {
      gameMaps.value = undefined;
    }
    else {
      gameMaps.value = res;
    }
    return res;
  };

  onMounted(() => {
    getGameMap();
  })
  return {
    gameMaps,
    getGameMap,
  };
});