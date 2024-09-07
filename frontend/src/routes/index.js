import NotFoundPage from "../components/NotFoundPage/NotFoundPage"
import HomePage from "../pages/HomePage/HomePage"

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '*',
        page: NotFoundPage
    }
]