<template>
  <div class="w-[632px] bg-slate-100 p-4 rounded-xl shadow-md">
    <h1 class="text-2xl font-bold tracking-wide text-slate-700 text-center">
      SIGN UP
    </h1>
    <form @submit.prevent="signUp">
      <div class="flex gap-x-4">
        <div class="w-full">
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >First Name
            </span>
            <input
              type="text"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              placeholder="John"
              v-model="payload.firstName"
            />
          </label>
          <label class="flex flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Email Address
            </span>
            <input
              type="email"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              placeholder="your@email.com"
              v-model="payload.email"
            />
          </label>
          <label class="flex flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Password
            </span>
            <input
              type="password"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              placeholder="********"
              v-model="payload.password"
            />
          </label>
        </div>
        <div class="w-full">
          <label class="flex w-full flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Last Name
            </span>
            <input
              type="text"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              placeholder="Doe"
              v-model="payload.lastName"
            />
          </label>
          <label class="flex flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Username
            </span>
            <input
              type="text"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              placeholder="1234567890"
              v-model="payload.username"
            />
          </label>
          <label class="flex flex-col mt-4">
            <span class="font-semibold tracking-wide text-slate-600"
              >Confirm Password
            </span>
            <input
              type="password"
              class="w-full p-2 mt-1 ring-2 border-none ring-slate-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:outline-none text-slate-500"
              placeholder="********"
              v-model="confirmPassword"
            />
          </label>
        </div>
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
        class="w-full p-2 mt-2 bg-indigo-600 text-white font-semibold tracking-wide rounded-md focus:outline-none"
      >
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

const signUp = async () => {
  if (payload.value.password !== confirmPassword.value) {
    toast.add({
      id: "password-mismatch",
      title: "Password Mismatch",
      description: "The password and confirm password do not match.",
      color: "red",
    })
  } else {
    // Call the API to sign up the user
    console.log(payload.value);
    
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
        description: error,
        color: "red",
      })
    );
  }
}
</script>

<style>
</style>
