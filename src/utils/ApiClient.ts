import { ApiErrorResponse } from "@/types/HttpResponses/ApiErrorResponse";
import { ApiResponse } from "@/types/HttpResponses/ApiResponse";
import axios, { AxiosInstance } from "axios";
import ApiInstance from "./AxiosInstant";
const handleError = (err: any): ApiResponse<any> => {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      const apiError = err.response.data as ApiErrorResponse;
      return ApiResponse.CreateError(
        apiError.status,
        apiError.detail,
        apiError.errors
      );
    }
    const apiError: ApiResponse<any> = ApiResponse.CreateError(
      0,
      err.message,
      undefined
    );
    console.log("backend error undetectable:" + apiError);
    return apiError;
  }
  //network error
  if (err.code === "ECONNABORTED" || err.message === "Network Error") {
    console.error("Network Error:", err.message);

    return {
      isSuccess: false,
      error: {
        statusCode: 0,
        message:
          "Network error: Unable to reach the server. Please try again later.",
      },
    };
  }
  //  Handle Unexpected Errors
  console.error("Unexpected Error:", err);
  return {
    isSuccess: false,
    error: {
      statusCode: 0,
      message: "An unexpected error occurred. Please try again later.",
    },
  };
};

const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  uri: string,
  HttpClient: AxiosInstance,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    let response;

    switch (method) {
      case "GET":
        response = await HttpClient.get<T>(uri, {
          params: data,
        });
        break;
      case "POST":
        response = await HttpClient.post<T>(uri, data);
        break;
      case "PUT":
        response = await HttpClient.put<T>(uri, data);
        break;
      case "DELETE":
        response = await HttpClient.delete<T>(uri, { data: data });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    //    return { isSuccess: true, data: response.data };
    return ApiResponse.CreateSuccess<T>(response.data);
  } catch (err) {
    return handleError(err);
  }
};
// **Form Data Request Wrapper**
const requestFormData = async <T>(
  method: "POST" | "PUT",
  uri: string,
  formData: FormData,
  HttpClient: AxiosInstance
): Promise<ApiResponse<T>> => {
  try {
    let response;
    switch (method) {
      case "POST":
        response = await HttpClient.postForm<T>(uri, formData);
        break;
      case "PUT":
        response = await HttpClient.putForm<T>(uri, formData);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    // return { isSuccess: true, data: response.data };
    return ApiResponse.CreateSuccess<T>(response.data);
  } catch (err) {
    return handleError(err);
  }
};
export const ApiClient = {
  get: <T>(url: string, params?: any) =>
    request<T>("GET", url, ApiInstance, params),
  post: <T>(url: string, data: any) =>
    request<T>("POST", url, ApiInstance, data),
  put: <T>(url: string, data?: any) =>
    request<T>("PUT", url, ApiInstance, data),
  delete: <T>(url: string, data?: any) =>
    request<T>("DELETE", url, ApiInstance, data),

  postForm: <T>(url: string, formData: FormData) =>
    requestFormData<T>("POST", url, formData, ApiInstance),
  putForm: <T>(url: string, formData?: FormData) =>
    requestFormData<T>("PUT", url, formData, ApiInstance),
};
