import axios from "axios";
import type { AxiosResponse } from "axios";
import projectConfig from "../project.config";
import { getToken } from "../../provider/auth/provider.auth";

const instance = axios.create();

export const instanceBasic = axios.create({
  baseURL: projectConfig.baseURL,
  headers: {
    Accept: "application/json",
    Authorization: "",
  },
  validateStatus: (_) => true,
});

instance.interceptors.request.use(
  (request) => {
    const token = getToken();
    request.baseURL = `${projectConfig.baseURL}`;
    request.headers["Authorization"] = `Bearer ${token}`;
    request.headers["Accept"] = `application/json`;
    request.validateStatus = (_) => true;
    return Promise.resolve(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const throwResponse = (res: AxiosResponse) => {
  console.log("🚀 ~ file: axios.config.ts:32 ~ throwResponse ~ res:", res);
  if (res.data.result) {
    const { message } = res.data?.message;
    if (!Array.isArray(message)) {
      throw new Error(message);
    }
    const text = message.reduce((result: string, item: string) => {
      return `${result}${item}\n`;
    }, "");
    throw new Error(text);
  }
  // const { message } = res.data?.message;
  // if (!Array.isArray(message)) {
  //   throw new Error(message);
  // }
  // const text = message.reduce((result: string, item: string) => {
  //   return `${result}${item}\n`;
  // }, "");
  // throw new Error(text);
};
export default instance;
