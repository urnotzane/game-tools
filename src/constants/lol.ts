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
  export const queueCategoriesMap:Record<QueueCategory, string> = {
    PvP: "玩家对战",
    VersusAi: "人机对战",
    PRACTICETOOL: "训练模式",
    Custom: "自定义对局"
  }
  export const queueCategories = Object.keys(queueCategoriesMap).map((key) => {
    const _key = key as QueueCategory;
    return {
      key: _key,
      name: queueCategoriesMap[_key],
    }
  })
  export const gameModeOpts = {
    CLASSIC: '召唤师峡谷',
    ARAM: '嚎哭深渊',
    TFT: '云顶之奕',
    URF: '无限乱斗',
    CHERRY: '斗魂竞技场',
    NEXUSBLITZ: '极限闪击',
    TUTORIAL_MODULE_1: '新手教程 第一部分',
    TUTORIAL_MODULE_2: '新手教程 第二部分',
    TUTORIAL_MODULE_3: '新手教程 第三部分',
    ULTBOOK: '终极魔典',
    ONEFORALL: '克隆大作战',
    ASSASSINATE: '红月决',
    DOOMBOTSTEEMO: '末日人工智能',
    SNOWURF: '冰雪无限火力',
    PRACTICETOOL: '训练模式',
    KINGPORO: '魄罗大乱斗',
    FIRSTBLOOD: '大对决',
  };
}