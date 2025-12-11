declare namespace AccountProps {
    type tableItem = {
        id?: numbner,
        username: string,
        password: string,
        roleId: number,
        status: number,
        expend: json,
        createTime: Date,
        updateTime: Date,
        operater: string
    }

    type FormItem = {
        username: string,
        password: string,
        roleId: string
    }
}