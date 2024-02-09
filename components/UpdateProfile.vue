<template>
  <div class="max-w-xl max-h-[calc(100vh-100px)] overflow-y-auto">
    <form @submit.prevent="updateProfile">
      <div class="w-full h-[200px] relative">
        <img src="/background.png" class="w-full h-full object-cover" alt="">
        <input type="file" class="hidden" />
        <button
          type="button"
          class="absolute top-1/2 transform -translate-y-1/2 right-1/2 translate-x-1/2 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full">
          <Icon name="mdi:camera" class="w-5 h-5" />
        </button>
      </div>
      <div class="p-4 flex justify-between">
        <div class="w-36 h-36 -mt-[86px] bg-white border border-slate-200 rounded-full p-1 relative">
          <img :src="profileView" class="w-full h-full object-cover rounded-full" alt="">
          <input type="file" ref="file" class="hidden" @change="fileChange('profile')" />
          <button
            type="button"
            @click="file?.click()"
            class="absolute top-1/2 transform -translate-y-1/2 right-1/2 translate-x-1/2 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full">
            <Icon name="mdi:camera" class="w-5 h-5" />
          </button>
        </div>
      </div>
      <div class="p-4 border-b border-slate-200">
        <label class="flex flex-col mt-4">
          <span class="font-semibold tracking-wide text-slate-600">First Name
          </span>
          <input type="text"
            class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
            v-model="payload.first_name" />
        </label>
        <label class="flex flex-col mt-4">
          <span class="font-semibold tracking-wide text-slate-600">Last Name
          </span>
          <input type="text"
            class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
            v-model="payload.last_name" />
        </label>
        <label class="flex flex-col mt-4">
          <span class="font-semibold tracking-wide text-slate-600">Username
          </span>
          <input type="text"
            class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
            v-model="payload.username" />
        </label>
        <p class="text-slate-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
      <button
          type="submit"
          class="py-2 px-4 ml-4 my-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold tracking-wide rounded-md focus:outline-none"
        >
          <Icon v-if="loading" name="line-md:loading-alt-loop" />
          Save
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { UserProfile, UserUpdateRequest } from '~/types/user';
const props = defineProps<{
  user: UserProfile
}>()
const emit = defineEmits(["close"])

const config = useRuntimeConfig()
const loading = ref(false)
const profileView = ref(props.user.image_url ? `${config.public.BUCKET_URL}/avatars/${props.user.image_url}` : "/profile.png")
const backgroundView = ref("")
const profileFile = ref<File | null>(null)
const backgroundFile = ref<File | null>(null)

const file = ref<HTMLInputElement | null>(null)

const fileChange = (type: "profile" | "background") => {
  const selectedFile = file.value?.files?.[0] as File;
  if (selectedFile) {
    if (type === "profile") {
      profileFile.value = selectedFile
      const reader = new FileReader();
      reader.onload = () => {
        profileView.value = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      backgroundFile.value = file as unknown as File
      backgroundView.value = URL.createObjectURL(file as unknown as File)
    }
  }
  if (file.value) {
    file.value.value = "";
  }
}

const payload = reactive<UserUpdateRequest>({
  id: props.user.id,
  first_name: props.user.first_name,
  last_name: props.user.last_name,
  username: props.user.username,
  image_url: props.user.image_url
})

const updateProfile = async () => {
  loading.value = true
  if (profileFile.value) {
    const path = await uploadImage(profileFile.value, "avatars")
    payload.image_url = path as string
  }
  const updatedUser = await $fetch("/api/user/update", {
    method: "POST",
    body: payload
  })

  if (updatedUser) {
    toastSuccess("Profile updated successfully", "Your profile has been updated")
    emit('close')
  } else {
    toastError("Profile update failed", "Something went wrong")
  }
  loading.value = false
}
</script>

<style></style>