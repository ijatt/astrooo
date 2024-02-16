<template>
  <div class="max-w-lg p-4 mx-auto">
    <TheSearch />
    <div class="max-h-[calc(100vh-200px)] overflow-y-auto">
      <TheTitle />
      <RecommendedPost topic="Taib" />
      <RecommendedPost topic="Messi" />
      <RecommendedPost topic="Tun Laila dah explain" />
      <TheTitle title="Trending posts" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>

<style></style>
