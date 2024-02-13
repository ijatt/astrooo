<template>
  <div class="p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
    <div class="flex items-center gap-2">
      <img class="w-10 h-10 rounded-full object-cover"
      :src="comment.users.image_url ? `${$config.public.BUCKET_URL}/avatars/${comment.users.image_url}` : '/profile.png' "
      />
      <div class="flex w-full justify-between">
        <div class="flex gap-x-2 items-center">
          <div class="flex gap-x-2 items-center" @click="navigateTo(`/${comment.users.username}`)">
            <h1 class="font-semibold hover:underline tracking-wide text-slate-600 dark:text-slate-300">{{ comment.users.first_name }} {{ comment.users.last_name }}</h1>
            <p class="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
              @{{ comment.users.username }}
            </p>
          </div>
          <p class="text-sm tracking-wide text-slate-500 dark:text-slate-400">
            <b>·</b> {{ getHour() }}h ago
          </p>
        </div>
        <UDropdown
          :items="items"
          :ui="{ width: 'w-24' }"
          class="p-1.5 hover:bg-indigo-200 rounded-full flex items-center group"
        >
          <Icon name="mdi:dots-horizontal" class="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
          <template #item="{ item }">
            <div class="flex w-full" :class="item.label === 'Delete'? 'hover:text-red-600' : 'hover:text-indigo-600'">
              <span >{{ item.label }}</span>
              <Icon :name="item.icon" class="w-5 h-5 ml-auto" />
            </div>
          </template>
        </UDropdown>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <p class="text-slate-600 dark:text-slate-300">
        {{ comment.content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Comment } from '~/types/post';
const props = defineProps<{
  comment: Comment;
}>();

const getHour = () => {
  const date = new Date(props.comment.created_at);
  const hours = Math.abs(date.getHours() - new Date().getHours());
  return hours;
}
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
  if (userStore().user?.id === props.comment.user_id) {
    return rawItems
  } else {
    return rawItems.filter((item) => item[0].label !== 'Edit' && item[0].label !== 'Delete')
  }
})

</script>
