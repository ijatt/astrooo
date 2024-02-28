<template>
  <div class="flex p-4 items-center gap-x-2 w-full hover:bg-slate-100 cursor-pointer">
    <img src="/profile.png" class="w-10 h-10 rounded-full" alt="" />
    <div class="flex flex-col overflow-hidden">
      <div class="flex gap-x-2 items-center">
        <h1
          class="font-semibold tracking-wide text-slate-700 dark:text-slate-300"
        >
          {{ user.first_name }} {{ user.last_name }}
        </h1>
        <p class="text-slate-600 dark:text-slate-300">@{{ user.username }}</p>
      </div>
      <p class="text-slate-700 dark:text-slate-300 truncate">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
}

const props = defineProps<{
  user: User;
  message?: string;
}>();
</script>

<style></style>
