<template>
  <div class="max-w-xl p-4 mx-auto">
    <CreatePost @refresh="refresh" />
    <ThePost v-for="post in posts" :key="post.id" :post="post" />
    <div v-if="posts.length === 0">
      <ClientOnly>
        <Vue3Lottie 
          :animation-data="astro"
          :speed="1"
          :loop="true"
          :autoplay="true"
          style="width: 300px; height: 300px;"
        />
        <p class="text-slate-600 text-center italic">
          Loading...
        </p>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserData } from "~/types/user";
import astro from "~/public/astro.json";
import { Vue3Lottie } from "vue3-lottie";
import type { Post } from "~/types/post";
definePageMeta({
  middleware: "auth",
  layout: "default",
});

const user = ref<UserData>({} as UserData);
const posts = ref<Post[]>([]);
onMounted(async () => {
  user.value = await $fetch<UserData>("api/user", {
    method: "GET",
    headers: {
      authorization: `Bearer ${useTokenStore().accessToken}`,
    },
  });
  posts.value = await $fetch<Post[]>("api/post/get-post", {
    method: "GET",
  });
  userStore().setUser(user.value);
});

const refresh =  async () => {
  posts.value = await $fetch<Post[]>("api/post/get-post", {
    method: "GET",
  });
}
</script>
