import { useApi } from "../composables/api"
import { setError, setSuccess } from "../composables/notification"
import { globalState } from "../store"

export const authService = {

    async useLogin(payload) {

        const { data, error } = await useApi('/login').post(payload).json()

        if (data.value && !error.value) {
            setSuccess("Kirjautuminen onnistui, tervetuloa " + data.value.account.username)
            globalState.value.accessToken = data.value.access_token
        }
    },
    async useLogout() {
        const { data, error } = await useApi('/logout').post()

        if (error.value) {
            setError(error.value)
        }

        globalState.value.accessToken = null
        setSuccess("Sinut on kirjattu ulos onnistuneesti")
    }
}