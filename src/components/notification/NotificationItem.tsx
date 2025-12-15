import speakerIcon from '@/assets/icons/icon_speaker.svg';

interface NotificationItemProps {
    id: number;
    message: string;
    date: string;
}

export default function NotificationItem({id, message, date} : NotificationItemProps) {
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