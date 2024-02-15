<template>
  <div class="max-w-lg p-4 mx-auto">
    <TheSearch />
    <div class="max-h-[calc(100vh-200px)] overflow-y-auto">
      <TheTitle title="Users" v-if="items.length" />
      <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'snap-start' }">
        <UserCard :user="item" />
      </UCarousel>
      <TheTitle title="Posts" v-if="posts.length" />
      <ThePost v-for="post in posts" :key="post.id" :post="post" />
      <div v-if="!posts.length && !items.length">
        <ClientOnly>
          <Vue3Lottie 
            :animation-data="astro"
            :speed="1"  
            :loop="true"
            :autoplay="true"
            style="width: 300px; height: 300px;"
          />
        </ClientOnly>
        <p class="text-slate-600 text-center italic">
          No results found
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserSearchResult } from '~/types/user';
import type { Post } from '~/types/post';
import astro from '~/public/astro.json';
import { Vue3Lottie } from 'vue3-lottie';

interface Results {
  posts: Post[];
  users: UserSearchResult[];
}

const { data } = useNuxtData<Results>("search");
const { data: searchResult } = await useFetch<Results>(`/api/search?q=${useRoute().query.q}`, {
  key: "search",
  default() {
    return data.value as Results;
  }
});

const posts = ref<Post[]>(searchResult.value?.posts as Post[]);
const items = ref<UserSearchResult[]>(searchResult.value?.users as UserSearchResult[]);
const timer = ref<number | null>(null);

watch(() => useRoute().query.q, async () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    refreshData();
  }, 500) as unknown as number;
});

const refreshData = async () => {
  if (useRoute().query.q) {
    const { data: searchResult } = await useLazyFetch<Results>(`/api/search?q=${useRoute().query.q}`, {
      key: "search",
      default() {
        return data.value as Results;
      }
    });
    posts.value = searchResult.value?.posts as Post[];
    items.value = searchResult.value?.users as UserSearchResult[];
  }
}
</script>

<style>

</style>