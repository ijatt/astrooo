<template>
  <div class="flex gap-x-4 w-full">
      <img src="/background.png" class="rounded-full w-10 h-10 object-cover" alt="">
      <div class="w-full">
        <textarea
          @input="resizeTextarea"
          ref="textarea"
          class="w-full p-2 mt-1 border-none ring-slate-300 rounded-md focus:ring-0 focus:outline-none text-slate-500 shadow-inner"
          placeholder="What's on your mind?"
        ></textarea>
        <div class="flex justify-between border-y border-slate-100 py-2">
          <div class="flex gap-x-2 items-center">
            <button class="rounded-full flex items-center p-2 hover:bg-indigo-200">
              <Icon name="mdi:image-outline" class="w-5 h-5 text-indigo-600" />
            </button>
            <button class="rounded-full flex items-center p-2 hover:bg-indigo-200">
              <Icon name="mdi:video-outline" class="w-5 h-5 text-indigo-600" />
            </button>
            <button class="rounded-full flex items-center p-2 hover:bg-indigo-200">
              <Icon name="mdi:emoticon-outline" class="w-5 h-5 text-indigo-600" />
            </button>
          </div>
          <button class="py-2 px-4 text-sm bg-indigo-600 text-white font-semibold tracking-wide rounded-full focus:outline-none">
            Post
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
const textarea = ref<HTMLTextAreaElement | null>(null);
function resizeTextarea() {
  if (!textarea.value) return;

  textarea.value.style.height = "auto";
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
}
</script>

<style>

</style>