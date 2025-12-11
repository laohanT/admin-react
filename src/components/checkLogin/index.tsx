import { JSX } from "react"
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'

const checkLogin = ({ children }: { children: JSX.Element }) => {
    const { isLogin } = useSelector((state: any) => state.auth)
    if (!isLogin) return <Navigate to={'/login'} />
    return children
}

export default checkLogin