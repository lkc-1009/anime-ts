import { LoginUser } from "../../pinia/user"
import { animeRequest } from "../../axios/service"

export const login = (user: LoginUser) => {
    return animeRequest.post({
        url: "/login",
        data: user
    })
}