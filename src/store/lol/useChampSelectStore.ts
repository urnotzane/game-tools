import { LolSpace } from "@/types/lol.ts";
import { lolServices } from "@/views/Lol/services/client.ts";
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useSelectTimerStore } from "./common.ts";

export const useChampSelectStore = defineStore('lolChampSelect', () => {
  const selectStore = useSelectTimerStore();

  const bpSession = ref<LolSpace.ChampSelectSession>();
  const interval = ref<number>();
  const banLimit = computed(() => (bpSession.value?.bans.numBans || 10) / 2);

  const banSession = computed((): LolSpace.IBan => {
    const actions = bpSession.value?.actions;
    const redBans: number[] = [];
    const blueBans: number[] = [];
    actions?.forEach((action) => {
      const banAction = action?.find((item) => item.type === 'ban')
      if (!banAction) return;
      if (banAction.pickTurn % 2) {
        blueBans.push(banAction.championId)
      } else {
        redBans.push(banAction.championId)
      }
    })
    return {
      myTeamBans: blueBans,
      theirTeamBans: redBans,
      numBans: 6,
    }
  });
  const blueTeam = computed(() => bpSession.value?.myTeam);
  const redTeam = computed(() => bpSession.value?.theirTeam);

  const banActions = computed((): Record<string, LolSpace.IAction[]> => {
    const actions = bpSession.value?.actions;
    const red: LolSpace.IAction[] = [];
    const blue: LolSpace.IAction[] = [];
    actions?.forEach((action) => {
      const banAction = action?.find((item) => item.type === 'ban')
      if (!banAction) return;
      if (banAction.pickTurn % 2) {
        blue.push(banAction)
      } else {
        red.push(banAction)
      }
    })
    return {
      blue,
      red,
    }
  });

  const pickActions = computed((): Record<string, LolSpace.IAction[]> => {
    const actions = bpSession.value?.actions;
    const red: LolSpace.IAction[] = [];
    const blue: LolSpace.IAction[] = [];
    actions?.forEach((action) => {
      const pickAction = action?.findLast((item) => item.type === 'pick');
      if (!pickAction) return;
      if (pickAction.pickTurn % 2) {
        blue.push(pickAction)
      } else {
        red.push(pickAction)
      }
    })
    return {
      blue,
      red,
    }
  });

  const getChampSelectSession = async () => {
    const res = await lolServices<LolSpace.ChampSelectSession>({
      method: LolSpace.Method.get,
      url: "/lol-champ-select/v1/session"
    });
    if (res?.httpStatus) {
      bpSession.value = undefined;
    } else {
      bpSession.value = res;
    }
  }

  watch(() => selectStore.selectStage, (selectStage) => {
    if (selectStage === 'BAN_PICK') {
      interval.value = setInterval(() => {
        getChampSelectSession();
      }, 500)
    } else {
      clearInterval(interval.value);
    }
  })

  return {
    bpSession,
    banSession,
    blueTeam,
    redTeam,
    banLimit,
    banActions,
    pickActions,
    getChampSelectSession,
  }
});