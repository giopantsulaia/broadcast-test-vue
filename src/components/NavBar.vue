<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
defineProps({
  userName: {
    type: String,
    required: true,
  },
});
const logout = async () => {
  try {
    window.Echo.leave("online");
    await axios.post("logout");
    sessionStorage.clear();
    router.push("/login");
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <nav
    class="relative top-0 left-0 w-full h-16 border-b-2 flex justify-between items-center px-20"
  >
    <h1 class="text-3xl font-black" v-if="userName">
      {{ userName }}
    </h1>
    <button class="text-2xl text-red-600 font-bold" @click="logout">
      LOG OUT
    </button>
  </nav>
</template>
