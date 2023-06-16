import axios, { throwResponse } from "../../../config/axios/axios.config";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import endpoints from "../api.endpoint";
import { ICart } from "../../../interface/ICart";

const statusSuccess = [200, 201];

export async function addToCart(params?: ICart) {
  const res = await axios.post(`${endpoints.cart.addToCart}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useAddToCart = (): UseMutationResult<unknown, Error> => {
  return useMutation(async (params: any) => {
    const res = await axios.post(`${endpoints.cart.addToCart}`, params);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    throwResponse(res);
  });
};

export async function getCartByUser(id?: number) {
  const res = await axios.get(`${endpoints.cart.getCartByUser}/${id}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useGetCartByUser = (
  id?: number
): UseQueryResult<ICart[], Error> => {
  return useQuery(["cart", id], async () => {
    const res = await axios.get(`${endpoints.cart.getCartByUser}/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useDeleteCart = (): UseMutationResult<
  unknown,
  Error,
  unknown,
  unknown
> => {
  return useMutation(async (id: any) => {
    const res = await axios.delete(`${endpoints.cart.deleteCart}/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};
