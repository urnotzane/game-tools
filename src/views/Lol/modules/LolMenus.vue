<template>
  <div class="relative h-full py-4 px-6">
    <a-card title="英雄联盟" class="h-full" :bodyStyle="{ height: '100%' }">
      <a-card-grid v-for="item in VIEW_LIST" :key="item.path" @click="toView(item.path)" class="text-center !w-[25%] !h-[25%] cursor-pointer flex items-center justify-center">
        <div class="text-xl">{{item.name}}</div>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
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

const toView = (path:string) => {
  router.push({path});
}
</script>
<style scoped lang="scss">

</style>