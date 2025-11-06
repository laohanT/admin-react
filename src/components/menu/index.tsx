import { Menu, MenuProps } from "antd"
import { useNavigate } from "react-router"
import { menuItems } from "../../router/routes"
import { ReactNode, useEffect, useState } from "react"
type MenuItem = {
    key: string,
    label: string,
    icon: ReactNode,
    children?: MenuItem[]
}

type CustomMenuProps = {
    collapsed: boolean
}
const CustomMenu = ({ collapsed = false }: CustomMenuProps) => {
    const [items, setItems] = useState<MenuItem[]>([])
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([])
    const navigate = useNavigate()
    const onClick: MenuProps["onClick"] = ({ key, keyPath }) => {
        const path = keyPath.reverse().join('/')
        setDefaultSelectedKeys(keyPath)
        navigate(`${path}`)

    }
    const onOpenChange = (openKeys: string[]) => {
        console.log(openKeys);
    }

    useEffect(() => {
        setItems(menuItems)
    }, [])
    useEffect(() => {
        console.log(menuItems, 'menuItems');
        setDefaultSelectedKeys(["/home"])
    }, [menuItems])
    return (
        <Menu
            items={items}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            onClick={onClick}
            selectedKeys={defaultSelectedKeys}
            onOpenChange={onOpenChange}
        />
    )
}

export default CustomMenu