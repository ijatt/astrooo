// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    SECRET_KEY: process.env.SECRET_KEY
  },
  modules: [
    '@pinia/nuxt', 
    'nuxt-icon',
    '@nuxt/ui'
  ]
})
