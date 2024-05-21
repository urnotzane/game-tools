export namespace LolEnum {
  /** 
   * @FROM /lol-maps/v2/maps
   */
  export enum GameModes {
    CLASSIC = '召唤师峡谷',
    ARAM = '嚎哭深渊',
    TFT = '云顶之奕',
    URF = '无限乱斗',
    CHERRY = '斗魂竞技场',
    NEXUSBLITZ = '极限闪击',
    TUTORIAL_MODULE_1 = '新手教程 第一部分',
    TUTORIAL_MODULE_2 = '新手教程 第二部分',
    TUTORIAL_MODULE_3 = '新手教程 第三部分',
    ULTBOOK = '终极魔典',
    ONEFORALL = '克隆大作战',
    ASSASSINATE = '红月决',
    DOOMBOTSTEEMO = '末日人工智能',
    SNOWURF = '冰雪无限火力',
    PRACTICETOOL = '训练模式',
    KINGPORO = '魄罗大乱斗',
    FIRSTBLOOD = '大对决',
  }
  
  /** 
   * @FROM /lol-maps/v2/maps
   */
  export enum MapId {
    RoW = 30,
    TFT = 22,
    SR = 11,
    HA = 12,
    NB = 21,
  }
  export enum MapName {
    Row = '斗魂竞技场',
    TFT = '云顶之奕',
    SR = '召唤师峡谷',
    HA = '嚎哭深渊',
    NB = '极限闪击',
  }

  /**
   * 对局目录
   * @FROM 
   * 1. /lol-game-queues/v1/custom
   * 2. /lol-game-queues/v1/queues
   */
  export enum QueueCategories {
    /** 人对人 */
    PvP = "PvP",
    /** 人对人机 */
    VersusAi = 'VersusAi',
    /** 自定义对局 */
    Custom = "Custom",
  }
}