<template>
  <div class="rounded-md mr-2 border border-slate-200 dark:border-slate-700 max-w-[250px]">
    <img src="/background.png" class="w-full h-[100px] object-cover" alt="">
    <div class="flex justify-between">
      <div class="w-16 h-16 -mt-[34px] ml-4 bg-white border border-slate-200 rounded-full p-1">
        <img class="w-full h-full object-cover rounded-full" alt=""
          :src="user.image_url ? `${$config.public.BUCKET_URL}/avatars/${user.image_url}` : '/profile.png' "
        />
      </div>
    </div>
    <div class="w-full flex justify-between items-center p-2">
      <div class="flex flex-col">
        <h1 class="text-lg font-bold tracking-wide text-slate-700 dark:text-slate-300">{{ user.first_name }} {{ user.last_name }}</h1>
        <p class="text-slate-600 text-sm dark:text-slate-300">@{{ user.username }}</p>
      </div>
      <button
        class="py-1 px-4 text-sm bg-indigo-600 text-white font-semibold tracking-wide rounded-full  focus:outline-none">
        Follow
      </button>
    </div>
    <p class="p-2 text-slate-600 truncate dark:text-slate-300 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quisquam, quos.
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { UserSearchResult } from '~/types/user';
const props = defineProps<{
  user: UserSearchResult;
}>();
</script>

<style></style>