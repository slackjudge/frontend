import speakerIcon from '@/assets/icons/icon_speaker.png';

interface NotificationItemProps {
    id: number;
    message: string;
    date: string;
}

/*==========================
*
* 단일 알림 아이템을 화면에 표시하는 컴포넌트
*
* @parm message 알림 메시지 내용
* @parm date 알림 발생 시각 문자열
* @return JSX.Element 알림 아이템 UI
* @author 김경민
* @version 1.0.0
* @date 2025-12-15
*
==========================**/

export default function NotificationItem({message, date} : NotificationItemProps) {
    return (
        <li className="w-[540px] bg-white rounded-xl px-4 py-3 shadow-sm">
            <div className="flex items-start gap-3">
                {/* 왼쪽: 아이콘 */}
                <div className="w-[56px] h-[56px] flex items-center justify-center shrink-0 pt-1">
                    <img
                        src={speakerIcon}
                        alt="알림"
                        className="w-[48px] h-[48px]"
                    />
                </div>

                {/* 가운데: 메시지 */}
                <div className="flex-1 text-base text-gray-800 whitespace-pre-line">
                    {message}
                </div>

                {/* 오른쪽: 날짜 */}
                <div className="text-xs text-gray-400 shrink-0 whitespace-nowrap pt-1">
                    {date}
                </div>
            </div>
        </li>
    );
}