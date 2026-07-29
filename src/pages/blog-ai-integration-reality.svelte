<script>
  import Layout from '../Layout.svelte';
  import ArticleGrid from '../ArticleGrid.svelte';
  import { POSTS, otherPosts } from '../posts.js';
</script>

<Layout
  kicker="Blog"
  h1="What AI integration actually involves"
  lede="The model is rarely the hard part. What the work really consists of when an agent has to talk to systems you already run."
  heroBanner="/img/banners/A10-banner-blog.png"
  path="/blog-ai-integration-reality"
  article
>
  <section class="page-section">
    <div class="wrap">
      <div class="section-body">
        <p class="para">Demonstrations make AI look like a model problem. Delivery makes it an integration problem. On a typical enterprise engagement, the proportion of effort that goes into prompting and model selection is small; the majority goes into connecting to systems that were never designed to be spoken to.</p>
        <p class="para">This is what that work is actually made of, so you can plan for it rather than discover it.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Finding out what the system will tell you</h2>
      <div class="section-body">
        <p class="para">Every integration starts by establishing what is actually readable and writable. Some platforms have a clean API. Others have a partial API, a reporting database, and a vendor who charges for access. A few have nothing but a screen.</p>
        <p class="para">This is worth checking in week one, not month two, because it determines what is possible. We have redesigned entire workflows because a booking system could read availability but not write it — better to know before promising.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Identity and permissions</h2>
      <div class="section-body">
        <p class="para">An agent acting on your systems needs an identity, and that identity needs the narrowest permissions that let it do the job. This sounds procedural and is often the longest pole in the tent, because it involves your security team, the vendor, and sometimes procurement.</p>
        <p class="para">The questions that take time: what account does the agent use, who owns it, what can it see, how is that access reviewed, and what happens to the audit trail. Start them early and they run alongside the build instead of blocking go-live.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>The data is messier than the schema suggests</h2>
      <div class="section-body">
        <p class="para">Every long-lived system carries history: duplicate customer records, free-text fields used for three different purposes, status values that stopped meaning what they say years ago, records that violate constraints nobody enforces any more.</p>
        <p class="para">None of this is unusual and none of it is a reason not to proceed. It is a reason to look at real extracts early. A grounded system inherits the quirks of the data it reads, and you would rather find that in testing than in front of a customer.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Failure behaviour has to be designed</h2>
      <div class="section-body">
        <p class="para">Your CRM will be unavailable at some point while a customer is mid-conversation. What should happen? Retry silently, tell the customer plainly, take the details and complete it later, hand to a person?</p>
        <p class="para">That is a business decision, not a technical default, and it is worth ten minutes of someone's time per integration. Systems that make these choices deliberately degrade gracefully; ones that do not simply produce an apology and a dead end.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Testing something that is not deterministic</h2>
      <div class="section-body">
        <p class="para">You cannot assert exact output. What you can do is build a set of real cases with expected outcomes — did it book the right slot, did it escalate when it should, did it refuse what it should refuse — and run them on every change.</p>
        <p class="para">Assembling that set is real work and it is what makes it safe to improve the system later. Without it, every prompt change is a gamble, and teams stop changing anything.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What this means for your plan</h2>
      <div class="section-body">
        <p class="para">Budget for integration, access and testing as the main body of work, with the model as one component. Get security and system owners involved in the first fortnight. Ask for real data extracts early, and expect them to be untidy.</p>
        <p class="para">Projects planned this way tend to reach production. Projects planned around the demo tend to stall at the point where the demo has to meet a real system.</p>
        <p class="para">Our <a href="/aboutus">delivery process</a> is built around exactly this sequence, and the <a href="/erp-services">ERP</a> and <a href="/whatsapp-business">WhatsApp</a> pages describe the integration work in more detail.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <ArticleGrid posts={otherPosts('/blog-ai-integration-reality', POSTS)} featured={false} kicker="Continue reading" heading="More from the journal" />
    </div>
  </section>
</Layout>
