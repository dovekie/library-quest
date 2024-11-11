import axios from "axios";
import { TApiResponse } from "../types/TApiResponse";
import toast from "react-hot-toast";

export const fetchLibraries = async (): Promise<TApiResponse<any>> => {
  return callAPI({ method: "get", url: "api/libraries" });
};

export const fetchNewJwtToken = async (userLogin: {
  username: string;
  password: string;
}): Promise<TApiResponse<any>> => {
  return callAPI({
    method: "post",
    url: "auth/jwt/create",
    data: userLogin,
    customErrorMessage: "Incorrect email or password.",
  });
};

export const fetchRefreshedJwtToken = async (
  refreshToken: string
): Promise<TApiResponse<any>> => {
  return callAPI({
    method: "post",
    url: "auth/jwt/refresh",
    data: { refresh: refreshToken },
    customErrorMessage: "You have been logged out.",
  });
};

export const fetchReader = async (
  readerId: string,
  authToken: string
): Promise<TApiResponse<any>> => {
  return callAPI({ method: "get", url: `api/readers/${readerId}`, authToken });
};

export const updateReaderMembership = async (
  readerId: string,
  membershipZone: number[] | undefined,
  authToken: string
): Promise<TApiResponse<any>> => {
  return callAPI({
    method: "patch",
    url: `api/readers/${readerId}`,
    data: {
      membership_zone: membershipZone,
    },
    authToken,
  });
};

export const callAPI = async ({
  method,
  url,
  data,
  authToken,
  customErrorMessage,
}: {
  method: string;
  url: string;
  data?: Record<string, any>;
  authToken?: string;
  customErrorMessage?: string;
}) => {
  try {
    const response = await axios({
      method,
      url: `http://localhost:8000/${url}/`,
      ...(data ? { data } : {}),
      ...(authToken ? { headers: { Authorization: `JWT ${authToken}` } } : {}),
    });
    return { data: response.data };
  } catch (error: any) {
    // FIXME any
    toast(customErrorMessage ?? error.message);
    return { error: { message: error.message, statusCode: error.status } };
  }
};
