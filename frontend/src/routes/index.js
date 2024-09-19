import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import HomePage from '../pages/HomePage/HomePage';
import HistoryPage from '../pages/HistoryPage/HistoryPage';
import ServicePage from '../pages/ServicePage/ServicePage';

export const routes = [
	{
		path: '/',
		page: LandingPage,
	},
	{
		path: '/home',
		page: HomePage,
		isShowDashboard: true,
	},
	{
		path: '*',
		page: NotFoundPage,
	},
	{
		path: '/history',
		page: HistoryPage,
		isShowDashboard: true,
	},
	{
		path: '/service',
		page: ServicePage,
		isShowDashboard: true,
	},
];
