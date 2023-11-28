<template>
  <div class="flex justify-between bg-gray-950 text-white">
    <PickItems :pickChamps="champs" :pickLimit="pickLimit" />
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
    <PickItems :team="LolSpace.TeamType.red" :pickChamps="champs" :pickLimit="pickLimit" />
  </div>
</template>
<script setup lang="ts">
import { LolSpace } from '@/types/lol.ts';
import PickItems from './PickItems.vue';

const pickLimit = 5;
const champs: LolSpace.BanChamp[] = [
  {
    id: 1,
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg",
    name: '暗裔剑魔'
  },
  {
    id: 2,
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg",
    name: '暗裔剑魔'
  },
]
</script>