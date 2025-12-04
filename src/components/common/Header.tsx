import { useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import subLogo from '../../../assets/images/sub_logo.png';

export default function Header() {
    const labels = [
        { title: '알림', path: '/main/notification' },
        { title: '랭킹', path: '/main/ranking' },
        { title: '마이페이지', path: '/main/my-page' },
    ];
    const nav = useNavigate();
    const [active, setActive] = useState('랭킹');

    //전환 버튼 클릭 시
    const handleClick = (title: string, path: string) => {
        setActive(title);
        nav(path);
    };

    //로고 클릭 시 -> /main/ranking으로 이동
    const handleClickHome = () => {
        nav('/main/ranking');
        setActive('랭킹');
    };

    return (
        <header className="w-full fixed top-0 h-20 flex items-center bg-white border-b border-gray-200 px-4">
            {/* 로고 이미지 */}
            <div className="flex-1 flex items-center">
                <img src={subLogo} alt="로고 이지미" onClick={handleClickHome} className="cursor-pointer" />
            </div>

            {/* 페이지 전환 바 */}
            <ul className="flex justify-center items-center bg-gray-300 rounded-lg py-1 px-2 gap-2 max-w-[680px] mx-auto">
                {labels.map(({ title, path }) => (
                    <li
                        key={title}
                        onClick={() => handleClick(title, path)}
                        className={`
              w-32 py-2 text-center text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 ease-in-out
              ${active === title ? 'bg-white shadow-xl text-black-200 scale-[1.1]' : 'bg-transparent scale-100 text-gray-500'}
            `}>
                        {title}
                    </li>
                ))}
            </ul>
            <div className="flex-1 flex"></div>
        </header>
    );
}
