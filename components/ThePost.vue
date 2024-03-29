<template>
  <div class="p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
    <div class="flex items-center gap-2">
      <img class="w-10 h-10 rounded-full object-cover"
      :src="post.users.image_url ? `${$config.public.BUCKET_URL}/avatars/${post.users.image_url}` : '/profile.png' "
      />
      <div class="flex w-full justify-between">
        <div class="flex gap-x-2 items-center">
          <div class="flex gap-x-2 items-center" @click="navigateTo(`/${post.users.username}`)">
            <h1 class="font-semibold hover:underline tracking-wide text-slate-600 dark:text-slate-300">{{fullName}}</h1>
            <p class="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400"
            :class="fullName.length > 11 ? 'hidden' : ''">
              @{{ post.users.username }}
            </p>
          </div>
          <p class="text-sm tracking-wide text-slate-500 dark:text-slate-400">
            <b>·</b> {{ getHour }}
          </p>
        </div>
        <UDropdown
          :items="items"
          :ui="{ width: 'w-24' }"
          class="p-1.5 hover:bg-indigo-200 rounded-full flex items-center group"
        >
          <Icon name="mdi:dots-horizontal" class="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
          <template #item="{ item }">
            <div class="flex w-full dark:text-slate-400 dark:hover:text-slate-300" 
              :class="item.label === 'Delete'? 'hover:text-red-600 dark:hover:text-red-600' : 'hover:text-indigo-600 dark:hover:text-indigo-500'">
              <span >{{ item.label }}</span>
              <Icon :name="item.icon" class="w-5 h-5 ml-auto" />
            </div>
          </template>
        </UDropdown>
      </div>
    </div>
    <div class="mt-4 space-y-2" @click="goTo">
      <p class="text-slate-600 dark:text-slate-300 break-words">
        {{ post.content }}
      </p>
      <div class="grid grid-flow-col gap-2" v-if="post.images?.length">
        <template v-for="img in post.images">
          <img :src="`${config.public.BUCKET_URL}/posts/${img.image_url}`" class="hover:shadow-md object-cover m-auto rounded-md border-slate-200" alt="" />
        </template>
      </div>
    </div>
    <div class="mt-2 flex justify-between">
      <div class="flex items-center group cursor-pointer">
        <button @click="likePost" v-if="isLiked" class="flex items-center text-slate-600 dark:text-slate-400 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-400 group-hover:text-indigo-600">
          <Icon name="mdi:heart" class="w-5 h-5 text-indigo-600" />
        </button>
        <button @click="likePost" v-else class="flex items-center text-slate-600 dark:text-slate-400 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 group-hover:text-indigo-600">
          <Icon name="mdi:heart-outline" class="w-5 h-5" />
        </button>
        <p
          class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide group-hover:text-indigo-600"
        >
          {{ likeCount }}
        </p>
      </div>
      <div class="flex items-center group cursor-pointer">
        <button @click="goTo" class="flex items-center text-slate-600 dark:text-slate-400 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-400 group-hover:text-indigo-600">
          <Icon name="mdi:comment-outline" class="w-5 h-5" />
        </button>
        <p
          class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide group-hover:text-indigo-600"
        >
          {{ commentCount }}
        </p>
      </div>
      <div class="flex items-center group cursor-pointer">
        <button @click="startShare" :disabled="!isSupported" class="flex items-center text-slate-600 dark:text-slate-400 font-semibold p-1.5 rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-400 group-hover:text-indigo-600">
          <Icon name="mdi:share-outline" class="w-5 h-5" />
        </button>
        <p
          class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide group-hover:text-indigo-600"
        >
          102
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Post, Like } from '~/types/post';
const props = defineProps<{
  post: Post;
}>();

const emit = defineEmits(['refresh']);

const postDetail = ref<Post>(props.post);
const getHour = useTimeAgo(postDetail.value.created_at);
const config = useRuntimeConfig()

const rawItems = [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square',
    onClick: () => {
      console.log('Edit');
    },
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash',
    color: 'red',
    onClick: () => {
      console.log('Delete');
    },
  }],
  [{
    label: 'Report',
    icon: 'i-heroicons-flag',
    onClick: () => {
      console.log('Report');
    },
  }],
];

const items = computed(() => {
  if (userStore().user?.id === props.post.user_id) {
    return rawItems
  } else {
    return rawItems.filter((item) => item[0].label !== 'Edit' && item[0].label !== 'Delete')
  }
})

const likeCount = computed(() => {
  return postDetail.value.likes?.length
})

const isLiked = computed(() => {
  return postDetail.value.likes?.some((like) => like.user_id === userStore().user?.id)
})

const commentCount = computed(() => {
  return postDetail.value.comments?.length
})

const likePost = async() => {
  postDetail.value.likes = await $fetch<Like[]>(`/api/post/like-post`, {
    method: "POST",
    body: JSON.stringify({
      post_id: props.post.id,
      user_id: userStore().user?.id
    })
  });
  emit('refresh');
}

const fullName = computed(() => {
  return `${props.post.users.first_name} ${props.post.users.last_name}`
})

const goTo = async () => {
  await navigateTo(`/${props.post.users.username}/post/${props.post.id}`)
}

const { share, isSupported } = useShare();

const startShare = () => {
  share({
    title: 'Share this post',
    text: 'Check out this post',
    url: `/${props.post.users.username}/post/${props.post.id}`,
  })
}
</script>
