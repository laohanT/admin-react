import { Button, message, Tree } from "antd"
import { routes } from "../../router/routes"
import { useEffect, useState } from "react";
import { ProCard, ProColumns, ProTable } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { rolesAllGet, rolesPost } from "../../api/roles";
import { TreeProps } from "antd/lib";
/**
 * 菜单管理
*/
const fieldNames = {
    title: "name",
    key: "path",
    children: "children"
}
const MenuManage = () => {
    // 树形数据
    const [treeData, setTreData] = useState([])
    // 表格数据
    const [dataSource, setDataSource] = useState<RolesProps.TableProps[]>()
    // 是否可修改
    const [isEdit, setIsEdit] = useState<boolean>(false)
    // 选中的菜单数据
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
    // 菜单是否可选
    const [checkable, setCheckable] = useState<boolean>(false)
    // 选中的菜单转化为一般数组
    const [checkedData, setCheckedData] = useState<(number | string | bigint)[]>([])
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    // 提示信息
    const [messageApi, contextHolder] = message.useMessage();
    // 查询角色列表
    const fetchData = async () => {
        try {
            const res = await rolesAllGet({
                pageNum: 1,
                pageSize: 10
            })
            if (res.status == 0) {
                setDataSource(res.data)
            }
            else
                setDataSource([])
        } catch (error) {
            messageApi.error('查询角色列表失败！')
            console.log(error, 'error');
        }
    }
    // 点击编辑
    const clickEdit = (menuList: (number | string | bigint)[]) => {
        console.log(menuList, 'menuList');
        if (menuList) {
            const expandData = menuList.filter(item => item.toString().indexOf('/') != -1)
            setExpandedKeys(expandData)
        }
        setCheckedKeys(menuList)
        setCheckable(true)
        setIsEdit(true)
    }
    // 点击保存
    const clickSave = async (id: number) => {
        try {
            const res = await rolesPost({
                actionType: "addMenu",
                id,
                menuList: checkedData
            })
            if (res.status == 0) {
                messageApi.success('保存成功！')
                fetchData()
                setCheckable(false)
                setIsEdit(false)
            } else {
                messageApi.error(res.message ? res.message : '新增失败！')
            }
        } catch (error) {
            console.log(error);
            messageApi.error('保存失败！')

        }

    }

    // 点击取消
    const clickCancel = () => {
        setCheckable(false)
        setIsEdit(false)
    }

    // 选中菜单回调
    const onCheck: TreeProps["onCheck"] = (checkedKeys) => {
        console.log(checkedKeys, 'checkedKeys');
        const arr: (number | string | bigint)[] = checkedKeys as React.Key[]
        setCheckedData(arr)
        setCheckedKeys(checkedKeys as React.Key[])
    }

    const onExpand: TreeProps["onExpand"] = (checkedKeys) => {
        console.log(checkedKeys);
        setExpandedKeys(checkedKeys)
    }


    useEffect(() => {
        const routeArr: any = routes.filter(item => item.name)
        setTreData(routeArr)
        fetchData()
    }, [])


    const columns: ProColumns<RolesProps.TableProps>[] = [
        {
            title: "ID",
            search: false,
            dataIndex: "id",
            align: "center"
        },
        {
            dataIndex: "name",
            title: "角色名称",
            align: "center"
        },
        {
            dataIndex: "slug",
            title: "英文名",
            search: false,
            align: "center"
        },
        {
            dataIndex: "createTime",
            title: "创建时间",
            render: (_, record) => {
                const text = dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss")
                return text
            },
            align: "center"
        },
        {
            dataIndex: "action",
            title: "操作",
            render: (_, record) => {
                return [
                    <Button
                        disabled={isEdit}
                        key={'edit'}
                        color="primary"
                        variant="link"
                        onClick={() => clickEdit(record.menuList)}
                    >
                        编辑
                    </Button>,
                    <Button
                        disabled={!isEdit}
                        key={'save'}
                        color="primary"
                        variant="link"
                        onClick={() => clickSave(record.id)}
                    >
                        保存
                    </Button>,
                    <Button
                        disabled={!isEdit}
                        key={'cacel'}
                        color="primary"
                        variant="link"
                        onClick={clickCancel}
                    >
                        取消
                    </Button>,

                ]
            },
            align: "center",
            search: false
        },
    ]


    return (
        <>
            <ProCard ghost style={{ height: "91vh" }}>
                <ProCard colSpan="300px" style={{ height: "100%", overflow: "auto" }} bordered>
                    <Tree
                        treeData={treeData}
                        fieldNames={fieldNames}
                        checkable={checkable}
                        checkedKeys={checkedKeys}
                        expandedKeys={expandedKeys}
                        onCheck={onCheck}
                        onExpand={onExpand}
                    ></Tree>
                </ProCard>
                <ProCard style={{ height: "100%" }}>
                    <ProTable<RolesProps.TableProps>
                        columns={columns}
                        options={false}
                        dataSource={dataSource}
                        rowKey={"id"}
                    ></ProTable>
                </ProCard>
            </ProCard>
            {contextHolder}
        </>
    )
}


export default MenuManage