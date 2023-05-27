<template>
    <div class="flex flex-col mt-2 items-start bg-gray-200 rounded-lg p-2">
        <input v-model="noteTitleValue"
               placeholder="The note title..."
               @keyup.enter="addOrSaveNote"
               class="w-full rounded-lg p-2 border-2 border-gray-200 mb-2"
               type="text"/>
        <textarea @keyup.enter.exact="addOrSaveNote" v-model="noteTextValue"
                  class="w-full rounded-lg p-2 border-2 border-gray-200"
                  placeholder="Type in your note..."></textarea>
        <div class="flex w-full justify-end">
            <MyButton @click="addOrSaveNote" class="mt-2">Submit</MyButton>
        </div>
    </div>
</template>
<script setup>

import {computed, ref, defineProps, watch, toRefs, toRef, watchEffect, onUpdated, onMounted} from "vue";
import MyButton from "@/components/MyButton.vue";

const props = defineProps({
    note: {
        type: Object,
        required: false,
    }
})


const isEditing = computed(() => {
    return props.note != null;
})


const currentlyEditingNote = computed(() => {
    return props.note;
})

const noteTextValue = ref('');
const noteTitleValue = ref('');


onMounted(() => {
    if(props.note != null) {
        noteTextValue.value = props.note.body;
        noteTitleValue.value = props.note.title;
    }
})



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

const emit = defineEmits(['add', 'edit']);
const addOrSaveNote = () => {

    if (trimmedNoteTitleValue.value === "") {
        alert("Please type in the note title");
        return;
    }
    if (trimmedNoteTextValue.value === "") {
        alert("Please type in the note text");
        return;
    }

    if (isEditing.value) {
        emit('edit', {
            body: trimmedNoteTextValue.value,
            title: noteTitleValue.value,
        })
    } else {
        emit('add', {
            body: trimmedNoteTextValue.value,
            title: noteTitleValue.value
        })
    }

    noteTextValue.value = "";
    noteTitleValue.value = "";
}
</script>