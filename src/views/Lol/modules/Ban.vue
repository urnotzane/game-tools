<template>
  <div class="w-full flex justify-between absolute bottom-[219px]" v-if="banLimit > 0">
    <BanItems :banLimit="banLimit" :banChamps="champs" />
    <BanItems :banLimit="banLimit" :banChamps="champs" :team="LolSpace.TeamType.red" />
  </div>
</template>
<script lang="ts" setup>
import { LolSpace } from '@/types/lol.ts';
import BanItems from './BanItems.vue'
import { computed } from 'vue';

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
const props = defineProps<{
  banSession?: LolSpace.IBan;
}>()

const banLimit = computed(() => props.banSession?.numBans || 0)
</script>