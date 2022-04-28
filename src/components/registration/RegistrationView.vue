<script setup>

import { reactive, ref } from 'vue';
import {registrationService} from '../../services/registrationService'

const confirmPassword = ref('')
const registrationSuccess = ref(false)

const userData = reactive({
    username: '',
    password: '',
    email: ''
})

const register = async ()=>{
   const {data, error} = await registrationService.useRegister(userData)

   if(data.value && !error.value){
       registrationSuccess.value = true
   }
}

</script>

<template>

    <div v-if="registrationSuccess">
        Rekisteröityminen onnistui, nyt voit kirjautua sisään
    </div>

    <form v-else @submit.prevent="register">
        <label>Käyttäjänimi</label>
        <input v-model="userData.username" type="text" maxlength="100">

        <label>Sähköposti</label>
        <input v-model="userData.email" type="email">

        <label>Salasana</label>
        <input v-model="userData.password" type="password">

        <label>Salasana uudelleen</label>
        <input v-model="confirmPassword" type="password">

        <button type="submit">Rekisteröidy</button>
    </form>

</template>

