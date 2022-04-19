<script setup>

import { RouterView } from 'vue-router'
import NavigationBar from './components/navigation/NavigationBar.vue';

</script>

<template>
    <NavigationBar></NavigationBar>
    <router-view></router-view>
</template>

<style>
* {
    margin: 0;
}
</style>
