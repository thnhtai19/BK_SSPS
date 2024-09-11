import NotFoundPage from "../components/NotFoundPage/NotFoundPage"
import LandingPage from "../pages/LangdingPage/LandingPage"
import HomePage from "../pages/HomePage/HomePage"

export const routes = [
    {
        path: '/',
        page: LandingPage,
    },{
        path: '/home',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '*',
        page: NotFoundPage
    }
]