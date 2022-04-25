<script setup>
import { onClickOutside } from '@vueuse/core';
import { inject, reactive, ref } from 'vue';
import { authService } from '../../services/authService';

const credentials = reactive({
    username: '',
    password: ''
})

const showLoginView = inject('showLoginView')

const target = ref(null)

onClickOutside(target, ()=>{
    showLoginView.value = false
})

const login = async ()=>{
    await authService.useLogin(credentials)

    credentials.username = ''
    credentials.password = ''
}

</script>

<template>

    <form @submit.prevent="login" ref="target" class="login">
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
    width: 250px;
    position: fixed;
    left: 50%;
    right: 50%;
    top: 50%;
    display: flex;
    flex-direction: column;
    transform: translateX(-50%) translateY(-50%);
    padding: 20px;
}

input {
    margin-top: 6px;
}

button {
    margin-top: 12px;
}
</style>