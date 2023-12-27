<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';
import { onMounted } from 'vue';

// 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
(window as any).PIXI = PIXI;

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
  // 交互
  (model as any).on('hit', (hitAreas: any) => {
    model.expression("f01");
    if (hitAreas.includes('body')) {
      model.motion('tap_body');
    }
    if (hitAreas.includes('head')) {
      model.motion('flick_head');
    }
    setTimeout(() => {
      model.expression("f02");
    }, 5000);
  });
}
onMounted(() => {
  initModel();
})
</script>

<template>
  <canvas id="canvas"></canvas>
</template>
