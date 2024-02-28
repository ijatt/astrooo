<template>
  <div class="h-full overflow-y-auto" ref="el">
    <div
      class="flex p-4 items-center gap-x-2 sticky top-0 bg-white backdrop:blur-md bg-opacity-70 z-10 w-full"
    >
      <img src="/profile.png" class="w-10 h-10 rounded-full" alt="" />
      <h1
        class="font-semibold tracking-wide text-slate-700 dark:text-slate-300"
      >
        {{ user.first_name }} {{ user.last_name }}
      </h1>
    </div>
    <div
      class="h-full flex flex-col-reverse w-full bg-slate-100"
    >
      <MessageContainer :typing="typing" :messages="conversation" />
    </div>
    <div class="bg-slate-whitew-full bg-white sticky bottom-0">
      <form @submit.prevent="sendMessage">
        <div class="flex gap-2 items-center">
          <textarea
            @input="resizeTextarea"
            ref="textarea"
            v-model="content"
            class="w-full p-2 mt-1 resize-none border-none bg-transparent ring-slate-300 rounded-md focus:ring-0 focus:outline-none text-slate-500 dark:text-slate-300 dark:placeholder:text-slate-400"
            placeholder="Type a message"
          ></textarea>
          <button
            class="rounded-full flex items-center p-2 hover:bg-indigo-200"
          >
            <Icon name="mdi:send" class="w-6 h-6 text-indigo-600" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
}

const props = defineProps<{
  conversation_id: number;
  user: User;
}>();

interface Message {
  id: number;
  user_id: number;
  conversation_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

const el = ref<HTMLElement | null>(null);
const conversation = ref<Message[]>([]);

watch(() => props.conversation_id, getMessage);
onMounted(async () => {
  await getMessage();
  scrollEnd();
});

const { $io } = useNuxtApp();
$io.connect();

async function getMessage() {
  conversation.value = await $fetch('/api/message', {
    method: 'POST',
    body: { conversation_id: props.conversation_id}
  })
  scrollEnd();
}

const scrollEnd = () => {
  if (el.value) {
    el.value.scrollTop = el.value.offsetHeight;
  }
}

const content = ref("")

const sendMessage = async () => {
  if (!content.value.length) return;

  $io.emit('message', {
    conversation_id: props.conversation_id,
    content: content.value,
    user_id: userStore().user?.id
  })
  content.value = ""
}
$io.on('message', (data: Message) => {
  if (data.conversation_id === props.conversation_id) {
    conversation.value.push(data);
    scrollEnd();
  }
});

watch(() => conversation.value.length, () => {
  if (el.value) {
    el.value.scrollTo({ top: el.value.scrollHeight, behavior: 'smooth' })    
  }
})
watch(() => content.value.length, () => {
  if (content.value.length) {
    $io.emit('isTyping', { user_id: userStore().user?.id, conversation_id: props.conversation_id })
  } else {
    $io.emit('isTyping', { user_id: 0, conversation_id: 0 })
  }
})

const typing = ref(false);

$io.on('isTyping', (t) => {
  if (t.user_id === props.user.id && t.conversation_id === props.conversation_id) {
    typing.value = true;
  } else {
    typing.value = false;
  }
})

const textarea = ref<HTMLTextAreaElement | null>(null);
function resizeTextarea() {
  if (!textarea.value) return;
  textarea.value.style.height = "auto";
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
}
</script>

<style></style>
