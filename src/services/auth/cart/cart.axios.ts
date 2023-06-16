import axios, { throwResponse } from "../../../config/axios/axios.config";
import { IProduct, IProductResult } from "../../../interface/IProduct";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import endpoints from "../api.endpoint";

const statusSuccess = [200, 201];

export async function addToCart(params?: IProduct) {
  const res = await axios.post(`${endpoints.cart.addToCart}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getCartByUser(params?: IProduct) {
  const res = await axios.post(`${endpoints.cart.getCartByUser}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}
