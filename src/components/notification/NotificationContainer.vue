<script setup>
import { getNotifications, removeNotificationByKey } from '../../composables/notification';


</script>

<template>

<div class="notification">
    <template v-for="(notification, key) in getNotifications">
        <div 
        class="notification-item" 
        :style="{color: notification.color}"
        @click="removeNotificationByKey(key)"
        >
            {{ notification.message }}
        </div>
    </template>
</div>

</template>

<style scoped>
.notification {
    position: fixed;
    bottom: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 40;
}

.notification-item {
    background-color: white;
    max-width: 300px;
    cursor: pointer;
    padding: 10px;
    border: solid 2px black;
    margin: 2px;
}

</style>