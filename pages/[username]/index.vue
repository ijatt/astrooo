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
        <button v-if="userStore().user?.id !== user.id" class="py-1 px-4 bg-indigo-600 text-white font-semibold tracking-wide rounded-full  focus:outline-none">
          Follow
        </button>
        <button @click="open = true" v-else class="py-1 px-4 bg-indigo-600 text-white font-semibold tracking-wide rounded-full  focus:outline-none">
          Edit Profile
        </button>
      </div>
    </div>  
    <div class="p-4 border-b border-slate-200">
      <h1 class="text-2xl font-bold tracking-wide text-slate-700">{{ user.first_name }} {{ user.last_name }}</h1>
      <p class="text-slate-600">@{{ user.username }}</p>
      <p class="text-slate-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      <div class="flex gap-x-2 mt-4 items-center">
        <Icon name="mdi:calendar" class="w-5 h-5 text-slate-600" />
        <p v-if="user.created_at" class="text-slate-600">Joined {{ date }}</p>
      </div>
    </div>
    <div class="">
      <ThePost v-for="post in user.posts" :key="post.id" :post="post" />
    </div>
    <UModal v-model="open">
      <UpdateProfile :user="user" @close="closeModal" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { UserProfile } from '~/types/user';
definePageMeta({
    layout: "default",
})

const route = useRoute()
const config = useRuntimeConfig()
const user = ref<UserProfile>({} as UserProfile);
const date = ref("")
const open = ref(false)

onMounted(async () => {
  const { username } = route.params
  user.value = await $fetch(`/api/user/${username}`, {
    method: "GET"
  }).catch(async (error) => {
    if (error.statusCode === 404) {
      await navigateTo("/")
    }
  }) as UserProfile;
  date.value = useDateFormat(user.value.created_at, "MMMM YYYY") as unknown as string;    
})

const closeModal = async () => {
  user.value = await $fetch<UserProfile>(`/api/user/${user.value.username}`, {
    method: "GET"
  });
  open.value = false
}
</script>

<style>

</style>