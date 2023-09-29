import {AnimeRequest} from "./axios.config"
import {localStorageCache} from "../storage/local.storage"
import {bearer, token} from "../key/auth"
import {ElLoading} from "element-plus"

export const animeRequest = new AnimeRequest({
    baseURL: baseUrl,
    timeout: timeOut,
    interceptors: {
        requestInterceptor: (config) => {
            // Add token to request header
            const token = localStorageCache.getCache(token)
            if (token) {
                config.headers.Authorization = `${bearer} ${token}`
            }

            // Add loading animation
            if (showLoading) {
                this.loading = ElLoading.service({
                    lock: true,
                    text: 'Loading...',
                    background: 'rgba(0, 0, 0, 0.5)'
                })
            }
            return config
        },
        requestInterceptorCatch: (error) => {
            return error
        },
        responseInterceptor: (response) => {
            if (showLoading) {
                this.loading?.close()
            }

            return response.data
        },
        responseInterceptorCatch: (error) => {
            return error
        }
    }
})