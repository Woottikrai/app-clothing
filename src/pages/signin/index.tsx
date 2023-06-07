import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Form, Button, Image, Space } from "antd";
import React from "react";
import { CInput, CInputPassword } from "../../components/input/c-input";
import { ISignin } from "../../services/auth/interface";
import authenApi from "../../services/auth/authen/authen";
import { openNotification } from "../../components/notification";
import { useNavigate } from "react-router-dom";
type Props = {};

export default function SignIn({ }: Props) {
  const navigate = useNavigate();

  const onFinish = (value: ISignin) => {
    authenApi
      .signin({
        email: value.email,
        password: value.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.accessToken);
        openNotification({ type: "success", title: "success" });
      })
      .catch((err) => {
        openNotification({ type: "error", title: "wrong email or password!" });
      })
      .finally(() => {
        navigate("/");
      });
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
              src={""}
              preview={false}
              alt="image-logo"
              className="w-16 h-16 object-cover"
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
