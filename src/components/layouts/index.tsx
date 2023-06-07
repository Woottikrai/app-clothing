import { Layout } from "antd";
import Header from "../../pages/header/header";
import Content from "./content";

type Props = {};

export default function AppLayout({}: Props) {
  return (
    <Layout className="h-screen">
      <Header />
      <Content />
    </Layout>
  );
}
