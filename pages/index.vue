<template>
  <div class="max-w-lg p-4 mx-auto">
    <CreatePost />
    <ThePost />
    <ThePost :image="false" />
    <ThePost />
    <ThePost :image="true" />
    <ThePost />
  </div>
</template>

<script lang="ts" setup>
import type { UserData } from "~/types/user";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

const user = ref<UserData>({} as UserData);
onMounted(async () => {
  user.value = await $fetch<UserData>("api/user", {
    method: "GET",
    headers: {
      authorization: `Bearer ${useTokenStore().accessToken}`,
    },
  });
});
</script>
