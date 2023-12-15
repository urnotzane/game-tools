<template>
  <a-layout class="relative w-[100vw] h-[100vh]">
    <a-layout-sider v-model:collapsed="collapsed" theme="light" collapsible :collapsedWidth="0"
      :zeroWidthTriggerStyle="{ top: '4px', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }"
      class="!fixed left-0 top-0 h-full z-50">
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="/home">
          <user-outlined />
          <span>主页</span>
        </a-menu-item>
        <a-menu-item key="/lol">
          <video-camera-outlined />
          <span>英雄联盟</span>
        </a-menu-item>
        <a-menu-item key="/valorant">
          <upload-outlined />
          <span>无畏契约</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="relative">
      <a-layout-content>
        <div
          class="absolute bottom-3 right-4 z-50 cursor-pointer text-lg text-white bg-black bg-opacity-30 rounded w-[30px] h-[30px] leading-[30px] text-center"
          @click="handleFullScreen">
          <FullscreenOutlined v-if="!isFullScreen" />
          <FullscreenExitOutlined v-else />
        </div>
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { appWindow } from '@tauri-apps/api/window';

const selectedKeys = ref<string[]>(['/home']);
const collapsed = ref<boolean>(true);
const isFullScreen = ref(false);

const router = useRouter();

const handleFullScreen = async() => {
  appWindow.setFullscreen(!isFullScreen.value);
  isFullScreen.value = !isFullScreen.value;
}

watch(selectedKeys, async (paths) => {
  router.push({
    path: paths[0],
  });
  collapsed.value = true;
}, { immediate: true });

onMounted(async () => {
  isFullScreen.value = await appWindow.isFullscreen();
})
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
