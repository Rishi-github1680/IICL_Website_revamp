<script>
  import Layout from '../Layout.svelte';
  import ArticleGrid from '../ArticleGrid.svelte';
  import { POSTS, otherPosts } from '../posts.js';
</script>

<Layout
  kicker="Blog"
  h1="How to choose the first process to automate"
  lede="Most failed AI projects picked the wrong process, not the wrong model. Five tests we run before agreeing to build anything."
  heroBanner="/img/banners/A10-banner-blog.png"
  path="/blog-choosing-processes"
  article
>
  <section class="page-section">
    <div class="wrap">
      <div class="section-body">
        <p class="para">Almost every stalled AI project we are asked to rescue has the same root cause, and it is not the model. The process chosen for automation was the wrong one: too rare to matter, too varied to encode, or too consequential to hand over. Picking well is most of the work, and it happens before a line of code is written.</p>
        <p class="para">These are the five tests we run in the one-day workshop. A process needs to pass all five. If it fails one, we say so rather than building something that will quietly go unused.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>1. It happens often enough to matter</h2>
      <div class="section-body">
        <p class="para">Automation earns its cost through repetition. A task performed twice a month will not repay the integration work, the testing, or the ongoing maintenance, however irritating it is to the person doing it.</p>
        <p class="para">A useful floor: the process should consume at least a few hours of someone's week, every week. If nobody can tell you roughly how often it runs, that itself is the finding — measure first, automate second.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>2. The inputs are consistent enough to describe</h2>
      <div class="section-body">
        <p class="para">You do not need perfectly structured data. You do need to be able to describe what arrives, in what form, and what the common variations are. "Customers email us anything at all" is not a specification; "customers email an order reference and one of about eight request types" is.</p>
        <p class="para">The test we use: can someone on the team write down the rules they follow, including the exceptions, in under a page? If they cannot, the process is not yet understood well enough to hand to a system.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>3. Being wrong is recoverable</h2>
      <div class="section-body">
        <p class="para">This is the test that most often changes our advice. Ask what happens when the system gets it wrong — because it will, some proportion of the time.</p>
        <p class="para">Booking an appointment in the wrong slot is recoverable: someone calls and moves it. Approving a payment, discharging a patient, or filing a regulatory return is not. Those workflows can still use AI, but as a drafting and triage layer with a person committing the action — never as the thing that presses the button.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>4. The result is measurable before and after</h2>
      <div class="section-body">
        <p class="para">If you cannot state today's number, you will not be able to prove the change afterwards, and the project will be judged on impressions. Response time, answer rate, cost per ticket, days to close — pick the metric before the build and record its current value.</p>
        <p class="para">We ask for the baseline in writing during the workshop. It is the least glamorous artefact of an AI engagement and the one that settles most arguments six months later.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>5. Somebody owns it</h2>
      <div class="section-body">
        <p class="para">A process with no owner has no one to define correct behaviour, no one to approve exceptions, and no one to notice when quality drifts. These deployments decay quietly.</p>
        <p class="para">The owner does not have to be senior. They have to be the person who actually knows how the work runs and has the authority to change it.</p>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>What this looks like in practice</h2>
      <div class="section-body">
        <p class="para">The processes that pass all five tend to look unglamorous: inbound appointment calls, first-line IT tickets, order status enquiries, invoice matching. They are high volume, well understood, forgiving of error, easy to measure and owned by someone specific.</p>
        <p class="para">That is the right place to start. The ambitious work becomes possible after you have a deployment your organisation trusts — not before.</p>
        <p class="para">If you want to run these tests against your own operation, that is exactly what the <a href="/contactus">one-day workshop</a> is for. You leave with a scoped plan whether or not you continue with us.</p>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <ArticleGrid posts={otherPosts('/blog-choosing-processes', POSTS)} featured={false} kicker="Continue reading" heading="More from the journal" />
    </div>
  </section>
</Layout>
