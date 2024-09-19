import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import LandingPage from "../pages/LandingPage/LandingPage"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import RegisterPage from "../pages/RegisterPage/RegisterPage"
import MyAccountPage from "../pages/MyAccountPage/MyAccountPage"

export const routes = [
    {
        path: '/',
        page: LandingPage,
    },{
        path: '/home',
        page: HomePage,
        isShowDashboard: true,
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
    },
    {
        path: '*',
        page: NotFoundPage
    }
]