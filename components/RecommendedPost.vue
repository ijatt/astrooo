<template>
  <div class="py-2 px-4 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer">
    <div class="flex justify-between items-center">
      <p class="text-slate-600 dark:text-slate-300 text-sm tracking-wide">Trending posts</p>
      <button
        class="p-1.5 hover:bg-indigo-200 rounded-full flex items-center group"
      >
        <Icon
          name="mdi:dots-horizontal"
          class="w-5 h-5 text-slate-600 group-hover:text-indigo-600"
        />
      </button>
    </div>
    <p class="text-slate-600 dark:text-slate-300 font-semibold tracking-wide">{{ topic ? topic : 'Taib' }}</p>
    <p class="text-slate-600 dark:text-slate-300 text-sm tracking-wide">{{ count ? count : 0 }} posts</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  topic?: string; 
  count?: number;
}>();
</script>