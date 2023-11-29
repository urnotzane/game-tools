export namespace LolSpace {
  export interface BanChamp {
    id: number;
    imgUrl: string;
    name: string;
  }
  export enum TeamType {
    blue = 100,
    red = 200
  }
  export enum PlayerPositions {
    /** 上 */
    Top,
    /** 野 */
    Jungle,
    /** 中 */
    Mid,
    /** 下 */
    Bot,
    /** 辅 */
    Support,
  }
  export interface Summoner {
    accountId:number;
    displayName:string;
    gameName:string;
    internalName:string;
    nameChangeFlag:boolean;
    percentCompleteForNextLevel:number;
    privacy:string;
    profileIconId:number;
    puuid:string;
    rerollPoints:RerollPoint;
    summonerId:number;
    summonerLevel:number;
    tagLine:string;
    unnamed:boolean;
    xpSinceLastLevel:number;
    xpUntilNextLevel:number;
  }
  
  export interface RerollPoint {
    currentPoints:number;
    maxRolls:number;
    numberOfRolls:number;
    pointsCostToRoll:number;
    pointsToReroll:number;
  }
  export interface ChampSelectSession {
    actions:IAction[][];
    allowBattleBoost:boolean;
    allowDuplicatePicks:boolean;
    allowLockedEvents:boolean;
    allowRerolling:boolean;
    allowSkinSelection:boolean;
    bans:IBan;
    benchChampions:void /* undefined */[];
    benchEnabled:boolean;
    boostableSkinCount:number;
    chatDetails:IChatDetail;
    counter:number;
    gameId:number;
    hasSimultaneousBans:boolean;
    hasSimultaneousPicks:boolean;
    isCustomGame:boolean;
    isSpectating:boolean;
    localPlayerCellId:number;
    lockedEventIndex:number;
    myTeam:IMyTeam[];
    pickOrderSwaps:void /* undefined */[];
    recoveryCounter:number;
    rerollsRemaining:number;
    skipChampionSelect:boolean;
    theirTeam:ITheirTeam[];
    timer:ITimer;
    trades:ITrad[];
  }
  
  export interface ITrad {
    cellId:number;
    id:number;
    state:string;
  }
  
  export interface ITimer {
    adjustedTimeLeftInPhase:number;
    internalNowInEpochMs:number;
    isInfinite:boolean;
    phase:string;
    totalTimeInPhase:number;
  }
  
  export interface ITheirTeam {
    assignedPosition:string;
    cellId:number;
    championId:number;
    championPickIntent:number;
    nameVisibilityType:string;
    obfuscatedPuuid:string;
    obfuscatedSummonerId:number;
    puuid:string;
    selectedSkinId:number;
    spell1Id:number;
    spell2Id:number;
    summonerId:number;
    team:number;
    wardSkinId:number;
  }
  
  export interface IMyTeam {
    assignedPosition:string;
    cellId:number;
    championId:number;
    championPickIntent:number;
    nameVisibilityType:string;
    obfuscatedPuuid:string;
    obfuscatedSummonerId:number;
    puuid:string;
    selectedSkinId:number;
    spell1Id:number;
    spell2Id:number;
    summonerId:number;
    team:number;
    wardSkinId:number;
  }
  
  export interface IChatDetail {
    mucJwtDto:IMucJwtDto;
    multiUserChatId:string;
    multiUserChatPassword:string;
  }
  
  export interface IMucJwtDto {
    channelClaim:string;
    domain:string;
    jwt:string;
    targetRegion:string;
  }
  
  export interface IBan {
    myTeamBans:void /* undefined */[];
    numBans:number;
    theirTeamBans:number[];
  }
  
  export interface IAction {
    actorCellId:number;
    championId:number;
    completed:boolean;
    id:number;
    isAllyAction:boolean;
    isInProgress:boolean;
    pickTurn:number;
    type:string;
  }
}
