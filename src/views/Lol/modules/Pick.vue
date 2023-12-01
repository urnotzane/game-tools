<template>
  <div class="flex justify-between bg-gray-950 text-white">
    <PickItems :teamMembers="blueTeam" :pickLimit="pickLimit" />
    <div class="flex-1 text-center text-lg relative">
      <div class="m-4">决赛</div>
      <div class="absolute top-1/2 w-full">VS</div>
      <div class="grid grid-cols-2 mt-12">
        <div>
          <div>1</div>
          <div class="mt-4">Blue</div>
        </div>
        <div>
          <div>1</div>
          <div class="mt-4">Red</div>
        </div>
      </div>
    </div>
    <PickItems :team="LolSpace.TeamType.red" :teamMembers="redTeam" :pickLimit="pickLimit" />
  </div>
</template>
<script setup lang="ts">
import { LolSpace } from '@/types/lol.ts';
import PickItems from './PickItems.vue';

defineProps<{
  blueTeam: LolSpace.TeamItem[];
  redTeam: LolSpace.TeamItem[];
}>()

const pickLimit = 5;
</script>