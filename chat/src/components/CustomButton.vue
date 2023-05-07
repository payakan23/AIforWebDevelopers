<script setup>
defineProps({
    label: {
        type: String,
        required: true,
        validator(value) {
            return value.length > 3
        }
    }

})

</script>
<template>
    <button class="rounded bg-indigo-500 px-2 py-1 font-bold text-white hover:bg-indigo-600 transition-all">
        {{ label }}
    </button>
</template>