import { useEffect, useState } from "react"

export const useLogin = () => {
    const [isLogin, setIslogin] = useState<boolean>(false)

    // 检查登录状态
    const checkLoginStatus = () => {
        const token = window.sessionStorage.getItem('access_token')
        setIslogin(!!isLogin)
    }
    // 存储token
    const setStorage = (token: string) => {
        window.sessionStorage.setItem('access_token', token)
        setIslogin(true)
    }
    // 删除token
    const removeStorage = () => {
        window.sessionStorage.removeItem('access_token')
        setIslogin(false)
    }

    useEffect(() => {
        checkLoginStatus()
        // 监听storage变化
        const handleStorageChange = () => {
            console.log('我起作用了吗？');
            checkLoginStatus()
        }
        window.addEventListener("storage", handleStorageChange)
        return () => {
            window.removeEventListener("storage", handleStorageChange)
        }
    })

    return {
        isLogin,
        setStorage,
        removeStorage,
        checkLoginStatus
    }
}