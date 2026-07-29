<script>
  import ProductLayout from '../ProductLayout.svelte';
</script>

<ProductLayout
  h1="Sell, Support and Get Paid Inside WhatsApp"
  lede="Enquiry to order to payment in one conversation, on the channel your customers already have open."
  heroBanner="/img/banners/A3-banner-iwac.png"
  heroModel="/chatbot.html?transparent=1&ui=0"
  path="/iwac"
  cta="Book an iWac Demo"
  specs={[
    { k: 'Channel', v: 'WhatsApp Business API' },
    { k: 'Handles', v: 'Orders, payments, support' },
    { k: 'Connects to', v: 'CRM, ERP, payment gateway' },
    { k: 'Sends', v: 'Notifications and reminders' },
  ]}
  faqs={[
    { q: "How do customers start a conversation?", a: "By scanning a QR code on packaging, a brochure or in store, or by tapping a link on your website. The conversation opens directly in WhatsApp, so there is no app to install." },
    { q: "Can customers place orders and pay inside WhatsApp?", a: "Yes. The flow runs from enquiry through selection to confirmation, including payment and booking confirmation, without moving the customer to another channel." },
    { q: "Do we need our own WhatsApp Business API access?", a: "Yes, and we set it up as part of onboarding, including business verification and message template approval with Meta." },
    { q: "What kinds of business is it built for?", a: "Retail, food, healthcare, real estate and service businesses: anywhere customers ask routine questions, book appointments or place repeat orders." },
    { q: "How is this different from the WhatsApp API service?", a: "The API integration service connects WhatsApp to your existing systems and is built for your process. iWac is the packaged platform, which is faster to deploy when it already fits how you work." },
  ]}
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>What iWac does</h2>
        <p class="statement">Sell, support and get paid in one conversation — <em>on the channel customers actually open.</em></p>
        <p class="para">A customer scans a code or taps a link and lands in WhatsApp. From there they can ask, choose, order, pay and get confirmation without being pushed to an app or a web form.</p>
        <p class="para">No install, no login, no drop-off between the question and the purchase.</p>
        <a class="cta-link" href="/contactus">See it wired into your stack <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/iwac-1.png" alt="iWac.ai WhatsApp commerce conversation" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What changes</h2>
      <div class="section-body">
        <p class="para">The gap between interest and order is usually where the sale is lost. This closes it.</p>
      </div>
      <ul class="outcomes">
        <li class="outcome"><b>Zero</b><span>App installs — the conversation happens where the customer already is.</span></li>
        <li class="outcome"><b>One</b><span>Thread from first question through to payment and confirmation.</span></li>
        <li class="outcome"><b>Opened</b><span>Notifications and reminders that actually get read, unlike email.</span></li>
      </ul>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap section-split rev">
      <div class="split-text">
        <h2 class="section-h"><span class="tick"></span>Connected to what you run</h2>
        <p class="statement">A conversation is only useful if your systems hear it.</p>
        <p class="para">iWac writes to your CRM, ERP and payment gateway, so an order taken in a chat is a real order — stock, invoice and delivery updates included. Onboarding covers WhatsApp Business API access, business verification and template approval.</p>
        <a class="cta-link" href="/contactus">Talk through the integrations you need <span class="arw">→</span></a>
      </div>
      <div class="split-media">
        <figure><img src="/img/products/iwac-2.png" alt="iWac.ai order and payment flow with system integration" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it fits</h2>
      <div class="section-body">
        <p class="para">Strongest where customers ask routine questions or order repeatedly.</p>
      </div>
      <ul class="feature-grid">
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Retail and food</strong> — catalogue browsing, repeat orders, payment and delivery updates.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Healthcare</strong> — appointment booking, reminders and report delivery.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Real estate</strong> — property enquiries, brochures and site-visit scheduling.</span></li>
        <li class="feature-card"><span class="fc-dot"></span><span><strong>Service businesses</strong> — quotes, bookings, follow-ups and payment collection.</span></li>
      </ul>
      <a class="cta-link" href="/contactus">Explore the full capability set <span class="arw">→</span></a>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Supported surface</h2>
      <dl class="sysgrid">
        <div class="sysrow"><dt>Platform</dt><dd>WhatsApp Business Platform through an approved Business Solution Provider</dd></div>
        <div class="sysrow"><dt>Meta approvals</dt><dd>Business verification, display name, templates and the verified badge are granted by Meta, not by IICL. We prepare and manage the application</dd></div>
        <div class="sysrow"><dt>Opt-in</dt><dd>Consent captured before the first message; the lawful basis remains yours</dd></div>
        <div class="sysrow"><dt>Messaging</dt><dd>Free-form replies inside the 24-hour service window; approved templates outside it</dd></div>
        <div class="sysrow"><dt>Payments</dt><dd>Payment link or native flow issued by your provider. IICL does not hold card data</dd></div>
        <div class="sysrow"><dt>Systems</dt><dd>CRM, order management and catalogue platforms with an available API</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What it needs from you</h2>
      <div class="section-body">
        <ul class="list">
          <li>Business verification documents and an approved sender identity</li>
          <li>A number to provision, or authority to migrate an existing one</li>
          <li>Message content signed off by whoever owns customer communications</li>
          <li>A consent capture point, and a lawful basis for messaging</li>
          <li>API access to the systems the conversation reads from and writes to</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Where it stops</h2>
      <div class="section-body">
        <ul class="list">
          <li>Meta controls verification, template approval, quality rating and messaging limits — no supplier can guarantee those outcomes</li>
          <li>Template rejections and quality-rating drops are possible and are managed, not prevented</li>
          <li>It does not process payments directly; settlement stays with your provider</li>
          <li>It does not message anyone who has not opted in, and honours opt-out immediately</li>
          <li>Outcome measures are defined and baselined with you during discovery</li>
        </ul>
      </div>
    </div>
  </section>

</ProductLayout>
