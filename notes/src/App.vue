<template>
    <div class="flex justify-center w-full">
        <div class="flex flex-col w-3/4">
            <div class="">
                <div class="flex">
                    <h1 class="text-5xl font-bold">Notes</h1>
                </div>
            </div>
            <note-editor @add="addNote"></note-editor>
            <div class="grid grid-cols-3 gap-4 items-start mt-4">
                <note @removed="removeNote" v-for="(note,index) in notes" :index="index" :note="note"></note>
            </div>
            <note-editor @add="addNote"></note-editor>
        </div>
    </div>
</template>
<script setup>
import {computed, ref} from "vue";


import {colorForNoteByIndex} from "@/helpers";
import Note from "@/components/Note.vue";
import NoteEditor from "@/components/NoteEditor.vue";

const notes = ref([
    {
        title: "Note Title",
        text: "Note text body",
    },
    {
        title: "Learn A.I",
        text: "This is the future",
    },

]);

const removeNote = (note) => {
    const index = notes.value.indexOf(note);
    const confirmed = confirm(`Are you sure you want to delete the note ${note.title}`);
    if (!confirmed) {
        return;
    }
    notes.value.splice(index, 1);
}
const addNote = (note) => {
    notes.value.push(note);
}


</script>