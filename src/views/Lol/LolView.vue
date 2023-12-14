<template>
  <div class="relative h-full">
    <!-- ban高度为5vw，那么pick高度为15vw，所以整个BP部分高度为20vw，因此，直播画面高度为100% - 20vw -->
    <div class="w-full live p-4 z-0">
      <img class="absolute w-full h-full z-0 left-0 top-0 object-cover object-top" :src="champsStore.randomChampBg" />
      <div class="relative z-10">
        <Utils class="p-4 w-[400px] rounded text-white text-lg mx-auto bg-black bg-opacity-30" />
        <LobbyOperator class="mt-3 p-4 w-[400px] rounded text-white text-lg mx-auto bg-black bg-opacity-30" />
      </div>
    </div>
    <!-- 根据LOL S13需要展示的内容，将横向屏幕分为12份
        分别对应是个Pick英雄和两个中间比分位
    -->
    <div class="w-full h-[5px] bg-white" />
    <div class="relative z-10">
      <Ban />
      <Pick />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLolChampsStore } from '@/store/lol/common';
import Ban from './modules/Ban.vue'
import LobbyOperator from './modules/LobbyOperator.vue';
import Pick from './modules/Pick.vue'
import Utils from './modules/Utils.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { UnlistenFn, listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api';

const champsStore = useLolChampsStore();

let unlisten = ref<UnlistenFn>()

onMounted(async() => {
  await invoke("initialize_lol");
  unlisten.value = await listen<string>('lcu_loaded', (event) => {
    console.log(event);
  });
});
onUnmounted(() => {
  unlisten.value?.();
})
</script>
<style scoped lang="scss">
.live {
  height: calc(100% - 180px);
}
</style>