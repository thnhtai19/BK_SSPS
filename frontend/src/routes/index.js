import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import LandingPage from "../pages/LandingPage/LandingPage"
import HomePage from "../pages/HomePage/HomePage"
import BuyPage from "../pages/BuyPage/BuyPage"

export const routes = [
    {
        path: '/',
        page: LandingPage,
    },{
        path: '/home',
        page: HomePage,
    },{
        path: '/buy',
        page: BuyPage,
        isShowDashboard: true,
    },
    {
        path: '*',
        page: NotFoundPage
    }
]