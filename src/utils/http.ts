import { message } from 'antd'
import { handleResponseData } from './utils'
// 扩展get参数
interface RequestOptions extends RequestInit {
    params?: Record<any, any>
}

interface Response {
    success: boolean,
    status: number,
    message: string,
    data: any
}

const request = async (
    url: string,
    options: RequestOptions,
): Promise<RolesProps.ResProps> => {
    const token = window.sessionStorage.getItem('access_token')

    const headers = new Headers(options.headers)
    if (!headers.has("Content-Type")) {
        headers.set('Content-Type', 'application/json')
    }
    if (token) {
        headers.set("token", `Bearer ${token}`)
    }

    if (options.method?.toLocaleUpperCase() === "GET") {
        let querystring = '';
        querystring = new URLSearchParams(options.params).toString();
        url = url + `?${querystring}`
    }

    const response = await fetch(url, {
        ...options,
        headers
    })

    // 处理token过期
    if (response.status == 401) {
        window.sessionStorage.removeItem('access_token')
        window.location.href = '/login';
        message.error('请重新登录！')
    }

    // if (!response.ok) {
    //     throw new Error(`请求失败：${response.status}`)
    // }


    const responseData: Response = await response.json()
    const resObj: any = {
        success: responseData.success,
        status: responseData.status,
        message: responseData.message,
        data: handleResponseData(responseData.data)
    }


    return resObj
}

export default request