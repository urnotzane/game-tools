import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useQueueStore = defineStore('lolQueue', () => {
  const queues = ref<LolSpace.Queue[]>();
  // 自定义对局
  const customQueues = ref<LolSpace.Subcategory[]>();

  const availableQueues = computed(() => {
    const sorted = queues.value?.filter((item) => item.queueAvailability === "Available" && item.isVisible)
      .sort((a, b) => a.name.localeCompare(b.name));
    const queMap = sorted?.reduce((total: Record<string,any>, cur) => {
      total[cur.name] = cur;
      return total;
    }, {})
    const ques = queMap ? Object.values(queMap) : [];
    console.log('category', ques.map(q => q.category));
    console.log('type', ques.map(q => q.type));
    return ques;
  });
  const gameModes = computed(() => [...new Set(availableQueues.value?.map((item) => item.gameMode))]);

  const getQueue = async () => {
    const res = await lolServices<LolSpace.Queue[]>({
      method: LolSpace.Method.get,
      url: "lol-game-queues/v1/queues"
    });
    if (res?.httpStatus) {
      queues.value = undefined
    } else {
      queues.value = res;
      console.log('gameModes', [...new Set(queues.value?.map(q => q.gameMode+q.name))]);
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
      customQueues.value = res?.subcategories;
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