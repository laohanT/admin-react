declare namespace Slice {
    // 登录后得到的数据
    type UserInfoProps = {
        userinfo: UserInfo;
        powersCode: string[];
    }

    type UserInfo = {
        userBasicInfo: UserBasicInfo | null; // 用户的基本信息
        menus: Menu[]; // 拥有的所有菜单对象
        roles: Role[]; // 拥有的所有角色对象
        powers: Power[]; // 拥有的所有权限对象

    }

    type UserBasicInfo = {
        id: number,
        userName: string,
        password: string | number,
        phone: string | number

    }
}