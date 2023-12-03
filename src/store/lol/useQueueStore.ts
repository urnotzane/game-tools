import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const useQueueStore = defineStore('lolQueue', () => {
  const queues = ref<LolSpace.Queue[]>();

  const availableQueues = computed(() => queues.value?.filter((item) => item.queueAvailability === "Available"));
  const practiceQueues = computed(() => queues.value?.filter((item) => item.gameMode === "PRACTICETOOL"));
  const gameModes = computed(() => [...new Set(queues.value?.map((item) => item.gameMode))]);

  const getQueue = async () => {
    const res = await lolServices<LolSpace.Queue[]>({
      method: LolSpace.Method.get,
      url: "/lol-game-queues/v1/queues"
    });
    if (res?.httpStatus) {
      queues.value = undefined
    } else {
      queues.value = res;
    }
    return res;
  }

  onMounted(() => {
    getQueue();
  });
  return {
    queues,
    availableQueues,
    practiceQueues,
    gameModes,
    getQueue,
  }
});