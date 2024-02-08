<template>
  <div class="p-4 border-b border-slate-200 hover:bg-slate-50 cursor-pointer">
    <div class="flex items-center gap-2">
      <img src="/background.png" class="w-10 h-10 rounded-full object-cover" />
      <div class="flex w-full justify-between">
        <div class="flex gap-x-2 items-center">
          <h1 class="font-semibold tracking-wide text-slate-600">{{ post.users.first_name }} {{ post.users.last_name }}</h1>
          <p class="text-sm font-semibold tracking-wide text-slate-500">
            @{{ post.users.username }}
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
        {{ post.content }}
      </p>
      <div class="grid grid-flow-col gap-2" v-if="post.images?.length">
        <template v-for="img in post.images">
          <img :src="`${config.public.BUCKET_URL}/posts/${img.image_url}`" class="object-cover m-auto rounded-md border-slate-200" alt="" />
        </template>
      </div>
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
import type { PostData } from '~/types/post';
defineProps<{
  post: PostData;
}>();


const config = useRuntimeConfig()
</script>

<style>

</style>