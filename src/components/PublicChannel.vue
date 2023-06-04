<script setup>
import { onMounted, reactive } from "vue";
import PublicChannelMessageForm from "./PublicChannelMessageForm.vue";
const props = defineProps({
  authUserName: {
    type: String,
    required: true,
  },
});

const messages = reactive([]);

onMounted(() => {
  window.Echo.channel("messages").listen("MessageSent", (data) => {
    messages.push(data.message);
  });
});
</script>
<template>
  <div class="flex flex-col px-20 mt-10 w-1/3 items-center">
    <h2 class="font-bold text-2xl border-b-2 border-gray-400">
      Public Channel
    </h2>
    <h2 class="text-lg mt-10">Type here:</h2>
    <public-channel-message-form></public-channel-message-form>
    <ul class="w-full">
      <li v-for="message in messages" class="text-xl my-2 w-full flex flex-col">
        <div
          class="w-full flex flex-col"
          :class="{ 'items-end': message.sender !== props.authUserName }"
        >
          <span class="font-medium">{{ message.sender }} </span>
          <p class="text-gray-600">
            {{ message.text }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
