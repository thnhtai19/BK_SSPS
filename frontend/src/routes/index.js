import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import LandingPage from "../pages/LandingPage/LandingPage"
import HomePage from "../pages/HomePage/HomePage"
import BuyPage from "../pages/BuyPage/BuyPage"
import BuySuccessPage from "../pages/BuySuccessPage/BuySuccessPage"
import BuyErrorPage from "../pages/BuyErrorPage/BuyErrorPage"

export const routes = [
    {
        path: '/',
        page: LandingPage,
    },{
        path: '/home',
        page: HomePage,
        isShowDashboard: true,
        pageIndex: 1,
    },{
        path: '/buy',
        page: BuyPage,
        isShowDashboard: true,
    },{
        path: '/buy/success',
        page: BuySuccessPage,
        isShowDashboard: true,
    },{
        path: '/buy/error',
        page: BuyErrorPage,
        isShowDashboard: true,
    },
    {
        path: '*',
        page: NotFoundPage
    }
]