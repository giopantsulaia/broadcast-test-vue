<script setup>
import { onMounted, ref } from "vue";
import axios from "../configs/axios/index";
import router from "../router";

const userName = ref("");

const logout = async () => {
  try {
    await axios.post("logout");
    sessionStorage.clear();
    router.push("/login");
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  const response = await axios.get("user");
  userName.value = response.data.name;
});
</script>
<template>
  <nav
    class="absolute top-0 left-0 w-full h-16 border-b-2 flex justify-between items-center px-10"
  >
    <h1 class="text-3xl" v-if="userName">
      Hello, <span class="font-black">{{ userName }}</span>
    </h1>
    <button class="text-2xl text-red-600 font-bold" @click="logout">
      LOG OUT
    </button>
  </nav>
</template>
