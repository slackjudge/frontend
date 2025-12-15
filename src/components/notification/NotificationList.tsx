import { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { apiFetch } from '@/api/client/httpClient';

interface Notification {
  id: number;
  message: string;
  date: string;
}

export default function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetchInitial();
  }, []);

  const fetchInitial = async () => {
    try {
      const res = await apiFetch<Notification[]>('/notification', {
        method: 'GET',
      });
      setNotifications(res.data);
    } catch (error) {
      console.error('알림 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-400 py-4">
        알림을 불러오는 중입니다...
      </div>
    );
  }

  if (!loading && notifications.length === 0) {
    return (
      <div className="text-sm text-gray-400 py-6">
        아직 받은 알림이 없습니다.
      </div>
    );
  }

  return (
    <ul className="flex flex-col items-center gap-2">
      {notifications.map((item) => (
        <NotificationItem
          key={item.id}
          id={item.id}
          message={item.message}
          date={item.date}
        />
      ))}
    </ul>
  );
}