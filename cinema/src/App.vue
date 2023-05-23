<template>
    <h1 class="text-3xl font-bold">Cinema</h1>


    <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>
<script setup>

</script>