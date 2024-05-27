import { LolEnum } from "@/types/lolEnum";

export namespace LolConstants {
  /**
 * 对局目录
 * @FROM
 * 1. /lol-game-queues/v1/custom
 * 2. /lol-game-queues/v1/queues
 */
  export enum QueueCategory {
    PvP = "PvP",
    VersusAi = "VersusAi",
    Practice= 'PRACTICETOOL',
    Custom = "Custom",
  }
  export const queueCategoriesMap = {
    [QueueCategory.PvP]: "玩家对战",
    [QueueCategory.VersusAi]: "人机对战",
    [QueueCategory.Practice]: "训练模式",
    [QueueCategory.Custom]: "自定义对局"
  }
  export const queueCategories = Object.keys(queueCategoriesMap).map((key) => {
    const _key = key as QueueCategory;
    return {
      key: _key,
      name: queueCategoriesMap[_key],
    }
  })
  export const gameModeOpts = {
    [LolEnum.GameModes.CLASSIC]: '召唤师峡谷',
    [LolEnum.GameModes.ARAM]: '嚎哭深渊',
    [LolEnum.GameModes.TFT]: '云顶之奕',
    [LolEnum.GameModes.URF]: '无限乱斗',
    [LolEnum.GameModes.CHERRY]: '斗魂竞技场',
    [LolEnum.GameModes.NEXUSBLITZ]: '极限闪击',
    [LolEnum.GameModes.TUTORIAL_MODULE_1]: '新手教程 第一部分',
    [LolEnum.GameModes.TUTORIAL_MODULE_2]: '新手教程 第二部分',
    [LolEnum.GameModes.TUTORIAL_MODULE_3]: '新手教程 第三部分',
    [LolEnum.GameModes.ULTBOOK]: '终极魔典',
    [LolEnum.GameModes.ONEFORALL]: '克隆大作战',
    [LolEnum.GameModes.ASSASSINATE]: '红月决',
    [LolEnum.GameModes.DOOMBOTSTEEMO]: '末日人工智能',
    [LolEnum.GameModes.SNOWURF]: '冰雪无限火力',
    [LolEnum.GameModes.PRACTICETOOL]: '训练模式',
    [LolEnum.GameModes.KINGPORO]: '魄罗大乱斗',
    [LolEnum.GameModes.FIRSTBLOOD]: '大对决',
  };
  export const mutatorNameOpts = {
    [LolEnum.MutatorName.GAME_CFG_PICK_BLIND]: "自选模式",
    [LolEnum.MutatorName.GAME_CFG_DRAFT_STD]: '征召模式',
    [LolEnum.MutatorName.GAME_CFG_PICK_RANDOM]: "全随机模式",
    [LolEnum.MutatorName.GAME_CFG_DRAFT_TOURNAMENT]: "竞技征召模式",
  };
  export const spectatorPolicyOpts = {
    [LolEnum.SpectatorPolicy.AllAllowed]: '允许所有人',
    [LolEnum.SpectatorPolicy.LobbyAllowed]: '只允许房间内玩家',
    [LolEnum.SpectatorPolicy.NotAllowed]: '不允许',
  }
}