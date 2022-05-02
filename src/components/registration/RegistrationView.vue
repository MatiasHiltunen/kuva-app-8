<script setup>

import { computed } from '@vue/reactivity';
import { reactive, ref } from 'vue';
import { setError, setSuccess } from '../../composables/notification';
import {registrationService} from '../../services/registrationService'

const confirmPassword = ref('')
const registrationSuccess = ref(false)

const userData = reactive({
    username: '',
    password: '',
    email: ''
})

const allowedCharacters = "qwertyuiopåasdfghjklöäzxcvbnm1234567890QWERTYUIOPÅASDFGHJKLÖÄZXCVBNM"

const dataValidation = computed(()=>{

    /*  
    
    Nimi on tarpeeksi pitkä eikä sisällä erikoismerkkejä OK
    Onko validi sähköposti? OK
    Kysytään salasana kahdesti ja varmistetaan että annetut salasanat täsmäävät OK
    Validoinnin onnistuessa annetaan käyttäjän klikata rekisteröitymisnappia OK
    
    */

    let hasSpecialCharacters = false

    const characters = userData.username.split('')

    for(let char of characters){
        if(!allowedCharacters.includes(char)){
            hasSpecialCharacters = true
            break
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


const register = async ()=>{
   const {data, error, statusCode} = await registrationService.useRegister(userData)

   if(data.value && !error.value && statusCode.value < 300){
       registrationSuccess.value = true

       setSuccess("Rekisteröityminen onnistui!")
   } else {
       setError(data.value ?? error.value)
   }
}


</script>

<template>

    <div v-if="registrationSuccess">
        Rekisteröityminen onnistui, nyt voit kirjautua sisään
    </div>

    <form v-else @submit.prevent="register">
        <label>Käyttäjänimi</label>
        <small v-if="!dataValidation.isUsernameValid">Käyttäjänimi on liian lyhyt tai sisältää erikoismerkkejä</small>
        <input v-model="userData.username" type="text" maxlength="100">

        <label>Sähköposti</label>
        <small v-if="!dataValidation.isEmailValid">Syötä toimiva sähköposti</small>
        <input v-model="userData.email" type="email">

        <label>Salasana</label>
        <small v-if="!dataValidation.isPasswordValid">Salasana on liian lyhyt</small>
        <input v-model="userData.password" type="password">

        <label>Salasana uudelleen</label>
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