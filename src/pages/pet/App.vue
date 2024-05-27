<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { InternalModel, Live2DModel, SoundManager } from 'pixi-live2d-display';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { UnlistenFn, listen } from '@tauri-apps/api/event';
import { LevelOperator, LevelOperatorData, LevelsConfig, NORMAL_SIZE } from './configs';
import { service } from './service';
import { useLolChampsStore } from '@/store/lol/common';
import { useChampSelectStore } from '@/store/lol/useChampSelectStore';
import { useLolInitStore } from '@/store/lol/useLolInitStore';

// 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
(window as any).PIXI = PIXI;

const ASHE_INTRO = "艾希是英雄联盟中的ADC英雄，她的技能连招主要是利用她的Q技能“鹰击长空”来增加攻击速度和伤害，然后使用W技能“魔法箭”来减速敌人，接着使用E技能“魔法飞箭”来逃离敌人的攻击范围。最后使用R技能“射日之箭”来发动致命一击。艾希的技能连招需要灵活运用，配合队友的支援和控制技能，才能发挥出最大的作用。";

const champsStore = useLolChampsStore();
const champSelectStore = useChampSelectStore();
const lolInitialStore = useLolInitStore();

const removeListener = ref<UnlistenFn>();
const timer = ref<NodeJS.Timeout>();
const configs = ref<LevelsConfig>();
const cachedModel = ref<Live2DModel<InternalModel>>();

const curLevel = computed(() => configs.value?.current_level || 1);
const levelConfig = computed(() => configs.value?.levels_config[curLevel.value - 1]);
const scale = computed(() => levelConfig.value?.size_scale || 0.5);

// 长时间未交互
const longTimeNoInteraction = (model: Live2DModel<InternalModel>) => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    // 失落
    model.expression("f02");
  }, 10000);
}
const speak = async (text: string) => {
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterThis = new SpeechSynthesisUtterance(text);
  // 获取所有支持的中文声音
  let voices = synth.getVoices().filter(v => v.lang.indexOf('zh') === 0);
  // 循环播放某个情绪以触发嘴型变动
  speakingMotion();
  let interval = setInterval(() => {
    speakingMotion();
  }, 3000);
  utterThis.addEventListener("end", (event) => {
    console.log(`语音已在${event.elapsedTime}秒后完成播放。`);
    clearInterval(interval);
  });

  utterThis.voice = voices[0];
  synth.speak(utterThis);
}
const modelHit = (hitAreas: string[], model: Live2DModel<InternalModel>) => {
  // 开心
  model.expression("f01");
  SoundManager.volume = 1;
  if (hitAreas.includes('body')) {
    model.motion('tap_body');
  }
  if (hitAreas.includes('head')) {
    model.motion('flick_head');
  }

  longTimeNoInteraction(model);
}
const setModel = async function () {
  await get_levels_configs();
  const canvas = document.getElementById('canvas') as any;

  const app = new PIXI.Application({
    view: canvas as any,
    // 背景透明
    backgroundAlpha: 0,
    width: NORMAL_SIZE.width * scale.value,
    height: NORMAL_SIZE.height * scale.value,
  });

  const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json');
  app.stage.addChild(model);
  cachedModel.value = model;

  model.scale.set(0.25 * scale.value);
  // 点击
  (model as any).on('hit', (hitAreas: string[]) => modelHit(hitAreas, model));

  // 全局鼠标移动事件
  removeListener.value = await listen<{ x: number, y: number }>('mouse_moved', (event) => {
    model.focus(event.payload?.x, event.payload?.y);
  })
  longTimeNoInteraction(model);
};
const get_levels_configs = async () => {
  const res = await service<LevelsConfig>("get_levels");

  if (!res.code) {
    configs.value = res.data;
  }
}
const levelOperators = {
  [LevelOperator.Addition]: async () => {
    await service<number, LevelOperatorData>("set_level", {
      operator: LevelOperator.Addition,
    })
    setModel();
  },
  [LevelOperator.Subtraction]: async () => {
    await service<number, LevelOperatorData>("set_level", {
      operator: LevelOperator.Subtraction,
    });
    setModel();
  }
}
const expOperator = {
  firstBlood: async () => {
    await service("obtain_experience", {
      eventType: "FirstBlood",
    })
    setModel();
  }
}
const stopVoice = () => {
  speechSynthesis.cancel();
}
const testSpeak = async () => {
  const text = await champsStore.getChampSpellsSummary("Ashe");
  if (!text) return;
  speak(text);
}
// pick时介绍此英雄
watch(() => champSelectStore.bpSession, async (bpSession) => {
  const latestActions = bpSession?.actions?.[(bpSession?.actions?.length || 1) - 1];
  const latestAction = latestActions?.[(latestActions?.length || 1) - 1];

  const isFirstPlayer = latestAction?.actorCellId === 0;
  // pick英雄时且最后一个action且时蓝色第一个英雄时
  if (latestAction?.type === 'ban' || !latestAction || !isFirstPlayer) return;
  const champ = champsStore.champs[latestAction.championId];

  if (!champ) return;

  // const text = await champsStore.getChampSpellsSummary(champ.id);

  // if (!text) return;
  speak(ASHE_INTRO);
}, { immediate: true });
/** 播放说话时的嘴型，并静音自带语音 */
const speakingMotion = () => {
  cachedModel.value?.expression("f01");
  SoundManager.volume = 0;
  cachedModel.value?.motion('flick_head', 0);
}

onMounted(async () => {
  lolInitialStore.initialize();
  await setModel();
});
onUnmounted(() => {
  removeListener.value?.();
  speechSynthesis.cancel();
  lolInitialStore?.unMountListeners?.();
});
</script>

<template>
  <div class=" bg-slate-400 p-[5px] grid grid-cols-2 text-[12px]">
    <div>当前等级：{{ levelConfig?.name }}</div>
    <div>当前经验：{{ configs?.current_experiences || 0 }}/{{ levelConfig?.experiences?.max }}</div>
    <div class="flex col-span-2">
      <div @click="levelOperators[LevelOperator.Subtraction]()">降级</div>
      <div @click="levelOperators[LevelOperator.Addition]()" class="ml-[10px]">升级</div>
      <div @click="expOperator.firstBlood()" class="ml-[10px]">一血</div>
      <div @click="stopVoice" class="ml-[10px]">闭嘴</div>
      <div @click="testSpeak" class="ml-[10px]">testSpeak</div>
    </div>
  </div>
  <canvas id="canvas"></canvas>
</template>
