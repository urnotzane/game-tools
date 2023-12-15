<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Layout from "./components/Layout.vue";
import { ConfigProvider } from 'ant-design-vue';
</script>

<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }"
  >
    <Layout>
      <router-view></router-view>
    </Layout>
  </ConfigProvider>
</template>
