<script>
  // Ported from the official IICL site (iicl.in). Edit copy, images or reorder <section> blocks freely.
  import ServiceLayout from '../ServiceLayout.svelte';
  import { PAGE_ART } from '../menu.js';
</script>

<ServiceLayout
  kicker="Service"
  h1="Enterprise AI and Generative AI Solutions"
  lede="AI consulting and implementation for enterprises: AI agents, generative AI applications, RAG, document intelligence and predictive analytics."
  path="/ai-genai-services"
  cta="Discuss Your AI Use Case"
  heroImage={PAGE_ART["ai-genai-services"]}
  specs={[
    { k: "Engagement", v: "Discovery → PoC → production" },
    { k: "Typical first proof", v: "Two weeks on your data" },
    { k: "Deploys to", v: "Your cloud or ours" },
  ]}
  faqs={[
    { q: "Where do most companies start with AI?", a: "With one process that is repetitive, high volume and already well understood. We run a one-day workshop to pick it, then a proof of concept in about two weeks so you can judge the result before committing to a full build." },
    { q: "Which model do you use?", a: "Whichever suits the task, the data and the deployment constraints. Model choice is part of the discovery work, not a decision we make before understanding the problem. We will explain the trade-offs rather than name-drop." },
    { q: "Does our data get used to train models?", a: "No. Your data is used to answer your queries. Retention, access control and audit logging are agreed before any integration work begins." },
    { q: "What if the AI gets something wrong?", a: "We design for that. Workflows that carry risk include an approval step, so the system proposes and a person confirms. Every action is logged and reviewable." },
    { q: "Can it work with the systems we already run?", a: "That is the normal case. We integrate through the interfaces your CRM, ERP, databases and communication channels already expose, rather than asking you to replace them." },
  ]}
>
  <section class="page-section">
    <div class="wrap section-split">
      <div class="split-text">
      <h2 class="section-h"><span class="tick"></span>AI/GenAI Services</h2>
        <p class="para">We offer cutting-edge AI and Generative AI (GenAI) services designed to help enterprises deploy intelligent solutions, automate workflows, and unlock the value of their data. Whether you're integrating LLMs into your apps, building multimodal AI systems, or deploying end-to-end AI Pipelines, our services cover every layer of the AI stack—from model hosting to Fine-Tuning, RAG, vision, and more.</p>
      </div>
      <div class="split-media">
        <figure><img src="/img/genai1.png" alt="Powering Business Transformation Through Applied Artificial Intelligence" loading="lazy" /></figure>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Enterprise-Grade Hosting for Large Language Models</h2>
      <div class="section-body">
        <p class="para">Deploy, scale, and manage the power of Large Language Models (LLMs) in your own environment — securely and efficiently. Our Hosted LLMs service offers a fully managed, production-ready infrastructure for running state-of-the-art models like OpenAI GPT-4, Meta’s LLaMA, Anthropic’s Claude, Alibaba’s Qwen, Mistral, and more, without depending on public endpoints or sacrificing data privacy.</p>
        <p class="para">Whether you're operating in regulated industries like finance, healthcare, or government, or you need lower latency and tighter control over usage and cost, our solution provides unmatched flexibility.</p>
        <ul class="list">
          <li>Private and On-Premises Hosting: Run LLMs in your own cloud (AWS, Azure, GCP) or data centre for full data residency.</li>
          <li>GPU-Optimized Runtime: Accelerated inference using A100, L40S, H100, with autoscaling and resource throttling.</li>
          <li>Multi-Model Support: Host and switch between different models based on use case, size, or cost.</li>
          <li>Advanced Monitoring: Track token usage, performance metrics, latency, and version history through a centralized dashboard.</li>
          <li>Secure API Access: seamlessly with your internal apps, APIs, and knowledge bases through authentication and RBAC.</li>
          <li>Enterprise knowledge assistants</li>
          <li>Legal or compliance data analysis</li>
          <li>Code generation or technical document drafting</li>
          <li>Financial modeling or report summarization</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Standardized Context Windows for Multi-Agent AI Systems</h2>
      <div class="section-body">
        <p class="para">Out-of-the-box LLMs are powerful but generic. To unlock maximum value, they must be customized to your domain, tone, workflows, and terminology. Our LLM-Fine Tuning service empowers you to do just that: adapt and specialize models for increased accuracy, better relevance, and enterprise-grade performance.</p>
        <p class="para">We support both full model Fine-Tuning and parameter-efficient Fine-Tuning (PEFT) strategies like LoRA, QLoRA, Adapter Tuning, and Prefix Tuning — dramatically lowering compute and cost requirements.</p>
        <ul class="list">
          <li>Data Curation and Preprocessing: We help gather and clean domain-specific documents (PDFs, chat logs, emails, etc.) for safe, high-quality training.</li>
          <li>Fine-Tuning Pipelines: Use Hugging Face, DeepSpeed, or OpenLLM-based stacks to Fine-Tune your model efficiently.</li>
          <li>Evaluation and Testing: Custom metrics and human feedback loops to evaluate model alignment, hallucination, and bias.</li>
          <li>Multilingual Tuning: Fine-tune models for regional languages and dialects to better serve local markets.</li>
          <li>Legal, insurance, or healthcare-specific terminology</li>
          <li>Support bots trained on internal SOPs</li>
          <li>Brand-aligned tone and response control</li>
          <li>Instruction-following behavior specific to business logic</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Enhance LLM Accuracy with Real-Time Verified Data</h2>
      <div class="section-body">
        <p class="para">Retrieval-Augmented Generation (RAG) bridges the gap between static models and live data. LLMs are powerful, but they cannot ‘know’ your internal data unless you provide it. That’s where Retrieval-Augmented Generation (RAG) comes in — an architecture that merges LLMs with enterprise data sources for highly accurate, grounded, and up-to-date answers.</p>
        <p class="para">Our RAG solutions combine vector search, embeddings, and LLMs to deliver grounded, up-to-date, dynamic data retrieval to enable truly intelligent assistants, researchers, and analysts.</p>
        <p class="para">Architecture capabilities:</p>
        <ul class="list">
          <li>Vector Indexing: Convert documents, databases, or chat logs into high-dimensional embeddings using OpenAI, Cohere, or SentenceTransformers.</li>
          <li>High-Precision Retrieval: Use FAISS, Qdrant, Pinecone, Chroma or Weaviate to find the most relevant data chunks in real time.</li>
          <li>Citation and Explainability: Get answers with source citations, improving trust and transparency.</li>
          <li>Chunking and Ranking Optimization: Ensure accurate retrieval through dynamic chunk sizing, summarization, and result ranking.</li>
          <li>PDFs, Excel, and CSV files.</li>
          <li>SharePoint, Notion, Google Drive.</li>
          <li>SQL/NoSQL databases.</li>
          <li>Websites and REST APIs.</li>
          <li>AI-Powered Enterprise Knowledge assistants</li>
          <li>Legal research and document generation</li>
          <li>Automated data insights and BI query interfaces</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Standardized Context Windows for Multi-Agent AI Systems</h2>
      <div class="section-body">
        <p class="para">The Model Context Protocol (MCP) is our proprietary standard for managing context-aware interactions across multiple AI agents and tools. It ensures coherent, stateful, and secure communication among LLMs, plugins, APIs, and user inputs.</p>
        <ul class="list">
          <li>Context persistence: Maintain state across sessions and agents</li>
          <li>Scalable memory: Handle large token windows (&gt;100k tokens)</li>
          <li>Context segregation: Role-based access and redaction for sensitive inputs</li>
          <li>Cross-agent orchestration: Multiple agents working in parallel with shared context</li>
          <li>AI copilots that interact with multiple subsystems</li>
          <li>RAG Pipelines that need long-document grounding</li>
          <li>Enterprise agents with evolving user histories</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Extract Insights from Images, Video, and Live Feeds</h2>
      <div class="section-body">
        <p class="para">Our Computer Vision (CV) services leverage state-of-the-art models and tools to extract actionable insights from static images, live video feeds, and real-world environments. We build and deploy solutions tailored for high-speed, high-accuracy applications across industries.</p>
        <ul class="list">
          <li>Object Detection and Classification: Detect and classify objects in real-time using advanced models like YOLO, DETR, MobileNet, or custom CNNs for use cases such as manufacturing QA, smart surveillance, and retail analytics.</li>
          <li>Tracking and Motion Analysis: Monitor object movement and behaviours with DeepSORT, ByteTrack, or Kalman Filters for applications like pedestrian tracking, crowd analytics, or vehicle movement detection.</li>
          <li>Face Recognition and Pose Estimation: Enable biometric identification and behavioural analysis with face matching, facial landmarking, and body pose estimation — ideal for security, authentication, or fitness/health applications.</li>
          <li>OCR and Document Parsing: Accurately extract structured data from scanned documents, printed forms, ID cards, invoices, and even handwritten notes using deep OCR Pipelines and layout analysis.</li>
          <li>Image Captioning and Scene Understanding: Automatically generate contextual descriptions and understand spatial relationships within images for content tagging, accessibility, or surveillance insights.</li>
          <li>Anomaly Detection: Identify outliers, defects, or abnormal behaviour in visual data — from product surface defects in manufacturing to irregular activity in CCTV feeds or anomalies in medical scans.</li>
          <li>Edge and Platform Integration: Seamless deployment across edge devices (NVIDIA Jetson, Google Coral), cloud GPU environments, and integration with video analytics platforms, IoT systems, and enterprise dashboards.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Unified Understanding of Text, Images, and Videos</h2>
      <div class="section-body">
        <p class="para">Vision-Language Models (VLMs) combine natural language understanding with computer vision, enabling AI systems to interpret, reason, and respond to multimodal inputs. We help businesses integrate VLMs for use cases requiring cross-domain cognition.</p>
        <p class="para">Model Support: CLIP, BLIP, Gemini, LLaVA, Flamingo, GPT-4-Vision</p>
        <ul class="list">
          <li>Diagram or chart interpretation: VLMs can read and understand graphs, charts, tables, and flow diagrams, extracting key insights and even summarizing trends or anomalies in plain language.</li>
          <li>Video summarization and highlight detection: VLMs and multimodal Pipelines can summarize long videos, detect key scenes, and identify important objects or events. This allows for efficient content review without manually watching entire footage.</li>
          <li>E-commerce image-based chat</li>
          <li>Legal/medical document visual parsing</li>
          <li>AI agents for robotic vision or inspection</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Natural Language Interfaces for Humans and Machines</h2>
      <div class="section-body">
        <p class="para">Our Conversational AI solutions enable fluid, human-like interactions via chat, voice, or multimodal interfaces. We build enterprise-ready chatbots, voice assistants, and virtual agents that understand context, manage dialogues, and integrate with business systems. Built on top of state-of-the-art NLP and dialogue management systems, our bots don’t just respond — they understand, reason, and act.</p>
        <p class="para">From customer support and HR assistants to sales enablement bots and internal knowledge helpers, we build agents that are helpful, scalable, and always available.</p>
        <ul class="list">
          <li>Multi-turn Dialogue Flow: Memory-aware and contextual responses for complex conversations.</li>
          <li>Omnichannel Delivery: Deploy across WhatsApp, Slack, Web, IVR, Teams, SMS, and voice platforms.</li>
          <li>Speech Interfaces: Integrated TTS and ASR (Google, Azure, ElevenLabs) for real-time voice interaction.</li>
          <li>Knowledge Integration: Combine with RAG to bring internal FAQs, SOPs, or policies into the conversation.</li>
          <li>Personality and Guardrails: Customize tone, behaviour, and safety filters for your brand and use case.</li>
          <li>Customer service automation (L1 + L2 support)</li>
          <li>Virtual HR helpdesks</li>
          <li>Sales and onboarding assistants</li>
          <li>Smart appointment and booking systems</li>
        </ul>
      </div>
    </div>
  </section>






  <section class="page-section shade">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Enterprise AI and Generative AI Services</h2>
      <div class="section-body">
        <p class="para">Tell us the process you want to improve and we will tell you honestly whether this is the right service for it.</p>
        <ul class="list">
          <li>Agentic AI</li>
          <li>Application development</li>
          <li>ERP services</li>
          <li>Contact centre AI</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="page-section faq-section">
    <div class="wrap">
      <h2 class="section-h"><span class="tick"></span>Common questions</h2>
      <div class="faq-list">
        <details class="faq-item" name="faq">
          <summary class="faq-q">Where do most companies start with AI?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">With one process that is repetitive, high volume and already well understood. We run a one-day workshop to pick it, then a proof of concept in about two weeks so you can judge the result before committing to a full build.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Which model do you use?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">Whichever suits the task, the data and the deployment constraints. Model choice is part of the discovery work, not a decision we make before understanding the problem. We will explain the trade-offs rather than name-drop.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Does our data get used to train models?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">No. Your data is used to answer your queries. Retention, access control and audit logging are agreed before any integration work begins.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">What if the AI gets something wrong?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">We design for that. Workflows that carry risk include an approval step, so the system proposes and a person confirms. Every action is logged and reviewable.</p></div>
        </details>
        <details class="faq-item" name="faq">
          <summary class="faq-q">Can it work with the systems we already run?<span class="faq-mark" aria-hidden="true"></span></summary>
          <div class="faq-a"><p class="para">That is the normal case. We integrate through the interfaces your CRM, ERP, databases and communication channels already expose, rather than asking you to replace them.</p></div>
        </details>
      </div>
    </div>
  </section>
</ServiceLayout>
