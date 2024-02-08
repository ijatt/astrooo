import { supabase } from "#imports" 
export async function uploadImage(files: File[] | File, folder: string): Promise<string[] | string> {
  const client = supabase()
  try {

    if (Array.isArray(files)) {
      const uploadPromises = files.map(async (file) => {
        const { data, error } = await client.storage.from(folder).upload(file.name, file)
        if (error) throw error
        return data.path
      })
      
      const paths = await Promise.all(uploadPromises)
      return paths

    } else {
      const { data, error } = await client.storage.from(folder).upload(files.name, files)
      if (error) throw error
      return data.path
    }
  } catch (error) {
    throw error
  }
}
