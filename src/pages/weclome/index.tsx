import { useEffect } from "react"
import { useSelector } from "react-redux"

const Welcome = () => {
    const store = useSelector((state: any) => state.user)
    useEffect(() => {

    }, [])
    return (
        <>
            <h2>欢迎来到React-admin系统</h2>
        </>
    )
}

export default Welcome