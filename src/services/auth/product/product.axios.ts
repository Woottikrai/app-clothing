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

export async function getAllColor() {
  const res = await axios.get(`${endpoints.product.getColorAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getProducttypeAll() {
  const res = await axios.get(`${endpoints.product.getProducttypeAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getSizeAll() {
  const res = await axios.get(`${endpoints.product.getSizeAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getSuitabilityAll() {
  const res = await axios.get(`${endpoints.product.getSuitabilityAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function addProduct(params?: IProduct) {
  const res = await axios.post(`${endpoints.product.addProduct}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getProductAll(params?: IProduct) {
  const res = await axios.get(`${endpoints.product.getProductAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useGetProductAll = (
  params?: IProduct
): UseQueryResult<IProduct, Error> => {
  return useQuery(["find-all", params], async () => {
    const res = await axios.get(`${endpoints.product.getProductAll}`, {
      params: { ...params },
    });
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const usePostProduct = (): UseMutationResult<
  unknown,
  Error,
  IProduct,
  unknown
> => {
  return useMutation(async (params: any) => {
    const res = await axios.get(`${endpoints.product.addProduct}`, params);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};
