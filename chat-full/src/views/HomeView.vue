<script setup>

import {computed, onMounted, ref, watch} from "vue";
import http from "@/helpers/http";
import Modal from "@/components/Modal.vue";

const conversations = ref();
const messages = ref([]);
const user = ref();
const isLoading = computed(() => {
    return conversations.value == null;
})
const selectedConversation = ref();
const fetchConversations = async () => {
    try {
        const {data} = await http.get('/conversations');
        conversations.value = data.conversations
    } catch (error) {

    }
}
const fetchMessages = async () => {
    const {data} = await http.get(`/conversations/${selectedConversation.value.id}/messages`)
    messages.value = data.messages;
    console.log(data);
}

watch(selectedConversation, () => {
    fetchMessages();
})
const selectConversation = (conversation) => {
    selectedConversation.value = conversation

}
const sendMessage = async () => {
    const {data} = await http.post(`/conversations/${selectedConversation.value.id}/messages`, {
        text: messageInputValue.value
    })
    messages.value.push(data.message);
    messageInputValue.value = null;
}

const users = ref([]);
const fetchUsers = async () => {
    const {data} = await http.get('/conversations/users');
    users.value = data.users;
}
const messageInputValue = ref();
const isCreatingNewConversation = ref(false);
const newConversationTitleValue = ref('');

watch(isCreatingNewConversation, (newValue) => {
    if (newValue) {
        fetchUsers();
    }
})
const createConversation = async () => {
    const {data} = await http.post('/conversations', {
        users: selectedUsers.value,
        title: newConversationTitleValue.value
    });
    isCreatingNewConversation.value = false;
    conversations.value.push(data);
    selectedConversation.value = data;
}
const selectedUsers = ref([]);
onMounted(() => {
    user.value = JSON.parse(localStorage.getItem("user"));
    fetchConversations();

})


</script>

<template>

    <div class="font-bold  bg-black h-screen flex justify-center flex-col items-center">
        <modal @confirm="createConversation" :is-open="isCreatingNewConversation">
            <div class="flex flex-col">
                <input v-model="newConversationTitleValue"
                       class="w-full rounded-lg p-2 text-lg text-black border-2 border-indigo-500 outline-none"
                       type="text">
                <div v-for="user in users" class="flex gap-2">
                    <input :value="user.id" type="checkbox" v-model="selectedUsers">
                    <span class="text-black">{{ `${user.firstName} ${user.lastName}` }}</span>

                </div>
            </div>

        </modal>
        <div class="w-10/12 mx-20 flex mb-2">
            <h1 v-if="user">Welcome, {{ user.firstName }}</h1>
        </div>
        <div class="h-[85%] w-10/12  flex rounded-lg overflow-hidden">
            <div class="w-3/12 bg-indigo-300 flex flex-col">
                <div class="flex justify-center ">
                    <button @click="isCreatingNewConversation = true"
                            class="bg-indigo-800 mt-2 px-4 py-2 text-white text-lg rounded-lg">Create New Conversation
                    </button>
                </div>
                <div v-for="conversation in conversations"
                     class="mx-3 my-2 bg-indigo-500 rounded-lg cursor-pointer flex items-center p-2"
                     :key="`conversation-${conversation.id}`"
                     @click="selectConversation(conversation)"
                >
                    <div class="flex flex-col">
                        <span class="text-white font-bold text-sm">{{ conversation.title }}</span>
                        <span class="text-gray-300 font-bold text-xs"
                              v-for="user in conversation.users">{{ user.firstName }}</span>
                    </div>
                </div>
            </div>
            <div class="w-9/12 bg-indigo-400 flex">
                <div v-if="selectedConversation == null"
                     class="flex justify-center items-center flex-col w-full h-full">
                    <p class="">Please select a conversation...</p>

                </div>
                <div class="w-full flex flex-col" v-else>
                    <div class="flex h-full w-full flex-col items-start p-4">
                        <div class="flex-1 w-full max-h-[90%] overflow-scroll mb-4">
                            <div v-for="message in messages" class="mb-2 w-full">
                                <div class="flex w-full"
                                     :class="{'justify-end' : message.user.id == user.id,'justify-start': message.user.id != user.id}">
                                    <div class="flex flex-col p-2 rounded "
                                         :class="{'bg-gray-500' : message.user.id == user.id,'bg-gray-300': message.user.id != user.id}"
                                    >
                                    <span class="text-xs text-gray-600">
                                        {{ message.user.firstName }}
                                    </span>
                                        <p class="text-sm">
                                            {{ message.text }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full">
                            <input v-model="messageInputValue" @keyup.enter="sendMessage"
                                   class="w-full text-sm rounded-lg p-2 text-black"
                                   type="text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
