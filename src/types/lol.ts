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
}