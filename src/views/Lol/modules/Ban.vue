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
import { useLolChampsStore } from '@/store/lol/common.ts';
import { formatChampIcon } from '../utils.ts';
import { useChampSelectStore } from '@/store/lol/useChampSelectStore.ts';

const champsStore = useLolChampsStore();
const selectStore = useChampSelectStore();

const banLimit = computed(() => (selectStore.banSession?.numBans || 0) / 2);
const blueBans = computed(() => selectStore.banSession?.myTeamBans.map((id) => {
  const champ = champsStore.champs[id];
  return {
    id,
    imgUrl: formatChampIcon(champ?.image?.full),
    name: champ?.name,
  } as LolSpace.BanChamp;
}));
const redBans = computed(() => selectStore.banSession?.theirTeamBans.map((id) => {
  const champ = champsStore.champs[id];
  return {
    id,
    imgUrl: formatChampIcon(champ?.image?.full),
    name: champ?.name,
  } as LolSpace.BanChamp;
}));
</script>