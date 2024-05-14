<template>
  <div class="fixed z-50 right-4 top-4 bg-black/30 rounded text-white px-2 py-1 cursor-pointer" @click="() => router.go(-1)">
    <RollbackOutlined />
    返回
  </div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { useLolInitStore } from '@/store/lol/useLolInitStore';
import { RollbackOutlined } from '@ant-design/icons-vue';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const lolInitialStore = useLolInitStore();

onMounted(() => {
  lolInitialStore.initialize();
});
onUnmounted(() => {
  lolInitialStore?.unMountListeners?.();
})
</script>
<style scoped lang="scss">
.live {
  height: calc(100% - 180px);
}
</style>