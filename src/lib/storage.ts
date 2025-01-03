import { supabase } from './supabase';

export async function uploadProfilePhoto(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = fileName; // Simplified path, no nested folders

  const { error: uploadError } = await supabase.storage
    .from('profile-photos')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('profile-photos')
    .getPublicUrl(filePath);

  return publicUrl;
}