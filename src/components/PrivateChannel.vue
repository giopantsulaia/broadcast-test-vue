<script setup>
import { onMounted, ref, watch } from "vue";
import PrivateChannelList from "./PrivateChannelList.vue";
const props = defineProps({
  usersOnline: {
    type: Array,
    required: true,
  },
  authUserId: {
    type: Number,
    required: true,
  },
});
const saysHello = ref("");

watch(saysHello, () => {
  setTimeout(() => {
    saysHello.value = "";
  }, 2000);
});
onMounted(() => {
  window.Echo.private(`greetings.${props.authUserId}`).listen(
    "UserGreeted",
    (data) => {
      saysHello.value = data.greetings.from;
    }
  );
});
</script>

<template>
  <div class="flex flex-col px-20 mt-10 w-fit items-center">
    <div
      class="absolute top-0 left-0 w-full h-full z-40 bg-gray-500 opacity-80 text-white flex items-center justify-center"
      v-if="saysHello"
    >
      <div class="flex items-center justify-center z-50">
        <p class="text-3xl font-black">{{ saysHello }} says Hello</p>
        <img src="../assets/wave.gif" alt="wave" width="90" height="90" />
      </div>
    </div>
    <h2 class="font-bold text-2xl border-b-2 border-gray-400">
      Private Channel
    </h2>
    <h2 class="text-lg mt-10 font-semibold">Say hello:</h2>
    <private-channel-list
      :users-online="props.usersOnline"
    ></private-channel-list>
  </div>
</template>
