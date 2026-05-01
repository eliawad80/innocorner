import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="InnoCorner blends IT operations, SDLC expertise, automation, workflow optimization, and practical products to help people and businesses operate smarter." />
    <title>InnoCorner | Practical Innovation for Better Operations</title>
    <style>
      body{margin:0;color:#172033;background:#fbfcfe;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6}a{color:inherit;text-decoration:none}.wrap{max-width:1180px;margin:auto;padding:28px}.hero{min-height:88svh;display:grid;align-content:center;gap:24px}.eyebrow{color:#0e8f72;font-weight:900;text-transform:uppercase;font-size:.78rem}h1{font-size:clamp(3.1rem,8vw,7rem);line-height:.9;margin:0;letter-spacing:0}h2{font-size:clamp(2rem,4vw,4rem);line-height:1;margin:0 0 18px}.lead{max-width:760px;color:#5e6b7f;font-size:1.12rem}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.card{background:#fff;border:1px solid #d9e0e8;border-radius:8px;padding:24px}.button{display:inline-flex;width:max-content;margin-top:10px;border-radius:8px;background:#f46f22;color:#fff;padding:13px 18px;font-weight:900}.section{padding:70px 0;border-top:1px solid #d9e0e8}.contact{background:#172033;color:#fff}.contact .lead{color:rgba(255,255,255,.78)}@media(max-width:800px){.grid{grid-template-columns:1fr}h1{font-size:3.1rem}}
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="hero">
        <p class="eyebrow">InnoCorner Brussels</p>
        <h1>Practical innovation for smarter business operations.</h1>
        <p class="lead">InnoCorner helps individuals and companies transform routines, align technology with business objectives, and deliver secure, efficient, scalable solutions.</p>
        <a class="button" href="mailto:info@innocorner.com">Start a conversation</a>
      </section>
      <section class="section">
        <p class="eyebrow">Our Services</p>
        <h2>Technology services shaped around your workflow.</h2>
        <div class="grid">
          <article class="card"><h3>IT Task Automation</h3><p>Reduce repetitive manual work and create cleaner operational routines.</p></article>
          <article class="card"><h3>Workflow Optimization</h3><p>Map, improve, and streamline processes across teams and tools.</p></article>
          <article class="card"><h3>Secure Delivery</h3><p>Bring IT operations and SDLC discipline into practical implementation.</p></article>
        </div>
      </section>
      <section class="section">
        <p class="eyebrow">About Us</p>
        <h2>We connect technical expertise with business purpose.</h2>
        <p class="lead">At InnoCorner, we are dedicated to transforming the lives of individuals and companies by blending innovative technology with practical solutions. Our mission is to inspire change through technology, offering products and services that enhance life routines and reflect a spirit of innovation.</p>
      </section>
    </main>
    <section class="contact">
      <div class="wrap">
        <p class="eyebrow">Contact Us</p>
        <h2>Let us help you unlock your potential.</h2>
        <p class="lead">Email: info@innocorner.com<br />Phone: +32 02 646 79 74<br />Address: Avenue du Parc 200, 1060 Brussels</p>
      </div>
    </section>
  </body>
</html>`;

Deno.serve(() => {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
});
