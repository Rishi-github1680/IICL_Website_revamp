<script>
  import Layout from '../Layout.svelte';
  import ArticleGrid from '../ArticleGrid.svelte';
  import { POSTS, otherPosts } from '../posts.js';
</script>

<Layout
  kicker="Blog"
  h1="Where a person has to stay in the loop"
  lede="Full autonomy is rarely the goal. How we decide which decisions an agent commits, which it drafts, and which it never touches."
  heroBanner="/img/banners/A10-banner-blog.png"
  path="/blog-human-in-the-loop"
  article
>
  <section class="page-section">
    <div class="wrap">
      <div class="section-body">
        <p class="para">The question we are asked most often is how much the system will do on its own. The honest answer is that it varies by decision, not by project — and deciding that split carefully is what separates a deployment people trust from one they quietly route around.</p>
        <p class="para">We use three levels. Every workflow gets mapped onto them before the build, and the mapping is written down where the customer can see it.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Level 1 — the agent acts</h2>
      <div class="section-body">
        <p class="para">The system completes the task and tells someone afterwards. Suitable where the action is reversible, the cost of an error is low, and the pattern is well established.</p>
        <p class="para">Answering an order status enquiry, booking into a free appointment slot, sending an approved reminder, classifying and routing a ticket. If it goes wrong, someone fixes it in a minute and nothing was lost but the minute.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Level 2 — the agent drafts, a person commits</h2>
      <div class="section-body">
        <p class="para">The system does the work and prepares the outcome, but a person presses the button. This is where most enterprise value actually sits, and it is the level customers most often underestimate.</p>
        <p class="para">Invoice matching with a proposed reconciliation, a drafted contract summary with clauses flagged, a suggested refund with the policy citation attached. The reviewer is not re-doing the work; they are confirming a decision that has been assembled for them. That is still most of the time saved.</p>
        <p class="para">The design detail that matters: show the reasoning and the source. A reviewer who cannot see why the system proposed something will either rubber-stamp everything or check everything, and both defeat the point.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Level 3 — the agent stays out</h2>
      <div class="section-body">
        <p class="para">Some decisions do not go to a system at any confidence level. Clinical judgement, credit decisions, disciplinary matters, anything with a regulator attached, anything where a person is entitled to a human explanation.</p>
        <p class="para">Here the agent's job is to prepare and escalate: gather the context, summarise the history, route it to the right person quickly. That is genuinely useful and it is not the same as deciding.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Handover is a design problem, not a fallback</h2>
      <div class="section-body">
        <p class="para">The most common failure we see is treating escalation as an error path — bolted on, poorly tested, and losing the conversation history on the way. Customers notice immediately, because they are asked to repeat themselves.</p>
        <p class="para">Handover deserves the same care as the happy path: the trigger conditions agreed with the business, the full context carried across, and the person receiving it able to see everything that was already said. On our voice deployments this is the single detail that most affects whether customers describe the experience as good.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Write the levels down before you build</h2>
      <div class="section-body">
        <p class="para">Agreeing this split early prevents the argument that otherwise arrives at go-live, when someone senior sees the system doing something they assumed a person was doing.</p>
        <p class="para">It also gives you a clean way to expand. Once a Level 2 workflow has months of reviewed decisions behind it, you have real evidence about where it is reliable — and can move parts of it to Level 1 deliberately, with numbers, rather than optimistically.</p>
        <p class="para">More on how we scope and govern this in <a href="/ai-genai-services">AI and GenAI services</a>, or see it working in the <a href="/blog">case studies</a>.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <ArticleGrid posts={otherPosts('/blog-human-in-the-loop', POSTS)} featured={false} kicker="Continue reading" heading="More from the journal" />
    </div>
  </section>
</Layout>
