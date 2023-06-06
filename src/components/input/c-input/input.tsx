import { Input, InputProps } from "antd";
import styled from "styled-components";
import tw from "twin.macro";

const StyledInput = styled(Input)<{ $bgcolor?: number }>`
  ${tw`!rounded-s`}
  // border-color: ${({ $bgcolor }) => ($bgcolor ? "white" : "")}!important;
  height: 45px;
`;
export interface CInputProps extends InputProps {}
export const CInput: React.FC<CInputProps> = ({ ...props }) => {
  return <StyledInput {...props} />;
};
