<template>
  <div class="relative">
    <!-- ban高度为5vw，那么pick高度为15vw，所以整个BP部分高度为20vw，因此，直播画面高度为100% - 20vw -->
    <div class="w-full live p-4">
      <div class="">
        <div class="text-lg">
          当前账号：
          <span class="text-blue-500" v-if="currentSummoner">{{ currentSummoner?.displayName }}</span>
          <span class="text-red-500" v-else>未登录</span>
        </div>
      </div>
    </div>
    <!-- 根据LOL S13需要展示的内容，将横向屏幕分为12份
        分别对应是个Pick英雄和两个中间比分位
    -->
    <div class="w-full h-[3px] bg-white" />
    <Ban />
    <Pick />
  </div>
</template>

<script setup lang="ts">
import Ban from './modules/Ban.vue'
import Pick from './modules/Pick.vue'
import { onMounted, ref } from 'vue';
import { LolSpace } from '@/types/lol';
import { lolServices } from './services/client';

const currentSummoner = ref<LolSpace.Summoner>();
const bpSession = ref<LolSpace.ChampSelectSession>();

const getCurrentSummoner = async () => {
  const res = await lolServices<LolSpace.Summoner>({
    method: LolSpace.Method.get,
    url: "/lol-summoner/v1/current-summoner"
  });
  if (res?.httpStatus) return;
  currentSummoner.value = res;
}
const getChampSelectSession = async () => {
  const res = await lolServices<LolSpace.ChampSelectSession>({
    method: LolSpace.Method.get,
    url: "/lol-champ-select/v1/session"
  });
  if (res?.httpStatus) return;
  bpSession.value = {
  "actions": [
    [
      {
        "actorCellId": 0,
        "championId": 86,
        "completed": true,
        "id": 1,
        "isAllyAction": true,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 1,
        "championId": 115,
        "completed": true,
        "id": 2,
        "isAllyAction": true,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 2,
        "championId": 19,
        "completed": true,
        "id": 3,
        "isAllyAction": true,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 3,
        "championId": 12,
        "completed": true,
        "id": 4,
        "isAllyAction": true,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 4,
        "championId": 21,
        "completed": true,
        "id": 5,
        "isAllyAction": true,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 6,
        "championId": 32,
        "completed": true,
        "id": 6,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 7,
        "championId": 122,
        "completed": true,
        "id": 7,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 8,
        "championId": 86,
        "completed": true,
        "id": 8,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      },
      {
        "actorCellId": 9,
        "championId": 48,
        "completed": true,
        "id": 9,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "pick"
      }
    ],
    [
      {
        "actorCellId": 5,
        "championId": 523,
        "completed": true,
        "id": 10,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 2,
        "type": "ban"
      }
    ],
    [
      {
        "actorCellId": 5,
        "championId": 0,
        "completed": true,
        "id": 11,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 4,
        "type": "ban"
      }
    ],
    [
      {
        "actorCellId": 5,
        "championId": 105,
        "completed": true,
        "id": 12,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 6,
        "type": "ban"
      }
    ],
    [
      {
        "actorCellId": 5,
        "championId": 11,
        "completed": true,
        "id": 13,
        "isAllyAction": false,
        "isInProgress": false,
        "pickTurn": 1,
        "type": "pick"
      }
    ]
  ],
  "allowBattleBoost": false,
  "allowDuplicatePicks": false,
  "allowLockedEvents": false,
  "allowRerolling": false,
  "allowSkinSelection": true,
  "bans": {
    "myTeamBans": [],
    "numBans": 6,
    "theirTeamBans": [
      523,
      105
    ]
  },
  "benchChampions": [],
  "benchEnabled": false,
  "boostableSkinCount": 1,
  "chatDetails": {
    "mucJwtDto": {
      "channelClaim": "",
      "domain": "",
      "jwt": "",
      "targetRegion": ""
    },
    "multiUserChatId": "",
    "multiUserChatPassword": ""
  },
  "counter": -1,
  "gameId": 0,
  "hasSimultaneousBans": false,
  "hasSimultaneousPicks": false,
  "isCustomGame": true,
  "isSpectating": true,
  "localPlayerCellId": -1,
  "lockedEventIndex": -1,
  "myTeam": [
    {
      "assignedPosition": "",
      "cellId": 0,
      "championId": 86,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 86000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 1,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 1,
      "championId": 115,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 115000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 1,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 2,
      "championId": 19,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 19000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 1,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 3,
      "championId": 12,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 12000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 1,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 4,
      "championId": 21,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 21000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 1,
      "wardSkinId": -1
    }
  ],
  "pickOrderSwaps": [],
  "recoveryCounter": 0,
  "rerollsRemaining": 0,
  "skipChampionSelect": false,
  "theirTeam": [
    {
      "assignedPosition": "",
      "cellId": 5,
      "championId": 11,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "560bd6df-cfb5-53a0-bc29-9b471b17224d",
      "selectedSkinId": 11000,
      "spell1Id": 1,
      "spell2Id": 3,
      "summonerId": 2946916313,
      "team": 2,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 6,
      "championId": 32,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 32000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 2,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 7,
      "championId": 122,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 122000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 2,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 8,
      "championId": 86,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 86000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 2,
      "wardSkinId": -1
    },
    {
      "assignedPosition": "",
      "cellId": 9,
      "championId": 48,
      "championPickIntent": 0,
      "nameVisibilityType": "",
      "obfuscatedPuuid": "",
      "obfuscatedSummonerId": 0,
      "puuid": "",
      "selectedSkinId": 48000,
      "spell1Id": 18446744073709551615,
      "spell2Id": 18446744073709551615,
      "summonerId": 0,
      "team": 2,
      "wardSkinId": -1
    }
  ],
  "timer": {
    "adjustedTimeLeftInPhase": 29860,
    "internalNowInEpochMs": 1701141709685,
    "isInfinite": false,
    "phase": "FINALIZATION",
    "totalTimeInPhase": 32860
  },
  "trades": [
    {
      "cellId": 0,
      "id": 100,
      "state": "INVALID"
    },
    {
      "cellId": 1,
      "id": 101,
      "state": "INVALID"
    },
    {
      "cellId": 2,
      "id": 102,
      "state": "INVALID"
    },
    {
      "cellId": 3,
      "id": 103,
      "state": "INVALID"
    },
    {
      "cellId": 4,
      "id": 104,
      "state": "INVALID"
    }
  ]
};
}
onMounted(async () => {
  getCurrentSummoner();
  getChampSelectSession();
})
</script>
<style scoped lang="scss">
.live {
  height: calc(100vh - 219px);
}
</style>