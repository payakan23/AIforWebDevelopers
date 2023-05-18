<template>
    <div class="flex flex-col bg-white rounded-lg text-black">
        <div class="w-full overflow-hidden rounded-t-lg">
            <img class="w-full transition hover:scale-150" :src="imageURL" alt="">
        </div>
        <div class="p-2 flex flex-col">
            <h1 class="text-xl font-bold">{{ movie.title }}</h1>
            <div>
                <span>
                    {{ overview }}
                </span>
            <a @click="isOverviewExpanded = true"
             class="text-sm text-indigo-500 font-bold" v-if="overview.length != movie.overview.length" href="#">
                 Read more...
            </a>
            </div>
        </div>
    </div>
</template>
<script setup>
import {computed,ref} from "vue";
const props = defineProps({
    movie: Object
})
const isOverviewExpanded = ref(false);
const imageURL = computed(()=>{
    return `https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path}`
})

const overview = computed(()=>{
    if(isOverviewExpanded.value) {
        return props.movie.overview;
    }
    return props.movie.overview.substr(0,80) + '...'
})
</script>