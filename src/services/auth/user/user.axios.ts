import axios, { throwResponse } from "../../../config/axios/axios.config";
import { IProduct, IProductResult } from "../../../interface/IProduct";
import { useQuery, UseQueryResult } from "react-query";

const statusSuccess = [200, 201];

export const userApi = {};
