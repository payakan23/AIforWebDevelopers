<template>
    <div class="flex flex-col mt-2 items-start bg-gray-200 rounded-lg p-2">
        <input v-model="noteTitleValue"
               placeholder="The note title..."
               @keyup.enter="addNote"
               class="w-full rounded-lg p-2 border-2 border-gray-200 mb-2"
               type="text"/>
        <textarea @keyup.enter.exact="addNote" v-model="noteTextValue"
                  class="w-full rounded-lg p-2 border-2 border-gray-200"
                  placeholder="Type in your note..."></textarea>
    </div>
</template>
<script setup>

import {computed, ref} from "vue";

const noteTextValue = ref('');
const noteTitleValue = ref('');

const trimmedNoteTextValue = computed(() => {
    if (noteTextValue.value == null) {
        return "";
    }
    return noteTextValue.value.trim();
})
const trimmedNoteTitleValue = computed(() => {
    if (noteTitleValue.value == null) {
        return "";
    }
    return noteTitleValue.value.trim();
})

const emit = defineEmits(['add']);
const addNote = () => {

    if (trimmedNoteTitleValue.value === "") {
        alert("Please type in the note title");
        return;
    }
    if (trimmedNoteTextValue.value === "") {
        alert("Please type in the note text");
        return;
    }

    // notes.value.push({
    //     text: trimmedNoteTextValue.value,
    //     title: noteTitleValue.value
    // })

    emit('add', {
        text: trimmedNoteTextValue.value,
        title: noteTitleValue.value
    })

    noteTextValue.value = "";
    noteTitleValue.value = "";
}
</script>