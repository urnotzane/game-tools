<template>
  <div class="p-4 w-[400px] rounded text-white text-lg mx-auto bg-black bg-opacity-30">
    <div class="grid grid-cols-10">
      <div class="col-span-3">当前账号</div>
      <div class="col-span-7">{{ currentSummoner?.displayName || '-' }}</div>
    </div>
    <div class="grid grid-cols-10">
      <div class="col-span-3">游戏版本</div>
      <div class="col-span-7">{{ champsStore.lolVersion || '-' }}</div>
    </div>
    <div class="grid grid-cols-10">
      <div class="col-span-3">接口地址</div>
      <div class="col-span-7">{{ clientUrl || '-' }}</div>
    </div>
    <div class="grid grid-cols-10">
      <div class="col-span-3">Token</div>
      <div class="col-span-7">{{ clientToken || '-' }}</div>
    </div>
    <hr class="my-3" />
    <div class="grid grid-cols-10">
      <div class="col-span-3">房间名称</div>
      <div class="col-span-7">{{ lobbyStore.gameConfig?.customLobbyName || '-' }}</div>
    </div>
    <div class="grid grid-cols-10">
      <div class="col-span-3">对局状态</div>
      <div class="col-span-7">{{ selectTimerStore.selectStage ? LolSpace.SelectStageText[selectTimerStore.selectStage] :
        "-" }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { LolSpace } from '@/types/lol';
import { useLobbyStore, useLolChampsStore, useSelectTimerStore } from '@/store/lol/common';
import { useLolMatch } from '@/hooks/useLolMatch';

const champsStore = useLolChampsStore();
const lobbyStore = useLobbyStore();
const selectTimerStore = useSelectTimerStore();

const { currentSummoner, clientToken, clientUrl } = useLolMatch();

</script>