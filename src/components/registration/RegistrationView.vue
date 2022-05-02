<script setup>
import { reactive, ref, computed } from 'vue';
import { registrationService } from '../../services/registrationService'

const confirmPassword = ref('')

const isRegistrationSuccessful = ref(false)

const userData = reactive({
    username: '',
    password: '',
    email: ''
})

const allowedCharacters = "qwertyuiopåasdfghjklöäzxcvbnm1234567890"

const dataValidation = computed(() => {

    let hasSpecialCharacters = false
    const characters = userData.username.split('')

    for (let char of characters) {
        if (!allowedCharacters.includes(char)) {
            hasSpecialCharacters = true
        }
    }

    const isUsernameValid = userData.username.length > 2 && !hasSpecialCharacters
    const isEmailValid = userData.email.includes('@') && userData.email.includes('.')
    const isPasswordValid = userData.password.length > 7
    const isPasswordConfirmed = userData.password === confirmPassword.value
    const isAllValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordConfirmed

    return {
        isUsernameValid,
        isEmailValid,
        isPasswordValid,
        isPasswordConfirmed,
        isAllValid
    }

})

const register = async () => {
    const { data, error } = await registrationService.useRegister(userData)

    if (data.value && !error.value) {
        isRegistrationSuccessful.value = true
    }
}

</script>

<template>
    <div v-if="isRegistrationSuccessful">Rekisteröityminen onnistui, nyt voit kirjautua sisään</div>
    <form v-else @submit.prevent="register">
        <label>Käyttäjänimi</label>
        <small v-if="!dataValidation.isUsernameValid">Käyttäjänimi on joko liian lyhyt tai sisältää
            erikoismerkkejä</small>
        <input v-model="userData.username" maxlength="100" type="text">

        <label>Sähköposti</label>
        <small v-if="!dataValidation.isEmailValid">Anna toimiva sähköpostiosoite</small>
        <input v-model="userData.email" type="email">

        <label>Salasana</label>
        <small v-if="!dataValidation.isPasswordValid">Tarkista salasana</small>
        <input v-model="userData.password" type="password">

        <label>Salasana Uudelleen</label>
        <small v-if="!dataValidation.isPasswordConfirmed">Salasanat eivät täsmää</small>
        <input v-model="confirmPassword" type="password">

        <button :disabled="!dataValidation.isAllValid" type="submit">Rekisteröidy</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    width: 300px;
}
</style>