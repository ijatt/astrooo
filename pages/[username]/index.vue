<template>
  <ClientOnly v-if="!user.username">
    <Vue3Lottie 
      :animation-data="astro"
      :speed="1"
      :loop="true"
      :autoplay="true"
      style="width: 300px; height: 300px;"
    />
    <p class="text-slate-600 text-center italic">
      Loading...
    </p>
  </ClientOnly>
  <div v-else class="max-w-xl mx-auto">
    <img src="/background.png" class="w-full h-[200px] object-cover" alt="">
    <div class="p-4 flex justify-between">
      <div class="w-36 h-36 -mt-[86px] bg-white border border-slate-200 rounded-full p-1">
        <img class="w-full h-full object-cover rounded-full" alt=""
          :src="user.image_url ? `${$config.public.BUCKET_URL}/avatars/${user.image_url}` : '/profile.png' "
        />
      </div>
      <div>
        <button v-if="userStore().user?.id !== user.id" class="disabled:bg-blue-400 py-1 px-4 font-semibold tracking-wide rounded-full  focus:outline-none"
          :class="{'bg-indigo-600 text-white': !isFollowed, 'bg-slate-100 text-slate-700 border border-slate-300': isFollowed}"
          @click="follow"
        >
          <span v-if="isFollowed">Following</span>
          <span v-else>Follow</span>
        </button>
        <button @click="open = true" v-else class="py-1 px-4 bg-indigo-600 text-white font-semibold tracking-wide rounded-full  focus:outline-none">
          Edit Profile
        </button>
      </div>
    </div>  
    <div class="p-4 border-b border-slate-200 dark:border-slate-700">
      <h1 class="text-2xl font-bold tracking-wide text-slate-700 dark:text-slate-300">{{ user.first_name }} {{ user.last_name }}
         <span v-if="isFollowingMe" class="text-xs bg-slate-100 rounded-md border border-slate-400 py-1 px-2 italic font-medium">Follows you</span>
      </h1>
      <p class="text-slate-600 dark:text-slate-300">@{{ user.username }}</p>
      <p class="text-slate-600 dark:text-slate-300 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      <div class="flex gap-x-2 mt-4 items-center">
        <Icon name="mdi:calendar" class="w-5 h-5 text-slate-600 dark:text-slate-300" />
        <p v-if="user.created_at" class="text-slate-600 dark:text-slate-300">Joined {{ date }}</p>
      </div>
      <p class="text-slate-600 dark:text-slate-300 mt-2"><b>{{ user.following.length }}</b> following &nbsp; <b>{{ user.followedBy.length }}</b> followers</p>
    </div>
    <ThePost v-for="post in user.posts" :key="post.id" :post="post" />
    <UModal v-model="open">
      <UpdateProfile :user="user" @close="closeModal" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie';
import astro from '~/public/astro.json';
import type { UserProfile } from '~/types/user';
definePageMeta({
    layout: "default",
})

const route = useRoute()
const { data } = useNuxtData(`user-${route.params.username}`)
const { data: userData, error, refresh } = await useFetch(`/api/user/${route.params.username}`, {
  key: `user-${route.params.username}`,
  default() {
    return data.value as UserProfile;
  }
});
const user = ref<UserProfile>(userData.value as UserProfile);
const date = ref("")
const open = ref(false)

useHead({
  title: `${user.value.first_name} ${user.value.last_name} (@${user.value.username})`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: `View ${user.value.first_name} ${user.value.last_name}'s profile on ASTROOO.`
    }
  ]
})

onMounted(async () => {
  if (error.value) {
    await navigateTo("/")
  }
  date.value = useDateFormat(user.value.created_at, "MMMM YYYY") as unknown as string;    
})

const closeModal = async () => {
  await refresh();
  user.value = userData.value as UserProfile;
  open.value = false
}

const follow = async () => {
  await $fetch('/api/user/follow', {
    method: "POST",
    body: {
      following_id: userStore().user?.id,
      follower_id: user.value.id
    }
  })
  await refresh();
}

const isFollowed = computed(() => {
  return user.value.followedBy.some((follower) => follower.followingId === userStore().user?.id)
})

const isFollowingMe = computed(() => {
  return user.value.following.some((following) => following.followedById === userStore().user?.id)
})

watch(() => userData.value, () => {
  user.value = userData.value as UserProfile;
})
</script>

<style>

</style>