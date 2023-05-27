<script setup>
import axios from "../configs/axios";

const props = defineProps({
  usersOnline: {
    type: Array,
    required: true,
  },
});
const sayHello = async (id) => {
  await axios.post(`greet/${id}`);
};
</script>
<template>
  <ul>
    <li
      v-for="user in props.usersOnline"
      class="text-xl my-4 cursor-pointer flex flex-col items-center"
      @click="sayHello(user.id)"
    >
      <div class="flex">
        {{ user.name }}
        <img src="../assets/wave.png" alt="wave" width="30" height="30" />
      </div>
    </li>
  </ul>
</template>
