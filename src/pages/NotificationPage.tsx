import NotificationList from '@/components/notification/NotificationList';

/*==========================
*
* 알림 페이지의 레이아웃을 구성하는 컴포넌트
*
* @parm -
* @return JSX.Element 알림 페이지 UI
* @author 김경민
* @version 1.0.0
* @date 2025-12-15
*
==========================**/

export default function NotificationPage(){
    return (
        <section className="w-full flex justify-center pt-4">
            <NotificationList />
        </section>
    );
}