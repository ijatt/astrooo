// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      BUCKET_URL: process.env.BUCKET_URL,
    }
  },
  modules: [
    '@pinia/nuxt', 
    'nuxt-icon',
    '@nuxt/ui',
    '@pinia-plugin-persistedstate/nuxt',
  ]
})
