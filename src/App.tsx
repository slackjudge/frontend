import { Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import RankingPage from './pages/RankingPage';
import NotificationPage from './pages/NotificationPage';
import MyPage from './pages/MyPage';
import Overlay from './components/common/Overlay';
import LoginPage from './pages/auth/LoginPage';
import SlackCallbackPage from '@/pages/auth/SlackCallbackPage';

function App() {
	return (
		<Overlay>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/not-found" element={<ErrorPage />} />
				<Route path="/sign-up/" element={<SignUpPage />} />
				<Route path="/main/ranking" element={<RankingPage />} />
				<Route path="/main/notification" element={<NotificationPage />} />
				<Route path="/main/my-page" element={<MyPage />} />

				<Route path="/oauth/slack/callback" element={<SlackCallbackPage />} />
			</Routes>
		</Overlay>
	);
}

export default App;
