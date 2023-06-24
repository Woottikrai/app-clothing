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

export function useGetProductOne(id: number | undefined | string) {
  return useQuery(["product", id], async () => {
    const res = await axios.get(`${endpoints.product.getProducrOne}/${id}`);
    if (!statusSuccess.includes(res.status)) {
      throw new Error("Error");
    }
    return res.data;
  });
}

export const useGetProductAll = (
  params?: IProductResult
): UseQueryResult<IProductResult, Error> => {
  return useQuery(["get-all", params], async () => {
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
    const res = await axios.post(`${endpoints.product.addProduct}`, params);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    throwResponse(res);
  });
};

type useUpdateProductProps = {
  id: string;
  values: IProduct;
};
export const useUpdateProduct = (): UseMutationResult<
  unknown,
  unknown,
  useUpdateProductProps
> => {
  return useMutation(async ({ id, values }: any) => {
    const res = await axios.patch(
      `${endpoints.product.updateProduct}/${id}`,
      values
    );
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useDeleteProduct = (): UseMutationResult<
  unknown,
  Error,
  unknown,
  unknown
> => {
  return useMutation(async (id: any) => {
    const res = await axios.delete(`${endpoints.product.deleteProduct}/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const productApi = {};

export default productApi;
