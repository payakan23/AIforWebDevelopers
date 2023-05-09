<template>
    <div class="p-2 rounded-lg"
         :class="colorForNoteByIndex(index)"
    >
        <div class="flex justify-between">
            <h2 class="font-bold text-xl" v-text="note.title"></h2>
            <svg @click="customComponentRemoveNote(note)" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                 class="w-6 h-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>


        </div>
        <pre v-text="note.text"></pre>
    </div>
</template>
<script setup>
import {defineEmits} from 'vue';
import {colorForNoteByIndex} from "@/helpers";

defineProps({
    note: Object,
    index: Number
})
const emit = defineEmits(['removed'])

const customComponentRemoveNote = (note) => {
    emit('removed', note)
}

</script>