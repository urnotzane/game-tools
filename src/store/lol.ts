import { LolSpace } from "@/types/lol.ts";
import { invoke } from "@tauri-apps/api";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useLolChampsStore = defineStore("lolChamps", () => {
  const champs = ref<Record<string, LolSpace.Champion>>({});
  const lolVersion = ref<string>();

  const getChamps = async () => {
    console.log('getChamps');
    
    const res = await invoke<{
      data: Record<string, LolSpace.Champion>;
      version: string;
    }>("get_champs");
    champs.value = Object.values(res.data).reduce((pre, cur) => {
      pre[cur.key] = cur;
      return pre
    }, {} as typeof champs.value);

    lolVersion.value = res.version;
  }

  onMounted(() => {
    getChamps();
  })
  return {
    champs,
    lolVersion,
    getChamps,
  }
})