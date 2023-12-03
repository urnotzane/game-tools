<template>
  <form :ref="(el: any) => formRef = el">
    <div :class="rowClass">
      <label :class="labelClass" for="queueId">游戏模式</label>
      <select @change="gameModeChange" :class="valueClass" id="queueId" name="queueId" required>
        <option v-for="queue in queueStore.availableQueues" :key="queue.id" :value="queue.id">
          {{ queue.name }}
        </option>
      </select>
    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="mapId">比赛地图</label>
      <select :class="valueClass" id="mapId" name="mapId" required>
        <option v-for="gMap in mapStore.gameMaps" :key="gMap.id" :value="gMap.id">
          {{ gMap.name }}
        </option>
      </select>
    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="teamSize">队伍规模</label>
      <select :class="valueClass" id="teamSize" name="teamSize" required>
        <option v-for="size in teamSizeSelects" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="lobbyName">房间名称</label>
      <input :class="valueClass" type="text" id="lobbyName" name="lobbyName" required>
    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="lobbyPassword">密码</label>
      <input :class="valueClass" type="password" id="lobbyPassword" name="lobbyPassword" required>
    </div>

    <div class="text-center mt-4 cursor-pointer" @click="createRoom" type="submit">创建房间</div>
  </form>
</template>
<script setup lang="ts">
import { useGameMapStore } from '@/store/lol/useMapStore';
import { useQueueStore } from '@/store/lol/useQueueStore';
import { LolSpace } from '@/types/lol';
import { ref } from 'vue';
import { lolServices } from '../services/client';

const rowClass = "grid grid-cols-10 my-2";
const labelClass = "col-span-3";
const valueClass = "col-span-7 text-black";

const queueStore = useQueueStore();
const mapStore = useGameMapStore();

const formRef = ref<HTMLFormElement>();

const teamSizeSelects = ref<number[]>([]);

const gameModeChange = () => {
  const formData = new FormData(formRef.value);
  const queueId = formData.get('queueId') || 0;
  if (!queueId) {
    teamSizeSelects.value = [];
  };
  const queue = queueStore.availableQueues?.find(queue => queue.id === +queueId);
  // 设置选择项
  teamSizeSelects.value = queue?.allowablePremadeSizes.reverse() || [];
}
/**
 * gameMode: 游戏模式。自定义模式为 'CLASSIC'， 训练模式为 'PRACTICETOOL' (仅召唤师峡谷)
 */
const getGameMode = () => {
  const formData = new FormData(formRef.value);
  const queueId = formData.get('queueId') || 0;
  if (!queueId) return '';
  const queue = queueStore.availableQueues?.find(queue => queue.id === +queueId);

  return queue?.gameMode || '';
}
const createRoom = async () => {
  console.log('gameModes', queueStore.gameModes);
  
  const formData = new FormData(formRef.value);
  const formValues: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    formValues[key] = value as string;
  }
  const data: LolSpace.LobbyBody = {
    customGameLobby: {
      configuration: {
        gameMode: getGameMode(),
        gameServerRegion: '',
        mapId: +formValues.mapId,
        mutators: { id: 1 },
        spectatorPolicy: 'AllAllowed',
        teamSize: +formValues.teamSize,
      },
      lobbyName: formValues.lobbyName,
      lobbyPassword: formValues.lobbyPassword,
    },
    isCustom: true,
  }
  const res = await lolServices<LolSpace.LobbySession, LolSpace.LobbyBody>({
    method: LolSpace.Method['post'],
    url: "/lol-lobby/v2/lobby",
    data,
  });
  console.log('createRoom', res);
}
</script>