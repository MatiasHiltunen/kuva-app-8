<script setup>
import { onClickOutside } from '@vueuse/core';
import { inject, reactive, ref } from 'vue';
import { authService } from '../../services/authService';


const showLoginView = inject('showLoginView')

const credentials = reactive({
    username: '',
    password: ''
})

const target = ref(null)

onClickOutside(target, () => {
    showLoginView.value = false
})

const login = async ()=>{
    await authService.useLogin(credentials)

    credentials.password = ''
    credentials.username = ''
}

</script>

<template>

    <form ref="target" class="login" @submit.prevent="login">

        <label>Käyttäjänimi</label>
        <input v-model="credentials.username" type="text">

        <label>Salasana</label>
        <input v-model="credentials.password" type="password">

        <button type="submit">Kirjaudu</button>

    </form>
</template>

<style scoped>
.login {
    background-color: aqua;
    padding: 20px;
    width: 250px;
    position: fixed;
    left: 50%;
    right: 50%;
    top: 50%;
    display: flex;
    transform: translateX(-50%) translateY(-50%);
    flex-wrap: wrap;
    flex-direction: column;
}

input {
    flex: 6;
    margin-top: 6px;
}

label {
    flex: 6;
}

button {
    margin-top: 6px;
}
</style>