import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'

// project api response type
type Response<T> = {
  code: number
  success: boolean
  message: string
  data: T
}

class Axios {
  private instance: AxiosInstance

  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      return config
    })

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (200 === response.status) {
          return response?.data
        }

        return Promise.reject(response)
      },
      (error: AxiosError) => {
        return error
      }
    )
  }

  request<T, D = any>(config: AxiosRequestConfig<D>) {
    return this.instance<T, Response<T>>(config)
  }

  get<T, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.instance.get<T, Response<T>, D>(url, config)
  }

  post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance.post<T, Response<T>, D>(url, data, config)
  }

  put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance.put<T, Response<T>, D>(url, data, config)
  }

  delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return this.instance.delete<T, Response<T>, D>(url, config)
  }

  upload<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance.post<T, Response<T>, D>(url, data, { ...config, ...{ headers: { 'Content-Type': 'multipart/form-data' } } })
  }

  file<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance.post<T, Response<T>, D>(url, data, { ...config, ...{ responseType: 'blob' } })
  }
}

const Http = new Axios({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5 * 60 * 1000
})

export default Http
