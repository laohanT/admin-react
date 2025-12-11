import request from '../utils/http'
// UserInfoProps
export const login = (data: Login.LoginForm) => {
    return request('/api/login', {
        method: "post",
        body: JSON.stringify(data),
    })
}