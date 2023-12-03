<template>
  <div class="w-full flex justify-between absolute bottom-[219px]" v-if="banLimit > 0">
    <BanItems class="bg-black bg-opacity-50" :banLimit="banLimit" :banChamps="blueBans" />
    <BanItems class="bg-black bg-opacity-50" :banLimit="banLimit" :banChamps="redBans" :team="LolSpace.TeamType.red" />
  </div>
</template>
<script lang="ts" setup>
import { LolSpace } from '@/types/lol';
import BanItems from './BanItems.vue'
import { computed } from 'vue';
import { useLolChampsStore } from '@/store/lol/common';
import { formatBanActions } from '../utils';
import { useChampSelectStore } from '@/store/lol/useChampSelectStore';

const champsStore = useLolChampsStore();
const selectStore = useChampSelectStore();

const banLimit = computed(() => (selectStore.banSession?.numBans || 0) / 2);
const blueBans = computed((): LolSpace.BanChamp[] => formatBanActions(selectStore.banActions?.blue, champsStore.champs));
const redBans = computed((): LolSpace.BanChamp[] => formatBanActions(selectStore.banActions?.red, champsStore.champs));
</script>