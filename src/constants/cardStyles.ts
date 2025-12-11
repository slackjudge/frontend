/**
 * 카드 스타일 상수
 * - DailySummary 컴포넌트에서 사용되는 공통 스타일
 * - 반복되는 className을 상수로 관리하여 유지보수성 향상
 */
export const CARD_STYLES = {
  // 기본 카드 스타일 (모든 카드에 공통)
  BASE: 'bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col items-center justify-center h-40',
  
  // 클릭 가능한 카드 (푼 문제 수)
  CLICKABLE: {
    base: 'group relative bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col items-center justify-center h-40',
    hover: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
    interactive: 'cursor-pointer disabled:cursor-default',
    disabled: 'disabled:hover:translate-y-0 disabled:hover:shadow-none',
    // 전체 클릭 가능한 카드 스타일 (조합)
    combined: 'group relative bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col items-center justify-center h-40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none',
  },
  
  // 카드 제목 스타일
  LABEL: 'text-gray-400 text-sm mb-3 font-medium',
  
  // 카드 값 스타일 (일반 숫자)
  VALUE: 'text-5xl font-medium text-gray-900',
  
  // 카드 값 스타일 (강조 - 푼 문제 수)
  VALUE_HIGHLIGHT: 'text-5xl font-medium text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300',
  
  // 구분선 스타일
  UNDERLINE: 'w-8 h-[4px] bg-gray-800 rounded-full',
  
  // 티어 이미지 컨테이너
  TIER_CONTAINER: 'flex items-center justify-center h-[48px]',
} as const;
