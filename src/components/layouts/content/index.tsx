import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <Layout.Content style={{ overflowY: "auto" }} className="bg-white">
      <Outlet />
    </Layout.Content>
  );
};

export default Content;
