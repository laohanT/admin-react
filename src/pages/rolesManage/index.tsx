import { useEffect, useState } from "react"
import { rolesAllGet, rolesPost } from '../../api/roles'
import { ProColumns, ProTable } from "@ant-design/pro-components"
import { Button, Form, Input, message, Modal, Space } from "antd"
import { FormProps, InputProps } from "antd/lib"
import { pinyin } from "pinyin-pro"
import dayjs from "dayjs"
import { handleResponseData } from "../../utils/utils"
/**
 * 角色管理
*/

type FormItem = {
    name: string,
    slug: string
}
export default () => {
    const [dataSource, setDataSource] = useState<RolesProps.TableProps[]>()
    const [open, setOpen] = useState<boolean>(false)

    const [form] = Form.useForm()

    const columns: ProColumns<RolesProps.TableProps>[] = [
        {
            title: "序号",
            search: false,
            render: (_, record, index) => {
                return index + 1

            },
            align: "center"
        },
        {
            dataIndex: "name",
            title: "姓名",
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
    ]

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
            console.log(error, 'error');
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    // 点击新建
    const clickAdd = async () => {
        setOpen(true)
    }

    const onFinish: FormProps["onFinish"] = async ({ name, slug }) => {
        const res = await rolesPost({
            name,
            slug
        })
        if (res.status == 0) {
            message.success(res.message)
            onCancel()
        } else {
            message.error(res.message || "新增失败")
        }
    }

    const onChangeName: InputProps["onChange"] = async () => {
        const name: string = form.getFieldValue("name")
        if (name) {
            const pinyinText = pinyin(name, {
                toneType: 'none',
                type: "string"
            })
            const splitArr = pinyinText.split(" ")
            let text = ''
            splitArr.forEach(item => {
                const sliceText = item.slice(0, 1)
                text += sliceText
            })
            form.setFieldValue("slug", text)
        } else {
            form.setFieldValue("slug", '')
        }

    }

    const onCancel = async () => {
        form.resetFields()
        setOpen(false)
    }
    return (
        <>
            {/* <h2>角色管理</h2> */}
            <ProTable<RolesProps.TableProps>
                columns={columns}
                toolbar={{
                    actions: [
                        <Button type="primary" onClick={clickAdd}>新建</Button>
                    ]
                }}
                dataSource={dataSource}
                rowKey={"id"}
            ></ProTable>

            <Modal open={open} title="新建" footer={null} onCancel={onCancel} destroyOnHidden>
                <Form form={form} labelAlign="right" labelCol={{ span: 4 }} onFinish={onFinish}>
                    <Form.Item<FormItem> name="name" label={'角色名称'} rules={[{ required: true, message: "请输入角色名称" }]}>
                        <Input placeholder="请输入角色名称" onChange={onChangeName} />
                    </Form.Item>
                    <Form.Item<FormItem> name="slug" label={'英文名'}>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label={null} style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCancel}>关闭</Button>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}