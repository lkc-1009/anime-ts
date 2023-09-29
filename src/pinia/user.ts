export interface LoginUser {
    account: string
    password: string
}

export interface UserState {
    name: string
    role: string[]
    state: boolean
}

export interface User extends LoginUser, UserState {
    token: string
}