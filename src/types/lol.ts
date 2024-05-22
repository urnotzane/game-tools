import { LolConstants } from "@/constants/lol";
import { LolEnum } from "./lolEnum";

export namespace LolSpace {
  export interface RemoteData {
    remote_token: string;
    port: string;
  }
  export enum Method {
    get = 'GET',
    post = "POST",
    put = "PUT",
    delete = "DELETE"
  }
  export interface ServiceParams<P> {
    method: Method,
    url: string;
    data?: P;
  }
  export interface BanChamp {
    id: number;
    imgUrl: string;
    name: string;
    isInProgress?: boolean;
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
  export type QueueAvailability = "Available" | "PlatformDisabled"
  export interface Summoner {
    accountId: number;
    displayName: string;
    gameName: string;
    internalName: string;
    nameChangeFlag: boolean;
    percentCompleteForNextLevel: number;
    privacy: string;
    profileIconId: number;
    puuid: string;
    rerollPoints: RerollPoint;
    summonerId: number;
    summonerLevel: number;
    tagLine: string;
    unnamed: boolean;
    xpSinceLastLevel: number;
    xpUntilNextLevel: number;
  }

  export interface RerollPoint {
    currentPoints: number;
    maxRolls: number;
    numberOfRolls: number;
    pointsCostToRoll: number;
    pointsToReroll: number;
  }
  export interface ChampSelectSession {
    actions: IAction[][];
    allowBattleBoost: boolean;
    allowDuplicatePicks: boolean;
    allowLockedEvents: boolean;
    allowRerolling: boolean;
    allowSkinSelection: boolean;
    bans: IBan;
    benchChampions: void /* undefined */[];
    benchEnabled: boolean;
    boostableSkinCount: number;
    chatDetails: IChatDetail;
    counter: number;
    gameId: number;
    hasSimultaneousBans: boolean;
    hasSimultaneousPicks: boolean;
    isCustomGame: boolean;
    isSpectating: boolean;
    localPlayerCellId: number;
    lockedEventIndex: number;
    myTeam: TeamItem[];
    pickOrderSwaps: void /* undefined */[];
    recoveryCounter: number;
    rerollsRemaining: number;
    skipChampionSelect: boolean;
    theirTeam: TeamItem[];
    timer: ITimer;
    trades: ITrad[];
  }

  export interface ITrad {
    cellId: number;
    id: number;
    state: string;
  }

  export interface ITimer {
    adjustedTimeLeftInPhase: number;
    internalNowInEpochMs: number;
    isInfinite: boolean;
    phase: string;
    totalTimeInPhase: number;
  }

  export interface TeamItem {
    assignedPosition: string;
    cellId: number;
    championId: number;
    championPickIntent: number;
    nameVisibilityType: string;
    obfuscatedPuuid: string;
    obfuscatedSummonerId: number;
    puuid: string;
    selectedSkinId: number;
    spell1Id: number;
    spell2Id: number;
    summonerId: number;
    team: number;
    wardSkinId: number;
  }

  export interface IChatDetail {
    mucJwtDto: IMucJwtDto;
    multiUserChatId: string;
    multiUserChatPassword: string;
  }

  export interface IMucJwtDto {
    channelClaim: string;
    domain: string;
    jwt: string;
    targetRegion: string;
  }

  export interface IBan {
    myTeamBans: number[];
    numBans: number;
    theirTeamBans: number[];
  }

  export interface IAction {
    /** 
     * - 从1开始，从左往右依次递增
     * - 蓝方1~5
     * - 红方6~10
     */
    actorCellId: number;
    championId: number;
    completed: boolean;
    id: number;
    isAllyAction: boolean;
    isInProgress: boolean;
    pickTurn: number;
    type: "pick" | "ban";
  }
  export interface Champion {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: ChampInfo;
    image: ChampImage;
    tags: string[];
    partype: string;
    stats: ChampStat;
  }
  
  export interface Skin {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
  }
  export interface Leveltip {
    label: string[];
    effect: string[];
  }
  
  export interface Datavalue {}
  
  export interface Spell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    leveltip: Leveltip;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalue;
    effect: any[];
    effectBurn: any[];
    vars: any[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: ChampImage;
    resource: string;
  }
  
  export interface Passive {
    name: string;
    description: string;
    image: ChampImage;
  }
  
  export interface ChampDetail {
    id: string;
    key: string;
    name: string;
    title: string;
    image: ChampImage;
    skins: Skin[];
    lore: string;
    blurb: string;
    allytips: string[];
    enemytips: string[];
    tags: string[];
    partype: string;
    info: ChampInfo;
    stats: ChampStat;
    spells: Spell[];
    passive: Passive;
    recommended: any[];
  }
  
  export type ChampData = Record<string, ChampDetail>
  
  export interface ChampWrapper {
    type: string;
    format: string;
    version: string;
    data: ChampData;
  }
  export interface ChampStat {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  }

  export interface ChampImage {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }

  export interface ChampInfo {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  }

  export interface LobbySession {
    canStartActivity: boolean;
    gameConfig: GameConfig;
    invitations: Invitation[];
    localMember: LocalMember;
    members: Member[];
    mucJwtDto: MucJwtDto;
    multiUserChatId: string;
    multiUserChatPassword: string;
    partyId: string;
    partyType: string;
    restrictions?: any;
    scarcePositions: any[];
    warnings?: any;
  }
  export interface CustomTeam {
    allowedChangeActivity: boolean;
    allowedInviteOthers: boolean;
    allowedKickOthers: boolean;
    allowedStartActivity: boolean;
    allowedToggleInvite: boolean;
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    botId: string;
    firstPositionPreference: string;
    intraSubteamPosition?: any;
    isBot: boolean;
    isLeader: boolean;
    isSpectator: boolean;
    playerSlots: any[];
    puuid: string;
    ready: boolean;
    secondPositionPreference: string;
    showGhostedBanner: boolean;
    subteamIndex?: any;
    summonerIconId: number;
    summonerId: number;
    summonerInternalName: string;
    summonerLevel: number;
    summonerName: string;
    teamId: number;
    tftNPEQueueBypass?: any;
  }

  export interface GameConfig {
    allowablePremadeSizes: any[];
    customLobbyName: string;
    customMutatorName: string;
    customRewardsDisabledReasons: any[];
    customSpectatorPolicy: string;
    customSpectators: any[];
    customTeam100: CustomTeam[];
    customTeam200: CustomTeam[];
    gameMode: LolEnum.GameModes;
    isCustom: boolean;
    isLobbyFull: boolean;
    isTeamBuilderManaged: boolean;
    mapId: number;
    maxHumanPlayers: number;
    maxLobbySize: number;
    maxTeamSize: number;
    pickType: string;
    premadeSizeAllowed: boolean;
    queueId: number;
    shouldForceScarcePositionSelection: boolean;
    showPositionSelector: boolean;
    showQuickPlaySlotSelection: boolean;
  }

  export interface Invitation {
    invitationId: string;
    invitationType: string;
    state: string;
    timestamp: string;
    toSummonerId: number;
    toSummonerName: string;
  }

  export interface LocalMember {
    allowedChangeActivity: boolean;
    allowedInviteOthers: boolean;
    allowedKickOthers: boolean;
    allowedStartActivity: boolean;
    allowedToggleInvite: boolean;
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    botId: string;
    firstPositionPreference: string;
    intraSubteamPosition?: any;
    isBot: boolean;
    isLeader: boolean;
    isSpectator: boolean;
    playerSlots: any[];
    puuid: string;
    ready: boolean;
    secondPositionPreference: string;
    showGhostedBanner: boolean;
    subteamIndex?: any;
    summonerIconId: number;
    summonerId: number;
    summonerInternalName: string;
    summonerLevel: number;
    summonerName: string;
    teamId: number;
    tftNPEQueueBypass?: any;
  }

  export interface Member {
    allowedChangeActivity: boolean;
    allowedInviteOthers: boolean;
    allowedKickOthers: boolean;
    allowedStartActivity: boolean;
    allowedToggleInvite: boolean;
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    botId: string;
    firstPositionPreference: string;
    intraSubteamPosition?: any;
    isBot: boolean;
    isLeader: boolean;
    isSpectator: boolean;
    playerSlots: any[];
    puuid: string;
    ready: boolean;
    secondPositionPreference: string;
    showGhostedBanner: boolean;
    subteamIndex?: any;
    summonerIconId: number;
    summonerId: number;
    summonerInternalName: string;
    summonerLevel: number;
    summonerName: string;
    teamId: number;
    tftNPEQueueBypass?: any;
  }

  export interface MucJwtDto {
    channelClaim: string;
    domain: string;
    jwt: string;
    targetRegion: string;
  }
  export interface ChampSelectTimer {
    adjustedTimeLeftInPhase: number;
    internalNowInEpochMs: number;
    isInfinite: boolean;
    phase: "GAME_STARTING" | "BAN_PICK";
    totalTimeInPhase: number;
  }
  export enum SelectStageText {
    BAN_PICK = "BP进行中",
    GAME_STARTING = "比赛进行中"
  }

  /** @POST lol-lobby/v2/lobby 创建房间 */
  export interface LobbyBody {
    customGameLobby?: ICustomGameLobby;
    gameCustomization?: IGameCustomization;
    isCustom?: boolean;
    queueId?: number;
  }

  export interface IGameCustomization {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  }

  export interface ICustomGameLobby {
    configuration?: LobbyConfiguration;
    gameId?: number;
    lobbyName: string;
    lobbyPassword?: string;
    practiceGameRewardsDisabledReasons?: string[];
    spectators?: ISpectator[];
    teamOne?: ITeamOne[];
    teamTwo?: ITeamTwo[];
  }

  export interface ITeamTwo {
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    canInviteOthers: boolean;
    excludedPositionPreference: string;
    id: number;
    isBot: boolean;
    isOwner: boolean;
    isSpectator: boolean;
    positionPreferences: IPositionPreferenc_2;
    showPositionExcluder: boolean;
    summonerInternalName: string;
  }

  export interface IPositionPreferenc_2 {
    firstPreference: string;
    secondPreference: string;
  }

  export interface ITeamOne {
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    canInviteOthers: boolean;
    excludedPositionPreference: string;
    id: number;
    isBot: boolean;
    isOwner: boolean;
    isSpectator: boolean;
    positionPreferences: IPositionPreferenc_1;
    showPositionExcluder: boolean;
    summonerInternalName: string;
  }

  export interface IPositionPreferenc_1 {
    firstPreference: string;
    secondPreference: string;
  }

  export interface ISpectator {
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    canInviteOthers: boolean;
    excludedPositionPreference: string;
    id: number;
    isBot: boolean;
    isOwner: boolean;
    isSpectator: boolean;
    positionPreferences: IPositionPreferenc;
    showPositionExcluder: boolean;
    summonerInternalName: string;
  }

  export interface IPositionPreferenc {
    firstPreference: string;
    secondPreference: string;
  }

  export interface LobbyConfiguration {
    gameMode: LolEnum.GameModes;
    gameServerRegion?: string;
    gameTypeConfig?: IMutator;
    mapId: number;
    maxPlayerCount?: number;
    mutators?: Partial<IMutator>;
    spectatorPolicy?: string;
    teamSize: number;
    tournamentGameMode?: string;
    tournamentPassbackDataPacket?: string;
    tournamentPassbackUrl?: string;
  }

  export enum MutatorName {
    GAME_CFG_PICK_BLIND = "自选模式",
    GAME_CFG_DRAFT_STD = '征召模式',
    GAME_CFG_PICK_RANDOM = "全随机模式",
  }

  export interface IMutator {
    advancedLearningQuests: boolean;
    allowTrades: boolean;
    banMode: string;
    banTimerDuration: number;
    battleBoost: boolean;
    crossTeamChampionPool: boolean;
    deathMatch: boolean;
    doNotRemove: boolean;
    duplicatePick: boolean;
    exclusivePick: boolean;
    gameModeOverride: string;
    id: number;
    learningQuests: boolean;
    mainPickTimerDuration: number;
    maxAllowableBans: number;
    name: "GAME_CFG_PICK_BLIND" | "GAME_CFG_DRAFT_STD" | "GAME_CFG_PICK_RANDOM";
    numPlayersPerTeamOverride: number;
    onboardCoopBeginner: boolean;
    pickMode: string;
    postPickTimerDuration: number;
    reroll: boolean;
    teamChampionPool: boolean;
  }

  /** @GET /lol-game-queues/v1/queues 获取游戏模式 */
  export interface Queue {
    /** 允许组队的人数，比如匹配就是 `[1,2,3,4,5]` */
    allowablePremadeSizes: number[]
    areFreeChampionsAllowed: boolean
    assetMutator: string
    category: LolConstants.QueueCategory
    championsRequiredToPlay: number
    description: string
    detailedDescription: string
    gameMode: LolEnum.GameModes
    gameTypeConfig: IMutator
    id: number
    /** 是不是排位 */
    isRanked: boolean
    isTeamBuilderManaged: boolean
    isVisible: boolean;
    lastToggledOffTime: number
    lastToggledOnTime: number
    mapId: number
    maxDivisionForPremadeSize2: string
    maxTierForPremadeSize2: string
    maximumParticipantListSize: number
    minLevel: number
    minimumParticipantListSize: number
    name: string
    numPlayersPerTeam: number
    queueAvailability: QueueAvailability,
    queueRewards: QueueRewards
    removalFromGameAllowed: boolean
    removalFromGameDelayMinutes: number
    shortName: string
    showPositionSelector: boolean
    showQuickPlaySlotSelection: boolean
    spectatorEnabled: boolean
    type: string
  }

  export interface QueueRewards {
    isChampionPointsEnabled: boolean
    isIpEnabled: boolean
    isXpEnabled: boolean
    partySizeIpRewards: any[]
  }

  export interface GameMap {
    assets: Assets
    categorizedContentBundles: CategorizedContentBundles
    description: string
    gameMode: LolEnum.GameModes
    gameModeDescription: string
    gameModeName: string
    gameModeShortName: string
    gameMutator: string
    id: number
    isDefault: boolean
    isRGM: boolean
    locStrings: LocStrings
    mapStringId: string
    name: string
    perPositionDisallowedSummonerSpells: PerPositionDisallowedSummonerSpells
    perPositionRequiredSummonerSpells: PerPositionRequiredSummonerSpells
    platformId: string
    platformName: string
    properties: Properties
    tutorialCards: TutorialCard[]
  }

  export interface Assets {
    "champ-select-background-sound"?: string
    "champ-select-flyout-background"?: string
    "game-select-icon-active": string
    "game-select-icon-active-video": string
    "game-select-icon-default": string
    "game-select-icon-disabled": string
    "game-select-icon-hover": string
    "game-select-icon-intro-video": string
    "gameflow-background": string
    "gameflow-background-dark"?: string
    "gameselect-button-hover-sound": string
    "icon-defeat": string
    "icon-defeat-v2"?: string
    "icon-defeat-video"?: string
    "icon-empty": string
    "icon-hover"?: string
    "icon-leaver"?: string
    "icon-leaver-v2"?: string
    "icon-loss-forgiven-v2"?: string
    "icon-v2"?: string
    "icon-victory": string
    "icon-victory-video"?: string
    "music-inqueue-loop-sound": string
    "notification-background"?: string
    "notification-icon"?: string
    "parties-background": string
    "postgame-ambience-loop-sound"?: string
    "ready-check-background": string
    "ready-check-background-sound"?: string
    "sfx-ambience-pregame-loop-sound": string
    "social-icon-leaver"?: string
    "social-icon-victory"?: string
    "tutorial-bg"?: string
    "champ-select-skip-bg"?: string
    "set-announcement-background"?: string
    "set-announcement-right-panel-background"?: string
    "champ-select-planning-intro"?: string
    "map-north"?: string
    "map-south"?: string
    "champ-select-banphase-background-sound"?: string
    "generic-event-icon"?: string
  }

  export interface CategorizedContentBundles {
    set_announcement_modal?: SetAnnouncementModal
    GameEventInfoCards?: GameEventInfoCards
  }

  export interface SetAnnouncementModal {
    item1: Item1
    item2: Item2
    item3: Item3
  }

  export interface Item1 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface Item2 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface Item3 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface GameEventInfoCards {
    "0": N0
    "1": N1
    "2": N2
    "3": N3
    "4": N4
    "5": N5
    "6": N6
    IconSubtext: IconSubtext
  }

  export interface N0 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface N1 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface N2 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface N3 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface N4 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface N5 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface N6 {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface IconSubtext {
    body: string
    footer: string
    header: string
    imagePath: string
  }

  export interface LocStrings {
    tutorial_subheader?: string
    tutorial_title?: string
    set_announcement_confirm_button?: string
    set_announcement_set_name?: string
    set_announcement_splash_footer?: string
  }

  export interface PerPositionDisallowedSummonerSpells {
    bottom?: Bottom
    lane?: Lane
    middle?: Middle
    top?: Top
    utility?: Utility
  }

  export interface Bottom {
    spells: number[]
  }

  export interface Lane {
    spells: number[]
  }

  export interface Middle {
    spells: number[]
  }

  export interface Top {
    spells: number[]
  }

  export interface Utility {
    spells: number[]
  }

  export interface PerPositionRequiredSummonerSpells {
    any?: Any
    jungle?: Jungle
  }

  export interface Any {
    spells: number[]
  }

  export interface Jungle {
    spells: number[]
  }

  export interface Properties {
    suppressRunesMasteriesPerks: boolean
  }

  export interface TutorialCard {
    description: string
    footer: string
    header: string
    imagePath: string
  }
  export interface Subcategory {
    customSpectatorPolicies: any[];
    gameMode: LolEnum.GameModes;
    mapId: number;
    maxPlayerCount: number;
    maximumParticipantListSize: number;
    minLevel: number;
    minimumParticipantListSize: number;
    mutators: IMutator[];
    numPlayersPerTeam: number;
    queueAvailability: QueueAvailability;
  }

  export interface CustomGame {
    gameServerRegions?: any;
    queueAvailability: QueueAvailability;
    spectatorPolicies: any[];
    spectatorSlotLimit: number;
    subcategories: Subcategory[];
  }

  export interface EventLcuLoaded {
    url: string;
    token: string;
    port: string;
  }
  export interface GptMessage {
    role: string;
    content: string;
  }
  
  export interface Choice {
    finish_reason: string;
    message: GptMessage;
  }
  
  export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
  
  export interface GptData {
    created: number;
    id: string;
    model: string;
    version: string;
    choices: Choice[];
    usage: Usage;
  }
  export interface GptDataWaiting {
    active_job_id: string;
  }
  
  export interface Extra {}
  
  export interface GptRes {
    data: GptData & GptDataWaiting;
    status: number;
    extra: Extra;
    message: string;
    success: boolean;
  }
}

