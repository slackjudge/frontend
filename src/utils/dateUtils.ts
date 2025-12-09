import moment from 'moment';

/**
 * 날짜를 ISO 형식 문자열로 변환 (YYYY-MM-DD)
 * @param date 변환할 Date 객체
 * @returns "YYYY-MM-DD" 형식의 문자열
 */
export const formatDateToISO = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD');
};

/**
 * 날짜에서 연, 월, 일을 추출
 * @param date Date 객체
 * @returns { year: number, month: number, day: number } 객체
 * @note month는 1-12 범위 (getMonth() + 1)
 */
export const getYearMonthDay = (date: Date): { year: number; month: number; day: number } => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

/**
 * 날짜를 한국어 형식으로 변환 (YYYY년 M월)
 * @param date 변환할 Date 객체
 * @returns "YYYY년 M월" 형식의 문자열
 */
export const formatDateToKorean = (date: Date): string => {
  return moment(date).format('YYYY년 M월');
};

/**
 * 날짜에서 일(day)만 추출하여 포맷팅
 * @param date 변환할 Date 객체
 * @returns "D" 형식의 문자열 (1-31)
 */
export const formatDay = (date: Date): string => {
  return moment(date).format('D');
};

/**
 * 오늘 날짜를 ISO 형식 문자열로 반환 (YYYY-MM-DD)
 * @returns 오늘 날짜의 "YYYY-MM-DD" 형식 문자열
 */
export const getTodayISOString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Date 객체에서 연도와 월만 추출
 * @param date Date 객체
 * @returns { year: number, month: number } 객체
 * @note month는 1-12 범위 (getMonth() + 1)
 */
export const getYearMonth = (date: Date): { year: number; month: number } => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};
