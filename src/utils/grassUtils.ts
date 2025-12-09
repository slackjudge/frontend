import { GRASS_DEGREE_CONFIG } from '../constants/grassConfig';

/**
 * 문제 수에 따른 잔디 색상 degree 계산
 * @param count 푼 문제 수
 * @returns degree 값 (0-3)
 * - 0: 문제 없음 (회색)
 * - 1: 1-2개 문제 (노란색)
 * - 2: 3-5개 문제 (주황색)
 * - 3: 6개 이상 문제 (진한 주황색)
 */
export const calculateDegree = (count: number): number => {
  if (count === 0) return GRASS_DEGREE_CONFIG.LEVELS.NONE;
  
  if (count >= GRASS_DEGREE_CONFIG.RANGES.LOW.min && 
      count <= GRASS_DEGREE_CONFIG.RANGES.LOW.max) {
    return GRASS_DEGREE_CONFIG.LEVELS.LOW;
  }
  
  if (count >= GRASS_DEGREE_CONFIG.RANGES.MEDIUM.min && 
      count <= GRASS_DEGREE_CONFIG.RANGES.MEDIUM.max) {
    return GRASS_DEGREE_CONFIG.LEVELS.MEDIUM;
  }
  
  return GRASS_DEGREE_CONFIG.LEVELS.HIGH;
};
