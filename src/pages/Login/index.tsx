import { Button, Form, FormProps, Input, message } from "antd";
import { People, Key } from "@icon-park/react";
import { login } from "../../api/login";
import "./index.scss";
import { useEffect, useState } from "react";
import JSEncrypt from "jsencrypt";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../../store/slice/user";
import { useNavigate } from "react-router";
import { authLogin } from "../../store/slice/authSlice";
type FieldType = {
    account?: string,
    pwd?: string
}
const Login = () => {
    const publicKey = useSelector((state: any) => state.crypto.publicKey)
    const [encryptor] = useState(new JSEncrypt())
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish: FormProps["onFinish"] = async ({ account, pwd }) => {
        try {
            const params: Login.LoginForm = {
                account: encryptor.encrypt(account) as string,
                pwd: encryptor.encrypt(pwd) as string
            }
            const res: Login.LoginResponse<Slice.UserInfoProps> = await login(params)
            if (res.status == 0) {
                messageApi.success('登录成功！')
                dispatch(setUserState(res.data))
                const token = res.data!.token
                dispatch(authLogin(token))
                navigate('/', { replace: true })
            } else
                messageApi.error(res.message ? res.message : '登录失败！')
        } catch (error) {
            messageApi.error('登录异常！')
        }
    }





    useEffect(() => {
        encryptor.setPublicKey(publicKey)
    }, [publicKey])

    const [num, setnum] = useState(0)
    const [loading, setloading] = useState(false)
    return (
        <div className="login">
            <div className="login-form">
                <h2 onClick={() => setnum(num + 1)}>后台管理系统</h2>
                <Form name="loginForm" onFinish={onFinish}>
                    <Form.Item<FieldType>
                        rules={[{ required: true, message: "请输入账号" }]}
                        name="account"
                    >
                        <Input
                            placeholder="请输入账号"
                            prefix={<People />}
                            style={{
                                height: "40px",
                                fontSize: "16px",
                            }}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        rules={[{ required: true, message: "请输入密码" }]}
                        name="pwd"
                    >
                        <Input.Password
                            placeholder="请输入密码"
                            prefix={<Key />}
                            style={{
                                height: "40px",
                                fontSize: "16px",
                            }}
                            allowClear

                        />
                    </Form.Item>

                    <Form.Item style={{ cursor: "pointer" }} >
                        <Button
                            className="btn"
                            style={{
                                height: "40px",
                                fontSize: "16px",
                            }}
                            htmlType="submit"
                        >
                            登录
                        </Button>

                    </Form.Item>
                </Form>
            </div>
            {contextHolder}
        </div>
    );
};

export default Login;
