<template>
  <div class="flex w-[100vw] justify-between">
    <PickItems :pickChamps="champs" :pickLimit="pickLimit"  />
    <div class="flex-1">team info</div>
    <PickItems :team="LolSpace.TeamType.red" :pickChamps="champs" :pickLimit="pickLimit" />
  </div>
</template>
<script setup lang="ts">
import { LolSpace } from '@/types/lol.ts';
import PickItems from './PickItems.vue';

const pickLimit = 5;
const champs:LolSpace.BanChamp[] = [
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