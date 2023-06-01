<template>
    <Transition name="fade">

        <div v-if="isOpen"
            class="flex items-center h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[1000]">
            <Transition name="slide-y" appear>
                <div key="card" class="flex justify-center items-center w-full" @click.self="closeModal">
                    <div class="w-1/3 flex flex-col bg-white p-3 rounded-lg">
                        <div class="w-full">
                            <slot>
                                This is the fallback content 
                            </slot>
                        </div>
                        <div class="border-t my-2"></div>
                        <div class="justify-end flex gap-2">
                            <slot name="actions">
                                <button @click="emit('cancel')"
                                    class="rounded-lg px-2 py-1 bg-red-500 text-white">No</button>
                                <button @click="emit('confirm')"
                                    class="rounded-lg px-2 py-1 bg-indigo-500 text-white">Yes</button>
                            </slot>
                        </div>


                    </div>
                </div>
            </Transition>

        </div>
    </Transition>


</template>
<script setup>
import { nextTick, onMounted,ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(['close', 'confirm', 'cancel'])

const closeModal = () => {
    emit('close');
}
</script>