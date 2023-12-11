<template>
  <a-layout class="relative w-[100vw] h-[100vh] pl-[50px]" :class="{
    'pl-[200px]': !collapsed,
  }">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible theme="light" :collapsedWidth="50" class="!fixed left-0 top-0 h-full z-50">
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="/">
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
      <div class="text-center bg-white absolute bottom-3 w-full">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </div>
    </a-layout-sider>
    <a-layout class="relative">
      <a-layout-content>
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const selectedKeys = ref<string[]>(['/']);
const collapsed = ref<boolean>(true);

const router = useRouter();

watch(selectedKeys, (paths) => {
  router.push({
    path: paths[0],
  });
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
