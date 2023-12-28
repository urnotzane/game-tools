<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { InternalModel, Live2DModel } from 'pixi-live2d-display';
import { onMounted, onUnmounted, ref } from 'vue';
import { UnlistenFn, listen } from '@tauri-apps/api/event';

// 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
(window as any).PIXI = PIXI;

const removeListener = ref<UnlistenFn>();
const timer = ref<NodeJS.Timeout>();

// 长时间未交互
const longTimeNoInteraction = (model: Live2DModel<InternalModel>) => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    // 失落
    model.expression("f02");
  }, 10000);
}
const modelHit = (hitAreas: string[], model: Live2DModel<InternalModel>) => {
  // 开心
  model.expression("f01");
  if (hitAreas.includes('body')) {
    model.motion('tap_body');
  }
  if (hitAreas.includes('head')) {
    model.motion('flick_head');
  }
  longTimeNoInteraction(model);
}
const initModel = async function () {
  const canvas = document.getElementById('canvas') as any;
  const app = new PIXI.Application({
    view: canvas as any,
    // 背景透明
    backgroundAlpha: 0,
    width: 300,
    height: 400,
  });

  const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json');
  app.stage.addChild(model);

  model.scale.set(0.25);
  // 点击
  (model as any).on('hit', (hitAreas: string[]) => modelHit(hitAreas, model));

  // 全局鼠标移动事件
  removeListener.value = await listen<{ x: number, y: number }>('mouse_moved', (event) => {
    model.focus(event.payload?.x, event.payload?.y);
  })
  longTimeNoInteraction(model);
}
onMounted(async() => {
  await initModel();
});
onUnmounted(() => {
  removeListener.value?.();
})
</script>

<template>
  <canvas id="canvas" class="!cursor-pointer"></canvas>
</template>
