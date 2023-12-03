<template>
  <div>
    <div :class="rowClass">
      <label :class="labelClass" for="room-name">房间名称</label>
      <input :class="valueClass" type="text" id="room-name" name="room-name" required>
    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="room-people">房间人数</label>
      <input :class="valueClass" type="number" id="room-people" name="room-people" required>

    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="password">密码</label>
      <input :class="valueClass" type="password" id="password" name="password" required>

    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="game-map">比赛地图</label>
      <select :class="valueClass" id="game-map" name="game-map" required>
        <option value="map1">地图1</option>
        <option value="map2">地图2</option>
        <option value="map3">地图3</option>
      </select>

    </div>
    <div :class="rowClass">
      <label :class="labelClass" for="game-mode">比赛模式</label>
      <select :class="valueClass" id="game-mode" name="game-mode" required>
        <option value="mode1">模式1</option>
        <option value="mode2">模式2</option>
        <option value="mode3">模式3</option>
      </select>
    </div>

    <div class="text-center mt-4 cursor-pointer" @click="createRoom" type="submit">创建房间</div>
  </div>
</template>
<script setup lang="ts">
import { LolSpace } from '@/types/lol';
import { lolServices } from '../services/client';

const rowClass = "grid grid-cols-10 my-2";
const labelClass = "col-span-3";
const valueClass = "col-span-7 text-black";

const createRoom = async () => {
  const res = await lolServices({
    method: LolSpace.Method['post'],
    url: "/lol-lobby/v2/lobby",
    data: {
      'customGameLobby': {
        'configuration': {
          'gameMode': 'PRACTICETOOL',
          'gameMutator': '',
          'gameServerRegion': '',
          'mapId': 11,
          'mutators': { 'id': 1 },
          'spectatorPolicy': 'AllAllowed',
          'teamSize': 5
        },
        'lobbyName': 'JSxRust',
        'lobbyPassword': '321'
      },
      'isCustom': true,
    }
  });
  console.log('createRoom', res);

}
</script>