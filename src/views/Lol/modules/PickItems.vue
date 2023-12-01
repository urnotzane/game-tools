<template>
  <div class="flex w-[600px]">
    <div class="flex-1 h-[216px] border-r border-gray-700 relative" :class="{
      'border-l border-r-0': isRedTeam
    }" v-for="index in pickLimit" :key="index">
      <img class="w-full h-full" v-if="teamMembers?.[index]?.championId"
        :src="formatChampImg(teamMembers?.[index - 1]?.championId)" />
      <div class="" v-else>
        <div class="pl-2 pt-2">{{ LolSpace.PlayerPositions[index - 1] }}</div>
      </div>
      <div class="absolute pl-2 bottom-2">
        {{ formatMemberName(index - 1) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLobbyStore, useLolChampsStore } from '@/store/lol/common.ts';
import { LolSpace } from '@/types/lol.ts';
import { computed } from 'vue';
import { formatChampLoading } from '../utils';

const props = defineProps<{
  pickLimit: number;
  teamMembers?: LolSpace.TeamItem[];
  team?: LolSpace.TeamType;
}>()

const champsStore = useLolChampsStore();
const lobbyStore = useLobbyStore();

const isRedTeam = computed(() => props.team === LolSpace.TeamType.red);

const formatChampImg = (champId: number) => {
  const idText = champsStore.champs[champId]?.id;
  return formatChampLoading(idText);
}
const formatMemberName = (memberIndex: number) => {
  let members = isRedTeam.value ? lobbyStore.redMembers : lobbyStore.blueMembers;
  return members?.[memberIndex]?.summonerName || `Bot ${memberIndex + 1}`
}
</script>