declare namespace Login {

    type LoginForm = {
        account: string,
        pwd: string
    }



    type LoginResponse<T> = {
        success: boolean,
        status: number,
        message?: string,
        data?: T
    }
}