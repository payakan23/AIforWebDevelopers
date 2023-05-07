<script setup>
import {computed, ref} from "vue";
import ChatBubble from "@/components/ChatBubble.vue";

const props = defineProps({
    conversations: {
        type: [Array],
        required: true,
    }
})
const selectedConversationIndex = ref();
const currentConversation = computed(() => {
    return props.conversations[selectedConversationIndex.value];
});
</script>
<template>
    <div class="flex gap-2 text-black w-full m-4">
        <div class="flex flex-col w-1/5 bg-indigo-100 rounded p-3">
            <div @click="selectedConversationIndex = index" v-for="(conversation,index) in conversations"
                 class="p-2 rounded m-1 cursor-pointer hover:bg-indigo-200">
                <span class="font-bold">{{ conversation.title }}</span>
            </div>
        </div>
        <div class="flex flex-col w-4/5 bg-indigo-200 rounded h-[90vh]">
            <div v-if="currentConversation != null" class="flex flex-col w-full px-2">
                <chat-bubble v-for="message in currentConversation.messages" :message="message"></chat-bubble>
            </div>
            <div v-else class="justify-center items-center h-full w-full">
                <span>Please select a conversation first.</span>
            </div>
        </div>

    </div>
</template>