import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Form, Button, Image, Space } from "antd";
import React from "react";
import { CInput, CInputPassword } from "../../components/input/c-input";
import { ISignin } from "../../services/auth/interface";
import { openNotification } from "../../components/notification";
import { useNavigate } from "react-router-dom";
import { UseSignin } from "../../services/auth/authen/authen";
import logo from "../../assets/images/LogoNo.png";
import { IRegister } from "../../interface/IUser";
type Props = {};

export default function Register({ }: Props) {
  const navigate = useNavigate();

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
            // onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="name"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
              className="input-register"
            >
              <CInput prefix={<UserOutlined />} placeholder="Name..." />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              className="input-register"
            >
              <CInput prefix={<UserOutlined />} placeholder="Email..." />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="input-register"
            >
              <CInputPassword
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full ">
                ลงทะเบียน
              </Button>
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
