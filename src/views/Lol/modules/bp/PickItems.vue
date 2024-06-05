<template>
  <div class="flex w-[600px]">
    <div class="flex-1 h-[175px] border-r border-gray-700 relative" :class="{
      'border-l border-r-0': isRedTeam,
      'blink-animation': getIsInProgress(index - 1),
    }" v-for="index in pickLimit" :key="index">
      <img class="w-full h-full object-cover object-top" v-if="teamMembers?.[index - 1]?.championId"
        :src="formatChampImg(teamMembers?.[index - 1]?.championId || 1)" />
      <div class="" v-else>
        <div class="pl-2 pt-2">{{ LolSpace.PlayerPositions[index - 1] }} </div>
      </div>
      <div class="absolute pl-2 bottom-2">
        {{ formatMemberName(index - 1) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLobbyStore, useLolChampsStore } from '@/store/lol/common';
import { LolSpace } from '@/types/lol';
import { computed } from 'vue';
import { formatChampLoading } from '../../utils';
import { useChampSelectStore } from '@/store/lol/useChampSelectStore';

const props = defineProps<{
  pickLimit: number;
  teamMembers?: LolSpace.TeamItem[];
  team?: LolSpace.TeamType;
}>()

const champsStore = useLolChampsStore();
const lobbyStore = useLobbyStore();
const selectStore = useChampSelectStore();

const isRedTeam = computed(() => props.team === LolSpace.TeamType.red);
const pickActions = computed(() => isRedTeam.value ? selectStore.pickActions.red : selectStore.pickActions.blue);
const inProgressPlayers = computed(() => pickActions.value.reduce((pre, cur) => {
  if (cur.isInProgress) {
    const playerIndex = isRedTeam.value ? ((cur.actorCellId || 0) - 5) : cur.actorCellId;
    if (playerIndex === undefined) return pre;
    pre.push(playerIndex)
  }
  return pre;
}, [] as number[]));

const formatChampImg = (champId: number) => {
  const idText = champsStore.champs[champId]?.id;
  if (!idText) return '';
  return formatChampLoading(idText);
}
const formatMemberName = (memberIndex: number) => {
  let members = isRedTeam.value ? lobbyStore.redMembers : lobbyStore.blueMembers;
  const mem = members?.[memberIndex];
  return mem?.summonerName || mem?.botId || `召唤师 ${memberIndex + 1}`;
}
const getIsInProgress = (index: number) => {
  return inProgressPlayers.value.includes(index)
}

</script>