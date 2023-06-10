import { Select, SelectProps } from "antd";
import { valueType } from "antd/es/statistic/utils";
import styled from "styled-components";
import tw from "twin.macro";

export interface CSelectProps extends SelectProps<any, any> {}

const StyledSelect = styled(Select)<{
  bgcolor?: number;
  $multipleMode?: boolean;
}>`
  height: ${({ $multipleMode }) => ($multipleMode ? "100%" : "45px")};
  width: 100%;
  .ant-select-selector {
    ${tw`!rounded-s`}
    height: 100% !important;
    // border-color: ${({ bgcolor }) => (bgcolor ? "white" : "")} !important;
    padding-top: ${({ $multipleMode }) => ($multipleMode ? "4px" : "")};
    padding-right: ${({ $multipleMode }) => ($multipleMode ? "10px" : "")};
    padding-bottom: ${({ $multipleMode }) => ($multipleMode ? "5px" : "")};
  }
  .ant-select-selection-placeholder {
    margin: auto;
  }
  .ant-select-selection-item {
    margin: auto;
  }
  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }
  .ant-select-selection-overflow-item {
    padding-right: ${({ $multipleMode }) => ($multipleMode ? "5px" : "")};
    padding-bottom: ${({ $multipleMode }) => ($multipleMode ? "5px" : "")};
  }
`;
export const CSelect: React.FC<CSelectProps> = ({ ...props }) => {
  return <StyledSelect {...props} />;
};
