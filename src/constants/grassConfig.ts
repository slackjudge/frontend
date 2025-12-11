/**
 * 잔디 히트맵 설정 상수
 * - 문제 수에 따른 degree 레벨 정의
 * - 각 degree별 색상 정보
 * - 문제 수 범위 정의
 */
export const GRASS_DEGREE_CONFIG = {
  // Degree 레벨 정의
  LEVELS: {
    NONE: 0,      // 문제 없음 (회색)
    LOW: 1,       // 낮은 활동 (노란색) - 1~2개
    MEDIUM: 2,    // 중간 활동 (주황색) - 3~5개
    HIGH: 3,      // 높은 활동 (진한 주황색) - 6개 이상
  },
  
  // 문제 수 범위 정의
  RANGES: {
    LOW: { min: 1, max: 2 },      // 1~2개
    MEDIUM: { min: 3, max: 5 },   // 3~5개
    HIGH: { min: 6, max: Infinity }, // 6개 이상
  },
  
  // 색상 정의 (CSS에서 사용되는 색상 값)
  COLORS: {
    0: {
      background: '#F3F4F6',
      text: '#555',
      description: '문제 없음 (회색)',
    },
    1: {
      background: '#FCD34D',
      text: '#333',
      description: '1~2개 문제 (노란색)',
    },
    2: {
      background: '#FB923C',
      text: '#FFFFFF',
      description: '3~5개 문제 (주황색)',
    },
    3: {
      background: '#ff6141',
      text: '#FFFFFF',
      description: '6개 이상 문제 (진한 주황색)',
    },
  },
} as const;

/**
 * Degree 레벨 타입
 */
export type GrassDegree = typeof GRASS_DEGREE_CONFIG.LEVELS[keyof typeof GRASS_DEGREE_CONFIG.LEVELS];
