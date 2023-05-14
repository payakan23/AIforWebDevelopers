<template>
    <div v-if="isOpen"
         class="flex justify-center items-center h-screen w-screen fixed top-0 bg-black bg-opacity-50 z-[1000]"
         @click.self="closeModal"
    >
        <div class="w-1/3 flex flex-col bg-white p-3 rounded-lg">
            <div class="w-full">
                <slot>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam eligendi esse fuga illum
                    ipsa nisi praesentium quam quasi sint. Amet culpa id laboriosam laborum laudantium magnam quod rem
                    tempora.
                </slot>
            </div>
            <div class="justify-end flex gap-2">
                <slot name="actions">
                    <button class="rounded-lg px-2 py-1 bg-red-500 text-white">No</button>
                    <button class="rounded-lg px-2 py-1 bg-indigo-500 text-white">Yes</button>
                </slot>
            </div>


        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(['close'])

const closeModal = () => {
    emit('close');
}
</script>