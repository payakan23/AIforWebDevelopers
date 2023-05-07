<script setup>
const props = defineProps(["message"]);
</script>
<template>
    <div class="flex rounded my-2 px-2 py-4" :class="{'justify-end': message.outgoing,'bg-indigo-500':!message.outgoing,'bg-amber-400':message.outgoing}">
        <p>{{ message.text }}</p>
    </div>
</template>