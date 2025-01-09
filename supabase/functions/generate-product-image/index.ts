import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { productId, description } = await req.json()

    if (!productId || !description) {
      throw new Error('Product ID and description are required')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const hf = new HfInference(Deno.env.get('Huggingface'))

    console.log('Generating image for product:', productId)
    console.log('Using description:', description)

    const image = await hf.textToImage({
      inputs: description,
      model: 'black-forest-labs/FLUX.1-schnell',
      parameters: {
        negative_prompt: 'blurry, low quality, distorted, unrealistic',
      }
    })

    // Convert the blob to a base64 string
    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Generate a unique filename
    const timestamp = new Date().getTime()
    const filename = `product_${productId}_${timestamp}.png`

    // Convert base64 to Uint8Array for upload
    const binaryData = Uint8Array.from(atob(base64), c => c.charCodeAt(0))

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('products')
      .upload(filename, binaryData, {
        contentType: 'image/png',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('products')
      .getPublicUrl(filename)

    // Update product with new image URL
    const { error: updateError } = await supabase
      .from('products')
      .update({ image: publicUrl })
      .eq('id', productId)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ success: true, imageUrl: publicUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})