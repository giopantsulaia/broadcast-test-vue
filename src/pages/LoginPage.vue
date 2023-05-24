<script setup>
import { ref } from "vue";
import axios from "../configs/axios/index";

const name = ref("");
const password = ref("");

const submit = async () => {
  try {
    const response = await axios.post("login", {
      name: name.value,
      password: password.value,
    });
    router;
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center border border-black"
  >
    <form class="w-1/5 mx-auto flex flex-col" @submit.prevent="submit">
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        v-model="name"
        class="border border-gray-400 rounded-md p-2 outline-none"
      />
      <label for="password" class="mt-6">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        class="border border-gray-400 rounded-md p-2 outline-none"
      />
      <button type="submit" class="mt-10 w-fit mx-auto p-2 text-xl">
        Log In
      </button>
    </form>
  </div>
</template>

<style scoped></style>
