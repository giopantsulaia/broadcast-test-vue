<script setup>
import { ref } from "vue";
import axios from "../configs/axios";

const message = ref("");

const sendMessage = () => {
  axios
    .post("send-message", { text: message.value })
    .catch((err) => console.log(err));
  message.value = "";
};
</script>
<template>
  <form @submit.prevent="sendMessage" class="w-full my-4">
    <input
      type="message"
      name="message"
      id="message"
      v-model="message"
      class="border border-gray-400 rounded-md p-2 outline-none w-full"
    />
    <input type="submit" hidden />
  </form>
</template>
