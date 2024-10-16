import axios from "axios";

export const fetchLibraries = async () => {
  return callAPI("get", "api/libraries");
};

export const fetchNewJwtToken = async (userLogin: {
  username: string;
  password: string;
}) => {
  return callAPI("post", "auth/jwt/create", userLogin);
};

export const fetchRefreshedJwtToken = async (refreshToken: string) => {
  return callAPI("post", "auth/jwt/refresh", { refresh: refreshToken });
};

export const fetchReader = async (readerId: string, authToken: string) => {
  return callAPI("get", `api/readers/${readerId}`, undefined, authToken);
};

export const updateReaderMembership = async (
  readerId: string,
  membershipZone: number[] | undefined,
  authToken: string
) => {
  return callAPI(
    "patch",
    `api/readers/${readerId}`,
    {
      membership_zone: membershipZone,
    },
    authToken
  );
};

export const callAPI = async (
  method: string,
  url: string,
  data?: Record<string, any>,
  authToken?: string
) => {
  try {
    const response = await axios({
      method,
      url: `http://localhost:8000/${url}/`,
      ...(data ? { data } : {}),
      ...(authToken ? { headers: { Authorization: `JWT ${authToken}` } } : {}),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
