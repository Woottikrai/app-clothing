import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Form, Button, Image, Space } from "antd";
import React from "react";
import { CInput, CInputPassword } from "../../components/input/c-input";
import { ISignin } from "../../services/auth/interface";
import { openNotification } from "../../components/notification";
import { useNavigate } from "react-router-dom";
import { UseSignin } from "../../services/auth/authen/authen";
import logo from "../../assets/images/LogoNo.png";
import { useAuthContext } from "../../provider/auth/provider.auth";
import { useGetMe } from "../../services/auth/user/user.axios";
type Props = {};

export default function SignIn({ }: Props) {
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
          openNotification({ type: "success", description: "เข้าสู่ระบบสำเร็จ" });
          localStorage.setItem("token", res.accessToken);
          res?.profile.roleId === 1 ? navigate("/listproductadmin") : navigate('/listproduct');
          window.location.reload();
        },
        onError: ({ message }) => {
          openNotification({ type: "error", description: message });
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
                  message: "กรุณากรอกอีเมล!",
                },
              ]}
              className="input-signin"
            >
              <CInput prefix={<MailOutlined />} placeholder="Email..." />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "กรุณากรอกรหัสผ่าน!" },
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
            <Button type="primary" htmlType="submit" className="w-full " onClick={() => navigate("/register")}>
              ลงทะเบียน
            </Button>
          </Form>

        </Col>
      </Row>
    </React.Fragment>
  );
}
