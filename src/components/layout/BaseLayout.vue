<script setup>
import NavigationBar from '../navigation/NavigationBar.vue';

</script>

<template>
    <div class="nav-bar">
        <NavigationBar></NavigationBar>
    </div>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style scoped>
.container {
    background-color: darkgoldenrod;
    min-height: 100vh;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.nav-bar {
    background-color: cadetblue;
    position: fixed;
    width: 100%;
    top: 0px;
}
</style>