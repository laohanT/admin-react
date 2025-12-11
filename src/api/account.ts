import request from "../utils/http";

// 所有的get查询
export const queryAllGet = (params: any) => {
    return request("/api/accountAllGet", {
        method: "get",
        params
    })
}

export const actionAllPost = (data: any) => {
    return request("/api/accountAllPost", {
        method: "post",
        body: JSON.stringify(data)
    })
}

