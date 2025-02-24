import axios from "axios";
import { TApiResponse } from "../types/TApiResponse";
import toast from "react-hot-toast";
import { ILibraryAddress } from "../types/ILibraryAddress";
import { IUser } from "../types/IUser";
import { IReader } from "../types/IReader";
import { IAuthResponse } from "../types/IAuthResponse";

export const fetchLibraries = async (): Promise<
  TApiResponse<ILibraryAddress[]>
> => {
  return callAPI({ method: "get", url: "api/libraries/" });
};

export const fetchNewJwtToken = async (userLogin: {
  username: string;
  password: string;
}): Promise<TApiResponse<IAuthResponse>> => {
  return callAPI({
    method: "post",
    url: "auth/jwt/create/",
    data: userLogin,
    customErrorMessage: "Incorrect email or password.",
  });
};

export const fetchRefreshedJwtToken = async (
  refreshToken: string
): Promise<TApiResponse<IAuthResponse>> => {
  return callAPI({
    method: "post",
    url: "auth/jwt/refresh/",
    data: { refresh: refreshToken },
    customErrorMessage: "You have been logged out.",
  });
};

export const createUser = async (
  userInfo: any // FIXME any
): Promise<TApiResponse<IUser>> => {
  const response = await callAPI({
    method: "post",
    url: "auth/users/",
    data: { ...userInfo },
  });
  return response;
};

export const fetchReader = async (
  readerId: string,
  authToken: string
): Promise<TApiResponse<IReader>> => {
  return callAPI({ method: "get", url: `api/readers/${readerId}/`, authToken });
};

export const updateReaderMembership = async (
  readerId: string,
  membershipZone: number[] | undefined,
  authToken: string
): Promise<TApiResponse<IReader>> => {
  return callAPI({
    method: "patch",
    url: `api/readers/${readerId}/`,
    data: {
      membership_zone: membershipZone,
    },
    authToken,
  });
};

export const searchForLibrary = async (
  searchString: string
): Promise<TApiResponse<ILibraryAddress[]>> => {
  const response = await callAPI({
    method: "get",
    url: `api/libraries/?search=${searchString}`,
  });
  return response;
};

export const resetPassword = async (
  email: string
): Promise<TApiResponse<{ email: string }>> => {
  return callAPI({
    method: "post",
    url: `auth/users/reset_password/`,
    data: {
      email,
    },
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
  data?: Record<string, any>; // FIXME any
  authToken?: string;
  customErrorMessage?: string;
}) => {
  try {
    const response = await axios({
      method,
      url: `http://localhost:8000/${url}`,
      ...(data ? { data } : {}),
      ...(authToken ? { headers: { Authorization: `JWT ${authToken}` } } : {}),
    });
    return { data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(customErrorMessage ?? error.message);
      return { error: { message: error.message, statusCode: error.status } };
    }
    console.log("Unknown error:", error);
    toast("Something unexpected occurred");
    return { error: { message: "Unexpected error", statusCode: 500 } };
  }
};
