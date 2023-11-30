<template>
  <div class="w-full flex justify-between absolute bottom-[219px]" v-if="banLimit > 0">
    <BanItems :banLimit="banLimit" :banChamps="blueBans" />
    <BanItems :banLimit="banLimit" :banChamps="redBans" :team="LolSpace.TeamType.red" />
  </div>
</template>
<script lang="ts" setup>
import { LolSpace } from '@/types/lol.ts';
import BanItems from './BanItems.vue'
import { computed } from 'vue';
import { useLolChampsStore } from '@/store/lol.ts';
import { formatChampIcon } from '../utils.ts';

const props = defineProps<{
  banSession?: LolSpace.IBan;
}>()

const champsStore = useLolChampsStore();

const banLimit = computed(() => (props.banSession?.numBans || 0) / 2);
const blueBans = computed(() => props.banSession?.myTeamBans.map((id) => {
  const champ = champsStore.champs[id];
  return {
    id,
    imgUrl: formatChampIcon(champ?.image?.full),
    name: champ.name,
  } as LolSpace.BanChamp;
}));
const redBans = computed(() => props.banSession?.theirTeamBans.map((id) => {
  const champ = champsStore.champs[id];
  return {
    id,
    imgUrl: formatChampIcon(champ?.image?.full),
    name: champ.name,
  } as LolSpace.BanChamp;
}));
</script>