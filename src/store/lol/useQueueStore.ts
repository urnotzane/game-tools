import { LolSpace } from "@/types/lol";
import { LolEnum } from "@/types/lolEnum";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useQueueStore = defineStore('lolQueue', () => {
  const queues = ref<LolSpace.Queue[]>();
  // 自定义对局
  const customQueues = ref<LolSpace.Subcategory[]>();

  /**
   * 目前支持的可创建的游戏队列queue
   */
  const availableQueues = computed(():LolSpace.Queue[] => {
    const sorted = queues.value?.filter((item) => item.queueAvailability === "Available" && item.isVisible)
      .sort((a, b) => a.name.localeCompare(b.name));
    const queMap = sorted?.reduce((total: Record<string,any>, cur) => {
      total[cur.name] = cur;
      return total;
    }, {})
    const ques = queMap ? Object.values(queMap) : [];
    return ques;
  });
  const gameModes = computed(() => [...new Set(availableQueues.value?.map((item) => item.gameMode))]);

  const pvpQueues = computed(() => availableQueues.value?.filter(queue => queue.category === LolEnum.QueueCategories.PvP));
  const aiQueues = computed(() => availableQueues.value?.filter(queue => queue.category === LolEnum.QueueCategories.VersusAi));

  const getQueue = async () => {
    const res = await lolServices<LolSpace.Queue[]>({
      method: LolSpace.Method.get,
      url: "lol-game-queues/v1/queues"
    });
    if (res?.httpStatus) {
      queues.value = undefined
    } else {
      queues.value = res;
    }
    return res;
  }
  const getCustomQueues = async () => {
    const res = await lolServices<LolSpace.CustomGame>({
      method: LolSpace.Method.get,
      url: "lol-game-queues/v1/custom"
    });
    
    if (res?.httpStatus) {
      customQueues.value = undefined;
    }
    else {
      customQueues.value = res?.subcategories.filter(sub => sub.queueAvailability === 'Available');
    }
    return res;
  }

  watch(availableQueues, () => {
    console.log('availableQueues', availableQueues.value);
  })

  return {
    queues,
    availableQueues,
    gameModes,
    customQueues,
    getQueue,
    getCustomQueues,
  }
});