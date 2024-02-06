<template>
  <div class="p-4 border-b border-slate-200 hover:bg-slate-50 cursor-pointer">
    <div class="flex items-center gap-2">
      <img src="/background.png" class="w-10 h-10 rounded-full object-cover" />
      <div class="flex w-full justify-between">
        <div class="flex gap-x-2 items-center">
          <h1 class="font-semibold tracking-wide text-slate-600">John Doe</h1>
          <p class="text-sm font-semibold tracking-wide text-slate-500">
            @johndoe
          </p>
          <p class="text-sm tracking-wide text-slate-500">
            <b>·</b> 2h ago
          </p>
        </div>
        <button class="p-1.5 hover:bg-indigo-200 rounded-full flex items-center group">
          <Icon name="mdi:dots-horizontal" class="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
        </button>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <p class="text-slate-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <img v-if="image" src="/background.png" class="max-h-[300px]" alt="" />
    </div>
    <div class="mt-2 flex justify-between">
      <div class="flex items-center group cursor-pointer">
      <button class="flex items-center text-slate-600 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
        <Icon name="mdi:heart-outline" class="w-5 h-5" />
      </button>
      <p
        class="text-slate-600 font-semibold tracking-wide group-hover:text-indigo-600"
      >
        102
      </p>
    </div>
    <div class="flex items-center group cursor-pointer">
      <button class="flex items-center text-slate-600 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
        <Icon name="mdi:comment-outline" class="w-5 h-5" />
      </button>
      <p
        class="text-slate-600 font-semibold tracking-wide group-hover:text-indigo-600"
      >
        102
      </p>
    </div>
    <div class="flex items-center group cursor-pointer">
      <button class="flex items-center text-slate-600 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
        <Icon name="mdi:share-outline" class="w-5 h-5" />
      </button>
      <p
        class="text-slate-600 font-semibold tracking-wide group-hover:text-indigo-600"
      >
        102
      </p>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  image?: boolean;
}>();
</script>

<style>

</style>