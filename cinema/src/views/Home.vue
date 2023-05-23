<template>
    <div class="w-full flex flex-col items-center">
        <div class="w-2/5 mb-6 relative">
            <input @input="searchMoviesDebounced" @blur="handleBlur" v-model="searchQueryValue"
                   placeholder="Search for a movie..."
                   class="w-full p-2 rounded-lg text-black" type="text">
            <div class="flex gap-4 mt-4">
                <button @click="timeWindow = 'week'" class="bg-indigo-500 rounded-lg px-2 py-1"
                        :class="{'bg-rose-700':timeWindow === 'week'}"
                >Week
                </button>
                <button @click="timeWindow = 'day'" class="bg-indigo-500 rounded-lg px-2 py-1"
                        :class="{'bg-rose-700':timeWindow == 'day'}"

                >Day
                </button>
            </div>
            <Transition name="slide-fade">
                <div v-if="isSearching"
                     class="absolute bottom-[-%100] mt-2 w-full p-2 rounded-lg z-10 bg-gray-500 overflow-y-scroll scrollbar-hide scr max-h-[80vh] ">
                    <div v-if="searchResults == null">
                        <h2>Loading...</h2>
                    </div>
                    <transition-group name="fade">

                        <div class="flex mb-2 hover:bg-gray-700 rounded transition cursor-pointer"

                             v-for="movie in searchResults" :key="`movie-${movie.id}`">
                            <div class="flex items-center w-2/6 aspect-[1.7/1]">
                                <img class="w-full rounded" :src="fullImageUrl(movie.backdrop_path)" alt="">

                            </div>
                            <div class="flex ms-2 w-4/6 flex-col my-2">
                                <h3 class="text-[1.1rem] font-bold">{{ movie.title }}</h3>
                                <p class="text-sm">
                                    {{ movie.overview.substring(0, 80) }}
                                </p>
                            </div>
                        </div>
                        <div v-if="searchResults != null && searchResults.length == 0" class="flex justify-center">
                            <h1>No Results.</h1>
                        </div>
                    </transition-group>
                </div>

            </Transition>
        </div>
        <div class="w-3/4 grid grid-cols-4 gap-4 items-stretch">

            <Movie v-if="!isLoadingMovies" v-for="movie in movies" :movie="movie"/>
            <div v-else class="col-span-4 flex justify-center">
                <span>Loading Movies...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "@/http";
import {computed, onMounted, ref, watch} from "vue";
import Movie from "@/components/Movie.vue";
import {fullImageUrl} from "@/helpers";
import {debounce} from "lodash";

const searchQueryValue = ref('');
const isSearching = computed(() => {
    return searchQueryValue.value != '';
});
const movies = ref(null);
const isLoadingMovies = computed(() => {
    return movies.value == null;
});
const searchResults = ref();
const timeWindow = ref('week');
watch(timeWindow, () => {
    fetchTrendingMovies();
});
const searchMovies = async () => {
    const {data} = await axios.get('/search/movie', {
        params: {
            query: searchQueryValue.value
        },
    });
    searchResults.value = data.results;
}
const searchMoviesDebounced = debounce(searchMovies, 200)

const handleBlur = () => {
    searchResults.value = null
    searchQueryValue.value = '';
}
const fetchTrendingMovies = async () => {
    movies.value = null;
    const {data} = await axios.get(`/trending/movie/${timeWindow.value}`, {});
    movies.value = data.results;
}

onMounted(() => {
        fetchTrendingMovies();
})
</script>