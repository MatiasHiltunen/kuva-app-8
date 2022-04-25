<script setup>
import { provide, ref } from 'vue';
import { RouterLink } from 'vue-router'
import { isAuth } from '../../store';
import LoginView from '../login/LoginView.vue';
import { authService } from '../../services/authService'

const showLoginView = ref(false)

provide('showLoginView', showLoginView)

const logout = async ()=>{
    await authService.useLogout()
}


</script>

<template>
    <div class="nav">
        <router-link to="/">Koti</router-link>
        <router-link to="/create">Uusi</router-link>
        <router-link v-if="isAuth" to="/users">Käyttäjät</router-link>
        <a href="#" v-if="isAuth" @click="logout">Ulos</a>
        <a href="#" v-else @click.prevent="showLoginView = true">Kirjaudu</a>
    </div>

    <LoginView v-if="showLoginView && !isAuth"></LoginView>
</template>

<style>
.nav {
    display: flex;
    justify-content: center;
    width: 100%;
}

a {
    margin: 20px;
    font-size: 18px;
}
</style>