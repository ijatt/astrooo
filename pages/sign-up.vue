<template>
  <div class="md:w-[632px] bg-slate-100 p-4 rounded-xl shadow-md">
    <h1 class="text-2xl font-bold tracking-wide text-slate-700 text-center">
      SIGN UP
    </h1>
    <form @submit.prevent="signUp">
        <div class="w-full md:flex gap-x-4 items-center">
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >First Name
            </span>
            <input
              type="text"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              v-model="payload.firstName"
            />
          </label>
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Last Name
            </span>
            <input
              type="text"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              v-model="payload.lastName"
            />
          </label>
          </div>
        <div class="w-full md:flex gap-x-2">
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Email Address
            </span>
            <input
              type="email"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              v-model="payload.email"
            />
          </label>
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Username
            </span>
            <input
              type="text"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              v-model="payload.username"
            />
          </label>
        </div>
        <div class="w-full md:flex items-center gap-x-4">
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Password
            </span>
            <input
              type="password"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              v-model="payload.password"
            />
          </label>
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Confirm Password
            </span>
            <input
              type="password"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              v-model="confirmPassword"
            />
          </label>
        </div>
      <div class="mt-4 flex w-auto ml-auto gap-2 items-center">
        <span class="font-semibold tracking-wide text-slate-600"
          >Already have an account?
        </span>
        <NuxtLink
          to="/auth"
          class="text-slate-600 font-semibold tracking-wide hover:underline hover:text-indigo-600"
          >Sign In
        </NuxtLink>
      </div>
      <button
        type="submit"
        class="w-full p-2 mt-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold tracking-wide rounded-md focus:outline-none"
      >
        <Icon v-if="loading" name="line-md:loading-alt-loop" />
        Sign Up
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { UserRequest } from '~/types/user';
definePageMeta({
  layout: "guest",
});

const toast = useToast();
const payload = ref<UserRequest>({} as UserRequest);
const confirmPassword = ref<string>("");
const loading = ref(false)

const signUp = async () => {
  if (payload.value.password !== confirmPassword.value) {
    toast.add({
      id: "password-mismatch",
      title: "Password Mismatch",
      description: "The password and confirm password do not match.",
      color: "red",
    })
  } else {
    loading.value = true
    await $fetch("/api/user/sign-up", {
      method: "POST",
      body: payload.value
    })
    .then(async () => {
      await navigateTo("/auth");
      toast.add({
        id: "sign-up-success",
        title: "Sign Up Success",
        description: "You have successfully signed up. Please sign in to continue.",
        color: "green",
      });
    })
    .catch((error) => 
      toast.add({
        id: "sign-up-error",
        title: "Sign Up Error",
        description: error.statusMessage,
        color: "red",
      })
    ).finally(() => loading.value = false);
  }
}
</script>

<style>
</style>
