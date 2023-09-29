import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { AxiosInstance, AxiosRequestConfig } from "axios"
import { Result } from "./response.data"

export interface AnimeRequestInterceptors {
    requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (error: any) => any
}

export interface AnimeRequestConfig extends AxiosRequestConfig {
    interceptors?: AnimeRequestInterceptors
}

export class AnimeRequest {
    instance: AxiosInstance
    interceptors?: AnimeRequestInterceptors

    constructor(config: AnimeRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors

        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )

        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )
    }

    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, Result<T>>(config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "GET" })
    }

    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "POST" })
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "DELETE" })
    }

    put<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request({ ...config, method: "PUT" })
    }
}
