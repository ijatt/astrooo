<template>
  <div class="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl grid grid-cols-2 shadow-md">
    <div class="col-span-1 hidden md:block">
      <ClientOnly>
        <Vue3Lottie
          animation-link="https://lottie.host/7cfc29d6-5030-4ad4-8009-aeb9da04983e/SBqFxxNE1D.json"
          :speed="1"
          :loop="true"
          :autoplay="true"
          style="width: 300px; height: 300px;"
        />
      </ClientOnly>
      <h1 class="text-2xl font-bold tracking-wide text-slate-700 dark:text-slate-300 text-center">
        ASTROOO
      </h1>
    </div>
    <div class="col-span-2 md:col-span-1">
      <p class="text-2xl font-bold tracking-wide text-center text-slate-700 dark:text-slate-300">Login</p>
      <form @submit.prevent="login">
        <label class="flex flex-col mt-4">
          <span class="font-semibold tracking-wide text-slate-600 dark:text-slate-300"
            >Email Address
          </span>
          <input
            type="email"
            class="w-full p-2 mt-1 ring-2 dark:bg-slate-900 dark:ring-slate-700 dark:focus:ring-indigo-600 border-none dark:text-slate-300 ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
            v-model="payload.email"
          />
        </label>
        <label class="flex flex-col mt-4">
          <div class="flex w-full justify-between items-center">
            <span class="font-semibold tracking-wide text-slate-600 dark:text-slate-300"
              >Password
            </span>
            <NuxtLink
              to="#"
              tabindex="-1"
              class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide hover:underline hover:text-indigo-600"
              >Forgot Password?
            </NuxtLink>
          </div>
          <input
            type="password"
            class="w-full p-2 mt-1 ring-2 dark:bg-slate-900 dark:ring-slate-700 dark:focus:ring-indigo-600 border-none dark:text-slate-300 ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
            v-model="payload.password"
          />
        </label>
        <div class="mt-4 flex w-full gap-2 items-center">
            <span class="font-semibold tracking-wide text-slate-600 dark:text-slate-300"
              >Don't have an account?
            </span>
            <NuxtLink
              to="/sign-up"
              class="text-slate-600 dark:text-slate-400 font-semibold tracking-wide hover:underline hover:text-indigo-600"
              >Sign Up
            </NuxtLink>
          </div>
        <button
          type="submit"
          class="w-full p-2 mt-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold tracking-wide rounded-md focus:outline-none"
        >
          <Icon v-if="loading" name="line-md:loading-alt-loop" />
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import type { UserSignInRequest } from "~/types/user";

definePageMeta({
  layout: "guest",
});

const toast = useToast();
const loading = ref(false)

const payload = ref<UserSignInRequest>({
  email: "",
  password: "",
});

const login = async () => {
  loading.value = true
  await $fetch("/api/user/sign-in", {
    method: "POST",
    body: payload.value,
  })
  .then(async (res) => {    
    await navigateTo('/');
    toast.add({
      id: "login-success",
      title: "Login Success",
      description: `Welcome back, ${res}!`,
      color: "green",
    })
  })
  .catch((error) => 
    toast.add({
      id: "login-error",
      title: "Login Error",
      description: error.statusMessage,
      color: "red",
    })
  ).finally(() => loading.value = false);;
}
</script>
