<template>

    <div class="flex flex-col bg-white rounded-lg text-black">
        <router-link :to="{name: 'Details', params: {id: movie.id}}">

            <div class="w-full overflow-hidden rounded-t-lg">
                <img class="w-full transition hover:scale-150" :src="imageURL" alt="">
            </div>
            <div class="p-2 flex flex-col">
                <h1 class="text-xl font-bold">{{ movie.title }}</h1>
                <div>
                <span>
                    {{ overview }}
                </span>
                    <a @click.stop="isOverviewExpanded = true"
                       class="text-sm text-indigo-500 font-bold" v-if="overview.length != movie.overview.length"
                       href="#">
                        Read more...
                    </a>
                </div>
            </div>
        </router-link>

    </div>
</template>
<script setup>
import {computed, ref} from "vue";
import {fullImageUrl} from "@/helpers";

const props = defineProps({
    movie: Object
})
const isOverviewExpanded = ref(false);
const imageURL = computed(() => {
    return fullImageUrl(props.movie.backdrop_path);
})

const overview = computed(() => {
    if (isOverviewExpanded.value) {
        return props.movie.overview;
    }
    return props.movie.overview.substr(0, 80) + '...'
})
</script>