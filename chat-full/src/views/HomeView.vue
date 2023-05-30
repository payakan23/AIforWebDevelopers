<script setup>

import {computed, ref} from "vue";
    const conversations = ref();
    const isLoading = computed(() => {
        return conversations.value == null;
    })

</script>

<template>
    <div class="font-bold text-3xl bg-blue-500 h-screen flex justify-center items-center">
        <div class="h-[90%] w-full mx-20 bg-red-400 flex">
            <div class="w-3/12 bg-yellow-600">

            </div>
            <div class="w-9/12 bg-red-600">

            </div>

        </div>
    </div>
</template>
