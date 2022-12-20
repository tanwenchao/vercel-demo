/**
 * @description: 中电axios请求封装
 * @author: tanwenchao
 */
import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
// import { message } from 'ant-design-vue'
import { ResponseCodeEnum, ACCESS_TOKEN_KEY } from "../enums";

export interface ErrorCodeType {
  message: string;
  code: number;
}

/**
* get status code
* @param {AxiosResponse} response Axios response object
*/
const getErrorCodeText = (response: AxiosResponse): string => {
  const code = response.status;
  const codeList: ErrorCodeType[] = [
    { message: "请求方式错误", code: 400 },
    { message: "权限错误，请重新登录", code: 401 },
    { message: "您无拒绝访问", code: 403 },
    { message: "访问资源不存在", code: 404 },
    { message: "请求超时", code: 408 },
    { message: "服务器错误", code: 500 },
    { message: "承载服务未实现", code: 501 },
    { message: "网关错误", code: 502 },
    { message: "服务暂不可用", code: 503 },
    { message: "网关超时", code: 504 },
    { message: "暂不支持的 HTTP 版本", code: 505 },
  ];
  return (
    codeList.find((item: ErrorCodeType) => item.code === code)?.message ||
    "未知错误"
  );
};

const service = Axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
    // 'Content-Length': ''
  },
});

/**
* @description 请求发起前的拦截器
* @returns {AxiosRequestConfig} config
*/
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
* @description 响应收到后的拦截器
* @returns {}
*/
service.interceptors.response.use(
  /** 请求有响应 */
  async (response: AxiosResponse) => {
    if (response.status === ResponseCodeEnum.success) {
      return Promise.resolve(response.data);
    } else {
      const errorCodeText = getErrorCodeText(response);
      return Promise.reject(new Error(errorCodeText));
    }
  },
  /** 请求无响应 */
  (error: AxiosError) => {
    let errorMsg: string = error.message || "";

    if (error.message) {
      errorMsg = error.message;
    }

    if (error.response) {
      errorMsg = error.message || "";
    }
    // timeout
    if (errorMsg.indexOf("timeout") >= 0) {
      errorMsg = "timeout";
    }

    if (error?.response?.status === 401) {
      // if (router.currentRoute.value.path !== '登录path') {
      //   message.info('token已过期，请重新登录')
      //   router.push('/login')
      // }
      return Promise.reject(new Error("401"));
    }
    return Promise.reject(new Error(errorMsg));
  }
);

export default service;
