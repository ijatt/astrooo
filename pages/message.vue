<template>
  <div class="max-w-5xl mx-auto flex h-[calc(100vh-122px)]">
    <div :class="messageOpen ? 'w-0 md:w-2/5' : 'w-full md:w-full'">
      <TheTitle title="Messages" />
      <div class="flex gap-2 items-center px-4 py-2">
        <button
          v-if="open"
          class="rounded-full flex items-center p-2 hover:bg-indigo-200"
          @click="open = false"
        >
          <Icon name="mdi:arrow-left-thin" class="w-6 h-6 text-indigo-600" />
        </button>
        <div class="relative w-full">
          <input
            ref="search"
            @focus="open = true"
            type="text"
            v-model="query"
            class="w-full py-2 px-4 text-sm mt-1 border-none rounded-full ring-1 ring-slate-300 dark:bg-slate-800 focus:outline-none dark:placeholder:text-slate-400 text-slate-500 dark:text-slate-200"
            placeholder="Search"
          />
        </div>
      </div>
      <MessageConversation
        v-if="conversation.length"
        v-for="(item, index) in conversation"
        :key="index"
        :user="item.user[0]"
        :message="item.messages[0]?.content"
        @click="openChat(item.messages[0]?.conversation_id, item.user[0])"
      />
    </div>
    <div v-if="messageOpen" class="w-full md:w-3/5 relative" ref="el">
      <MessageApp :conversation_id="conversation_id" :user="user" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const open = ref(false);
const query = ref("");

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
}

interface Conversation {
  user: User[];
  messages: {
    id: number;
    user_id: number;
    conversation_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
  }[];
}

const conversation = ref<Conversation[]>([])
onMounted(async () => {
  conversation.value = await $fetch("/api/message/get-conversation", {
    method: "POST",
    body: { user_id: userStore().user?.id }
  })
})

const user = ref<User>({} as User)
const conversation_id = ref(0)
const messageOpen = ref(false)
const openChat = (id: number, u: User) => {
  messageOpen.value = true
  conversation_id.value = id
  user.value = u
}
</script>

<style></style>
