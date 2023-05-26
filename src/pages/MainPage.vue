<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "../configs/axios/index.js";
import instantiatePusher from "../helpers/instantiatePusher.js";
import PresenceChannel from "../components/PresenceChannel.vue";
import NavBar from "../components/NavBar.vue";
import PublicChannel from "../components/PublicChannel.vue";

const userName = ref("");
const userId = ref(0);
const pusherActive = ref(false);
const usersOnline = reactive([]);

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
const setUser = async () => {
  const response = await axios.get("user");
  userName.value = response.data.name;
  userId.value = response.data.id;
};
onMounted(() => {
  setUser();
  pusherActive.value = instantiatePusher();
  showActiveUsers();
});
</script>

<template>
  <nav-bar :user-name="userName"></nav-bar>
  <div class="flex flex-wrap gap-40">
    <presence-channel
      v-if="usersOnline.value"
      :users-online="usersOnline.value"
    ></presence-channel>
    <public-channel
      v-if="pusherActive"
      :auth-user-name="userName"
    ></public-channel>
  </div>
</template>
