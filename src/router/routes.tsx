import { ApplicationMenu, Home, System } from "@icon-park/react";
import { lazy, ReactNode } from "react";
import { Navigate } from "react-router-dom";
const Login = lazy(() => import("../pages/Login"))
const HomePage = lazy(() => import("../pages/weclome"))
const StorePage = lazy(() => import("../pages/counter"))
interface RouteConfig {
    path: string,
    element?: ReactNode,
    name?: string,
    icon?: ReactNode,
    children?: RouteConfig[],
    hidden?: boolean

}

const routes: RouteConfig[] = [
    {
        path: "/",
        element: <Navigate to={"/home"} />
    },

    {
        path: "/login",
        name: "登录",
        icon: <Home theme="outline" size="18" />,
        element: <Login />,
        hidden: true
    },

    {
        path: "/home",
        name: "首页",
        icon: <Home theme="outline" size="18" />,
        element: <HomePage />
    },
    {
        path: "/system",
        name: "系统管理",
        icon: <System theme="outline" size="18" />,
        children: [
            {
                path: "menuList",
                name: "菜单管理",
                icon: <ApplicationMenu theme="outline" size="18" />,
                element: <HomePage />,

            },
            // {
            //     path: "users",
            //     icon: <People theme="outline" size="18" />,
            //     element: <Hello />,
            //     name: "成员管理",
            // },
            {
                path: "counter",
                element: <StorePage />,
                name: "Store测试",
            }
        ]
    }
]

interface MenuItem {
    key: string,
    label: string,
    icon: ReactNode,
    children?: MenuItem[]
}
// 处理路由表转为MenuItems
const handleRoutes = (routes: RouteConfig[]): MenuItem[] => {
    let routesArr: MenuItem[] = []

    routes.forEach(item => {
        const menuItem: MenuItem = {
            key: item.path,
            label: item.name || item.path,
            icon: item.icon,
        }

        if (item.children && item.children?.length > 0) {
            const childItems = handleRoutes(item.children)
            if (childItems.length > 0) {
                menuItem.children = childItems
            }
        }
        if (!item.hidden) {
            routesArr.push(menuItem)
        }
        routesArr = routesArr.filter(item => item.key !== '/')
    })
    return routesArr
}



export const menuItems = handleRoutes(routes)
export default routes



