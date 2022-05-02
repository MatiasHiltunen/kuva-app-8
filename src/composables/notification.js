import { readonly, ref } from 'vue'

const msg = ref({})


const setNotificationByType = (message, color) => {

    const key = new Date().getTime().toString(16)

    msg.value[key] = {
        message: message,
        color: color
    }

    setTimeout(()=>{

        removeNotificationByKey(key)

    }, 5000)

}

export const setError = (errorMsg) => {
    setNotificationByType(errorMsg, 'red')
}

export const setSuccess = (successMsg) => {
    setNotificationByType(successMsg, 'green')
}

export const removeNotificationByKey = (key) => {
    delete msg.value[key]
}

export const getNotifications = readonly(msg)