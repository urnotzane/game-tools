<template>
  <form :ref="(el: any) => formRef = el">
    <div :class="rowClass">
      <label :class="labelClass" for="mapId">对局地图</label>
      <select @change="mapChange" :class="valueClass" id="mapId" name="mapId" required>
        <option v-for="gMap in mapStore.customMaps" :key="gMap.id" :value="gMap.id">
          {{ gMap.name }}
        </option>
      </select>
    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="mutatorId">游戏类型</label>
      <select :class="valueClass" id="mutatorId" name="mutatorId" required>
        <option v-for="mutator in gameMutators" :key="mutator.id" :value="mutator.id">
          {{ LolSpace.MutatorName[mutator.name] }}
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
      <label :class="labelClass" for="lobbyPassword">房间密码</label>
      <input :class="valueClass" type="password" id="lobbyPassword" name="lobbyPassword" required>
    </div>

    <div class="text-center mt-4 cursor-pointer" @click="createRoom" type="submit">创建自定义对局</div>
  </form>
</template>
<script setup lang="ts">
import { useGameMapStore } from '@/store/lol/useMapStore';
import { LolSpace } from '@/types/lol';
import { nextTick, ref, watch } from 'vue';
import { lolServices } from '../../services/client';
import { message } from '@tauri-apps/api/dialog';

const rowClass = "grid grid-cols-10 my-2";
const labelClass = "col-span-3";
const valueClass = "col-span-7 text-black";

const mapStore = useGameMapStore();

const formRef = ref<HTMLFormElement>();
const lobbyFetching = ref(false)
const teamSizeSelects = ref<number[]>([5, 4, 3, 2, 1]);
const gameMutators = ref<LolSpace.IMutator[]>([])

const mapChange = () => {
  const formData = new FormData(formRef.value);
  const mapId = formData.get('mapId') || '0';
  gameMutators.value = mapStore.customMaps?.find(m => m.mapId === +mapId)?.mutators || [];
}
const getGameMode = () => {
  const formData = new FormData(formRef.value);
  const mapId = formData.get('mapId') || '0';
  return mapStore.customMaps?.find(m => m.mapId === +mapId)?.gameMode || LolSpace.GameModes.PRACTICETOOL;
}
const createRoom = async () => {
  if (lobbyFetching.value) return;
  lobbyFetching.value = true;
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
        mutators: { id: +formValues.mutatorId },
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
    url: "lol-lobby/v2/lobby",
    data,
  });
  if (res?.httpStatus) {
    message(res.message, { type: 'error' })
  } else {
    message("创建成功")
  }
  lobbyFetching.value = false;
}

watch(() => mapStore.customMaps, () => {
  nextTick(() => {
    mapChange();
  })
}, { immediate: true })
</script>