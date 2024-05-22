import { SelectOption } from "@/types";
import { LolSpace } from "@/types/lol";

/**
 * 根据mapId将队列分类
 * @param queues 可使用的队列
 */
export const formateQueuesByMapId = (queues: LolSpace.Queue[]) => queues.reduce((total: Record<number, LolSpace.Queue[]>, current) => {
  const key = current.mapId;
  if (!total[key]) {
    total[key] = [];
  }
  total[key].push(current);
  return total;
}, {})

/**
 * 获取可创建queue的所有地图id，并进行排序
 */
export const formateMapsForCategory = (queues: LolSpace.Queue[], maps: SelectOption[]) => {
  if (!queues) return [];
  // 获取可创建queue的所有地图id，并进行排序
  const resMaps = [...new Set(queues.map(pq => pq.mapId))];
  return resMaps.map(mp => maps.find(gpv => gpv.id === mp))
    .filter(fm => !!fm)
    .sort((a: any, b: any) => a.id - b.id)
}