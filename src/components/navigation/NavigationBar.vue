<script setup>
import { provide, ref } from 'vue';
import { RouterLink } from 'vue-router'
import LoginView from '../login/LoginView.vue';

const showLoginView = ref(false)

provide('showLoginView', showLoginView)

</script>

<template>
    <div class="nav">
        <router-link to="/">Koti</router-link>
        <router-link to="/create">Uusi</router-link>
        <router-link to="/users">Käyttäjät</router-link>
        <a href="#" @click.prevent="showLoginView = true">Kirjaudu</a>
    </div>

    <LoginView v-if="showLoginView"></LoginView>
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