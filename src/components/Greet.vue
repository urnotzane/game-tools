<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";

const greetMsg = ref("");
const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}
async function executeCmd() {
  const res = await invoke("get_token");
  console.log(res);
  
}
</script>

<template>
  <form class="row" @submit.prevent="greet">
    <input id="greet-input" v-model="name" placeholder="请输入昵称..." />
    <button type="submit">欢迎</button>
  </form>

  <p class="text-[#249b73]">{{ greetMsg }}</p>

  <button class="border p-1 px-2 rounded" @click="executeCmd">执行</button>
</template>
