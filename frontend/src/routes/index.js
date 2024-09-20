import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import LandingPage from "../pages/LandingPage/LandingPage"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import RegisterPage from "../pages/RegisterPage/RegisterPage"
import MyAccountPage from "../pages/MyAccountPage/MyAccountPage"

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
        path: '/auth/login',
        page: LoginPage,
    },{
        path: '/auth/register',
        page: RegisterPage,
    },{
        path: '/myaccount',
        page: MyAccountPage, 
        isShowDashboard: true,
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