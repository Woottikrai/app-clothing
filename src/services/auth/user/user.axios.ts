import axios, { throwResponse } from "../../../config/axios/axios.config";
import { IProduct, IProductResult } from "../../../interface/IProduct";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import endpoints from "../api.endpoint";
import { IProfile, IUser } from "../../../interface/IUser";

const statusSuccess = [200, 201];

export const userApi = {};

export const useRegister = (): UseMutationResult<unknown, Error> => {
  return useMutation(async ({ ...values }: any) => {
    const res = await axios.post(`${endpoints.user.register}`, values);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useUpdateUser = (): UseMutationResult<unknown, Error> => {
  return useMutation(async ({ id, ...values }: any) => {
    console.log({ id, ...values });

    const res = await axios.patch(`${endpoints.user.updateUser}/${id}`, values);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
    throwResponse(res);
  });
};

// export const useGetMe = (id?: number): UseQueryResult<any, Error> => {
//   return useQuery(["user-one"], async () => {
//     const res = await axios.get(`${endpoints.user.getMe}`);
//     if (res.status === 200) {
//       return res.data;
//     }
//     throwResponse(res);
//   });
// };

// export const useGetMe = (isPublic: boolean): UseQueryResult<IUser> => {
//   return useQuery(
//     ["get-me", isPublic],
//     async () => {
//       const res = await axios.get(`${endpoints.user.getMe}`);
//       if (res.status === 200) {
//         return res.data;
//       }
//       throwResponse(res);
//     },
//     { enabled: !isPublic }
//   );
// };

export const useGetMe = (): UseQueryResult<any, Error> => {
  return useQuery(["user-one"], async () => {
    const res = await axios.get(`${endpoints.user.getMe}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};
