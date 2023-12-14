import { LolSpace } from "@/types/lol";
import { lolServices } from "@/views/Lol/services/client";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useChampSelectStore = defineStore('lolChampSelect', () => {
  const bpSession = ref<LolSpace.ChampSelectSession>();
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
      const banAction = action?.filter((item) => item.type === 'ban');
      if (!banAction.length) return;
      banAction.forEach((item) => {
        if (item.pickTurn % 2) {
          blue.push(item)
        } else {
          red.push(item)
        }
      })
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
      const pickAction = action?.filter((item) => item.type === 'pick');
      if (!pickAction.length) return;
      pickAction.forEach((item) => {
        if (item.pickTurn % 2) {
          blue.push(item)
        } else {
          red.push(item)
        }
      })
    })
    return {
      blue,
      red,
    }
  });
  /**
   * 
   * @deprecated 已在ws中订阅
   */
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
    return res;
  }

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