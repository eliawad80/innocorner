import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function generateAndUploadImages() {
  const prompts = [
    "Professional office workers in a training session about cybersecurity, modern corporate setting",
    "Family sitting together at home learning about online safety, warm and educational setting"
  ]

  for (let i = 0; i < prompts.length; i++) {
    try {
      // Generate image
      const response = await fetch(
        `${process.env.SUPABASE_URL}/functions/v1/generate-product-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompts[i] }),
        }
      )

      const { image } = await response.json()

      // Convert base64 to blob
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
      const imageBlob = Buffer.from(base64Data, 'base64')

      // Upload to Supabase Storage
      const fileName = `product_${i + 1}_${Date.now()}.png`
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, imageBlob, {
          contentType: 'image/png',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      // Update product in database
      const { error: updateError } = await supabase
        .from('products')
        .update({ image: publicUrl })
        .eq('id', i + 1)

      if (updateError) throw updateError

      console.log(`Successfully updated product ${i + 1} with image`)
    } catch (error) {
      console.error(`Error processing product ${i + 1}:`, error)
    }
  }
}

generateAndUploadImages()