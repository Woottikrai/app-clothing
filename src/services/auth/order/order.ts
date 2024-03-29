import axios from "axios";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { throwResponse } from "../../../config/axios/axios.config";
import { ICart } from "../../../interface/ICart";
import endpoints from "../api.endpoint";
import { IOrder } from "../../../interface/Iorders";
import { IUser } from "../../../interface/IUser";

const statusSuccess = [200, 201];
export const useOrderHistory = (
  id?: number
): UseQueryResult<ICart[], Error> => {
  return useQuery(["order-history", id], async () => {
    const res = await axios.get(`${endpoints.cart.orderHistory}/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useOrderAdmin = (): UseQueryResult<ICart[], Error> => {
  return useQuery(["cart-admin"], async () => {
    const res = await axios.get(`${endpoints.cart.OrderAdmin}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useOrderAdmins = (): UseQueryResult<IUser[], Error> => {
  return useQuery(["cart"], async () => {
    const res = await axios.get(`${endpoints.cart.orderAdmin}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useUploadSlip = (): UseMutationResult<unknown, Error> => {
  return useMutation(async ({ id, ...values }: any) => {
    const res = await axios.patch(`${endpoints.cart.uploadSlip}/${id}`, {
      orderId: values.orderId,
      img: values.img,
    });
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useCancelOrder = (): UseMutationResult<unknown, Error> => {
  return useMutation(async ({ id, ...values }: any) => {
    const res = await axios.patch(`${endpoints.cart.cancelOrder}/${id}`, {
      orderId: values.orderId,
      note: values.note,
    });
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useDeleteOrder = (): UseMutationResult<unknown, Error> => {
  return useMutation(async (values: any) => {
    const res = await axios.delete(
      `${endpoints.cart.deleteOrder}/${values.id}`,
      { data: { orderId: values.orderId } }
    );
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useOrderHistoryAdmin = (): UseQueryResult<ICart[], Error> => {
  return useQuery(["cart"], async () => {
    const res = await axios.get(`${endpoints.cart.oderHistoryAdmin}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useOrderHistoryUser = (
  id?: number
): UseQueryResult<ICart[], Error> => {
  return useQuery(["order-history-user", id], async () => {
    const res = await axios.get(`${endpoints.cart.orderHistoryUser}/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};
