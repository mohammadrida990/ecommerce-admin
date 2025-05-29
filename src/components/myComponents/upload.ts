import { createClient } from "@supabase/supabase-js";

export async function uploadFile(image: File) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseApiKey);

  const data = await supabase.storage
    .from("billboard")
    .upload(`${image.name}_${Date.now()}`, image);

  if (!data.data?.path) throw new Error("faild to upload the file");
  const url = await supabase.storage
    .from("billboard")
    .getPublicUrl(data.data?.path);

  return url.data.publicUrl;
}
