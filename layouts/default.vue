<template>
  <div class="">
    <div
      class="max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto"
    >
      <nav 
        class="bg-opacity-70 z-50 px-10 md:px-20 fixed top-0 left-0 dark:bg-slate-900 dark:bg-opacity-80 py-4 w-full backdrop-blur-sm"
      >
        <TheNavbar />
      </nav>
      <main class="mt-16">
        <slot />
      </main>
      <footer class="border-t border-slate-300 py-4">
        <p class="text-center text-slate-600 font-semibold tracking-wide">
          &copy; 2021 ASTROOO
        </p>
      </footer>
    </div>
  </div>
</template>

