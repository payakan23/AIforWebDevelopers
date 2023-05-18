<template>
    <div class="flex justify-center w-full">
        <div class="flex flex-col w-3/4">
            <div class="flex justify-between items-center">
                <div class="flex">
                    <h1 class="text-5xl font-bold">Notes</h1>
                </div>
                <svg @click="isEditingModalOpen = true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>

            </div>
            <div class="grid grid-cols-3 gap-4 items-start mt-4">
                <TransitionGroup name="fade">
                    <note @removed="removeNote" @edit="enterEditMode" v-for="(note,index) in notes" :index="index" :key="`note-${index}`" 
                      :note="note"></note>
                </TransitionGroup>
               
            </div>
            

        </div>
    </div>
    <Modal v-if="isEditingModalOpen" @close="handleModalClose" :is-open="isEditingModalOpen">
        <template #actions>
            <span></span>
        </template>

        <h3 class="font-bold text-2xl">Note Editor</h3>
        <note-editor @add="addNote" @edit="editNote" :note="editingNote"></note-editor>

    </Modal>
   

  


</template>
<script setup>
import {computed, ref} from "vue";


import {colorForNoteByIndex} from "@/helpers";
import Note from "@/components/Note.vue";
import NoteEditor from "@/components/NoteEditor.vue";
import Modal from "@/components/Modal.vue";
import NoteEditorModal from "@/components/NoteEditorModal.vue";
const isTextShown = ref(false);
const isEditingModalOpen = ref(false);
const isDeletingModalOpen = ref(false);
const boxesCount = ref(5);
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

const editingNote = ref();
const removeNote = (note) => {
    const index = notes.value.indexOf(note);
    // const confirmed = confirm(`Are you sure you want to delete the note ${note.title}`);
    // if (!confirmed) {
        // return;
    // }
    notes.value.splice(index, 1);
}
const addNote = (note) => {
    notes.value.push(note);
    isEditingModalOpen.value = false;
}
const editNote = (note) => {
    const index = notes.value.indexOf(editingNote.value);
    notes.value[index] = note;
    editingNote.value = null;
    isEditingModalOpen.value = false;
}

const isEditing = computed(() => {
    return editingNote.value != null;
})
const enterEditMode = (note) => {
    isEditingModalOpen.value = true;
    editingNote.value = note;
}

const handleModalClose = () => {
    isEditingModalOpen.value = false
    editingNote.value = null;
}

</script>