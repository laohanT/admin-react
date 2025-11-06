import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd"
import { useState } from "react";

const items: MenuProps['items'] = [
    {
        label: (
            <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                1st menu item
            </a>
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