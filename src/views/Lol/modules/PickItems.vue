<template>
  <div class="flex w-[600px]" :class="{
      'flex-row-reverse': isRedTeam,
    }">
    <div class="flex-1 h-[216px] border-r border-gray-700 relative" :class="{
      'border-l border-r-0': isRedTeam
    }" v-for="pickIndex in pickLimit" :key="pickIndex">
      <img class="w-full h-full" v-if="pickChamps[pickIndex - 1]" :src="pickChamps[pickIndex - 1].imgUrl" />
      <div class="" v-else></div>
      <div class="pl-3 absolute bottom-2">
        player {{ pickIndex }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LolSpace } from '@/types/lol.ts';
import { computed } from 'vue';

const props = defineProps<{
	pickLimit: number;
	pickChamps: LolSpace.BanChamp[];
	team?: LolSpace.TeamType;
}>()

const isRedTeam = computed(() => props.team === LolSpace.TeamType.red)
</script>