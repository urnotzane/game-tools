<template>
  <div class="px-4 py-6 ">
    <a-form class="w-[50%] px-4 py-6 mx-auto bg-white" :model="lobbyValues" name="basic" :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }" autocomplete="off" labelAlign="left" @finish="createRoom">
      <a-form-item label="对局地图" name="queueId" :rules="requiredRules">
        <a-select v-model:value="lobbyValues.queueId" placeholder="请输入" @change="queueChange">
          <a-select-option v-for="gMap in queuesStore.availableQueues" :key="gMap.id" :value="gMap.id">{{ gMap.name }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="游戏类型" name="mutatorId" :rules="requiredRules">
        <a-select v-model:value="lobbyValues.mutatorId"  placeholder="请输入">
          <a-select-option v-for="mode in queuesStore.gameModes" :key="mode" :value="mode">{{ mode }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="队伍规模" name="teamSize" :rules="requiredRules">
        <a-select v-model:value="lobbyValues.teamSize" placeholder="请输入" >
          <a-select-option v-for="size in teamSizeSelects" :key="size" :value="size">{{ size }}人</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="房间名称" name="lobbyName" :rules="requiredRules">
        <a-input v-model:value="lobbyValues.lobbyName" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="房间密码" name="lobbyPassword">
        <a-input-password v-model:value="lobbyValues.lobbyPassword" placeholder="请输入" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { useGameMapStore } from '@/store/lol/useMapStore';
import { LolSpace } from '@/types/lol';
import { nextTick, ref, watch } from 'vue';
import { lolServices } from '../../services/client';
import { message } from '@tauri-apps/api/dialog';
import { useQueueStore } from '@/store/lol/useQueueStore';

const requiredRules = [{ required: true, message: '必填' }]

const mapStore = useGameMapStore();
const queuesStore = useQueueStore();

const formRef = ref<HTMLFormElement>();
const lobbyFetching = ref(false)
const teamSizeSelects = ref<number[]>([5, 4, 3, 2, 1]);
const gameMutators = ref<LolSpace.IMutator[]>([])
const lobbyValues = ref<Record<string, any>>({})

const queueChange = (queueId:number) => {
  const queue = queuesStore.availableQueues?.find(que => que.id === queueId);
  teamSizeSelects.value = queue?.allowablePremadeSizes || [];
  lobbyValues.value.mapId = queue?.mapId;
}
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