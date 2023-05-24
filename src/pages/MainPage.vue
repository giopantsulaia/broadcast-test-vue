<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "../configs/axios/index";

const userName = ref("");

onBeforeMount(async () => {
  const response = await axios.get("user");
  userName.value = response.data.name;
});
</script>
<template>
  <div>
    <h1 class="abolute w-fit left-0 right-0 mx-auto text-3xl" v-if="userName">
      Hello, {{ userName }}
    </h1>
  </div>
</template>
