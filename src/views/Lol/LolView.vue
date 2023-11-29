<template>
  <div class="relative">
    <!-- ban高度为5vw，那么pick高度为15vw，所以整个BP部分高度为20vw，因此，直播画面高度为100% - 20vw -->
    <div class="w-full live p-4">
      <div class="">
        <div class="text-lg">
          当前账号：
          <span class="text-blue-500" v-if="currentSummoner">{{ currentSummoner?.displayName }}</span>
          <span class="text-red-500" v-else>未登录</span>
        </div>
      </div>
    </div>
    <!-- 根据LOL S13需要展示的内容，将横向屏幕分为12份
        分别对应是个Pick英雄和两个中间比分位
    -->
    <div class="w-full h-[3px] bg-white" />
    <Ban />
    <Pick />
  </div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri';
import Ban from './modules/Ban.vue'
import Pick from './modules/Pick.vue'
import { onMounted, ref } from 'vue';
import { LolSpace } from '@/types/lol';

const currentSummoner = ref<LolSpace.Summoner>()

const getCurrentSummoner = async() => {
  const res = await invoke<string>('current_summoner');
  try {
    currentSummoner.value = JSON.parse(res);
  } catch (error) {
    console.log(error);
  }
}
const getChampSelectSession = async() => {
  const res = await invoke<string>('champ_select_session');
  try {
    console.log(JSON.parse(res));
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  getCurrentSummoner();
  getChampSelectSession();
})
</script>
<style scoped lang="scss">
.live {
  height: calc(100vh - 219px);
}
</style>