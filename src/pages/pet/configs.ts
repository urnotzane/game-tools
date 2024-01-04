export const NORMAL_SIZE = {
  width: 300,
  height: 400,
};
/**
 * 成长等级
 */
export type LEVELS = 1|2|3|4|5;
export interface LevelConfig {
  level: LEVELS,
  name: string,
  sizeScale: number,
}
/**
 * 成长等级配置项
 */
export const LEVELS_CONFIG:LevelConfig[] = [
  {
    level: 1,
    name: '婴儿',
    sizeScale: 0.5,
  },
  {
    level: 2,
    name: '孩童',
    sizeScale: 0.6,
  },
  {
    level: 3,
    name: '少年',
    sizeScale: 0.7,
  },
  {
    level: 4,
    name: '成年',
    sizeScale: 0.9,
  },
  {
    level: 5,
    name: '青年',
    sizeScale: 1,
  },
]