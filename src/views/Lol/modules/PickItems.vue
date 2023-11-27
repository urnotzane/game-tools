<template>
  <div class="flex w-[442px]" :class="{
      'flex-row-reverse': team === LolSpace.TeamType.red,
    }">
    <div class="flex-1 h-[153px] border" v-for="pickIndex in pickLimit" :key="pickIndex">
      <img class="w-full h-full" v-if="pickChamps[pickIndex - 1]" :src="pickChamps[pickIndex - 1].imgUrl" />
      <div class="" v-else></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LolSpace } from '@/types/lol.ts';

defineProps<{
	pickLimit: number;
	pickChamps: LolSpace.BanChamp[];
	team?: LolSpace.TeamType;
}>()
</script>