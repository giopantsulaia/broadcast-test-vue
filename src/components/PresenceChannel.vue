<script setup>
const props = defineProps({
  usersOnline: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="flex flex-col px-20 mt-10 w-fit items-center">
    <h2 class="font-bold text-2xl border-b-2 border-gray-400">
      Presence Channel
    </h2>
    <h2 class="text-lg mt-10 font-semibold">
      Online users: {{ props.usersOnline?.length }}
    </h2>
    <ul>
      <li v-for="user in props.usersOnline" class="text-xl my-2">
        {{ user.name }} <span class="text-green-500">●</span>
      </li>
    </ul>
  </div>
</template>
