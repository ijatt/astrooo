<template>
  <div class="max-w-xl p-4 mx-auto">
    <div class="flex gap-2 items-center">
      <img class="w-10 h-10 rounded-full object-cover" 
        :src="post.users.image_url ? `${$config.public.BUCKET_URL}/avatars/${post.users.image_url}` : '/profile.png' " 
      />
      <div class="flex flex-col cursor-pointer" @click="navigateTo(`/${post.users.username}`)">
        <h1 class="font-semibold hover:underline tracking-wide text-slate-600 dark:text-slate-300">{{ post.users.first_name }} {{ post.users.last_name }}</h1>
            <p class="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
              @{{ post.users.username }}
            </p>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <p class="text-slate-600 dark:text-slate-300">
        {{ post.content }}
      </p>
      <div class="grid grid-flow-col gap-2">
        <template v-if="post.images?.length" v-for="img in post.images">
          <img :src="`${config.public.BUCKET_URL}/posts/${img.image_url}`" class="hover:shadow-md object-cover m-auto rounded-md border-slate-200" alt="" />
        </template>
      </div>
    </div>
    <p class="mt-4 text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">{{ useDateFormat(post.created_at, 'hh:mm - DD/MM/YYYY') }}</p>
    <div class="mt-2 pb-2 flex justify-between border-b border-slate-200 dark:border-slate-700">
      <div class="flex items-center group cursor-pointer">
        <button @click="likePost" v-if="isLiked" class="flex items-center text-slate-600 dark:text-slate-400  font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
          <Icon name="mdi:heart" class="w-5 h-5 text-indigo-600" />
        </button>
        <button @click="likePost" v-else class="flex items-center text-slate-600 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
          <Icon name="mdi:heart-outline" class="w-5 h-5" />
        </button>
        <p
          class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide group-hover:text-indigo-600"
        >
          {{ likeCount }}
        </p>
      </div>
      <div class="flex items-center group cursor-pointer">
        <button @click="open = true" class="flex items-center text-slate-600 dark:text-slate-400 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
          <Icon name="mdi:comment-outline" class="w-5 h-5" />
        </button>
        <p
          class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide group-hover:text-indigo-600"
        >
          {{ commentCount }}
        </p>
      </div>
      <div class="flex items-center group cursor-pointer">
        <button class="flex items-center text-slate-600 dark:text-slate-400 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
          <Icon name="mdi:share-outline" class="w-5 h-5" />
        </button>
        <p
          class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide group-hover:text-indigo-600"
        >
          102
        </p>
      </div>
    </div>
    <div class="">
      <TheComment v-for="comment in post.comments" :key="comment.id" :comment="comment" />
    </div>
    <UModal v-model="open" :ui="{
      container: 'flex min-h-full items-end items-center justify-center text-center'
    }">
      <form @submit.prevent="submitComment" class="p-2">
        <textarea
          @input="resizeTextarea"
          ref="textarea"
          v-model="payload.content"
          class="w-full p-2 mt-1 border-none bg-transparent dark:placeholder:text-slate-400 dark:text-slate-300 ring-slate-300 rounded-md focus:ring-0 focus:outline-none text-slate-500"
          placeholder="What's on your mind?"
        ></textarea>
        <button
          class="py-2 px-4 text-sm bg-indigo-600 text-white font-semibold tracking-wide rounded-full focus:outline-none"
        >
          <Icon v-if="loading" name="line-md:loading-alt-loop" />
          <span v-else>Post</span>
        </button>
      </form>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { Post, Users, Like, Comment } from '~/types/post';

const { id } = useRoute().params
const { data: posts } = useNuxtData<Post[]>("posts");
const { data } = useLazyFetch<Post>(`/api/post/${id}`, {
  key: `post-${id}`,
  // @ts-ignore
  default() {
      return posts.value?.find((post) => post.id === Number(id));
  },
})
const post = ref<Post>(data.value as Post)
const formattedDate = ref("")
const config = useRuntimeConfig()
const open = ref(false)
onMounted(async () => {
  formattedDate.value = useDateFormat(post.value.created_at, "hh:mm - DD/MM/YYYY") as any;
  payload.post_id = post.value.id;
})

const likeCount = computed(() => {
  return post.value.likes?.length
})

const isLiked = computed(() => {
  return post.value.likes?.some((like) => like.user_id === userStore().user?.id)
})

const commentCount = computed(() => {
  return post.value.comments?.length
})

const textarea = ref<HTMLTextAreaElement | null>(null)
function resizeTextarea() {
  if (!textarea.value) return;
  textarea.value.style.height = "auto";
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
}

const payload = reactive({
  content: "",
  user_id: userStore().user?.id,
  post_id: 0,
})
const loading = ref(false)

const submitComment = async () => {
  loading.value = true;
  post.value.comments = await $fetch<Comment[]>("/api/comment/create", {
    method: "POST",
    body: payload
  })
  open.value = false;
  loading.value = false;
  payload.content = "";
}

const likePost = async() => {
  post.value.likes = await $fetch<Like[]>(`/api/post/like-post`, {
    method: "POST",
    body: JSON.stringify({
      post_id: post.value.id,
      user_id: userStore().user?.id
    })
  });
}
</script>
