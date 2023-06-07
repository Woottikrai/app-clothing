import { Layout } from "antd";
import Content from "./content";
import Header from "./header";

type Props = {};

export default function AppLayout({}: Props) {
  return (
    <Layout className="h-screen">
      <Header />
      <Content />
    </Layout>
  );
}
