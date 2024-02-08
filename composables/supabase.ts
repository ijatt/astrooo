import { supabase } from "#imports" 
export async function uploadImage(files: File[], folder: string) {
  const client = supabase()
  try {
    const uploadPromises = files.map(async (file) => {
      const { data, error } = await client.storage.from(folder).upload(file.name, file)
      if (error) throw error
      return data.path
    })
    const paths = await Promise.all(uploadPromises)
    return paths
    
  } catch (error) {
    throw error
  }
}
