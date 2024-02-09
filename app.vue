<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
      <UNotifications :ui="{ position: 'top-0 ' }" class="bottom-auto mx-auto justify-start z-[55]" />
    </NuxtLayout>
  </div>
</template>
