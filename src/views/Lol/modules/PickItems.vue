<template>
  <div class="flex w-[600px]" :class="{
      'flex-row-reverse': isRedTeam,
    }">
    <div class="flex-1 h-[216px] border-r border-gray-700 relative" :class="{
      'border-l border-r-0': isRedTeam
    }" v-for="(member, index) in teamMembers" :key="index">
      <img class="w-full h-full" v-if="member.championId" :src="formatChampImg(member.championId)" />
      <div class="" v-else>
        <div class="pl-2 pt-2">{{ LolSpace.PlayerPositions[index - 1] }}</div>
      </div>
      <div class="absolute pl-2 bottom-2">
        {{ member.summonerId }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLolChampsStore } from '@/store/lol.ts';
import { LolSpace } from '@/types/lol.ts';
import { computed } from 'vue';
import { formatChampLoading } from '../utils';

const props = defineProps<{
	pickLimit: number;
	teamMembers: LolSpace.TeamItem[];
	team?: LolSpace.TeamType;
}>()

const champsStore = useLolChampsStore();

const isRedTeam = computed(() => props.team === LolSpace.TeamType.red);

const formatChampImg = (champId: number) => {
  const idText = champsStore.champs[champId]?.id;
  return formatChampLoading(idText);
}
</script>