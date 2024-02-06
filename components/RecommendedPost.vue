<template>
  <div class="py-2 px-4 hover:bg-slate-100 cursor-pointer">
    <div class="flex justify-between items-center">
      <p class="text-slate-600 text-sm tracking-wide">Trending posts</p>
      <button
        class="p-1.5 hover:bg-indigo-200 rounded-full flex items-center group"
      >
        <Icon
          name="mdi:dots-horizontal"
          class="w-5 h-5 text-slate-600 group-hover:text-indigo-600"
        />
      </button>
    </div>
    <p class="text-slate-600 font-semibold tracking-wide">{{ topic ? topic : 'Taib' }}</p>
    <p class="text-slate-600 text-sm tracking-wide">10 posts</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  topic?: string; 
}>();
</script>