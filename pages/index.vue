<template>
  <div class="max-w-xl sm:p-4 mx-auto">
    <CreatePost @refresh="refresh()" />
    <ThePost @refresh="refresh()" v-for="post in posts" :key="post.id" :post="post" />
    <div v-if="!posts">
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
import { Vue3Lottie } from 'vue3-lottie';
import astro from '~/public/astro.json';
import type { UserData } from "~/types/user";
import type { Post } from "~/types/post";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

useHead({
  title: "ASTROOO - Home",
  meta: [
    {
      name: "description",
      content: "POST YOUR THOUGHTS AND IDEAS",
    },
  ],
})

const { data } = useNuxtData<Post[]>("posts");
const { data: postData, error, refresh } = await useLazyFetch("/api/post/get-post", {
  key: "posts",
  default() {
    return data.value as Post[];
  },
});

const user = ref<UserData>({} as UserData);
const posts = ref<Post[]>(postData.value as Post[]);
const { y } = useWindowScroll();

onMounted(async () => {
  user.value = await $fetch<UserData>("api/user", {
    method: "GET",
    headers: {
      authorization: `Bearer ${useTokenStore().accessToken}`,
    },
  });
  userStore().setUser(user.value);
  y.value = useScrollStore().scroll;
});

watchEffect(() => {
  posts.value = postData.value as Post[];    
});

onBeforeUnmount(() => {
  useScrollStore().scroll = y.value;
})
</script>
