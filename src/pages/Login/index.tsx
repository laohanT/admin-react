import { Button, Form, FormProps, Input } from "antd";
import { People, Key } from "@icon-park/react";
import "./index.scss";
type FieldType = {
    account?: string,
    pwd?: string
}
const Login = () => {
    const onFinish: FormProps["onFinish"] = (values) => {
        console.log(values, 'values');

    }

    return (
        <div className="login">
            <div className="login-form">
                <h2>后台管理系统</h2>
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
                        <Input
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
        </div>
    );
};

export default Login;
