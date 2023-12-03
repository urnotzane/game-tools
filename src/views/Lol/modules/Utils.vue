<template>
  <div class="bg-white p-3 w-[400px] rounded text-lg">
    <div>
      当前账号：
      <span class="text-blue-500" v-if="currentSummoner">{{ currentSummoner?.displayName }}</span>
      <span class="text-red-500" v-else>未登录</span>
    </div>
    <div>
      游戏版本：
      <span class="text-blue-500">{{ champsStore.lolVersion }}</span>
    </div>
    <div>
      接口地址：
      <span class="text-blue-500">{{ clientUrl }}</span>
    </div>
    <div>
      Token：
      <span class="text-blue-500">{{ clientToken }}</span>
    </div>
    <div>
      房间名称：{{ lobbyStore.gameConfig?.customLobbyName || "未创建" }}
    </div>
    <div>
      比赛状态：{{ selectTimerStore.selectStage ? LolSpace.SelectStageText[selectTimerStore.selectStage] : "未开始" }}
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