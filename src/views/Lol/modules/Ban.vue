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
import { formatBanActions } from '../utils.ts';
import { useChampSelectStore } from '@/store/lol/useChampSelectStore.ts';

const champsStore = useLolChampsStore();
const selectStore = useChampSelectStore();

const banLimit = computed(() => (selectStore.banSession?.numBans || 0) / 2);
const blueBans = computed((): LolSpace.BanChamp[] => formatBanActions(selectStore.banActions?.blue, champsStore.champs));
const redBans = computed((): LolSpace.BanChamp[] => formatBanActions(selectStore.banActions?.red, champsStore.champs));
</script>