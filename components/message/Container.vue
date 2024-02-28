<template>
  <div class="p-4 w-full">
    <div class="flex w-full flex-col">
      <MessageBubble
        v-for="msg in messages"
        :key="msg.id"
        :message="msg.content"
        :user_id="msg.user_id"
      />
      <!-- /<p class="text-slate-600 dark:text-slate-300 text-xs">1:31 PM</p> -->
      <div v-if="typing" class="flex w-full mt-1 justify-start">
        <div
          class="flex w-fit px-4 py-2 rounded-t-full bg-white text-slate-700 rounded-br-full"
        >
          <Icon class="animate-pulse" name="mdi:dots-horizontal" size="20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  messages: {
    id: number;
    user_id: number;
    conversation_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }[],
  typing: boolean;
}>()

</script>

<style></style>
