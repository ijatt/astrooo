<template>
  <div class="flex gap-x-4 w-full">
    <img
      src="/background.png"
      class="rounded-full w-10 h-10 object-cover"
      alt=""
    />
    <form class="w-full" @submit.prevent="createPost">
      <div class="w-full px-2">
        <textarea
          @input="resizeTextarea"
          ref="textarea"
          v-model="payload.content"
          class="w-full p-2 mt-1 border-none ring-slate-300 rounded-md focus:ring-0 focus:outline-none text-slate-500 shadow-inner"
          placeholder="What's on your mind?"
        ></textarea>
        <input type="file" ref="file" hidden @change="hanldeChange" multiple />
          <div class="columns-2" v-if="imgSrc?.length">
            <div class="relative" v-for="(item, index) in imgSrc">
            <img
              :src="item"
              class="border border-slate-200 rounded-md w-full"
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
        <div class="flex justify-between border-y border-slate-100 py-2">
          <div class="flex gap-x-2 items-center">
            <button
              @click="file?.click()"
              class="rounded-full flex items-center p-2 hover:bg-indigo-200"
              type="button"
            >
              <Icon name="mdi:image-outline" class="w-5 h-5 text-indigo-600" />
            </button>
            <button
              class="rounded-full flex items-center p-2 hover:bg-indigo-200"
            >
              <Icon name="mdi:video-outline" class="w-5 h-5 text-indigo-600" />
            </button>
            <button
              class="rounded-full flex items-center p-2 hover:bg-indigo-200"
            >
              <Icon
                name="mdi:emoticon-outline"
                class="w-5 h-5 text-indigo-600"
              />
            </button>
          </div>
          <button
            class="py-2 px-4 text-sm bg-indigo-600 text-white font-semibold tracking-wide rounded-full focus:outline-none"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { PostRequest, PostData } from "~/types/post";
const textarea = ref<HTMLTextAreaElement | null>(null);
const imgSrc = ref<string[]>([]);
const image = ref<File[] | null>([]);

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
  payload.value.content = "";
  payload.value.image_url = [];
  image.value = [];
  imgSrc.value = [];
}

function resizeTextarea() {
  if (!textarea.value) return;
  textarea.value.style.height = "auto";
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
}

const payload = computed(():PostRequest =>({
  content: "",
  image_url: [],
  user_id: userStore().user?.id as number,
}));

const createPost = async () => {
  if (!payload.value.content) {
    toastError("Cannot post the post", "Content is required");
    return;
  }

  if (image.value?.length) {
    payload.value.image_url = await uploadImage(image.value, "posts");
  }

  const post = await $fetch("/api/post/create", {
    method: "POST",
    body: payload.value,
  }) as PostData;

  if (post) {
    toastSuccess("Post Success", "You have successfully posted");
    reset();
  } else {
    toastError("Post Error", "Something went wrong");
  }
}
</script>