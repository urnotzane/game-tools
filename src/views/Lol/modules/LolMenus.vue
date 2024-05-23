<template>
  <div class="relative h-full py-4 px-6">
    <a-card title="英雄联盟" class="h-full" :bodyStyle="{ height: '100%' }">
      <a-card-grid class="!w-[25%] !h-[25%] text-xl text-center flex flex-col justify-center items-center">
        <div><a-button @click="copyToClipboard(lolInitialStore.clientToken)">复制Token</a-button></div>
        <div class="mt-3"><a-button type="primary" @click="copyToClipboard(lolInitialStore.clientUrl)">复制接口地址</a-button>
        </div>
      </a-card-grid>
      <a-card-grid v-for="item in VIEW_LIST" :key="item.path" @click="toView(item.path)"
        class="text-center !w-[25%] !h-[25%] cursor-pointer flex items-center justify-center">
        <div class="text-xl">{{ item.name }}</div>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useLolInitStore } from '@/store/lol/useLolInitStore';
import { copyToClipboard } from '@/utils/common';
import { useRouter } from 'vue-router';

const VIEW_LIST = [
  {
    name: 'BP工具',
    path: "/lol/bp"
  },
  {
    name: '创建游戏房间',
    path: "/lol/createLobby"
  },
]

const router = useRouter();
const lolInitialStore = useLolInitStore();

const toView = (path: string) => {
  router.push({ path });
}
</script>
<style scoped lang="scss"></style>