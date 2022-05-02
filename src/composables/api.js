import { createFetch } from "@vueuse/core";
import { authService } from "../services/authService";
import { globalState, isAuth } from "../store";
import { setError } from "./notification";

export const useApi = createFetch({
    baseUrl: 'https://vara.onrender.com/api',
    options: {
        beforeFetch({ options }) {
            if (isAuth.value) {
                options.headers = {
                    Authorization: `Bearer ${globalState.value.accessToken}`
                }
            }

            return { options }
        },
        async onFetchError({ data, error, response }) {

            setError(data)
            /* 
            
            {
                "msg": [
                    "Unauthorized"
                ]
            }

            
            */
            if (response.status === 401
                && data?.msg != null
                && data.msg instanceof Array
                && data.msg.includes("Unauthorized")
            ) {
                await authService.useLogout()
            }
        }
    }
})