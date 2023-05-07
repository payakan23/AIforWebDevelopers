<script setup>

import ChatList from "@/components/ChatList.vue";
import {ref} from "vue";

const conversations = ref([]);

conversations.value.push({
    title: "Chat with Abdulazeez",
    messages: [
        {
            outgoing: true,
            text: "Hello, World!",
            username: "hdrm147"
        },
        {
            outgoing: false,
            text: "Hello, Haidar!",
            username: "azeez"
        },

    ]
})
conversations.value.push({
    title: "Chat with Ahmed",
    messages: [
        {
            outgoing: true,
            text: "Loooop",
            username: "hdrm147"
        },
        {
            outgoing: false,
            text: "Hello, Haidar!",
            username: "azeez"
        },

    ]
})

</script>
<template>

    <div class="container flex justify-center">
        <chat-list :conversations="conversations"></chat-list>
    </div>
</template>
