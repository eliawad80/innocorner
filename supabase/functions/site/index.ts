import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const siteUrl = "https://innocorner.com";

Deno.serve((request) => {
  const url = new URL(request.url);
  const target = new URL(url.pathname === "/" ? "/" : url.pathname, siteUrl);

  return Response.redirect(target, 302);
});
