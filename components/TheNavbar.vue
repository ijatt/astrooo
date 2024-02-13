<template>
  <div class="flex justify-between w-full max-w-4xl mx-auto items-center">
    <div class="flex gap-2 items-center">
      <Icon
        name="fa6-solid:user-astronaut"
        size="32"
        class="text-indigo-600 animate-spin"
      />
      <h1 class="text-xl font-bold text-slate-700 dark:text-slate-300 tracking-wide">ASTROOO</h1>
    </div>
    <div class="hidden md:flex items-center gap-x-10">
      <NuxtLink
        to="/"
        class="flex items-center font-semibold tracking-wide hover:text-indigo-600"
        :class="route.path === '/' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-400'"
      >
        <Icon name="mdi:home" size="20" />
        Home
      </NuxtLink>
      <NuxtLink
        to="/search"
        class="flex items-center font-semibold tracking-wide hover:text-indigo-600"
        :class="route.path === '/search' ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-400'"
      > 
        <Icon name="mdi:magnify" size="20" />
        Search
      </NuxtLink>
      <NuxtLink
        to="/"
        class="text-slate-600 flex items-center font-semibold tracking-wide hover:text-indigo-600"
      >
        <Icon name="mdi:account" size="20" />
        About
      </NuxtLink>
    </div>
    <div class="hidden md:flex gap-2 items-center">
      <button
        class="p-2 rounded-full hover:bg-slate-100 flex items-center dark:hover:bg-slate-800"
        @click="toggleDark()"
      >
        <Icon :name="icons" size="18" class="text-yellow-500" />
      </button>
      <button
        @click="logout"
        class="text-slate-600 dark:text-slate-300 font-semibold tracking-wide group-hover:underline hover:text-indigo-600"
      >
        <Icon
          name="mdi:logout"
          size="20"
        />
        Logout
      </button>
    </div>
    <div class="block md:hidden">
      <Icon @click="open = true" name="fa6-solid:bars" size="24" class="text-slate-700 dark:text-slate-300" />
    </div>
    <USlideover v-model="open">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1', padding: '' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="mx-auto flex gap-2 items-center">
              <Icon
                name="fa6-solid:user-astronaut"
                size="32"
                class="text-indigo-600 animate-spin"
              />
              <h1 class="text-xl font-bold text-slate-700 dark:text-slate-300 tracking-wide">ASTROOO</h1>
            </div>
            <button
              class="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 rounded-full flex items-center p-1"
              @click="open = false"
              type="button"
            >
              <Icon name="mdi:close" class="w-6 h-6" />
            </button>
          </div>
        </template>
        <div class="flex flex-col items-center">
          <NuxtLink
            to="/"
            class="flex items-center gap-x-2 w-full py-4 px-8 hover:bg-slate-100 font-semibold tracking-wide hover:text-indigo-600"
            :class="route.path === '/' ? 'text-indigo-600 dark:text-indigo-500' : 'text-slate-600 dark:text-slate-400'"
          >
            <Icon name="mdi:home" size="20" />
            Home
          </NuxtLink>
          <NuxtLink
            to="/search"
            class="flex items-center gap-x-2 w-full py-4 px-8 hover:bg-slate-100 font-semibold tracking-wide hover:text-indigo-600"
            :class="route.path === '/search' ? 'text-indigo-600 dark:text-indigo-500' : 'text-slate-600 dark:text-slate-400'"
          >
            <Icon name="mdi:magnify" size="20" />
            Search
          </NuxtLink>
          <NuxtLink
            to="/"
            class="text-slate-600 gap-x-2 flex w-full py-4 px-8 hover:bg-slate-100 items-center font-semibold tracking-wide hover:text-indigo-600"
          >
            <Icon name="mdi:account" size="20" />
            About
          </NuxtLink>
        </div>
        <template #footer>
          <div class="py-4 px-8 flex gap-2 items-center group">
            <button
              @click="logout"
              class="text-slate-600 dark:text-slate-300 font-semibold tracking-wide group-hover:underline group-hover:text-indigo-600"
            >
              <Icon
                name="mdi:logout"
                size="20"
              />
              Logout
            </button>
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
const logout = async () => {
  await $fetch("api/user/sign-out", {
    method: "POST",
  }).then(async () => {
    useTokenStore().accessToken = "";
    await navigateTo('/auth');
    userStore().clearUser();
  });
}

const route = useRoute();
watch(() => route.path, () => {
  open.value = false;
});
const open = ref(false);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const icons = computed(() => isDark.value ? "heroicons:moon-16-solid" : "heroicons:sun-16-solid");
</script>