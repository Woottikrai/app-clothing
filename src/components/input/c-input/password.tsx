import { Input } from "antd";
import { PasswordProps } from "antd/es/input";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface CInputPasswordProps extends PasswordProps {
  bgcolor?: boolean;
}

export const StyledInputPassword = styled(Input.Password)<{
  bgcolor?: number;
}>`
  ${tw`rounded-s`}
  border-color: ${({ bgcolor }) => (bgcolor ? "white" : "")}!important;
  height: 45px;
`;

export const CInputPassword: React.FC<CInputPasswordProps> = ({
  bgcolor = true,
  ...props
}) => {
  return <StyledInputPassword {...props} />;
};
