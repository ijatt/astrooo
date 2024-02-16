<template>
  <div class="flex gap-2 items-center">
    <button
      v-if="open"
      class="rounded-full flex items-center p-2 hover:bg-indigo-200"
      @click="open = false"
    >
      <Icon name="mdi:arrow-left-thin" class="w-6 h-6 text-indigo-600" />
    </button>
    <div class="relative w-full">
      <input
        ref="search"
        @input="handleInput"
        @focus="open = true"
        type="text"
        v-model="query"
        @keydown.enter="handleSearch"
        class="w-full py-2 px-4 text-sm mt-1 border-none ring-slate-300 rounded-full focus:ring-0 bg-slate-100 dark:bg-slate-800 focus:outline-none dark:placeholder:text-slate-400 text-slate-500 dark:text-slate-200"
        placeholder="Search"
      />
      <div
        v-if="open"
        class="absolute mt-1 bg-white dark:bg-slate-950 z-50 shadow-md origin-bottom-right w-full rounded-lg"
      >
        <div
          v-if="!query.length"
        >
          <h1 class="text-xl font-bold tracking-wide text-slate-700 dark:text-slate-300 py-2 px-4">
            Recent
          </h1>
          <div
            class="flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
          >
            <div class="flex items-center">
              <Icon name="mdi:clock-outline" class="w-6 h-6" />
              <p class="ml-2 text-slate-600 dark:text-slate-300 font-semibold tracking-wide">
                hehe
              </p>
            </div>
            <button
              class="text-indigo-600 hover:bg-indigo-200 rounded-full flex items-center p-1"
            >
              <Icon name="mdi:close" class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div
          v-else
        >
          <div
              v-for="user in users"
              @click="navigateTo(`/${user.username}`)"
              class="flex items-center gap-x-2 p-4 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
            >
            <img 
              :src="user.image_url ? `${$config.public.BUCKET_URL}/avatars/${user.image_url}` : '/profile.png'"
              class="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"  />
            <div class="flex flex-col">
              <p class="text-slate-600 dark:text-slate-300 font-semibold tracking-wide">
                {{ user.first_name }} {{ user.last_name }}
              </p>
              <p class="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                @{{ user.username }}
              </p>
            </div>
          </div>
          <div
              @click="navigateTo(`/search/results?q=${query}`)"
              class="flex items-center gap-x-2 p-4 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
            >
            <p class="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
              See all results for "{{ query }}"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserSearchResult } from '~/types/user';
const open = ref(false);
const search = ref<HTMLInputElement | null>(null);
const query = ref(useRoute().query.q as string || "")
const timer = ref<number | null>(null);

const users = ref<UserSearchResult[]>([]);

const handleInput = () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    getData();
  }, 500) as unknown as number;
} 

const getData = async () => {
  if (!query.value.length) return;
  users.value = await $fetch<UserSearchResult[]>("/api/search/user?username=" + query.value);
}

const handleSearch = async () => {
  if (query.value.length) {
    await navigateTo(`/search/results?q=${query.value}`);
  }
  if (open.value) {
    open.value = false;
  }
  search.value?.blur();
}

watch(() => query.value, () => {
  if (useRoute().path === "/search/results") {
    useRouter().replace({ query: { q: query.value } });
  }
})
</script>

<style></style>
