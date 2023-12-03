import { LolSpace } from "@/types/lol";

/** 头像 */
export const formatChampIcon = (iconName:string) => `https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${iconName}`;

/** 竖版壁纸 */
export const formatChampLoading = (champIdText:string) => `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champIdText}_0.jpg`;

/** 壁纸 */
export const formatChampSplash = (champIdText: string, skinNum:number = 0) => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champIdText}_${skinNum}.jpg`;

export const formatBanActions = (actions:LolSpace.IAction[], champs:Record<string, LolSpace.Champion>): LolSpace.BanChamp[] => actions.map((action) => {
  const champ = champs[action.championId];
  return {
    id: action.championId,
    imgUrl: formatChampIcon(champ?.image?.full),
    name: champ?.name || '',
    isInProgress: action.isInProgress,
  };
});
