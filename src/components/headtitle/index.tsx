import { HomeOutlined, SaveOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Space, Button, theme, Breadcrumb } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  title?: string;
  actionName?: string | React.ReactElement;
  breadcrumbNameMap?: Record<string, string>;
  onCancel?: VoidFunction | false;
  onSubmit?: VoidFunction | false;
  onAdd?: VoidFunction | false;
  onExcel?: VoidFunction | false;
  action?: React.ReactElement;
  className?: string;
};

export default function HeadTitle({
  title,
  onAdd,
  onCancel,
  onSubmit,
  onExcel,
  action,
  actionName,
  breadcrumbNameMap,
  className,
}: Props) {
  const {
    token: { colorTextLabel, colorPrimary },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: (
        <Space>
          <HomeOutlined onClick={() => navigate(-1)} />
          <span className="mx-.5 text-gray-500">/</span>
          <Link to={url}>{breadcrumbNameMap?.[url]}</Link>
        </Space>
      ),
    };
  });

  return (
    <Row
      className={`!mb-5 ${className}`}
      justify="space-between"
      align="middle"
      style={{
        marginBottom: 10,
      }}
    >
      <Col>
        {!!title && (
          <Typography.Title
            level={4}
            style={{
              marginBottom: 0,
              color: colorPrimary,
              backgroundColor: "#FFFFFF",
              padding: "10px 30px",
              borderRadius: 10,
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            {title}
          </Typography.Title>
        )}
        {!!breadcrumbNameMap && <Breadcrumb items={extraBreadcrumbItems} />}
      </Col>
      <Col>
        {!action && (
          <Space>
            {!!onCancel && (
              <Button style={{ width: 120, height: 48 }} onClick={onCancel}>
                Cancel
              </Button>
            )}
            {!!onSubmit && (
              <Button
                style={{ width: 120, height: 48 }}
                type="primary"
                onClick={onSubmit}
                htmlType="submit"
                // loading=
              >
                Save Changes
              </Button>
            )}
            {!!onAdd && (
              <Button
                style={{ width: 120, height: 48 }}
                type="primary"
                onClick={onAdd}
              >
                {actionName}
              </Button>
            )}
            {!!onExcel && (
              <Button style={{ width: 120, height: 48 }} onClick={onExcel}>
                {actionName}
              </Button>
            )}
          </Space>
        )}
        {action}
      </Col>
    </Row>
  );
}
