<template>
    <Modal :is-open="isOpen">
        <note-editor></note-editor>
    </Modal>
</template>

<script setup>
import NoteEditor from "@/components/NoteEditor.vue";
import Modal from "@/components/Modal.vue";

const props = defineProps({isOpen: Boolean})

</script>
