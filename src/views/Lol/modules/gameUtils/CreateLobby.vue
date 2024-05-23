<template>
  <div class="px-4 py-6 ">
    <a-tabs v-model:activeKey="category" class="w-[50%] px-6 py-4 mx-auto bg-white">
      <a-tab-pane v-for="category in LolConstants.queueCategories" :key="category.key" :tab="category.name">
        <a-form :model="lobbyValues" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
          autocomplete="off" labelAlign="left" @finish="createLobby">
          <a-form-item label="游戏地图" name="mapId" :rules="requiredRules">
            <a-select v-model:value="lobbyValues.mapId" placeholder="请输入" defaultActiveFirstOption>
              <a-select-option v-for="gMap in mapsForCategory" :key="gMap?.id" :value="gMap?.id">{{ gMap?.name
                }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="游戏模式" name="queueId" :rules="requiredRules">
            <a-select v-model:value="lobbyValues.queueId" placeholder="请输入" defaultActiveFirstOption>
              <a-select-option v-for="queue in modesForMap" :key="queue?.id" :value="queue?.id">{{ queue?.name
                }}</a-select-option>
            </a-select>
          </a-form-item>
          <template v-if="isCustom">
            <a-form-item label="队伍规模" name="teamSize" :rules="requiredRules">
              <a-select v-model:value="lobbyValues.teamSize" placeholder="请输入" defaultActiveFirstOption>
                <a-select-option v-for="size in 5" :key="size" :value="size">{{ size }}</a-select-option>
              </a-select>
            </a-form-item>
          </template>
          <template v-if="category.key === LolConstants.QueueCategory.Custom">
            <a-form-item label="允许观战" name="spectatorPolicy" :rules="requiredRules">
              <a-select v-model:value="lobbyValues.spectatorPolicy" placeholder="请输入" defaultActiveFirstOption>
                <a-select-option v-for="(policy, key) in LolConstants.spectatorPolicyOpts" :key="key" :value="key">{{ policy }}</a-select-option>
              </a-select>
            </a-form-item>
          </template>
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
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { useGameMapStore } from '@/store/lol/useMapStore';
import { LolSpace } from '@/types/lol';
import { computed, ref, watch } from 'vue';
import { lolServices } from '../../services/client';
import { message } from '@tauri-apps/api/dialog';
import { useQueueStore } from '@/store/lol/useQueueStore';
import { LolConstants } from '@/constants/lol';
import { LolEnum } from '@/types/lolEnum';
import { formateMapsForCategory, formateQueuesByMapId } from '@/utils/lol';
import { useLolInitStore } from '@/store/lol/useLolInitStore';

interface LobbyFormValues {
  mapId?: number;
  queueId?: number;
  lobbyName?: string;
  lobbyPassword?: string;
  teamSize?: number;
  spectatorPolicy?: LolEnum.SpectatorPolicy,
}
const requiredRules = [{ required: true, message: '必填' }];
/** 自定义对局的类型 */
const customCategories = [LolConstants.QueueCategory.Practice, LolConstants.QueueCategory.Custom];

const mapStore = useGameMapStore();
const queuesStore = useQueueStore();
const initialStore = useLolInitStore();

const lobbyFetching = ref(false)
const lobbyValues = ref<LobbyFormValues>({} as any)
const category = ref<LolConstants.QueueCategory>(LolConstants.QueueCategory.PvP);

/** 该目录下所有可创建的queues */
const queuesForCategory = computed(() => {
  let queues: LolSpace.Queue[] = []
  if (category.value === LolConstants.QueueCategory.PvP) {
    queues = queuesStore.pvpQueues
  } else if (category.value === LolConstants.QueueCategory.VersusAi) {
    queues = queuesStore.aiQueues
  } else if (category.value === LolConstants.QueueCategory.Practice) {
    queues = queuesStore.practiceQueues
  } else {
    queues = queuesStore.customQueues
  }
  return queues
});
// formatCustomMutatorsByMapId
/** 根据可选地图将queues进行分类 */
const queuesForMaps = computed(() => formateQueuesByMapId(queuesForCategory.value));
/** 该目录下所有可创建的地图 */
const mapsForCategory = computed(() => formateMapsForCategory(queuesForCategory.value, mapStore.gameMapsValues))
/** 某地图下对应的游戏模式，但是是保存在queue数据里 */
const modesForMap = computed(() => queuesForMaps.value[lobbyValues.value?.mapId || 0]);
const selectedQueue = computed(() => modesForMap.value?.find(m => m.id === lobbyValues.value?.queueId));
const isCustom = computed(() => customCategories.includes(category.value));

const lobbyBody = computed(() => {
  const data: LolSpace.LobbyBody = {
    queueId: selectedQueue.value?.id,
  }
  const config: LolSpace.LobbyConfiguration = {
    gameMode: selectedQueue.value?.gameMode || LolEnum.GameModes.PRACTICETOOL,
    mapId: lobbyValues.value.mapId,
    mutators: selectedQueue.value?.gameTypeConfig,
    gameTypeConfig: selectedQueue.value?.gameTypeConfig,
    spectatorPolicy: lobbyValues.value.spectatorPolicy,
    teamSize: selectedQueue.value?.maximumParticipantListSize || lobbyValues.value.teamSize,
  }
  const customGameLobby: LolSpace.LobbyBody['customGameLobby'] = {
    configuration: config,
    lobbyName: lobbyValues.value.lobbyName,
    lobbyPassword: lobbyValues.value.lobbyPassword,
  }

  if (isCustom.value) {
    data.customGameLobby = customGameLobby;
    data.isCustom = true
  }
  return data;
})
const createLobby = async () => {
  if (lobbyFetching.value) return;
  lobbyFetching.value = true;
  const res = await lolServices<LolSpace.LobbySession, LolSpace.LobbyBody>({
    method: LolSpace.Method['post'],
    url: "lol-lobby/v2/lobby",
    data: lobbyBody.value,
  });
  if (res?.httpStatus) {
    message(res.message, { type: 'error' })
  } else {
    message("创建成功")
  }
  lobbyFetching.value = false;
}

watch([mapsForCategory, modesForMap, initialStore.currentSummoner], () => {
  lobbyValues.value = {
    mapId: mapsForCategory.value?.[0]?.id,
    queueId: modesForMap.value?.[0]?.id,
    lobbyName: `${initialStore.currentSummoner?.displayName || "某某某"}的自建房间`,
    teamSize: 5,
    spectatorPolicy: LolEnum.SpectatorPolicy.LobbyAllowed,
  };
}, { immediate: true });
</script>
