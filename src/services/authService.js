import { useApi } from "../composables/api"
import { globalState } from "../store"

export const authService = {

    async useLogin(payload){

        const {data, error} = await useApi('/login').post(payload).json()

        if(data.value && !error.value){
            globalState.value.accessToken = data.value.access_token
        }
    },
    async useLogout(){
        const {error} = await useApi('/logout').post()

        if(error.value){
            console.warn(error)
        }

        globalState.value.accessToken = null
    }
}