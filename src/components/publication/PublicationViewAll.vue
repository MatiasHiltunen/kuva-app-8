<script setup>
import PublicationView from './PublicationView.vue';
import { publicationService } from '../../services/publicationService';
import { useRouter } from 'vue-router';

const { data, error, isFinished } = publicationService.useGetAll()

const router = useRouter()

</script>

<template>
    <div v-if="error">Valitettavasti postauksia ei ollut juuri nyt saatavilla</div>
    <div v-else-if="!isFinished">Ladataan...</div>
    <template v-else>
        <div @click="router.push(`/publication/${publication._id}`)" class="item" v-for="publication in data.publications">

            <PublicationView :publication="publication"></PublicationView>
        </div>
    </template>

</template>

<style scoped>
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(231, 231, 231);
    margin: 20px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>