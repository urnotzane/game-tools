import { LolConstants } from "@/constants/lol";
import { SelectOption } from "@/types";
import { LolSpace } from "@/types/lol";

/**
 * 根据mapId将队列分类
 * @param queues 可使用的队列
 */
export const formateQueuesByMapId = (queues: LolSpace.Queue[]) => queues?.reduce((total: Record<number, LolSpace.Queue[]>, current) => {
  const key = current.mapId;
  if (!key) return total
  if (!total[key]) {
    total[key] = [];
  }
  total[key].push(current);
  return total;
}, {});
/** 将自定义queues转换成正常的queues数据 */
export const formatSubCategoriesToQueues = (data: LolSpace.Subcategory[]) => data?.reduce((total:LolSpace.Queue[], current) => {
  const key = current.mapId;
  if (!key) return total
  const queues = current.mutators?.filter(mu => !mu?.teamChampionPool).map(mutator => {
    const queue:LolSpace.Queue = {
      id: mutator.id,
      mapId: key,
      gameMode: current.gameMode,
      name: mutator.name ? LolConstants.mutatorNameOpts[mutator.name] : '',
      gameTypeConfig: mutator,
    }
    return queue;
  }) || []
  total = [...total, ...queues];
  return total;
}, []);
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