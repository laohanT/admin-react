import request from "../utils/http";

/**
 * 角色管理的全部get查询
 * */
export const rolesAllGet = (params: RolesProps.QueryProps) => {
    return request('/api/queryRoles', {
        method: "get",
        params,
    })
}

/**
 * 角色管理的全部post查询
 * */
export const rolesPost = (data: Record<any, any>) => {
    return request('/api/actionRoles', {
        method: "post",
        body: JSON.stringify(data)
    })
}