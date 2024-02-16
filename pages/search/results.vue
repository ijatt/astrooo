<template>
  <div class="max-w-lg p-4 mx-auto">
    <TheSearch />
    <div class="max-h-[calc(100vh-200px)] overflow-y-auto">
      <TheTitle title="Users" v-if="items.length" />
      <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'snap-start' }">
        <UserCard @click="navigateTo(`/${item.username}`)" :user="item" />
      </UCarousel>
      <TheTitle title="Posts" v-if="posts.length" />
      <ThePost v-for="post in posts" :key="post.id" :post="post" />
      <div v-if="!posts.length && !items.length">
        <p class="text-slate-600 text-center italic p-4">
          No results found for "{{ $route.query.q }}"
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserSearchResult } from '~/types/user';
import type { Post } from '~/types/post';

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
    const searchResult = await $fetch<Results>(`/api/search?q=${useRoute().query.q}`);
    posts.value = searchResult.posts as Post[];
    items.value = searchResult.users as UserSearchResult[];
  }
}
</script>

<style>

</style>