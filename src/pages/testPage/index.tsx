import { Button, Spin } from "antd"
import { useState } from "react"
import CustomButton from '../../components/testButton'
import { useLoading } from "../../context/LoadingContext"

const TestPage = () => {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const { loadingInit, startLoading, stopLoading } = useLoading()

    console.log(loadingInit, startLoading, stopLoading, 'lllll');


    const fetchData = (): Promise<number> => {
        return new Promise((reslove) => {
            setTimeout(() => {
                reslove(count + 1)
            }, 1000);
        })
    }


    const onClick = async () => {
        startLoading()
        setLoading(true)
        console.log('1.同步的setLoading', loading);
        try {
            let res = await fetchData()
            setCount(res)
            console.log(count, 'await之后的setState');
        } catch (error) {
            // ...
        } finally {
            setLoading(false)
            stopLoading()
        }
    }


    return (
        <Spin spinning={loading}>
            <h1 onClick={onClick}>测试页面</h1>
            <span>{`${loading}`}</span>
            <p>{count}</p>
            <Button type="primary">单击按钮</Button>
            <Spin spinning={loadingInit}>
                <CustomButton onClick={onClick} label={"点我试试呢"} />
            </Spin>
        </Spin>
    )
}

export default TestPage