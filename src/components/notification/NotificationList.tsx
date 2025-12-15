import NotificationItem from './NotificationItem';

const mockNotifications = [
    {
        id: 10,
        message: `🏆 오늘 TOP 3
🥇 이준호 - 8 solved (+52)
🥈 박서연 - 6 solved (+36)
🥉 최민재 - 5 solved (+28)`,
        date: '12월 10일',
    },
    {
        id: 9,
        message: `🏆 오늘 TOP 3
🥇 김태윤 - 7 solved (+48)
🥈 정하은 - 6 solved (+40)
🥉 오지훈 - 4 solved (+24)`,
        date: '12월 9일',
    },
    {
        id: 8,
        message: `🏆 오늘 TOP 3
🥇 윤소민 - 6 solved (+42)
🥈 강민혁 - 5 solved (+32)
🥉 한유진 - 4 solved (+20)`,
        date: '12월 8일',
    },
    {
        id: 7,
        message: `🏆 오늘 TOP 3
🥇 백승우 - 9 solved (+60)
🥈 노지민 - 5 solved (+30)
🥉 임재현 - 4 solved (+18)`,
        date: '12월 7일',
    },
    {
        id: 6,
        message: `🏆 오늘 TOP 3
🥇 신동욱 - 6 solved (+38)
🥈 조은별 - 5 solved (+34)
🥉 문상훈 - 3 solved (+16)`,
        date: '12월 6일',
    },
    {
        id: 5,
        message: `🏆 오늘 TOP 3
🥇 홍지수 - 7 solved (+46)
🥈 차우진 - 5 solved (+30)
🥉 배수현 - 4 solved (+22)`,
        date: '12월 5일',
    },
    {
        id: 4,
        message: `🏆 오늘 TOP 3
🥇 서동현 - 6 solved (+40)
🥈 남가은 - 5 solved (+28)
🥉 유승민 - 4 solved (+20)`,
        date: '12월 4일',
    },
    {
        id: 3,
        message: `🏆 오늘 TOP 3
🥇 권민석 - 8 solved (+54)
🥈 김다은 - 5 solved (+30)
🥉 이현우 - 4 solved (+18)`,
        date: '12월 3일',
    },
    {
        id: 2,
        message: `🏆 오늘 TOP 3
🥇 송지후 - 7 solved (+48)
🥈 정수빈 - 5 solved (+32)
🥉 고은찬 - 4 solved (+21)`,
        date: '12월 2일',
    },
    {
        id: 1,
        message: `🏆 오늘 TOP 3
🥇 장민호 - 6 solved (+40)
🥈 류채원 - 5 solved (+30)
🥉 김영준 - 4 solved (+20)`,
        date: '12월 1일',
    },
];

export default function NotificationList() {
    return (
        <ul className="flex flex-col items-center gap-2">
            {mockNotifications.map((item) => (
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