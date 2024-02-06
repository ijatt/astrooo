<template>
  <h1 class="text-lg font-bold tracking-wide text-slate-700 py-2 px-4">
    {{ title ? title : 'Recommended for you'}}
  </h1>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
}>();
</script>
