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
  size_scale: number,
  experiences: {
    min: number;
    max: number;
  }
}

export interface LevelsConfig {
  levels: LEVELS[];
  levels_config: LevelConfig[];
  current_level: LEVELS;
  current_experiences: number;
}

export enum LevelOperator {
  Addition = "Addition",
  Subtraction = "Subtraction",
}

export interface LevelOperatorData {
  operator: LevelOperator;
}