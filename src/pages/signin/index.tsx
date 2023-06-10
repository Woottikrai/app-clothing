import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Form, Button, Image, Space } from "antd";
import React from "react";
import { CInput, CInputPassword } from "../../components/input/c-input";
import { ISignin } from "../../services/auth/interface";
import { openNotification } from "../../components/notification";
import { useNavigate } from "react-router-dom";
import { UseSignin } from "../../services/auth/authen/authen";
import logo from "../../assets/images/LogoNo.png";
type Props = {};

export default function SignIn({}: Props) {
  const navigate = useNavigate();
  const signin = UseSignin();
  const onFinish = (value: ISignin) => {
    const { email, password } = value;
    signin.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (res: any) => {
          openNotification({ type: "success" });
          localStorage.setItem("token", res.accessToken);
        },
        onError: ({ message }) => {
          openNotification({ type: "error", description: message });
        },
        onSettled: () => {
          navigate("/");
        },
      }
    );
  };
  return (
    <React.Fragment>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={6}>
          <Space
            style={{
              display: "grid",
              justifyContent: "center",
            }}
          >
            <Image
              src={logo}
              preview={false}
              alt="image-logo"
              className="!w-44 !h-44 object-cover"
            />
          </Space>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              className="input-signin"
            >
              <CInput prefix={<UserOutlined />} placeholder="Email..." />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="input-signin"
            >
              <CInputPassword
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}
