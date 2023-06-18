import { throwResponse } from "../../../config/axios/axios.config";
import { IProfile, IUser } from "../../../interface/IUser";
import {
  UseQueryResult,
  useQuery,
  UseMutationResult,
  useMutation,
} from "react-query";
import axios from "../../../config/axios/axios.config";
import endpoints from "../api.endpoint";

const statusSuccess = [200, 201];
export async function signin(params?: Partial<IUser>) {
  const res = await axios.post(`${endpoints.user.login}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function register(params?: Partial<IUser>) {
  const res = await axios.post(`${endpoints.user.register}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getProfile() {
  const res = await axios.get(`${endpoints.user.profile}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

// useQuery

export const UseSignin = (): UseMutationResult<unknown, Error> => {
  return useMutation(async (params: any) => {
    const res = await axios.post(`${endpoints.user.login}`, params);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const UseRegister = (): UseMutationResult<unknown, Error> => {
  return useMutation(async ({ params }: any) => {
    const res = await axios.post(`${endpoints.user.register}`, params);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const UseGetProfile = (): UseQueryResult<IProfile, Error> => {
  return useQuery([
    "get-profile",
    async () => {
      const res = await axios.get(`${endpoints.user.profile}`);
      if (res.status === 200) {
        return res.data;
      }
      throwResponse(res);
    },
  ]);
};

export const authenApi = {
  UseGetProfile,
  getProfile,
  UseRegister,
  register,
};

export default authenApi;
