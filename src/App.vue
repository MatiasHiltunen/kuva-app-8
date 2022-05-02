<script setup>

import { RouterView } from 'vue-router'
import BaseLayout from './components/layout/BaseLayout.vue';
import NotificationContainer from './components/notification/NotificationContainer.vue';

</script>

<template>
    <NotificationContainer></NotificationContainer>
    <BaseLayout>
        <router-view></router-view>
    </BaseLayout>
</template>

<style>
* {
    margin: 0;
}
</style>
