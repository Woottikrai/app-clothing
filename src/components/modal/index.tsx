import { Modal, ModalProps } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { CModalProduct, CModalProductProps } from "./modal-product";

type NonationTypes = {
  // ConfirmDelete:
  //   CModalExcel: React.FC<CModalExcelProps>;
  CModalProduct: React.FC<CModalProductProps>;
};

export const StyledModal = styled(Modal)`
  .anticon-close > svg {
    margin: auto;
    display: block;
    width: 15px;
    height: 15px;
  }
`;

export interface CModalProps extends ModalProps {}

export const CModal: FC<CModalProps> = ({
  footer = null,
  closable = false,
  centered = true,
  ...props
}) => {
  return (
    <StyledModal
      centered={centered}
      closable={closable}
      footer={footer}
      {...props}
      transitionName=""
    />
  );
};
