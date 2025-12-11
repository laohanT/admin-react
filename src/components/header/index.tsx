import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Spin } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, loginout } from "../../store/slice/authSlice";
import { useNavigate } from "react-router";



const styleObj: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}
type HeaderProps = {
    collapsed: boolean,
    toggleCollapsed: () => void
}



const Header = ({ collapsed, toggleCollapsed }: HeaderProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isCheck } = useSelector((state: any) => state.auth)
    // 退出登录
    const clickLoginout = () => {
        dispatch(loginout())
        navigate('/login', { replace: true })
    }

    useEffect(() => {
        dispatch(checkLogin())
    }, [])

    const items: MenuProps['items'] = [
        {
            label: (
                <span onClick={clickLoginout}>
                    退出登录
                </span>
            ),
            key: '0',
        },
        {
            label: (
                <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
                    2nd menu item
                </a>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    if (!isCheck) return <Spin spinning={true}>加载中</Spin>
    return (
        <div style={styleObj}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    Click me
                </a>
            </Dropdown>
        </div>
    )
}

export default Header