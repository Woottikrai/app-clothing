import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Container from "../../components/container";
import HeadTitle from "../../components/headtitle";
import { breadcrumbNameMap } from "../../routes/breadcrumb";
type Props = {};

export default function Home({}: Props) {
  const headerOptions = {
    breadcrumbNameMap: breadcrumbNameMap,
  };
  return (
    <Container>
      <HeadTitle {...headerOptions} />
    </Container>
  );
}
