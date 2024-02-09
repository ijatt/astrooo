<template>
  <div class="max-w-xl p-4 mx-auto">
    <CreatePost @refresh="refresh" />
    <ThePost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts" setup>
import type { UserData } from "~/types/user";
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
