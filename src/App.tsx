import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/auth/SignUpPage';
import RankingPage from './pages/RankingPage';
import NotificationPage from './pages/NotificationPage';
import MyPage from './pages/MyPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage/>} />
				<Route path="/not-found" element={<ErrorPage/>}/>
				<Route path="/sign-up/" element={<SignUpPage/>}/>
				<Route path="/main/ranking" element={<RankingPage/>}/>
				<Route path="/main/notification" element={<NotificationPage/>}/>
				<Route path="/main/my-page" element={<MyPage/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
