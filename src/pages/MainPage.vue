<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "../configs/axios/index.js";
import instantiatePusher from "../helpers/instantiatePusher.js";
import { useRoute, useRouter } from "vue-router";
import PresenceChannel from "../components/PresenceChannel.vue";

const router = useRouter();
const userName = ref("");
const userId = ref(0);
const usersOnline = reactive([]);

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
const removeMember = (member) => {
  usersOnline.value = usersOnline.value.filter((user) => user.id != member.id);
};
const joinMember = (member) => {
  usersOnline.value.push(member);
};
const showActiveUsers = () => {
  const online = window.Echo.join("online");
  online
    .here((members) => {
      usersOnline.value = members.filter((member) => member.id != userId.value);
    })
    .leaving((member) => removeMember(member))
    .joining((member) => joinMember(member));
};

onMounted(async () => {
  const response = await axios.get("user");
  userName.value = response.data.name;
  userId.value = response.data.id;
  instantiatePusher();
  showActiveUsers();
});
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
  <presence-channel
    v-if="usersOnline.value"
    :users-online="usersOnline.value"
  ></presence-channel>
</template>
