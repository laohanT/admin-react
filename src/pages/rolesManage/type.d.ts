declare namespace RolesProps {
    // 查询入参
    type QueryProps = {
        pageNum: number,
        pageSize: number,
        username?: string
    }
    type TableProps = {
        id: number,
        name: string,
        slug: string,
        createTime: string,
        menuList: (string | number | bigint)[]
    }

    type ResProps = {
        status: number,
        message?: string,
        success: boolean,
        data?: T
    }
}