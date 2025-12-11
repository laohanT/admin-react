import { Flex, Tag } from "antd"
import { ReactNode, useEffect, useState } from "react"
import { menuItems } from "../../router/routes"
interface MenuItem {
    key: string,
    label: string,
    icon: ReactNode,
    children?: MenuItem[]
}
export default () => {
    const [items, setItmes] = useState<MenuItem[]>([])
    useEffect(() => { }, [])
    return (
        <>
            <Flex gap="4px 0" >
                {items.map(item => (
                    <Tag key={item.key} closable>{item.label}</Tag>
                ))}
            </Flex>

        </>
    )
}