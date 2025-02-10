import { accessTokenKVP, refreshTokenKVP } from "@/constants/storageKey";
import { AuthenticationResponse } from "@/types/HttpResponses/AuthenticationResponse";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
const refreshEndpoint = "/Account/RefreshToken";
const BASE_URL = "https://localhost:7160/api";

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}
// this to handle request that 401, wait for new token, to preven many refresh cdall, very good concept
let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

const createClient = (): AxiosInstance => {
  const config: CreateAxiosDefaults = {
    baseURL: BASE_URL,
    timeout: 60000,
    withCredentials: false,
  };
  const client = axios.create(config);
  client.interceptors.request.use(
    (successConfig: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(accessTokenKVP);
      if (token) {
        successConfig.headers.Authorization = `Bearer ${token}`;
      }
      return successConfig;
    },
    () => {}
  );
  client.interceptors.response.use(
    function onFulfill(res: AxiosResponse) {
      return res;
    },
    async function onError(err: AxiosError) {
      const { response } = err;
      const status = response?.status;
      const originalRequestConfig = err.config;
      if (status == 401) {
        // this part, check if there is, currently, an oin going refresh token call, if yes
        // then okk, add this request to the queue and wait for that call to finish to get the token
        // without making mulitple api call,
        // resolve, reject, these function is pass to the queue, as what to do if the call refresh token
        // return succes or fail, depend, then we execute the resolve, reject respectively
        if (isTokenRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequests.push({
              resolve,
              reject,
              config: originalRequestConfig,
              error: err,
            });
          });
        }
        isTokenRefreshing = true;

        try {
          var getRefreshToken = localStorage.getItem(refreshTokenKVP);

          // if (!getRefreshToken) {
          //   throw new Error("No refresh token found. Logging out...");
          // }
          let getNewTokenResponse = await client.put<AuthenticationResponse>(
            `${refreshEndpoint}?refreshToken=${getRefreshToken}`
          );
          const { accessToken = null, refreshToken = null } =
            getNewTokenResponse.data ?? {};
          // let refreshResponse =
          //   (getNewTokenResponse.data  as AuthenticationResponse) ;
          //const { accessToken } = refreshResponse;
          if (!accessToken || !refreshToken) {
            throw new Error("Something went wrong while refreshing token");
          }
          localStorage.setItem(accessTokenKVP, accessToken);
          localStorage.setItem(refreshTokenKVP, refreshToken);
          // Retry the original request with the new token
          failedRequests.forEach(({ resolve, reject, config }) => {
            client
              .request(config)
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          });
        } catch (refreshErr) {
          console.error(refreshErr);
          localStorage.removeItem(accessTokenKVP);
          localStorage.removeItem(refreshTokenKVP);
          failedRequests.forEach((req) => {
            req.reject(refreshErr);
          });
          window.location.href = "/login";
        } finally {
          failedRequests = [];
          isTokenRefreshing = false;
        }
        return client(originalRequestConfig);
      }
      // if(status >= 500){
      //   if(err.config.counter)
      // }
      return Promise.reject(err);
    }
  );
  return client;
};
const ApiInstance = createClient();

export default ApiInstance;
// export default axios.create({
//   baseURL: "http://localhost:7160/",
// });
export const SimpleClient = axios.create({
  baseURL: BASE_URL,
});
