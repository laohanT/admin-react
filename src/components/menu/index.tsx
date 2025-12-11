import { Menu, MenuProps } from "antd"
import { useLocation, useNavigate } from "react-router"
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

interface ArrProps<T> {
    [index: number]: T,
    length: number
}
const CustomMenu = ({ collapsed = false }: CustomMenuProps) => {
    const localtion = useLocation()

    const [items, setItems] = useState<MenuItem[]>([])
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([])
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const [tagsList, setTagsList] = useState<{ key: string, pathname: string }[]>([])
    const navigate = useNavigate()
    const onClick: MenuProps["onClick"] = ({ key, keyPath }) => {
        if (key === '/') {
            setDefaultSelectedKeys(keyPath)
            navigate(`/`)
            return
        }
        const path = keyPath.reverse().join('/')
        setDefaultSelectedKeys(keyPath)
        navigate(`${path}`)
    }
    const onOpenChange = (openKeys: string[]) => {
        console.log(openKeys, 'openKeys');

        if (openKeys.length == 0)
            setOpenKeys([])
        else
            setOpenKeys(openKeys)

    }

    const handleMenu = (data: MenuItem[]) => {
        let arr = []
        data.forEach(item => {
            arr.push(item)
            if (item.children && item.children?.length > 0) {
                handleMenu(item.children)
            }
        })
    }

    useEffect(() => {
        setItems(menuItems)
        handleMenu(menuItems)
    }, [])
    useEffect(() => {
        const strArr: ArrProps<string> = localtion.pathname.slice(1).split('/')
        if (strArr.length > 1) {
            setOpenKeys([`/${strArr[0]}`])
            setDefaultSelectedKeys([`${strArr[strArr.length - 1]}`])
        } else
            setDefaultSelectedKeys(["/"])
    }, [menuItems])
    return (
        <Menu
            items={items}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            onClick={onClick}
            onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {

                // console.log(item, key, keyPath, selectedKeys, domEvent, '123');

            }}
            selectedKeys={defaultSelectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            forceSubMenuRender={false}
        />
    )
}

export default CustomMenu