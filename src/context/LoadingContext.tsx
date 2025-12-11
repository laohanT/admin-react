// 创建一个简单的loading Context
import { createContext, ReactNode, useContext, useState } from "react"
interface ContextProps {
    loadingInit: boolean,
    startLoading: () => void
    stopLoading: () => void
}
const loadingContext = createContext({} as ContextProps)
export const useLoading = () => useContext(loadingContext)
interface childrenProps {
    children: ReactNode
}
export const LoadingProvider = ({ children }: childrenProps) => {
    const [loadingInit, setLoading] = useState<boolean>(false)
    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)
    return (
        <loadingContext.Provider value={{ loadingInit, startLoading, stopLoading }}>
            {children}
        </loadingContext.Provider>
    )
}