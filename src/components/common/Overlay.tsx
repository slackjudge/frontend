import { useLocation } from 'react-router-dom';
import Header from './Header';

/**
 * 통합 레이아웃
 * @returns
 */
export default function Overlay({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const showHeader = location.pathname.startsWith('/main');

    return (
        <div
            className={
                showHeader
                    ? 'flex justify-center items-center min-h-[calc(100vh-5rem)] pt-20'
                    : 'flex justify-center items-center min-h-screen'
            }>
            {showHeader && <Header />}
            <main className={`${showHeader ? 'pt-20' : ''} flex flex-col justify-center items-center w-full`}>
                {children}
            </main>
        </div>
    );
}