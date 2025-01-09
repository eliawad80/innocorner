import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function updateProductImages() {
  // Map of product IDs to their corresponding image filenames
  const productImages = {
    1: 'af45abc9-729e-4fce-8df2-33470279c418.png', // Professional office workers image
    2: 'af45abc9-729e-4fce-8df2-33470279c418.png'  // Family learning image
  }

  for (const [productId, filename] of Object.entries(productImages)) {
    try {
      // Get public URL for the existing image
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(`lovable-uploads/${filename}`)

      // Update product with the image URL
      const { error: updateError } = await supabase
        .from('products')
        .update({ image: publicUrl })
        .eq('id', parseInt(productId))

      if (updateError) throw updateError

      console.log(`Successfully updated product ${productId} with image`)
    } catch (error) {
      console.error(`Error processing product ${productId}:`, error)
    }
  }
}

updateProductImages()