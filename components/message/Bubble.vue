<template>
  <div class="flex w-full mt-1" :class="styles">
    <div
      class="flex w-fit px-4 py-2 rounded-t-full"
      :class="bubbleColor"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type Type = 'sent' | 'received';
const props = defineProps<{
  message: string;
  user_id: number;
}>();

const type = computed<Type>(() => {
  if (props.user_id === userStore().user?.id) {
    return 'sent';
  } else {
    return 'received';
  }
});

const styles = computed(() => {
  if (type.value === 'sent') {
    return 'justify-end';
  } else {
    return 'justify-start';
  }
})

const bubbleColor = computed(() => {
  if (type.value === 'sent') {
    return 'bg-indigo-500 text-slate-100 rounded-bl-full';
  } else {
    return 'bg-white text-slate-700 rounded-br-full';
  }
})
</script>