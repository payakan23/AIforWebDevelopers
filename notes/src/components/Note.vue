<template>
    <div class="p-2 rounded-lg"
         :class="colorForNoteByIndex(index)"
    >
        <div class="flex justify-between">
            <h2 class="font-bold text-xl" v-text="note.title"></h2>
            <div class="flex gap-1 hover:opacity-100 opacity-0">
                <svg @click="editNote" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                </svg>

                <svg @click="isDeletingModalOpen = true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-6 h-6 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>

            </div>


        </div>
        <pre v-text="note.body"></pre>
        
        <Modal :is-open="isDeletingModalOpen" @close="isDeletingModalOpen = false"
        @cancel="isDeletingModalOpen = false"
        @confirm="removeNote"
        >
                 <div class="flex flex-col">
<h3 class="font-bold text-2xl">Confirm</h3>
<p>
    Are you sure you want to delete the note?
</p>
                 </div>
        </Modal>
    
    </div>
</template>
<script setup>
import Modal from './Modal.vue';
import {defineEmits,ref} from 'vue';
import {colorForNoteByIndex} from "@/helpers";
const isDeletingModalOpen = ref();
const props = defineProps({
    note: Object,
    index: Number
})

const emit = defineEmits(['removed', 'edit'])

const removeNote = () => {
    emit('removed', props.note)
}
const editNote = () => {
    emit('edit', props.note);
}
</script>