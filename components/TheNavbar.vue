<template>
  <div class="flex justify-between w-full max-w-4xl mx-auto items-center">
    <div class="flex gap-2 items-center">
      <Icon
        name="fa6-solid:user-astronaut"
        size="32"
        class="text-indigo-600 animate-spin"
      />
      <h1 class="text-xl font-bold text-slate-700 tracking-wide">ASTROOO</h1>
    </div>
    <div class="hidden md:flex items-center gap-x-10">
      <NuxtLink
        to="/"
        class="flex items-center font-semibold tracking-wide hover:text-indigo-600"
        :class="route.path === '/' ? 'text-indigo-600' : 'text-slate-600'"
      >
        <Icon name="mdi:home" size="20" />
        Home
      </NuxtLink>
      <NuxtLink
        to="/search"
        class="flex items-center font-semibold tracking-wide hover:text-indigo-600"
        :class="route.path === '/search' ? 'text-indigo-600' : 'text-slate-600'"
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
    <div class="hidden md:flex gap-2 items-center group">
      <Icon
        name="mdi:logout"
        size="20"
        class="text-slate-700 group-hover:text-indigo-600"
      />
      <button
        @click="logout"
        class="text-slate-600 font-semibold tracking-wide group-hover:underline group-hover:text-indigo-600"
      >
        Logout
      </button>
    </div>
    <div class="block md:hidden">
      <Icon name="fa6-solid:bars" size="24" class="text-slate-700" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const logout = async () => {
  await $fetch("api/user/sign-out", {
    method: "POST",
  }).then(async () => {
    useTokenStore().accessToken = "";
    await navigateTo('/auth');
  });
}

const route = useRoute();
</script>