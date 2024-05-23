import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useQueueStore } from "./useQueueStore";
import { SelectOption } from "@/types";

export const useGameMapStore = defineStore('lolGameMap', () => {
  const queuesStore = useQueueStore();

  const gameMaps = ref<LolSpace.GameMap[]>();
  const customMaps = computed(() => queuesStore.customQueues?.map(queue => {
    const map = gameMaps.value?.find(m => m.id === queue.mapId && m.gameMode === queue.gameMode);
    return {
      ...map,
      ...queue,
    }
  }));
  /**
   * 游戏模式
   * @example ```[{ key: 'TFT', name: "云顶之奕"}]```
   */
  const gameModesValues = computed(() => gameMaps.value?.map(gm => ({
    key: gm.gameMode,
    name: gm.gameModeName,
  } as SelectOption)));
  /**
   * 游戏地图
   * @example ```[{ key: 'SR', id: 11, name: "嚎哭深渊" }]```
   */
  const gameMapsValues = computed(() => {
    const mapIds = [...new Set(gameMaps.value?.map(gm => gm.id))];
    return mapIds.map(gId => {
      const gameMap = gameMaps.value?.find(gm => gm.id === gId);
      return {
        key: gameMap?.mapStringId,
        id: gId,
        name: gameMap?.name,
      } as SelectOption
    })
  })
  const pvpMaps = computed(() => {
    // 获取可创建queue的所有地图id，并进行排序
    const maps = [...new Set(queuesStore.pvpQueues.map(pq => pq.mapId))];
    return maps.map(mp => gameMapsValues.value.find(gpv => gpv.id === mp))
                .filter(fm => !!fm)
                .sort((a:any, b:any) => a.id - b.id)
  });

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
    gameModesValues,
    gameMapsValues,
    pvpMaps,
    getGameMap,
  };
});