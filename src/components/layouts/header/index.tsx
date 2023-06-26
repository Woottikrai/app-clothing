import {
  ProfileOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import emptyProfile from "../../../assets/images/image-profile.jpeg";
import logoStore from "../../../assets/images/Logostore.jpg";
import logo from "../../../assets/images/LogoNo.png";

import { IProfile } from "../../../interface/IUser";
import {
  authenApi,
  getProfile,
  UseGetProfile,
} from "../../../services/auth/authen/authen";
import { useAuthContext } from "../../../provider/auth/provider.auth";

export default function Header() {
  return (
    <Layout.Header
      style={{
        backgroundColor: "#FFFFFF",
        height: 90,
        borderBottom: "1px solid #ced4da",
      }}
    >
      <Row align="middle" justify="space-between" className=" w-full !h-full">
        <Col
          className="!h-[90px]"
          style={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          <Link />
        </Col>
        <div className="md:block hidden">
          <Col
            className="!h-[90px]"
            style={{
              display: "grid",
              justifyContent: "center",
            }}
          >
            <Profile />
          </Col>
        </div>
      </Row>
    </Layout.Header>
  );
}

interface Nav {
  name: string;
  path: string;
}

const Link = () => {
  const { profile } = useAuthContext();

  const nav: Array<Nav> = profile?.roleId === 2 ? [
    {
      name: "หน้าหลัก",
      path: "/home",
    },
    {
      name: "สินค้า",
      path: "/listproduct",
    },
    {
      name: "สินค้าที่สั่งซื้อ",
      path: "/orderlist",
    },

  ] : [
    {
      name: "สินค้า",
      path: "/listproductadmin",
    },
    {
      name: "เพิ่มสินค้า",
      path: "/addproduct",
    },
    {
      name: "จัดการคำสั่งซื้อ",
      path: "/listorderadmin",
    },
    {
      name: "ประวัติการขาย",
      path: "/orderhistoryadmin",
    },
  ]
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Space wrap size={35}>
        <Avatar
          src={logo}
          size={"large"}
          style={{
            transform: "scale(4)",
            marginRight: 10,
          }}
        />
        <nav className="grid grid-cols-4 gap-x-5">
          {nav.map((item, idx) => {
            const { name, path } = item;
            return (
              <span
                key={idx}
                className="capitalize font-bold cursor-pointer hover:text-[#E7C98D] transition-all delay-75"
                onClick={() => navigate(`${path}`)}
              >
                {name}
              </span>
            );
          })}
        </nav>
      </Space>
    </React.Fragment>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { profile: getData } = useAuthContext();

  const items: MenuProps["items"] = [
    {
      key: "profile",
      className: "profile",
      label: (
        <Row>
          <Typography.Text onClick={() => { }}>
            <ProfileOutlined /> โปรไฟล์
          </Typography.Text>
        </Row>
      ),
    },

    {
      key: "signout",
      className: "signout",
      label: (
        <Row>
          <Typography.Text
            onClick={() => {
              navigate("/login");
              localStorage.clear();
            }}
          >
            <LogoutOutlined /> ออกจากระบบ
          </Typography.Text>
        </Row>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Space wrap size={30}>
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <Avatar
            src={getData?.img || emptyProfile}
            alt={"image-profile"}
            style={{
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
            }}
            size={44}
            shape={"square"}
          />
        </Dropdown>
        <ShoppingCartOutlined
          style={{
            transform: "scale(2)",
            cursor: "pointer",
          }}
          onClick={() => navigate("/cartproduct")}
        />
      </Space>
    </React.Fragment>
  );
};

interface ModalProfileProps { }

const ModalProfile: FC<ModalProfileProps> = ({ }) => {
  return <React.Fragment></React.Fragment>;
};
