export namespace LolEnum {
  /** 
   * @FROM /lol-maps/v2/maps
   */
  export enum GameModes {
    CLASSIC = 'CLASSIC',
    ARAM = 'ARAM',
    TFT = 'TFT',
    URF = 'URF',
    CHERRY = 'CHERRY',
    NEXUSBLITZ = 'NEXUSBLITZ',
    TUTORIAL_MODULE_1 = 'TUTORIAL_MODULE_1',
    TUTORIAL_MODULE_2 = 'TUTORIAL_MODULE_2',
    TUTORIAL_MODULE_3 = 'TUTORIAL_MODULE_3',
    ULTBOOK = 'ULTBOOK',
    ONEFORALL = 'ONEFORALL',
    ASSASSINATE = 'ASSASSINATE',
    DOOMBOTSTEEMO = 'DOOMBOTSTEEMO',
    SNOWURF = 'SNOWURF',
    PRACTICETOOL = 'PRACTICETOOL',
    KINGPORO = 'KINGPORO',
    FIRSTBLOOD = 'FIRSTBLOOD',
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

  export enum MutatorName {
    GAME_CFG_PICK_BLIND = 'GAME_CFG_PICK_BLIND',
    GAME_CFG_DRAFT_STD ='GAME_CFG_DRAFT_STD',
    GAME_CFG_PICK_RANDOM = 'GAME_CFG_PICK_RANDOM',
    GAME_CFG_DRAFT_TOURNAMENT ='GAME_CFG_DRAFT_TOURNAMENT',
  };

  /** 房间观战选项 */
  export enum SpectatorPolicy {
    NotAllowed = "NotAllowed",
    AllAllowed = 'AllAllowed',
    LobbyAllowed = "LobbyAllowed"
  }
}