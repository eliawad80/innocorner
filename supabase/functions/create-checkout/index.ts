import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.10.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('Stripe secret key is not configured');
      return new Response(
        JSON.stringify({ error: 'Stripe configuration error' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return new Response(
        JSON.stringify({ error: 'Invalid items data' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Initialize Stripe with proper error handling
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    console.log('Creating checkout session...');
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    console.log('Checkout session created successfully:', session.id);

    // Return the session URL in a properly formatted JSON response
    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: corsHeaders }
    );
  }
});