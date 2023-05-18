<template>
  <h1 class="text-3xl font-bold">Cinema</h1>
<div class="w-full flex justify-center">
  <div class="w-3/4 grid grid-cols-4 gap-4">
    <Movie v-for="movie in movies" :movie="movie"/>
  </div>
</div>  
</template>    
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import Movie from "./components/Movie.vue";
const movies = ref([]);

const fetchMovies = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWExZjIwNzAxYWY2MzFhMTNlNWY2NGI5ZmM2OWUxYiIsInN1YiI6IjVhN2QyYzQ3MGUwYTI2M2U4NTAwMDhkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3NO9tDVEdi2KYhccQ-XLOA-uvsoH3felcoLi5MIdL0M"
    }
  });
  movies.value = response.data.results;

}
onMounted(() => {
  fetchMovies();
})
</script>