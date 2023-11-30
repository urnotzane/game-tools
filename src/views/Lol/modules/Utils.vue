<template>
  <div class="">
        <div class="text-lg">
          当前账号：
          <span class="text-blue-500" v-if="currentSummoner">{{ currentSummoner?.displayName }}</span>
          <span class="text-red-500" v-else>未登录</span>
        </div>
        <div class="text-lg">
          版本：
          <span class="text-blue-500">{{ champsStore.lolVersion }}</span>
        </div>
        <div class="text-lg">
          接口地址：
          <span class="text-blue-500">{{ url }}</span>
        </div>
        <div class="text-lg">
          Token：
          <span class="text-blue-500">{{ token }}</span>
        </div>
      </div>
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { LolSpace } from '@/types/lol.ts';
import { lolServices } from '../services/client.ts';
import { useLolChampsStore } from '@/store/lol.ts';
import { invoke } from '@tauri-apps/api';

const champsStore = useLolChampsStore();

const currentSummoner = ref<LolSpace.Summoner>();
const url = ref("");
const token = ref("")

const getCurrentSummoner = async () => {
  const res = await lolServices<LolSpace.Summoner>({
    method: LolSpace.Method.get,
    url: "/lol-summoner/v1/current-summoner"
  });
  if (res?.httpStatus) return;
  currentSummoner.value = res;
}
const getRemoteData = async() => {
  const res = await invoke<LolSpace.RemoteData>('get_token');
  url.value = `https://127.0.0.1:${res.port}`;
  token.value = res.remote_token;
}

onMounted(() => {
  getCurrentSummoner();
  getRemoteData();
})
</script>