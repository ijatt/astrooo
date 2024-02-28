<template>
  <div class="max-w-lg p-4 mx-auto">
    <TheSearch />
    <div class="max-h-[calc(100vh-200px)] overflow-y-auto">
      <TheTitle />
      <template v-for="keyword in keywords">
        <RecommendedPost @click="navigateTo(`/search/results?q=${Object.keys(keyword)[0]}`)" :topic="Object.keys(keyword)[0]" :count="keyword[Object.keys(keyword)[0]]" />
      </template>
      <TheTitle title="Popular posts" />
      <ThePost v-for="post in topPost" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/types/post';
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const { data } = useNuxtData<Post[]>("posts");
const { data: postData, error, refresh } = await useLazyFetch("/api/post/get-post", {
  key: "posts",
  default() {
    return data.value as Post[];
  },
});

const posts = ref<Post[]>(postData.value as Post[]);
const keywords = computed(() => countKeywords(posts.value));
const topPost = computed(() => sortPostByLikes(posts.value));
</script>

<style></style>
