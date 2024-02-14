<template>
  <div class="flex gap-x-4 p-4 sm:p-0  w-full">
    <img
      :src="userStore().user?.image_url ? `${$config.public.BUCKET_URL}/avatars/${userStore().user?.image_url}` : '/profile.png'"
      class="rounded-full w-10 h-10 object-cover"
      alt=""
    />
    <form class="w-full" @submit.prevent="createPost">
      <div class="w-full px-2">
        <textarea
          @input="resizeTextarea"
          ref="textarea"
          v-model="content"
          class="w-full p-2 mt-1 border-none bg-transparent ring-slate-300 rounded-md focus:ring-0 focus:outline-none text-slate-500 dark:text-slate-300 shadow-inner dark:placeholder:text-slate-400"
          placeholder="What's on your mind?"
        ></textarea>
        <input type="file" ref="file" hidden @change="hanldeChange" multiple />
        <TransitionFade>
          <div class="columns-2 mb-2" v-if="imgSrc?.length">
            <div class="relative" v-for="(item, index) in imgSrc">
              <img
                :src="item"
                class="border border-slate-200 rounded-md w-full object-cover mb-2 dark:border-slate-700"
                alt=""
              />
              <button
                class="text-indigo-600 hover:bg-indigo-200 rounded-full flex items-center p-1 absolute top-0 right-0"
                @click="deleteImage(index)"
                type="button"
              >
                <Icon name="mdi:close" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </TransitionFade>
        <div class="flex justify-between border-y border-slate-100 dark:border-slate-700 py-2">
          <div class="flex gap-x-2 items-center">
            <button
              @click="file?.click()"
              class="rounded-full flex items-center p-2 hover:bg-indigo-200 dark:hover:bg-indigo-400"
              type="button"
            >
              <Icon name="mdi:image-outline" class="w-5 h-5 text-indigo-600" />
            </button>
            <button
              type="button"
              @click="toastInfo('Video', 'Coming soon')"
              class="rounded-full flex items-center p-2 hover:bg-indigo-200 dark:hover:bg-indigo-400"
            >
              <Icon name="mdi:video-outline" class="w-5 h-5 text-indigo-600" />
            </button>
            <button
              @click="toastInfo('Emoji', 'Coming soon')"
              type="button"
              class="rounded-full flex items-center p-2 hover:bg-indigo-200 dark:hover:bg-indigo-400"
            >
              <Icon
                name="mdi:emoticon-outline"
                class="w-5 h-5 text-indigo-600"
              />
            </button>
          </div>
          <button class="py-2 px-4 text-sm bg-indigo-600 text-white font-semibold tracking-wide rounded-full focus:outline-none disabled:opacity-50">
            <Icon v-if="loading" name="line-md:loading-alt-loop" />
            <span v-else>Post</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { PostRequest, PostResponse } from "~/types/post";
const textarea = ref<HTMLTextAreaElement | null>(null);
const imgSrc = ref<string[]>([]);
const image = ref<File[] | null>([]);
const loading = ref(false)
const emit = defineEmits(["refresh"]);
const isDark = useDark();
const content = ref("")

const file = ref<HTMLInputElement | null>(null);
const hanldeChange = () => {
  const selectedFile = file.value?.files?.[0] as File;
  if (selectedFile) {
    image.value?.push(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      imgSrc.value.push(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }
  if (file.value) {
    file.value.value = "";
  }
};

const deleteImage = (index: number) => {
  imgSrc.value.splice(index, 1);
  image.value?.splice(index, 1);
};

const reset = () => {
  content.value = "";
  payload.value.image_url = [];
  image.value = [];
  imgSrc.value = [];
}

function select(emoji: string) {
  content.value += emoji;  
};

function resizeTextarea() {
  if (!textarea.value) return;
  textarea.value.style.height = "auto";
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
}

const payload = computed(():PostRequest =>({
  content: content.value,
  image_url: [],
  user_id: userStore().user?.id as number,
}));

const createPost = async () => {
  if (!payload.value.content) {
    toastError("Cannot post the post", "Content is required");
    return;
  }
  loading.value = true
  if (image.value?.length) {
    payload.value.image_url = await uploadImage(image.value, "posts") as string[];
  }

  const post = await $fetch<PostResponse>("/api/post/create", {
    method: "POST",
    body: payload.value as PostRequest,
  }).catch((err) => {
    toastError("Post Error", err.statusMessage);
  })

  if (post) {
    toastInfo("Post created.");
    reset();
    emit("refresh");
    textarea.value?.style.setProperty("height", "auto");
  } 
  loading.value = false
}
</script>