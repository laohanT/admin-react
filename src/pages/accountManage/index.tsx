import { ProColumns, ProTable, ProTableProps } from "@ant-design/pro-components"
import { useEffect, useState } from "react"
import { actionAllPost, queryAllGet } from "../../api/account"
import { Button, Form, Input, message, Modal, Select, Space, Switch } from "antd"
import { FormProps } from "antd/lib"
import { rolesAllGet } from "../../api/roles"
import JSEncrypt from "jsencrypt"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

// TODO 加解密
/**
 *登录账户管理 
*/

const Account = () => {
    // 公共key
    const publicKey = useSelector((state: any) => state.crypto.publicKey)
    const [dataSource, setDataSource] = useState<AccountProps.tableItem[]>([])
    // 角色数据
    const [rolesDataSource, setRolesDataSource] = useState<RolesProps.TableProps[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [form] = Form.useForm()
    // 加密方法
    const [encryptor] = useState(new JSEncrypt())
    // 公共消息
    const [messageApi, contextHolder] = message.useMessage();
    // loading
    // const [tableLoading,setTableLoading]

    // 查询账号信息
    const fetchData = async () => {
        const res = await queryAllGet({
            pageSize: 10,
            pageNum: 1
        })
        if (res.status == 0) {
            let arr = res.data.map((item: AccountProps.tableItem & { isEnable?: boolean }) => {
                if (item.status == 0)
                    item.isEnable = true
                else
                    item.isEnable = false
                return item
            })
            setDataSource([...arr])
        }

        else
            setDataSource([])

    }
    // 查询角色信息
    const fetchRolesData = async () => {
        try {
            const res = await rolesAllGet({
                pageNum: 1,
                pageSize: 1000
            })
            if (res.status == 0) {
                setRolesDataSource(res.data)
            }

            else
                setRolesDataSource([])
        } catch (error) {
            console.log(error, 'error');
        }
    }
    // 关闭弹窗
    const onCancel = () => {
        form.resetFields()
        setOpen(false)
    }
    // 打开弹窗
    const openModal = () => {
        fetchRolesData()
        setOpen(true)
    }
    // 弹窗提交
    const onFinish: FormProps["onFinish"] = async ({ username, password, roleId }) => {
        const res = await actionAllPost({
            username: encryptor.encrypt(username),
            password: encryptor.encrypt(password),
            roleId,
        })
        if (res.status == 0)
            messageApi.success(res.message)
        else
            messageApi.error(res.message ? res.message : "新增失败！")
        onCancel()
        fetchData()
    }
    // 改变账号状态
    const changeAccountStatus = async (status: number, id: number) => {
        const params = {
            status,
            id,
            actionType: 'edit'
        }
        const res = await actionAllPost(params)
        if (res.status == 0) {
            messageApi.success('修改成功！')
            fetchData()
        } else
            messageApi.error('修改失败！')
    }
    // switch切换回调
    const switchChange = async (checked: boolean, record: AccountProps.tableItem & { isEnable?: boolean }) => {
        let status = record.isEnable ? 1 : 0
        await changeAccountStatus(status, record.id)
    }
    useEffect(() => {
        fetchData()
        encryptor.setPublicKey(publicKey)
    }, [])
    const columns: ProColumns<AccountProps.tableItem & { isEnable?: boolean }>[] = [
        // {
        //     title: "ID",
        //     dataIndex: "id",
        //     align: "center",
        //     search: false
        // },
        {
            title: "账号",
            dataIndex: "username",
            align: "center"
        },
        // {
        //     title: "密码",
        //     dataIndex: "password",
        //     align: "center",
        //     search: false,
        // },
        {
            title: "状态",
            dataIndex: "status",
            align: "center",
            valueType: "select",
            valueEnum: {
                0: '启用',
                1: "停用"
            },
            render: (_, record) => {
                return <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    checked={record.isEnable}
                    onChange={(checked) => switchChange(checked, record)}
                />
            }
        },
        {
            title: "创建时间",
            align: "center",
            search: false,
            render: (_, record) => {
                return dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        {
            title: "操作人",
            dataIndex: "operater",
            align: "center",
            search: false
        },
        {
            title: "操作",
            dataIndex: "action",
            align: "center",
            search: false,
            render: () => {
                return [
                    <Button key={'edit'} color="primary" variant="link">编辑</Button>
                ]
            }
        }

    ]
    return (
        <>
            <ProTable
                rowKey={'id'}
                columns={columns}
                dataSource={dataSource}
                options={false}
                toolbar={{
                    actions: [
                        <Button type="primary" key={'create'} onClick={openModal}>新建</Button >
                    ]
                }}

            />

            < Modal open={open} title={'新建'} footer={null} width={'30%'} onCancel={onCancel} >
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item<AccountProps.FormItem>
                        label={'账号'} name={"username"}
                        rules={[{ required: true, message: "请输入账号" }]}
                    >
                        <Input placeholder="请输入账号" />
                    </Form.Item>

                    <Form.Item<AccountProps.FormItem>
                        label={'密码'} name={"password"}
                        rules={[{ required: true, message: "请输入密码" }]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item<AccountProps.FormItem>
                        label={'角色'} name={"roleId"}
                        rules={[{ required: true, message: "请选择角色" }]}
                    >
                        <Select
                            options={rolesDataSource}
                            fieldNames={{
                                label: "name",
                                value: 'id'
                            }}
                            placeholder="请选择角色"
                        />
                    </Form.Item>

                    <Form.Item label={null} style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCancel}>取消</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Modal >

            {contextHolder}
        </>
    )

}

export default Account