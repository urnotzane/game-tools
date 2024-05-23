import { LolConstants } from "@/constants/lol";
import { LolSpace } from "@/types/lol";
import { formatSubCategoriesToQueues } from "@/utils/lol";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useQueueStore = defineStore('lolQueue', () => {
  const queues = ref<LolSpace.Queue[]>();
  // 自定义对局
  const customQueues = ref<LolSpace.Queue[]>([]);
  // 训练模式
  const practiceQueues = ref<LolSpace.Queue[]>([]);

  /**
   * 目前支持的可创建的游戏队列queue
   */
  const availableQueues = computed(():LolSpace.Queue[] => {
    const sorted = queues.value?.filter((item) => item.queueAvailability === "Available" && item.isVisible)
      .sort((a, b) => a.name?.localeCompare(b.name || '') || 0);
    const queMap = sorted?.reduce((total: Record<string,any>, cur) => {
      if (!cur.name) return total
      total[cur.name] = cur;
      return total;
    }, {})
    const ques = queMap ? Object.values(queMap) : [];
    return ques;
  });
  const gameModes = computed(() => [...new Set(availableQueues.value?.map((item) => item.gameMode))]);

  const pvpQueues = computed(() => availableQueues.value?.filter(queue => queue.category === LolConstants.QueueCategory.PvP));
  const aiQueues = computed(() => availableQueues.value?.filter(queue => queue.category === LolConstants.QueueCategory.VersusAi));

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
      customQueues.value = [];
    }
    else {
      customQueues.value = formatSubCategoriesToQueues(res?.subcategories?.filter(sub => sub.queueAvailability === 'Available') || []);
    }
    return res;
  }
  const getPracticeQueues = async () => {
    const res = await lolServices<LolSpace.CustomGame>({
      method: LolSpace.Method.get,
      url: "lol-game-queues/v1/custom-non-default"
    });
    if (res?.httpStatus) {
      practiceQueues.value = [];
    }
    else {
      practiceQueues.value = formatSubCategoriesToQueues(res?.subcategories?.filter(sub => sub.queueAvailability === 'Available') || []);
    }
    return res;
  }

  return {
    queues,
    availableQueues,
    gameModes,
    customQueues,
    practiceQueues,
    pvpQueues,
    aiQueues,
    getQueue,
    getCustomQueues,
    getPracticeQueues,
  }
});