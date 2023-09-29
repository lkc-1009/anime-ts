import { defineStore } from "pinia"
import { LoginUser, User, UserState } from "./user"
import { localStorageCache } from "../storage/local.storage"
import { login } from "../mock/login/user.auth"
import { Result } from "../axios/response.data"

export const userStore = defineStore('userState', {
    state: () => ({
        userState: null as UserState | null
    }),
    actions: {
        login(user: LoginUser) {
            login(user)
                .then((response: Result<User>) => {
                    this.$patch({
                        userState: {
                            name: response.data.name,
                            role: response.data.role,
                            state: response.data.state
                        }
                    })

                    localStorageCache.setCache(token, response.data.token)
                })
        },
        logout() {
            // this.$reset()

            // this.$patch({
            //     userState: null
            // })

            this.$patch((state) => {
                state.userState = null
            })

            localStorageCache.removeCache(token)
        }
    }
})