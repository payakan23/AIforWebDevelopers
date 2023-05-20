<template>
    <div class="w-full flex justify-center">
        <div class="w-1/2">
            <transition name="fade" mode="out-in">
                <movie v-if="details" :movie="details"></movie>
                <span v-else>Loading Details...</span>
            </transition>

        </div>
    </div>
</template>
<script setup>

import axios from "@/http";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import Movie from "@/components/Movie.vue";

const details = ref();
const route = useRoute();
const fetchMovieDetails = async () => {
    const {data} = await axios.get(`/movie/${route.params.id}`);
    details.value = data
}
onMounted(() => {
    fetchMovieDetails();
})
</script>
