import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import * as jose from "https://deno.land/x/jose@v4.9.1/index.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, username, password, newPassword } = await req.json()

    if (action === 'login') {
      const { data: user, error: userError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single()

      if (userError || !user) {
        throw new Error('Invalid credentials')
      }

      const validPassword = await bcrypt.compare(password, user.password_hash)
      if (!validPassword) {
        throw new Error('Invalid credentials')
      }

      // Create JWT token
      const secret = new TextEncoder().encode(Deno.env.get('JWT_SECRET'))
      const token = await new jose.SignJWT({ userId: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret)

      return new Response(
        JSON.stringify({ token }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'change-password') {
      // Verify JWT token
      const authHeader = req.headers.get('Authorization')
      if (!authHeader) {
        throw new Error('No authorization header')
      }

      const token = authHeader.replace('Bearer ', '')
      const secret = new TextEncoder().encode(Deno.env.get('JWT_SECRET'))
      
      try {
        await jose.jwtVerify(token, secret)
      } catch {
        throw new Error('Invalid token')
      }

      // Hash new password and update
      const hashedPassword = await bcrypt.hash(newPassword)
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: hashedPassword })
        .eq('username', username)

      if (updateError) {
        throw new Error('Failed to update password')
      }

      return new Response(
        JSON.stringify({ message: 'Password updated successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    throw new Error('Invalid action')
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})