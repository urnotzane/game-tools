<template>
  <div class="relative">
    <!-- ban高度为5vw，那么pick高度为15vw，所以整个BP部分高度为20vw，因此，直播画面高度为100% - 20vw -->
    <div class="w-full live p-4 relative z-0">
      <img class="absolute w-full h-full z-0 left-0 top-0 object-cover object-top" :src="champsStore.randomChampBg" />
      <div class="relative z-10">
        <Utils />
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
import { useLolChampsStore } from '@/store/lol/common';
import Ban from './modules/Ban.vue'
import Pick from './modules/Pick.vue'
import Utils from './modules/Utils.vue';

const champsStore = useLolChampsStore();

</script>
<style scoped lang="scss">
.live {
  height: calc(100vh - 219px);
}
</style>