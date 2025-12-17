import { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { apiFetch } from '@/api/client/httpClient';

interface Notification {
  id: number;
  message: string;
  date: string;
}

/*==========================
*
* 서버에서 알림 목록을 조회하여 리스트로 렌더링하는 컴포넌트
*
* @parm -
* @return JSX.Element 알림 목록 UI
* @author 김경민
* @version 1.0.0
* @date 2025-12-15
*
==========================**/

export default function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await apiFetch<Notification[]>('/notification', {
                method: 'GET',
                });
                setNotifications(res.data);
            } catch (err) {
                console.error('알림 조회 실패', err);
                setError('알림을 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (error) {
        return (
        <div className="text-sm text-red-500 py-4">
            {error}
        </div>
        );
    }

    if (loading) {
        return (
        <div className="text-sm text-gray-400 py-4">
            알림을 불러오는 중입니다...
        </div>
        );
    }

    if (notifications.length === 0) {
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