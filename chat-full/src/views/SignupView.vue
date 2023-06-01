<template>
    <div class="h-screen w-full flex justify-center items-center">
        <div class="bg-white rounded-lg p-4 w-1/4 flex flex-col text-black">
            <p v-if="errorMessage != null" class="text-red-500">
                {{errorMessage}}
            </p>
            <div class="flex flex-col mb-2">
                <label for="firstName">First Name</label>
                <input id="firstName" class="border-2 border-indigo-700 rounded-lg p-2 outline-none"
                       v-model="form.firstName" type="text">
            </div>
            <div class="flex flex-col mb-2">
                <label for="lastName">Last Name</label>
                <input id="lastName" class="border-2 border-indigo-700 rounded-lg p-2 outline-none"
                       v-model="form.lastName" type="text">
            </div>

            <div class="flex flex-col mb-2">
                <label for="username">Username</label>
                <input id="username" class="border-2 border-indigo-700 rounded-lg p-2 outline-none"
                       v-model="form.username" type="text">
            </div>

            <div class="flex flex-col mb-2">
                <label for="password">Password</label>
                <input id="password" type="password" class="border-2 border-indigo-700 rounded-lg p-2 outline-none"
                       v-model="form.password">
            </div>


            <button @click="signup" class="bg-indigo-500 text-white mt-2 rounded-lg px-4 py-3">Signup</button>
        </div>
    </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import http from "@/helpers/http";
import {useRouter} from "vue-router";

const router = useRouter();
const errorMessage = ref();
const form = ref({
    firstName: "Haidar",
    lastName: "Mahmoud",
    username: "hdrm",
    password: "password"
});
const signup = async () => {
    errorMessage.value = null;
    for (let key in form.value) {
        if (form.value[key] == "") {
            // alert(`The field: ${key} is required`);
            // return;
        }
    }
    try {
        const {data} = await http.post('/auth/signup', {
            ...form.value
        })
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push({name: "home"});
    } catch (e) {
        errorMessage.value = e.response.data.message;
    }
    console.log({...form.value});
}

</script>