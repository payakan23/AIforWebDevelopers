<!--<template>-->
<!--    <button></button>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    name: "CustomButton"-->
<!--}-->
<!--</script>-->


<script setup>
import {ref} from "vue";

defineProps({
    label: {
        type: String,
        required: true,
    }
})
const textInputRef = ref();

const buttonClicked = () => {
    alert(textInputRef.value);
    // alert("Hello clicker!");
}
const updateTextFromButton = () => {
    textInputRef.value = "Something new!";
}

</script>

<template>
    <input v-model="textInputRef" type="text" placeholder="type something here...">
<!--    <button @click="buttonClicked">{{ label }}</button>-->
    <button class="bg-amber-50 text-black rounded p-2 hover:bg-amber-100 transition" @click="updateTextFromButton">Click Here</button>
</template>