import { useState, useEffect } from "react";

interface UseFetchOptions<T> {
  fetchFn: () => Promise<T>;
  dependencies?: unknown[];
  enabled?: boolean;
}

interface UseFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * 공통 API 데이터 페칭 훅
 * 
 * 비동기 데이터 로딩을 위한 재사용 가능한 커스텀 훅입니다.
 * 로딩 상태, 에러 상태, 데이터를 자동으로 관리하며,
 * 의존성이 변경되면 자동으로 데이터를 다시 가져옵니다.
 * 
 * @template T - 페칭할 데이터의 타입
 * @param fetchFn - 데이터를 가져오는 비동기 함수 
 * @param dependencies - 의존성 배열 (이 값들이 변경되면 자동으로 재요청, 기본값: [])
 * @param enabled - 훅 활성화 여부 (false면 요청하지 않음, 기본값: true)
 * @returns { data, isLoading, error, refetch }
 *   - data: 페칭된 데이터 (로딩 중이거나 에러 시 null)
 *   - isLoading: 로딩 중 여부 (boolean)
 *   - error: 에러 메시지 (에러 없으면 null)
 *   - refetch: 수동으로 데이터를 다시 가져오는 함수
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useFetch({
 *   fetchFn: async () => {
 *     const response = await axios.get('/api/users');
 *     return response.data;
 *   },
 *   dependencies: [userId], // userId가 변경되면 자동 재요청
 * });
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 * return <div>{data?.name}</div>;
 * ```
 */
export const useFetch = <T>({
  fetchFn,
  dependencies = [],
  enabled = true,
}: UseFetchOptions<T>): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (): Promise<void> => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      // API 통신 로직
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      // 실패시
      setError(
        err instanceof Error
          ? err.message
          : "데이터를 불러오는데 실패했습니다."
      );
      setData(null);
    } finally {
      // finally(공통)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, isLoading, error, refetch: getData };
}; 