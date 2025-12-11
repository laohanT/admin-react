import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { ReactNode, useState } from "react"
import CustomMenu from "../components/menu"
import CustomHeader from '../components/header'
import CustomTags from '../components/tabs'
import { Outlet } from "react-router"

interface LayoutProps {
    children: ReactNode
}
const siderStyle: React.CSSProperties = {
    height: "100vh",
    overflow: "auto",
}

const headerStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "0 20px",
}
export default () => {
    const [collapsed, setCollapsed] = useState(false)
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Layout>
                <Sider style={siderStyle} collapsed={collapsed}>
                    <CustomMenu collapsed={collapsed} />
                </Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <CustomHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                    </Header>
                    <CustomTags />
                    {/* <Content>{children}</Content> */}
                    <Content> <Outlet /> </Content>
                    {/* <Footer >Footer</Footer> */}
                </Layout>
            </Layout>

        </>
    )
}