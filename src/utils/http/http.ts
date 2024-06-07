import service from './httpRequest'
import type { Method, ResponseType } from 'axios'

export default class Http {
  public static get<T>(url: string, params?: object, config?: object): Promise<T> {
    /**
     * GET请求方法
     * @param url 请求地址
     * @param params 请求参数
     * @param config 配置项
     */
    const method: Method = 'GET'
    const options = {
      url,
      method,
      params,
      ...config
    }
    if (!params) {
      delete options.params
    }
    return service.request(options)
  }

  public static post<T>(url: string, params: object, config?: object): Promise<T> {
    /**
     * POST请求方法
     * @param url 请求地址
     * @param params 请求参数
     * @param config 配置项
     */
    const method: Method = 'POST'
    const options = {
      url,
      method,
      params,
      ...config
    }
    return service.request(options)
  }

  public static patch<T>(url: string, params: object, config?: object): Promise<T> {
    /**
     * POST请求方法
     * @param url 请求地址
     * @param params 请求参数
     * @param config 配置项
     */
    const method: Method = 'PATCH'
    const options = {
      url,
      method,
      params,
      ...config
    }
    return service.request(options)
  }
  public static delete<T>(url: string, params?: object, config?: object): Promise<T> {
    /**
     * POST请求方法
     * @param url 请求地址
     * @param params 请求参数
     * @param config 配置项
     */
    const method: Method = 'DELETE'
    const options = {
      url,
      method,
      params,
      ...config
    }
    return service.request(options)
  }
  public static dowmloadPost<T>(url: string, params: object, config = {}): Promise<T> {
    /**
     * 下载文件的post请求方法
     * @param url 请求地址
     * @param params 请求参数
     * @param config 配置项
     */
    const responseType: ResponseType = 'blob'
    const options = {
      responseType: responseType,
      ...config
    }
    return this.post(url, params, options)
  }
}
