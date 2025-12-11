import { ApplicationMenu, Home, Permissions, System, User } from "@icon-park/react";
import { lazy, ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/layout";
import CheckLogin from "../components/checkLogin";
const Login = lazy(() => import("../pages/Login"))
const HomePage = lazy(() => import("../pages/weclome"))
const StorePage = lazy(() => import("../pages/counter"))
const MenuManage = lazy(() => import('../pages/menuManage'))
const RolesManage = lazy(() => import('../pages/rolesManage'))
const AccountManage = lazy(() => import('../pages/accountManage'))
const TestPage = lazy(() => import("../pages/testPage"))
interface RouteConfig {
    path: string,
    element?: ReactNode,
    name?: string,
    icon?: ReactNode,
    children?: RouteConfig[],
    hidden?: boolean, // 是否在侧边栏隐藏菜单
}

export const routes: RouteConfig[] = [

    {
        path: "/login",
        name: "登录",
        icon: <Home theme="outline" size="18" />,
        element: <Login />,
        hidden: true
    },

    {
        path: "/test-page",
        name: "测试页面",
        element: <TestPage />,
        hidden: true
    },

    {
        path: "/",
        element: <CheckLogin><Layout /></CheckLogin>,
        name: "首页",
        icon: <Home theme="outline" size="18" />,
        children: [
            {
                path: "home",
                name: "首页",
                element: <HomePage />,
                hidden: true
            },
            {
                path: "",
                element: <Navigate to={'home'}></Navigate>,
                hidden: true
            }
        ]
    },

    {
        path: "/system",
        name: "系统管理",
        element: <Layout />,
        icon: <System theme="outline" size="18" />,
        children: [
            {
                path: "menuList",
                name: "菜单管理",
                icon: <ApplicationMenu theme="outline" size="18" />,
                element: <MenuManage />,

            },
            {
                path: "roleManage",
                name: "角色管理",
                icon: <Permissions theme="outline" size="18" />,
                element: <RolesManage />,
            },

            {
                path: "accountManage",
                name: "账户管理",
                icon: <User theme="outline" size="18" />,
                element: <AccountManage />,
            },
            {
                path: "counter",
                element: <StorePage />,
                name: "Store测试",
                hidden: true
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
        // routesArr = routesArr.filter(item => item.key !== '/')
    })
    return routesArr
}

// 建立路由表
const router = createBrowserRouter(routes)


router.subscribe((state) => {
    console.log(state, '路由subscribe');
})

export const menuItems = handleRoutes(routes)
export default router



