import axios, { throwResponse } from "../../../config/axios/axios.config";
import { IProduct, IProductResult } from "../../../interface/IProduct";
import { useQuery, UseQueryResult } from "react-query";

const statusSuccess = [200, 201];

// export async function getProducttypeAll() {
//   const res = await axios.get(`${endpoints.product.getProducttypeAll}`);
//   return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
// }

// export async function getSizeAll() {
//   const res = await axios.get(`${endpoints.product.getSizeAll}`);
//   return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
// }

// export async function getSuitabilityAll() {
//   const res = await axios.get(`${endpoints.product.getSuitabilityAll}`);
//   return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
// }

// export async function addProduct(params?: IProduct) {
//   const res = await axios.post(`${endpoints.product.addProduct}`, params);
//   return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
// }

// export async function getProductAll(params?: IProduct) {
//   const res = await axios.post(`${endpoints.product.addProduct}`, params);
//   return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
// }

// export const usegetProductAll = (
//   params?: Partial<IProduct>
// ): UseQueryResult<IProductResult, Error> => {
//   return useQuery(["find-all", params], async () => {
//     const res = await axios.get(`${endpoints.product.getProductAll}`, {
//       params: { ...params },
//     });
//     if (!statusSuccess.includes(res.status)) {
//       throwResponse(res);
//     }
//     return res.data;
//   });
// };
export const userApi = {};
