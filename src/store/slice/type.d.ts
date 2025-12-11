declare namespace Slice {
    // 登录后得到的数据
    type UserInfoProps = {
        id: number,
        roleId: number,
        username: string,
        token: string,
        menuList: string[]
    }
    // 管理认证状态
    type authProps = {
        isLogin: boolean,
        token: null | string,
        isCheck: boolean
    }
}