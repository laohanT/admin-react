import request from "../utils/http"

// 获取公钥
export const getPublickKey = () => {
    return request("/api/getPublicKey", {
        method: "get"
    })
}