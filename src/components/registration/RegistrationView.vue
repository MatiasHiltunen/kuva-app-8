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

/* 
    Nimi on tarpeeksi pitkä eikä sisällä erikoismerkkejä
    Onko validi sähköposti?
    Kysytään salasana kahdesti ja varmistetaan että annetut salasanat täsmäävät
    Validoinnin onnistuessa annetaan käyttäjän klikata rekisteröitymisnappia
*/

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

    return {
        isUsernameValid,
        isEmailValid
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
        <small v-if="userData.username.length > 0 && !dataValidation.isUsernameValid">Käyttäjänimi on joko liian lyhyt tai sisältää erikoismerkkejä</small>
        <input v-model="userData.username" maxlength="100" type="text">
        
        <label>Sähköposti</label>
        <small v-if="!dataValidation.isEmailValid">Anna toimiva sähköpostiosoite</small>
        <input v-model="userData.email" type="email">

        <label>Salasana</label>
        <input v-model="userData.password" type="password">

        <label>Salasana Uudelleen</label>
        <input v-model="confirmPassword" type="password">

        <button type="submit">Rekisteröidy</button>
    </form>


</template>