<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "../configs/axios/index.js";
import instantiatePusher from "../helpers/instantiatePusher.js";
import PresenceChannel from "../components/PresenceChannel.vue";
import NavBar from "../components/NavBar.vue";
import PublicChannel from "../components/PublicChannel.vue";
import PrivateChannel from "../components/PrivateChannel.vue";

const userName = ref("");
const userId = ref(0);
const pusherActive = ref(false);
const usersOnline = reactive([]);

const onUserLeave = (member) => {
  usersOnline.value = usersOnline.value.filter((user) => user.id != member.id);
};
const onUserJoin = (member) => {
  usersOnline.value.push(member);
};
const showActiveUsers = () => {
  const online = window.Echo.join("online");
  online
    .here((members) => {
      usersOnline.value = members.filter((member) => member.id != userId.value);
    })
    .leaving((member) => onUserLeave(member))
    .joining((member) => onUserJoin(member));
};
const setAuthenticatedUser = async () => {
  const response = await axios.get("user");
  userName.value = response.data.name;
  userId.value = response.data.id;
};

onMounted(() => {
  setAuthenticatedUser();
  pusherActive.value = instantiatePusher();
  showActiveUsers();
});
</script>

<template>
  <nav-bar :user-name="userName"></nav-bar>
  <div class="flex flex-wrap gap-40" v-if="usersOnline.value && pusherActive">
    <presence-channel :users-online="usersOnline.value"></presence-channel>
    <public-channel
      :auth-user-name="userName"
      v-if="pusherActive"
    ></public-channel>
    <private-channel
      :users-online="usersOnline.value"
      :auth-user-id="userId"
    ></private-channel>
  </div>
  <div v-else class="absolute w-fit left-0 right-0 mx-auto text-2xl top-48">
    Loading...
  </div>
</template>
