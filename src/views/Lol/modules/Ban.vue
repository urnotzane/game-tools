<template>
  <div class="flex justify-between w-[100vw] absolute bottom-[156px]">
    <BanItems :banLimit="banLimit" :banChamps="champs" />
    <BanItems :banLimit="banLimit" :banChamps="champs" :team="LolSpace.TeamType.red" />
  </div>
</template>
<script lang="ts" setup>
import { LolSpace } from '@/types/lol.ts';
import BanItems from './BanItems.vue'
/** Max maybe 5 */
const banLimit = 3;
const champs:LolSpace.BanChamp[] = [
  {
    id: 1,
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/Aatrox.png",
    name: '暗裔剑魔'
  },
  {
    id: 2,
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/Aatrox.png",
    name: '暗裔剑魔'
  },
]
</script>