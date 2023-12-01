import { LolSpace } from "@/types/lol.ts";
import { lolServices } from "@/views/Lol/services/client.ts";
import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";

export const useChampSelectStore = defineStore('lolChampSelect', () => {

  const bpSession = ref<LolSpace.ChampSelectSession>();

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

  const getChampSelectSession = async () => {
    const res = await lolServices<LolSpace.ChampSelectSession>({
      method: LolSpace.Method.get,
      url: "/lol-champ-select/v1/session"
    });
    console.log(res);

    if (res?.httpStatus) return;
    bpSession.value = res;
  }
  onMounted(async () => {
    getChampSelectSession();
  })

  return {
    bpSession,
    banSession,
    blueTeam,
    redTeam,
  }
});