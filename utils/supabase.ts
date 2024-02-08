import { createClient } from '@supabase/supabase-js'

export default () => {
  const config = useRuntimeConfig()
  return createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
}
