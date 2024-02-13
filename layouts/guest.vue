<template>
  <div
    class="bg-[url('/background.jpg')] h-screen bg-cover"
  >
    <div class="bg-white w-full h-full bg-opacity-20 to-40% bg-gradient-to-l from-indigo-500 grid place-items-center to-purple-500 dark:from-indigo-700 dark:to-purple-700">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
