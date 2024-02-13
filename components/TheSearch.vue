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
        @focus="open = true"
        type="text"
        class="w-full py-2 px-4 text-sm mt-1 border-none ring-slate-300 rounded-full focus:ring-0 bg-slate-100 dark:bg-slate-800 focus:outline-none dark:placeholder:text-slate-400 text-slate-500 dark:text-slate-200"
        placeholder="Search"
      />
      <div
        v-if="open"
        class="absolute mt-1 bg-white dark:bg-slate-950 z-50 shadow-md origin-bottom-right w-full rounded-lg"
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
              Lancau
            </p>
          </div>
          <button
            class="text-indigo-600 hover:bg-indigo-200 rounded-full flex items-center p-1"
          >
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const open = ref(false);
const search = ref<HTMLInputElement | null>(null);
</script>

<style></style>
