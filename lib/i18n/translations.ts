export const translations = {
  en: {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      process: "Process",
      pricing: "Pricing",
      faq: "FAQ",
      formacion: "Training",
      solutions: "Solutions",
      solutionsList: {
        dentistas: "Dental Clinics",
        salud: "Medical Clinics",
        estetica: "Aesthetic Spas",
        abogados: "Law Firms",
        "clases-privadas": "Private Academies",
        propiedades: "Real Estate"
      },
      auditor: "Process Auditor",
      cta: "Get a Quote",
    },
    hero: {
      badge: "CONVERSATIONAL AI & LEVERAGE",
      line1: "Automate Your Sales,",
      line2: "Empower Your Team.",
      line3: "",
      sub: "Advanced AI agents that power your business: we automate client acquisition and digitalize your manuals to train your team 24/7 on WhatsApp.",
      cta1: "Get Started →",
      cta2: "See Solutions",
      stat1: "Clients",
      stat2: "Google AI Certs",
      stat3: "Satisfaction",
      trustedBy: "Trusted by",
      chatSims: [
        {
          tabName: "Dental",
          hudActive: "Dental AI",
          hudLead: "Qualified Patient",
          hudStatus: "Appointment Booked",
          hudValue: "$140,000",
          prospect: "Hi! I'm interested in your clear aligners treatment. Could you tell me the approximate price and if you have slots available on Thursday afternoons? That's my only free day.",
          agent1: "Hi there! Great question 😊 Our diagnostic consultation and 3D study starts from $140,000 (subject to evaluation). Thursday afternoons sound perfect — let me pull up what we have available for you...",
          tool1: "⚙️ Querying clinic schedule...",
          tool1Success: "✓ Open slots found for Thursday",
          agent2: "We have Dr. Silva available this Thursday at 4:30 PM or 6:00 PM. Which one suits you best?",
          prospect2: "4:30 PM works perfectly for me.",
          tool2: "⚙️ Registering in CRM & booking slot...",
          tool2Success: "✓ Appointment booked (Ref. $140,000) & Invites sent",
          agent3: "Amazing! 🚀 You’re all set for this Thursday at 4:30 PM with Dr. Silva. I’ve sent the confirmation and all details to your email and WhatsApp. Looking forward to seeing you!"
        },
        {
          tabName: "Legal",
          hudActive: "Legal AI",
          hudLead: "Potential Client",
          hudStatus: "Consultation Scheduled",
          hudValue: "$200,000",
          prospect: "Hi, I need assistance setting up a new company and understanding the legal requirements. Can we schedule a consultation this week?",
          agent1: "Absolutely! I can guide you through the company formation process. Let me check our lawyers' availability for a meeting.",
          tool1: "⚙️ Checking lawyer schedule...",
          tool1Success: "✓ Available slots found for Thursday",
          agent2: "We have a slot on Thursday at 10:00 AM with our senior counsel. Does that work for you?",
          prospect2: "Yes, Thursday 10 AM works.",
          tool2: "⚙️ Booking consultation & sending brief...",
          tool2Success: "✓ Consultation booked and brief sent",
          agent3: "Your consultation is confirmed for Thursday at 10 AM. I've sent the meeting details and a preparation brief to your email. Looking forward to assisting you!"
        },
        {
          tabName: "Real Estate",
          hudActive: "Broker AI",
          hudLead: "Qualified Lead",
          hudStatus: "Viewing Booked",
          hudValue: "Rental Confirmed",
          prospect: "Hi, I saw the listing for the 2-bedroom apartment in Providencia. Is it still available? I'd love to schedule a visit this week if possible.",
          agent1: "Hi! Great news — it’s still available 😊 58 m², 2 bedrooms, 1 bathroom and parking included. Rent: $480,000/month. To schedule a visit, what day of the week works best for you — any preference for morning or evening?",
          tool1: "⚙️ Checking available viewing times...",
          tool1Success: "✓ Viewing slots available this week",
          agent2: "Perfect! We have slots this Wednesday at 11:00 AM or Thursday at 6:00 PM. Which one works for you?",
          prospect2: "Thursday at 6:00 PM works perfectly.",
          tool2: "⚙️ Booking visit & notifying assigned agent...",
          tool2Success: "✓ Viewing confirmed & agent assigned",
          agent3: "All set! 🏠 Your visit is confirmed for Thursday at 6:00 PM. I’ve sent the exact address and your agent’s contact to your WhatsApp. Can’t wait for you to see it!"
        },
        {
          tabName: "Technical Onboarding",
          hudActive: "Operations AI",
          hudLead: "Floor Operator",
          hudStatus: "Stock & ERP Calibrated",
          hudValue: "Tool Calibrated",
          prospectLabel: "Operator (Floor)",
          agentLabel: "Training AI",
          prospect: "🎤 [Audio - 14s] Hi, the CNC-800 milling tool started vibrating weirdly when cutting tempered steel, leaving rough burrs. Does this tool need replacement, or can I calibrate the RPM? Sending photo.",
          agent1: "Hi Carlos! I have analyzed your acoustic report and photo. The burr pattern and low-frequency vibration indicate a flank abrasive wear of ~0.45mm on the primary cutting edge. ⚠️ **It is not safe to continue.** Pulling up the CNC-800 technical manual...",
          tool1: "⚙️ Scanning technical manuals & identifying tool part...",
          tool1Success: "✓ CNC-800 Tech Manual (Sec 4.2: Replacement Mill) consulted",
          agent2: "The manual says to replace the mill with spare part **FR-202** (Aisle 4, Shelf B). Also, calibrate the lathe panel to **1,800 RPM** and a feed rate of **0.15 mm/rev**. Should I log this spare part consumption in the plant ERP?",
          prospect2: "📸 [Photo - Lathe] Done, replaced with FR-202 and parameters adjusted in the CNC-800 panel. Go ahead and log it.",
          tool2: "⚙️ Connecting to BrownsERP & deducting spare FR-202...",
          tool2Success: "✓ Spare part FR-202 deducted from stock & Maintenance logged",
          agent3: "Excellent! Inventory has been updated and the calibration is now registered under your operator ID. The machine is safe and ready to run. Great job, and remember to wear your safety goggles! 🛡️"
        },
        {
          tabName: "Sales Training",
          hudActive: "Sales Ops AI",
          hudLead: "Sales Staff",
          hudStatus: "Quote Auto-Generated",
          hudValue: "Special Approved",
          prospectLabel: "Sales Rep (Staff)",
          agentLabel: "Training AI",
          prospect: "🎤 [Audio - 10s] Hi, a corporate client is asking for a 15% discount for buying 50 units of our premium product, but the manual says the cap is 10%. Can I approve it?",
          agent1: "Hi, Sofia! I understand your query. Checking the 2026 commercial policies manual in your Obsidian... ⚠️ The standard cap is 10%. However, section 3.4 specifies that for orders of 50+ units you can escalate to the manager for a special discount. Let me consult...",
          tool1: "⚙️ Checking approvals table and contacting supervisor...",
          tool1Success: "✓ Management authorized a special 15% code for wholesale purchases",
          agent2: "The supervisor approved the special commercial discount code **DESC-CORP-15** for this client. Would you like me to draft the formal quote with the 15% applied to send it to them right away?",
          prospect2: "Awesome! Yes, please draft the quote so I can send it now.",
          tool2: "⚙️ Connecting to BrownsBilling & generating PDF quote...",
          tool2Success: "✓ PDF quote generated with 15% wholesale discount",
          agent3: "Done! Formal quote **#COT-8849** generated and sent to your corporate email. I also left it ready in your WhatsApp. Best of luck with that corporate sale close! 🚀"
        },
        {
          tabName: "Medical Protocol",
          hudActive: "Medical Ops AI",
          hudLead: "Clinic Staff",
          hudStatus: "Code Red Activated",
          hudValue: "Staff Alerted",
          prospectLabel: "Receptionist (Staff)",
          agentLabel: "Training AI",
          prospect: "🎤 [Audio - 12s] Hi, I just received a patient with acute chest pain but they don't have an appointment scheduled and all slots are full. What emergency protocol should I activate according to the manual?",
          agent1: "Hi, Matias! Safety alert. ⚠️ **Acute chest pain is Code Red.** According to the clinic's medical triage protocol, you must refer the patient immediately to the resuscitation box and alert the cardiologist on duty. Consulting today's assigned doctor...",
          tool1: "⚙️ Consulting medical shift roster in the ERP...",
          tool1Success: "✓ Cardiologist on duty identified: Dr. Silva (Floor 1, Box 4)",
          agent2: "The cardiologist on duty is **Dr. Silva**. I have already sent an automatic priority alert to his cell phone. Please accompany the patient to **Resuscitation Box 2** (Floor 1) immediately. Would you like me to notify the reception supervisor to support you physically?",
          prospect2: "Yes, please! Let supervisor Ana know so she can help me receive them.",
          tool2: "⚙️ Sending urgent alert to Supervisor Ana...",
          tool2Success: "✓ Urgent alert sent to Supervisor Ana & Protocol activated",
          agent3: "Done! Supervisor Ana is on her way to support you at reception. Dr. Silva is already alerted in the Box. You did an excellent job following the Code Red protocol. Keep calm! 🛡️"
        }
      ]
    },
    portfolio: {
      eyebrow: "Our Work",
      title: "Projects that speak for themselves",
      prevLabel: "Previous project",
      nextLabel: "Next project",
      dotLabel: "Go to project",
      cta: "Ready to let your processes run themselves?",
      ctaBtn: "I want my agent",
      introEyebrow: "EXCLUSIVE PORTFOLIO",
      introTitle: "Elite Software & AI Solutions",
      introSub: "A curated selection of our most recent work. We design and implement high-performance digital ecosystems, custom automations, and robust web platforms built to scale.",
    },
    about: {
      eyebrow: "Who's behind it",
      greeting: "Hi, I'm Cristian. Founder of Browns Studio.",
      role: "Founder · Browns Studio",
      available: "Available",
      verified: "Verified Freelancer",
      bio: "Hi, I'm Cristian. A Google-certified AI specialist. Message me and let's bring your idea to life: at Browns Studio we don't just build software, we design elite autonomous agents that learn your processes and execute them for you to scale your business on autopilot.",
      certTitle: "Google Certified in AI",
      certSub: "Artificial Intelligence with Gemini · Google Cloud",
      certs: "certs.",
      certNote: "Every certification = a real tool applied to your business.",
      ctaBtn: "Let's talk about your project",
      certNames: [
        "AI Fundamentals", "AI for App Building", "AI for Data Analysis",
        "AI for Content", "AI for Writing", "AI for Research", "AI for Brainstorming",
      ],
      certDescs: [
        "Solid AI foundation", "Apps with integrated AI", "Data-driven decisions",
        "Automated content", "AI-powered text", "Assisted research", "Ideas & strategy with AI",
      ],
    },
    pricing: {
      eyebrow: "AI Agent Services",
      title: "Choose the agent for your business",
      sub: "Custom-built agents that connect to your real systems, work 24/7 and free your team to focus on what only humans can do.",
      tabWeb: "AI Agents & Automation",
      tabAI: "AI Agents",
      tabTraining: "Mentorship & Workshops",
      popular: "Most Recommended",
      ctaBtn: "Get a Quote",
      combo: "Not sure which service fits? Book a free 45-min process audit — no commitment required.",
      moreDetails: "View full details & timeline ➔",
      modalTitle: "Service Blueprint & Delivery",
      deliverables: "What's Included (Key Deliverables)",
      timeline: "Step-by-Step Implementation",
      close: "Close",
      plans: [
        {
          name: "WhatsApp Lead Triage & Sales Closer",
          desc: "Autonomous lead profiling and qualification on WhatsApp 24/7 with silent human handoff.",
          price: "800,000 CLP",
          priceSuffix: " setup + 125,000 CLP/mo (Annual) or 250,000 CLP/mo (Monthly)",
          features: [
            "Conversational lead qualification",
            "Real-time Google Sheets sync",
            "Silent human escalation (handoff)"
          ],
          longFeatures: [
            "Conversational lead qualification on WhatsApp 24/7 without rigid buttons",
            "Real-time contact synchronization directly to Google Sheets",
            "Autonomous appointment booking via native Calendly integration",
            "Silent human escalation (handoff) with full chat history logged in Firestore",
            "Real-time audio processing and voice note transcription via Gemini",
            "Private Web Admin Portal (/admin) to audit all chats and leads",
            "Programmatic security guards (built-in Anti-Abuse and Anti-Flood filters)"
          ],
          howWeDoIt: [
            { step: "Day 1-2: Conversational Scoping", desc: "We define the 5 key profiling questions and map your bot's exact brand voice." },
            { step: "Day 3-4: Obsidian Knowledge Base", desc: "We structure markdown files with your services, pricing guidelines, and common FAQs." },
            { step: "Day 5-7: Webhooks & Integrations", desc: "We connect Meta APIs, Calendly, and Google Sheets within our agential system." },
            { step: "Day 8-10: Stress Testing & Deploy", desc: "We run 30+ real test conversations and push the bot to live production." }
          ]
        },
        {
          name: "Internal Process & Knowledge Copilot",
          desc: "Onboarding automation and internal support powered by Obsidian-wiki and multimodal RAG.",
          price: "1,200,000 - 2,500,000 CLP",
          priceSuffix: " setup + 145,000 CLP/mo support & hosting",
          features: [
            "Obsidian-style knowledge base",
            "Local vector RAG (0ms latency, free)",
            "Text, voice, and image processing"
          ],
          longFeatures: [
            "Obsidian-style structured knowledge base integration (markdown/wiki)",
            "In-memory vector RAG search (0ms latency) without expensive database fees",
            "Multimodal query processing: handles text, voice notes, and image attachments",
            "Real-time supervisor escalation alerts if the AI needs human assistance",
            "75% reduction in internal support wait times and employee onboarding duration",
            "Native deployment to Slack, Microsoft Teams, or WhatsApp",
            "Automated incremental cache pre-compilation during build phase (Vercel-ready)"
          ],
          howWeDoIt: [
            { step: "Day 1-3: Information Audit", desc: "We scan your onboarding manuals, operational guidelines, and company wikis." },
            { step: "Day 4-6: Vector RAG Structure", desc: "We organize the Obsidian vault and configure incremental text-embedding-004 caching." },
            { step: "Day 7-8: Channel Deployment", desc: "We deploy the bot directly inside your Slack, Teams, or company WhatsApp channels." },
            { step: "Day 9-10: Calibration & Launch", desc: "We stress-test the model against hallucinations and verify response accuracy." }
          ]
        },
        {
          name: "Custom Agential Systems & Workflows",
          desc: "Fully custom agential systems executing real-time actions and integrations across CRMs.",
          price: "900,000 - 1,800,000 CLP",
          priceSuffix: " setup + 125,000 CLP/mo support & hosting",
          features: [
            "Custom-coded agential software",
            "Bidirectional CRM integrations",
            "Advanced background automation"
          ],
          longFeatures: [
            "Fully custom-coded agential system (Node.js/TypeScript, clean architecture)",
            "Bidirectional real-time CRM integration (HubSpot, Salesforce, Pipedrive)",
            "Transactional synchronization with e-commerce, ERPs, and custom databases",
            "Advanced workflow automations executing complex backend tasks via Kapso",
            "Advanced logic routing and direct secure interactions with proprietary APIs",
            "Bank-grade encrypted credential keychain storage",
            "Priority engineering support and proactive updates for API changes"
          ],
          howWeDoIt: [
            { step: "Day 1-3: Architecture & API Scoping", desc: "We audit your CRM/ERP APIs and design the logical data mapping." },
            { step: "Day 4-8: Backend Engineering", desc: "We build custom logical routines and cloud automation functions in Kapso." },
            { step: "Day 9-11: Integration Testing", desc: "We perform full end-to-end sandbox testing of all transactional synchronizations." },
            { step: "Day 12: Production Go-Live", desc: "We deploy the system live and securely connect it to your operations." }
          ],
          popular: true
        },
        {
          name: "Enterprise Agentic System",
          desc: "Multi-agent orchestration architecture for complex, large-scale corporate operations.",
          price: "Custom Quote",
          priceSuffix: " + 350,000+ CLP/mo support & engineering",
          features: [
            "Advanced multi-agent orchestration",
            "Intelligent document processing",
            "Guaranteed engineering SLA"
          ],
          longFeatures: [
            "Sovereign multi-agent system with intelligent routing between specialized agents",
            "AI-powered document processing and secure data extraction (PDFs, spreadsheets)",
            "Unlimited integrations with proprietary databases and legacy systems",
            "Custom enterprise-grade multi-role administration dashboard",
            "Proactive system health monitoring and high-availability Vercel hosting",
            "Strict bank-grade data encryption and strict privacy standard compliance",
            "24/7 dedicated engineering support and guaranteed response SLA"
          ],
          howWeDoIt: [
            { step: "Phase 1: Consulting & Blueprint", desc: "We map your entire operations and design the complete multi-agent blueprint." },
            { step: "Phase 2: Sandbox Engineering", desc: "We build and run the multi-agent ecosystem in a secure, isolated sandbox." },
            { step: "Phase 3: Database & Core Connect", desc: "We hook the agents to your central corporate database and live systems." },
            { step: "Phase 4: Scaling & Training", desc: "We roll out the platform gradually and train your executive team." }
          ]
        }
      ],
      trainingPlans: [
        {
          name: "Vibecoding 1-1 Intensive",
          desc: "Personalized mentorship to master agentic engineering",
          price: "Let's talk",
          features: [
            "4 private 1-on-1 sessions (1.5h each)",
            "Direct implementation into your real projects",
            "Expert-level prompt engineering templates",
            "Session recording + source code included",
          ],
          popular: true,
        },
        {
          name: "Agentic Swarm Mastery",
          desc: "Deep dive into autonomous multi-agent systems",
          price: "Let's talk",
          features: [
            "8 private sessions over 4 weeks",
            "Building custom agentic pipelines",
            "Private architecture audit & optimization",
            "60-day priority engineering support",
          ],
        },
        {
          name: "Executive AI Strategy",
          desc: "High-level roadmap for your business",
          price: "Let's talk",
          features: [
            "90-min private immersion session",
            "AI transformation audit & workflow design",
            "Step-by-step agentic integration roadmap",
            "Direct WhatsApp access to the founder",
          ],
        },
        {
          name: "Corporate Team Workshops",
          desc: "Tailored AI training for your entire team",
          price: "Let's talk",
          features: [
            "Custom roadmap for team workflows",
            "On-site or remote live sessions",
            "Group project implementation support",
            "Advanced agentic stack for companies",
          ],
        },
      ],
      aiPlans: [],
      trainingNote: {
        title: "Team Training & Workshops",
        desc: "Looking for a custom plan for your entire team? We design tailored programs for companies and startups.",
        btn: "Consult team training"
      }
    },
    process: {
      eyebrow: "How We Work",
      title: "From audit to live agent in 4 steps",
      steps: [
        { num: "01", title: "Process Audit", desc: "We map every customer interaction that can be delegated to an agent.", details: "In a 45-min session we identify your top 30 most repeated conversations, decision points and bottlenecks. No commitment required. This audit is the blueprint the agent needs to act as a true extension of your team." },
        { num: "02", title: "Agent Architecture", desc: "We design the tools, memory and integrations before writing a single line of code.", details: "We define the agentic loop (reason → act → observe), the tool set (Calendar, CRM, Shopify...), the RAG knowledge base and the approval gates for critical actions. You validate every flow before development begins." },
        { num: "03", title: "Training & Testing", desc: "We train the agent with your exact logic and run 30+ real conversation tests.", details: "The knowledge base is built with your tone, prices, policies and edge cases. We run real conversation simulations before launch. Nothing goes live until you are 100% satisfied with the responses." },
        { num: "04", title: "Live & Improving", desc: "The agent operates 24/7. We monitor, optimize and keep it up to date every month.", details: "Deployed with full observability (every reasoning step logged). Monthly knowledge base updates, performance reports, and proactive optimization. You retain full control via approval gates for all critical actions." },
      ],
      learnMore: "Learn more",
      understood: "Understood",
      step: "Step",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Your questions, answered",
      cta: "Have a question not listed here? Message us on WhatsApp.",
      items: [
        {
          q: "What is the Business AI Setup and how does it work?",
          a: "It's our entry-level service. We analyze your WhatsApp conversation history, build a full knowledge base with your business information, and configure WhatsApp's native AI agent to respond like your best employee — 24/7. Everything in 7 days, without changing anything you already use.",
        },
        {
          q: "Do I need WhatsApp Business API or a special account?",
          a: "For the Business AI Setup, no. You only need the WhatsApp Business app that any business can download for free. For the Custom Agent, we access the WhatsApp Cloud API — we handle all the technical setup, you just provide the phone number.",
        },
        {
          q: "How do I know the agent will respond correctly?",
          a: "Before launch, we run 30+ real conversation tests. If the agent makes a mistake, we adjust the knowledge base until it responds perfectly. We don't launch anything until you're 100% satisfied with the responses.",
        },
        {
          q: "Can the agent connect to my existing systems (Google Calendar, Shopify, CRM)?",
          a: "Yes — that's the difference between Business AI Setup and the Custom Agent. The custom-coded agent connects to your real tools: it can create calendar appointments, check stock, register leads in your CRM and more. All in real time, with no human intervention.",
        },
        {
          q: "Do you accept installment payments?",
          a: "Yes. We work with 50% upfront and 50% on delivery. For larger projects we can arrange 3 installments. We accept bank transfer, PayPal, and crypto (USDT/USDC).",
        },
        {
          q: "What happens when my business information changes (prices, services, hours)?",
          a: "That's what the monthly retainer is for. Keeping the agent's knowledge up to date is part of maintenance. Without regular updates, the agent starts giving outdated information. Our monthly plan ensures it's always current and improving.",
        },
      ],
    },
    aiShowcase: {
      eyebrow: "Agents · Automation · Training",
      title: "What an agent can do for your business",
      sub: "Not generic bots. Agents trained with your logic, connected to your systems, and designed to operate without supervision.",
      videoLabel: "Watch: AI Agents in action",
      videoCta: "See plans & pricing",
      categories: [
        {
          icon: "🤖",
          title: "Your business attends itself",
          desc: "The agent responds, books, and qualifies leads on WhatsApp — 24 hours, 7 days a week. Built with your tone, your prices, and your processes.",
          tag: "WhatsApp Agent",
        },
        {
          icon: "🔗",
          title: "Connected to your real systems",
          desc: "The agent checks your calendar, verifies stock, and registers leads in your CRM — in real time, with no human intervention.",
          tag: "API Integration",
        },
        {
          icon: "🧠",
          title: "Your company's internal AI",
          desc: "An assistant trained with all your business information. Your team gets instant answers without searching through documents.",
          tag: "Knowledge base",
        },
        {
          icon: "🎓",
          title: "Teams fluent in AI",
          desc: "Workshops where your team learns to work with AI — tailored to your industry and the tools you already use.",
          tag: "Live workshop",
        },
      ],
      ctaTitle: "Your business could be running on autopilot this week.",
      ctaSub: "Book a free process audit and discover what you can delegate to an agent.",
      ctaBtn: "View plans & pricing →",
      trainingConsult: {
        title: "Looking for AI training for your team?",
        desc: "We design workshops tailored to your team's real workflows and tools.",
        btn: "Request a consultation"
      }
    },
    cta: {
      spots: "3 PROJECT SLOTS PER MONTH",
      title: "Your process. Your agent. Running 24/7.",
      sub: "We analyze how your business works, build the agent that runs your key processes, and launch it to operate 24/7 — while you focus on growing.",
      note: "First process audit at no cost. No commitment.",
      whatsapp: "Chat on WhatsApp",
      email: "Send an email",
      emailSubject: "I want a process audit for my business",
      emailBody: "Hello, I'd like to schedule a free process audit to see what I can automate with AI.",
      check1: "✓ Process audit included",
      check2: "✓ 24h response time",
      check3: "✓ No commitment",
      contactOptions: [
        { label: "Business AI Setup", msg: "Hi! I'm interested in the Business AI Setup to activate the WhatsApp agent for my business." },
        { label: "Custom WhatsApp Agent", msg: "Hi! I'd like a custom WhatsApp agent connected to my real systems." },
        { label: "Training & Workshops", msg: "Hi! I'm interested in AI training for my team." },
        { label: "Other Inquiries", msg: "Hi! I have a question about your AI services." },
      ],
    },
    crypto: {
      eyebrow: "Fast Payments",
      title: "We Accept Crypto",
      sub: "Borderless payments and immediate delivery. We prioritize speed in every step.",
      features: [
        { title: "USDT / USDC", desc: "Base, Polygon & Ethereum" },
        { title: "Bitcoin / ETH", desc: "Direct on-chain payments" },
        { title: "Zero Fees", desc: "No bank commissions" },
        { title: "Global", desc: "From anywhere in the world" }
      ]
    },
    footer: {
      nav: "Navigation",
      services: "Services & Pricing",
      portfolio: "Portfolio",
      process: "Process",
      faq: "FAQ",
      contact: "Contact",
      rights: "All rights reserved.",
      made: "Built for businesses that delegate, scale and lead with AI.",
    },
    seo: {
      title: "Browns Studio | AI Agents for Business in LATAM",
      description: "Browns Studio builds custom AI agents that handle customer service, book appointments, and qualify leads on WhatsApp — 24/7. Process analysis, real system integration and launch in 7 days.",
      keywords: ["WhatsApp AI agent", "WhatsApp automation for business", "AI agent for clinics", "AI agent for real estate", "WhatsApp Business AI LATAM", "sales agent WhatsApp", "AI booking agent", "implement AI in my business", "Browns Studio AI agents", "lead qualification AI", "custom WhatsApp chatbot", "Business AI Setup"],
    },
    useCases: {
      eyebrow: "Agent as a Service",
      title: "Designed to act. Built to scale.",
      sub: "Our agents power your operation — serving customers 24/7, acting on your real systems, and freeing your team to focus on what truly matters.",
      sectionTitleLeft: "Business Processes",
      sectionSubLeft: "Processes we delegate and automate most",
      sectionTitleRight: "Engineering Safeguards",
      sectionSubRight: "How the technology works under the hood",
      items: [
        {
          title: "Sales Agent",
          desc: "Qualifies leads, answers inquiries, quotes, and schedules calls on WhatsApp — 24/7, no human intervention.",
          tag: "WhatsApp · CRM · Leads",
          result: "Qualified leads without team effort",
        },
        {
          title: "Operations Agent",
          desc: "Manages your CRM, generates automatic reports and coordinates internal workflows so no one has to remember.",
          tag: "Make · n8n · Zapier",
          result: "Internal operations on autopilot",
        },
        {
          title: "El Capacitador IA",
          desc: "WhatsApp agent for onboarding and operations. Resolves text, image, and voice queries using your Obsidian-style structured wiki. Alerts human supervisors when stuck.",
          tag: "WhatsApp · Obsidian · Support Escalation",
          result: "Onboarding and workflows on autopilot",
        },
        {
          title: "Multi-Channel Agent",
          desc: "Operates across WhatsApp, email, web and your system simultaneously — one agent that never loses context.",
          tag: "Omnichannel · API · Database",
          result: "Consistent multi-channel presence",
        },
      ],
      pillars: [
        {
          title: "Reasons before acting",
          desc: "The agent evaluates context, consults your knowledge base and decides the best action — not just keyword matching.",
        },
        {
          title: "Connected to your tools",
          desc: "Calendar, CRM, Shopify, Sheets. The agent acts on your real systems in real time, no human in between.",
        },
        {
          title: "Human in the loop",
          desc: "Before any critical action (payment, cancellation, bulk send) the agent pauses and waits for your approval.",
        },
        {
          title: "Remembers every customer",
          desc: "Persistent memory via RAG: the agent knows each customer's history, preferences and previous conversations.",
        },
      ],
      cta: "Tell us your process",
      bottomNote: "Not sure which tier fits? ",
      bottomLink: "Book a free 45-min process audit.",
    },
    processAuditor: {
      eyebrow: "OPERATIONAL AUDIT",
      title: "Audit your processes & calculate your ROI",
      sub: "Select your industry, adjust your monthly metrics, and discover the real financial impact of automating your operations with a BrownsOS AI Agent.",
      industryLabel: "Select your Industry",
      leadsLabel: "Monthly Leads / Convs",
      valueLabel: "Average Deal Value",
      delayLabel: "Human Response Delay",
      delayOptions: {
        instant: "Instant (< 1 min) - Max retention",
        moderate: "Moderate (15 min - 1 hr) - 15% leakage",
        slow: "Slow (1 - 4 hrs) - 35% leakage",
        nextDay: "Next Day (> 12 hrs) - 60% leakage"
      },
      industries: {
        dental: "Dental Clinics",
        aesthetic: "Aesthetic Spas",
        legal: "Law Firms",
        realEstate: "Real Estate",
        ecommerce: "E-Commerce / Retail",
        b2b: "Consulting / B2B"
      },
      workflowTitle: "Proposed Agentic Workflow",
      workflowSteps: {
        dental: [
          "Instant Triage: AI Agent responds to the lead in less than 45 seconds.",
          "RAG Qualification: Identifies dental treatment of interest and urgency level.",
          "Direct Scheduling: Finds open slots and schedules directly into clinic CRM/Calendar.",
          "Nurturing & Prep: Sends prep instructions and radiograph reminders via WhatsApp."
        ],
        aesthetic: [
          "Instant Support: Answers rejuvenation and botox inquiries 24/7.",
          "Aesthetic Triage: Filters doctor preferences and initial budget.",
          "VIP Booking: Dynamically schedules the evaluation and reserves the physical room.",
          "Pre-Care Nurture: Sends WhatsApp prep recommendations and consent forms."
        ],
        legal: [
          "Case Ingestion: Automated admission agent filters legal domain (civil, corporate, etc.) and case size.",
          "High-Priority Triage: Flags high-value corporate clients and requests core details.",
          "Senior Partner Booking: Schedules consultation with Senior Partner and spawns secure Zoom room.",
          "NDA Despatch: Autogenerates and fires a preliminary NDA directly to email."
        ],
        realEstate: [
          "Instant Capture: Responds immediately to portal property listings.",
          "Pre-Qualification: Validates minimum requirements (income, background check) in a friendly tone.",
          "Viewing Coordination: Schedules viewing appointment with the assigned broker autonomously.",
          "Document Folder: Requests and organizes initial tenant papers prior to viewing."
        ],
        ecommerce: [
          "Shopping Assistant: Guides customers on size, colors, or inventory stock.",
          "Cart Recovery: Proactively messages abandoned shopping carts with gentle discounts.",
          "Post-Purchase: Instantly answers shipping status, returns, and delivery FAQs.",
          "AI Loyalty: Recommends cross-sell items based on purchase history."
        ],
        b2b: [
          "Enterprise Qualification: Filters companies by size, industry, budget, and operational pain points.",
          "Express Diagnostics: Queries current tech stack (CRM, ERP, DB) for compatibility.",
          "Consultation Booking: Reserves a slot for high-touch strategic audit and logs into CRM.",
          "Commercial Follow-up: Instantly fires BrownsOS executive presentation after simulation."
        ]
      },
      resultsTitle: "Financial Impact & Agentic Leverage Audit",
      lostRevenue: "Lost Revenue due to Delays",
      lostRevenueNote: "Projected annual leakage due to team latency in responding and qualifying.",
      recoveredRevenue: "Monthly Recovered Revenue",
      recoveredRevenueNote: "Estimated monthly revenue captured by the AI Agent responding 24/7 in 45 seconds.",
      hoursSaved: "Operational Hours Freed",
      hoursSavedNote: "Client qualification and booking delegated 100% to the BrownsOS Agent.",
      roiTitle: "Return on Investment (ROI)",
      roiNote: "Estimated financial multiplier against the setup and maintenance cost.",
      efficiencyLabel: "Operational Efficiency",
      ctaBtn: "Secure Execution & Upskilling Blueprint",
      whatsappTemplate: "Hi Cristian, I just finished the process audit for my {industry}. My estimated metrics are {leads} leads/month with an average ticket of {value}. Our current response time is {delay} and the simulator estimates we can recover {recovered}/month. Let's build the agent!"
    }
  },

  es: {
    nav: {
      services: "Servicios",
      portfolio: "Portfolio",
      process: "Proceso",
      pricing: "Precios",
      faq: "FAQ",
      formacion: "Formación",
      solutions: "Soluciones",
      solutionsList: {
        dentistas: "Clínicas Dentales",
        salud: "Centros de Salud",
        estetica: "Clínicas Estéticas",
        abogados: "Abogados y Firmas",
        "clases-privadas": "Academias y Clases",
        propiedades: "Inmobiliarias"
      },
      auditor: "Auditor de Procesos",
      cta: "Cotizar Proyecto",
    },
    hero: {
      badge: "IA CONVERSACIONAL Y APALANCAMIENTO",
      line1: "Automatiza tus Ventas,",
      line2: "Capacita a tu Equipo.",
      line3: "",
      sub: "Agentes de IA avanzados que impulsan tu negocio: automatizamos la adquisición de clientes y digitalizamos tus manuales para capacitar a tu equipo 24/7 en WhatsApp.",
      cta1: "Iniciar Ahora →",
      cta2: "Ver Soluciones",
      stat1: "Clientes",
      stat2: "Certs. Google IA",
      stat3: "Satisfacción",
      trustedBy: "Proyectos realizados",
      chatSims: [
        {
          tabName: "Dental",
          hudActive: "Odonto AI",
          hudLead: "Paciente Calificado",
          hudStatus: "Cita Reservada",
          hudValue: "$140.000",
          prospect: "¡Hola! Me interesa el tratamiento de ortodoncia invisible. ¿Qué precio aproximado tiene y si tienen cupos disponibles los jueves por la tarde? Es el único momento en el que puedo asistir.",
          agent1: "¡Hola, qué bueno que nos escribiste! 😊 La consulta diagnóstica y estudio 3D inicia desde $140.000 (sujeto a evaluación). Vi que los jueves por la tarde te quedan bien — déjame ver exactamente qué horarios tenemos para ese día...",
          tool1: "⚙️ Consultando agenda clínica...",
          tool1Success: "✓ Horarios libres encontrados para Jueves",
          agent2: "Tengo disponible este Jueves a las 4:30 PM o a las 6:00 PM con la Dra. Silva. ¿Cuál de los dos te queda mejor?",
          prospect2: "Me sirve perfecto el de las 4:30 PM.",
          tool2: "⚙️ Registrando en CRM y reservando cita...",
          tool2Success: "✓ Cita agendada (Ref. $140.000) & Notificaciones enviadas",
          agent3: "¡Perfecto, estás agendado! 🚀 Cita confirmada para este Jueves a las 4:30 PM con la Dra. Silva. Acabo de enviarte la confirmación por correo y WhatsApp con todas las indicaciones. ¡Nos vemos!"
        },
        {
          tabName: "Legal",
          hudActive: "Legal IA",
          hudLead: "Cliente Potencial",
          hudStatus: "Consulta Programada",
          hudValue: "$200.000",
          prospect: "Hola, necesito ayuda para crear una nueva empresa y entender los requisitos legales. ¿Podemos programar una consulta esta semana?",
          agent1: "¡Claro! Puedo guiarte en el proceso de constitución de la empresa. Déjame verificar la disponibilidad de nuestros abogados para una reunión.",
          tool1: "⚙️ Verificando agenda de abogados...",
          tool1Success: "✓ Horarios disponibles encontrados para el jueves",
          agent2: "Tenemos una cita el jueves a las 10:00 con nuestro socio senior. ¿Te sirve?",
          prospect2: "Sí, el jueves a las 10 AM funciona.",
          tool2: "⚙️ Reservando consulta y enviando brief...",
          tool2Success: "✓ Consulta reservada y brief enviado",
          agent3: "Tu consulta está confirmada para el jueves a las 10 AM. He enviado los detalles de la reunión y un brief de preparación a tu correo. ¡Esperamos poder asistirte!"
        },
        {
          tabName: "Inmobiliaria",
          hudActive: "Broker AI",
          hudLead: "Lead Calificado",
          hudStatus: "Visita Agendada",
          hudValue: "Arriendo Confirmado",
          prospect: "Hola, vi el anuncio del departamento de 2 dormitorios en Ñuñoa. ¿Sigue disponible? Me gustaría visitarlo esta semana si es posible.",
          agent1: "¡Hola, qué bueno que te interesó! 😊 Sí, el departamento sigue disponible. Son 58 m², 2 dormitorios, 1 baño y estacionamiento incluido. Arriendo: $480.000/mes. Para coordinar una visita, ¿qué día de la semana te queda mejor — entre semana o el fin de semana?",
          tool1: "⚙️ Verificando disponibilidad de visitas...",
          tool1Success: "✓ Horarios de visita disponibles esta semana",
          agent2: "¡Genial! Tenemos disponible este Miércoles a las 11:00 AM o el Jueves a las 6:00 PM. ¿Cuál te acomoda mejor?",
          prospect2: "El Jueves a las 6:00 PM me viene perfecto.",
          tool2: "⚙️ Agendando visita y notificando al corredor...",
          tool2Success: "✓ Visita confirmada y corredor asignado",
          agent3: "¡Listo, te espera el departamento! 🏠 Visita confirmada para el Jueves a las 6:00 PM. Te envié la dirección exacta y los datos de tu corredor asignado por WhatsApp. ¡Nos vemos allá!"
        },
        {
          tabName: "Inducción Técnica",
          hudActive: "Procesos AI",
          hudLead: "Operario de Planta",
          hudStatus: "Stock & ERP Calbrado",
          hudValue: "Tool Calibrated",
          prospectLabel: "Operario (Equipo)",
          agentLabel: "Capacitador IA",
          prospect: "🎤 [Audio - 14s] Hola, la fresadora del torno CNC-800 empezó a vibrar raro al cortar acero templado y las rebabas son ásperas. ¿Esta pieza requiere cambio o puedo calibrar las RPM? Adjunto foto.",
          agent1: "¡Hola, Carlos! He analizado tu reporte acústico e imagen. El patrón de rebabas y la vibración a baja frecuencia indican un desgaste de flanco de tipo abrasivo de ~0.45mm en el filo primario de corte. ⚠️ **No es seguro continuar operando.** Consultando el manual técnico de la CNC-800...",
          tool1: "⚙️ Escaneando manuales técnicos e identificando pieza...",
          tool1Success: "✓ Manual Técnico CNC-800 (Sección 4.2: Fresa de Repuesto) consultado",
          agent2: "El manual indica reemplazar la fresa por la pieza de repuesto **FR-202** (disponible en Pasillo 4, Estante B). Además, calibra el panel del torno a **1,800 RPM** y un avance de **0.15 mm/rev**. ¿Quieres que registre el descuento del repuesto en el inventario de planta?",
          prospect2: "📸 [Imagen - Torno] Listo, fresa cambiada por la FR-202 y parámetros ajustados en el panel del CNC-800. Procede con el descuento.",
          tool2: "⚙️ Conectando a BrownsERP & descontando repuesto FR-202...",
          tool2Success: "✓ Repuesto FR-202 descontado de stock & Incidencias registradas",
          agent3: "¡Excelente! El inventario ha sido actualizado y la calibración quedó registrada bajo tu ID de operario. La máquina está lista y segura para continuar. ¡Buen trabajo y recuerda usar tus gafas protectoras! 🛡️"
        },
        {
          tabName: "Capacitación Ventas",
          hudActive: "Ventas Ops AI",
          hudLead: "Equipo Comercial",
          hudStatus: "Cotización Generada",
          hudValue: "Descuento VIP",
          prospectLabel: "Vendedora (Equipo)",
          agentLabel: "Capacitador IA",
          prospect: "🎤 [Audio - 10s] Hola, un cliente corporativo me está pidiendo un 15% de descuento por comprar 50 unidades de nuestro producto premium, pero el manual dice que el tope es 10%. ¿Puedo aprobarlo?",
          agent1: "¡Hola, Sofía! Entiendo tu consulta. Revisando el manual de políticas comerciales 2026 en tu Obsidian... ⚠️ El límite estándar es 10%. Sin embargo, la sección 3.4 especifica que para pedidos de 50+ unidades puedes escalar al gerente para un descuento especial. Permíteme consultar...",
          tool1: "⚙️ Consultando tabla de aprobaciones y contactando a supervisor...",
          tool1Success: "✓ Gerencia autorizó un código especial de 15% para compras mayoristas",
          agent2: "El supervisor aprobó el código especial de descuento comercial **DESC-CORP-15** para este cliente. ¿Deseas que te redacte la cotización formal con el 15% aplicado para enviársela de inmediato?",
          prospect2: "¡Buenísimo! Sí, redacta la cotización por favor para mandársela ya.",
          tool2: "⚙️ Conectando al BrownsFacturación & generando cotización PDF...",
          tool2Success: "✓ Cotización PDF generada con 15% de descuento mayorista",
          agent3: "¡Hecho! Cotización formal **#COT-8849** generada y enviada a tu correo corporativo. También te la dejé lista en tu WhatsApp. ¡Mucho éxito con ese cierre de venta corporativa! 🚀"
        },
        {
          tabName: "Soporte de Manuales",
          hudActive: "Support AI",
          hudLead: "Equipo de Soporte",
          hudStatus: "Consulta en Progreso",
          hudValue: "Manual Referenciado",
          prospectLabel: "Operario (Soporte)",
          agentLabel: "Capacitador IA",
          prospect: "🎤 [Audio - 12s] Tengo problemas para seguir el procedimiento de calibración del CNC‑800. El manual dice que debo ajustar la velocidad, pero no sé cuál es el valor correcto. ¿Podrías indicarme el paso exacto?",
          agent1: "¡Claro! Revisemos el manual de calibración del CNC‑800. El paso 3 indica que la velocidad debe estar en **1800 RPM** para material metálico. Confirmo que el software está configurado en esa velocidad.",
          tool1: "⚙️ Accediendo al repositorio de manuales...",
          tool1Success: "✓ Manual de calibración encontrado y valor de velocidad extraído",
          agent2: "He actualizado la configuración del CNC‑800 a 1800 RPM. ¿Necesitas que registre este ajuste en el ERP o que genere un ticket de cambio?",
          prospect2: "Por favor, genera el ticket de cambio para dejar registro.",
          tool2: "⚙️ Creando ticket de cambio en el ERP...",
          tool2Success: "✓ Ticket de cambio creado: ID #CNC‑800‑2026‑001",
          agent3: "Listo, el ticket está creado y el ajuste guardado. El operador puede continuar con la producción. Si surge otra duda, avísame."
        }
      ]
    },
    portfolio: {
      eyebrow: "Nuestro Trabajo",
      title: "Proyectos que hablan por sí solos",
      prevLabel: "Proyecto anterior",
      nextLabel: "Proyecto siguiente",
      dotLabel: "Ir al proyecto",
      cta: "¿Listo para que tus procesos trabajen solos?",
      ctaBtn: "Quiero mi agente",
      introEyebrow: "PORTAFOLIO EXCLUSIVO",
      introTitle: "Soluciones de Élite en Software e IA",
      introSub: "Una selección de nuestros trabajos más recientes. Diseñamos e implementamos ecosistemas digitales de alto rendimiento, automatizaciones a medida y plataformas web robustas construidas para escalar.",
    },
    about: {
      eyebrow: "Quién está detrás",
      greeting: "Hola, soy Cristian. Founder de Browns Studio.",
      role: "Founder de Browns Studio",
      available: "Disponible",
      verified: "Freelance verificado",
      bio: "Hola, soy Cristian. Especialista en IA certificado por Google. Escríbeme y hagamos realidad tu idea: en Browns Studio no solo construimos software, sino que diseñamos agentes autónomos de élite que aprenden tus procesos y los ejecutan por ti para escalar tu negocio en piloto automático.",
      certTitle: "Certificado por Google en IA",
      certSub: "Inteligencia Artificial con Gemini · Google Cloud",
      certs: "certs.",
      certNote: "Cada certificación = una herramienta real aplicada a tu negocio.",
      ctaBtn: "Conversemos sobre tu proyecto",
      certNames: [
        "AI Fundamentals", "AI for App Building", "AI for Data Analysis",
        "AI for Content", "AI for Writing", "AI for Research", "AI for Brainstorming",
      ],
      certDescs: [
        "Base sólida en IA", "Apps con IA integrada", "Datos que toman decisiones",
        "Contenido automatizado", "Textos potenciados con IA", "Investigación asistida", "Ideas y estrategia con IA",
      ],
    },
    pricing: {
      eyebrow: "Servicios de Agentes IA",
      title: "Elige el agente para tu negocio",
      sub: "Agentes construidos a medida que se conectan a tus sistemas reales, trabajan 24/7 y liberan a tu equipo para lo que solo los humanos pueden hacer.",
      tabWeb: "Agentes IA & Automatización",
      tabAI: "Agentes IA",
      tabTraining: "Mentoría & Talleres",
      popular: "Más Recomendado",
      ctaBtn: "Cotizar Proyecto",
      combo: "¿No sabes qué servicio necesitas? Agenda una auditoría de procesos gratis de 45 min — sin compromiso.",
      moreDetails: "Ver detalles e implementación ➔",
      modalTitle: "Detalles del Servicio e Implementación",
      deliverables: "Qué Incluye (Entregables)",
      timeline: "Paso a Paso de la Implementación",
      close: "Cerrar",
      plans: [
        {
          name: "WhatsApp Lead Triage & Sales Closer",
          desc: "Calificación y perfilado autónomo de prospectos en WhatsApp 24/7 con traspaso silencioso.",
          price: "800.000 CLP",
          priceSuffix: " setup + 125.000 CLP/mes (Pago Anual) o 250.000 CLP/mes (Pago Mensual)",
          features: [
            "Calificación conversacional de leads",
            "Sincronización a Google Sheets",
            "Derivación silenciosa a humanos (handoff)"
          ],
          longFeatures: [
            "Calificación conversacional de leads en WhatsApp 24/7 sin botones rígidos",
            "Sincronización de contactos calificados a Google Sheets en tiempo real",
            "Agendamiento automático mediante integración nativa con Calendly",
            "Derivación silenciosa a humanos (handoff) con historial de chat en Firestore",
            "Procesamiento y transcripción de notas de voz en tiempo real con Gemini",
            "Panel de administración web (/admin) para auditar chats y leads",
            "Filtros de seguridad programáticos (Anti-Abuso y Anti-Flood integrados)"
          ],
          howWeDoIt: [
            { step: "Día 1-2: Scoping Conversacional", desc: "Definimos las 5 preguntas de perfilado y el tono de voz de tu bot." },
            { step: "Día 3-4: Bóveda en Obsidian", desc: "Estructuramos las notas de conocimiento de tus servicios y preguntas frecuentes." },
            { step: "Día 5-7: Integraciones & Webhooks", desc: "Conectamos las APIs de Meta, Calendly y Google Sheets en Kapso." },
            { step: "Día 8-10: Testing & Despliegue", desc: "Realizamos 30 conversaciones de prueba reales y liberamos el bot a producción." }
          ]
        },
        {
          name: "Internal Process & Knowledge Copilot",
          desc: "Automatización de soporte interno e inducción (onboarding) de personal con RAG multimedia.",
          price: "1.200.000 - 2.500.000 CLP",
          priceSuffix: " setup + 145.000 CLP/mes de soporte y hosting",
          features: [
            "Base de conocimientos Obsidian",
            "RAG vectorial local (0ms costo cero)",
            "Procesamiento de audio, imágenes y texto"
          ],
          longFeatures: [
            "Base de conocimientos estructurada estilo Obsidian (markdown/wiki)",
            "RAG vectorial en memoria (0ms latencia) sin bases de datos de pago",
            "Procesamiento de consultas multiformato: texto, notas de voz e imágenes",
            "Alertas en tiempo real y escalación a supervisores ante fallos de IA",
            "Reducción del 75% en tiempos de soporte y capacitación interna",
            "Despliegue nativo en WhatsApp, Slack o Microsoft Teams",
            "Actualización automática y pre-compilación de embeddings en fase de build"
          ],
          howWeDoIt: [
            { step: "Día 1-3: Auditoría de Información", desc: "Escaneamos tus manuales de inducción, reglamentos y wikis de la empresa." },
            { step: "Día 4-6: Estructuración RAG", desc: "Estructuramos la bóveda Obsidian y configuramos el caché incremental text-embedding-004." },
            { step: "Día 7-8: Despliegue en Canales", desc: "Conectamos el bot a tus canales internos de Slack, Teams o WhatsApp corporativo." },
            { step: "Día 9-10: Calibración & Lanzamiento", desc: "Validamos las respuestas del bot contra alucinaciones con tests de estrés." }
          ]
        },
        {
          name: "Custom Agential Systems & Workflows",
          desc: "Agentes autónomos hiper-conectados que ejecutan acciones reales en tus sistemas internos.",
          price: "900.000 - 1.800.000 CLP",
          priceSuffix: " setup + 125.000 CLP/mes de soporte y hosting",
          features: [
            "Agente programado a medida en código",
            "Integración bidireccional de CRMs",
            "Automatización de tareas en segundo plano"
          ],
          longFeatures: [
            "Agente programado a medida en código limpio (Node.js/TypeScript)",
            "Integración bidireccional en tiempo real con CRMs (HubSpot, Salesforce, Pipedrive)",
            "Sincronización transaccional con pasarelas de pago y ERPs corporativos",
            "Automatización de tareas complejas en segundo plano mediante workflows de Kapso",
            "Lógica de ruteo avanzada e interacción con bases de datos propietarias",
            "Llavero de credenciales API encriptado de nivel bancario",
            "Soporte de ingeniería y mantenimiento prioritario ante actualizaciones de API"
          ],
          howWeDoIt: [
            { step: "Día 1-3: Arquitectura & API Scoping", desc: "Analizamos las APIs de tu CRM/ERP y diseñamos el mapa lógico de interacciones." },
            { step: "Día 4-8: Desarrollo de Funciones", desc: "Escribimos el código de automatización e integraciones en caliente en Kapso." },
            { step: "Día 9-11: Testing de Integraciones", desc: "Simulamos sincronizaciones transaccionales y de bases de datos de extremo a extremo." },
            { step: "Día 12: Despliegue & Producción", desc: "Liberamos el sistema conectado a tus operaciones reales." }
          ],
          popular: true
        },
        {
          name: "Sistema Agéntico Empresarial",
          desc: "Arquitectura multi-agente para operaciones complejas de gran escala y múltiples capas.",
          price: "A Cotizar",
          priceSuffix: " + 350.000+ CLP/mes de soporte e ingeniería",
          features: [
            "Orquestación multi-agente avanzada",
            "Procesamiento inteligente de documentos",
            "SLA de ingeniería garantizado"
          ],
          longFeatures: [
            "Sistema de orquestación y ruteo entre múltiples agentes especializados",
            "Procesamiento inteligente y extracción de datos de documentos corporativos (PDFs, Excel)",
            "Integraciones ilimitadas con sistemas heredados (Legacy Systems) y CRMs propios",
            "Panel de administración corporativo personalizado multi-rol",
            "Monitoreo proactivo ante caídas de red y redundancia de servidores en Vercel",
            "SLA (Acuerdo de Nivel de Servicio) de ingeniería y soporte prioritario 24/7",
            "Seguridad de datos de nivel bancario con cumplimiento estricto de privacidad"
          ],
          howWeDoIt: [
            { step: "Fase 1: Consultoría & Blueprint", desc: "Mapeamos la operación completa de la compañía y diseñamos el blueprint de agentes." },
            { step: "Fase 2: Desarrollo & Sandbox", desc: "Construimos el ecosistema multi-agente en un sandbox de pruebas seguro." },
            { step: "Fase 3: Integración de Sistemas", desc: "Conectamos los agentes a la base de datos central y sistemas corporativos." },
            { step: "Fase 4: Despliegue & Escalado", desc: "Liberamos gradualmente el sistema y entrenamos a tu equipo directivo." }
          ]
        }
      ],
      aiPlans: [],
      trainingPlans: [
        {
          name: "Vibecoding 1-1 Intensivo",
          desc: "Mentoría personalizada para dominar la ingeniería agéntica",
          price: "A cotizar",
          features: [
            "4 asesorías 1-1 privadas (1.5h c/u)",
            "Implementación directa en tus proyectos reales",
            "Plantillas de ingeniería de prompts de nivel experto",
            "Grabación + código fuente de las sesiones",
          ],
          popular: true,
        },
        {
          name: "Mastery en Swarms Agénticos",
          desc: "Inmersión profunda en sistemas multi-agentes autónomos",
          price: "A cotizar",
          features: [
            "8 sesiones privadas en 4 semanas",
            "Construcción de pipelines agénticos a medida",
            "Auditoría y optimización de arquitectura privada",
            "Soporte de ingeniería prioritario por 60 días",
          ],
        },
        {
          name: "Estrategia IA Ejecutiva",
          desc: "Hoja de ruta de alto nivel para tu negocio",
          price: "A cotizar",
          features: [
            "90 min de inmersión privada",
            "Auditoría de transformación y diseño de flujos",
            "Hoja de ruta paso a paso de integración agéntica",
            "Acceso directo al fundador por WhatsApp",
          ],
        },
        {
          name: "Workshops para Equipos",
          desc: "Capacitación IA a medida para todo tu equipo",
          price: "A cotizar",
          features: [
            "Hoja de ruta para flujos del equipo",
            "Sesiones en vivo (presencial o remoto)",
            "Soporte en implementación de proyectos grupales",
            "Stack agéntico avanzado para empresas",
          ],
        },
      ],
      trainingNote: {
        title: "Capacitación para Equipos",
        desc: "¿Buscas un plan a medida para todo tu equipo? Diseñamos programas personalizados para empresas y startups.",
        btn: "Consulta la capacitación de tu equipo"
      }
    },
    process: {
      eyebrow: "Cómo Trabajamos",
      title: "De la auditoría al agente en vivo en 4 pasos",
      steps: [
        { num: "01", title: "Auditoría de Procesos", desc: "Mapeamos cada interacción con clientes que puede delegarse a un agente.", details: "En 45 min identificamos tus 30 conversaciones más repetidas, los puntos de decisión y los cuellos de botella. Sin compromiso. Esta auditoría es el plano exacto que el agente necesita para actuar como una extensión real de tu equipo." },
        { num: "02", title: "Arquitectura del Agente", desc: "Diseñamos las herramientas, la memoria y las integraciones antes de escribir una línea de código.", details: "Definimos el bucle agéntico (razona → actúa → observa), el set de tools (Calendar, CRM, Shopify...), la knowledge base con RAG y los approval gates para acciones críticas. Tú validas cada flujo antes de que empiece el desarrollo." },
        { num: "03", title: "Entrenamiento y Pruebas", desc: "Entrenamos al agente con tu lógica exacta y hacemos 30+ conversaciones de prueba reales.", details: "La knowledge base se construye con tu tono, precios, políticas y casos especiales. Ejecutamos simulaciones de conversación reales antes del lanzamiento. Nada sale en vivo hasta que estés 100% conforme con las respuestas." },
        { num: "04", title: "En Vivo y Mejorando", desc: "El agente opera 24/7. Nosotros monitoreamos, optimizamos y lo mantenemos actualizado cada mes.", details: "Despliegue con observabilidad completa (cada paso de razonamiento registrado). Actualizaciones mensuales de la knowledge base, reportes de rendimiento y optimización proactiva. Tú mantienes control total vía approval gates para acciones críticas." },
      ],
      learnMore: "Saber más",
      understood: "Entendido",
      step: "Paso",
    },
    faq: {
      eyebrow: "Preguntas Frecuentes",
      title: "Tus dudas, resueltas",
      cta: "¿Tienes una pregunta que no está aquí? Escríbenos por WhatsApp.",
      items: [
        {
          q: "¿Qué es el Business AI Setup y cómo funciona?",
          a: "Es nuestro servicio de entrada. Analizamos tus conversaciones de WhatsApp, construimos un knowledge base completo con la información de tu negocio y configuramos el agente nativo de WhatsApp para que responda como tu mejor empleado — 24/7. Todo en 7 días, sin que cambies nada de lo que ya usas.",
        },
        {
          q: "¿Necesito tener WhatsApp Business API o una cuenta especial?",
          a: "Para el Business AI Setup, no. Solo necesitas la app de WhatsApp Business que cualquier negocio puede descargar gratis. Para el Agente a Medida, accedemos a la WhatsApp Cloud API — nosotros gestionamos toda la configuración técnica, tú solo pones el número de teléfono.",
        },
        {
          q: "¿Cómo sé que el agente va a responder correctamente?",
          a: "Antes del lanzamiento hacemos 30+ conversaciones de prueba reales. Si el agente comete un error, ajustamos el knowledge base hasta que responda perfectamente. No lanzamos nada sin que estés 100% conforme con las respuestas.",
        },
        {
          q: "¿El agente puede conectarse a mis sistemas actuales (Google Calendar, Shopify, CRM)?",
          a: "Sí — esa es la diferencia entre el Business AI Setup y el Agente a Medida. El agente programado se conecta a tus herramientas reales: puede crear citas en tu calendario, verificar stock, registrar leads en tu CRM y más. Todo en tiempo real, sin intervención humana.",
        },
        {
          q: "¿Aceptan pagos en cuotas?",
          a: "Sí. Trabajamos con 50% al inicio y 50% al entregar. Para proyectos mayores podemos acordar 3 cuotas. Aceptamos transferencia bancaria, PayPal y crypto (USDT/USDC).",
        },
        {
          q: "¿Qué pasa cuando cambia información de mi negocio (precios, servicios, horarios)?",
          a: "Para eso está el retainer mensual. Actualizar el conocimiento del agente es parte del mantenimiento. Sin actualizaciones periódicas, el agente empieza a dar información desactualizada. Nuestro plan mensual garantiza que siempre esté al día y mejorando.",
        },
      ],
    },
    aiShowcase: {
      eyebrow: "Agentes · Automatización · Capacitación",
      title: "Lo que un agente puede hacer por tu negocio",
      sub: "No son bots genéricos. Son agentes entrenados con tu lógica, conectados a tus sistemas y diseñados para operar sin supervisión.",
      videoLabel: "Ver: Agentes IA en acción",
      videoCta: "Ver planes y precios",
      categories: [
        {
          icon: "🤖",
          title: "Tu negocio atiende solo",
          desc: "El agente responde, agenda y califica leads en WhatsApp — las 24 horas, los 7 días. Construido con tu tono, tus precios y tus procesos.",
          tag: "Agente WhatsApp",
        },
        {
          icon: "🔗",
          title: "Conectado a tus sistemas reales",
          desc: "El agente consulta tu calendario, verifica stock y registra leads en tu CRM — en tiempo real, sin intervención humana.",
          tag: "Integración API",
        },
        {
          icon: "🧠",
          title: "La IA interna de tu empresa",
          desc: "Un asistente entrenado con toda la información de tu negocio. Tu equipo tiene respuestas al instante, sin buscar en documentos.",
          tag: "Knowledge base",
        },
        {
          icon: "🎓",
          title: "Tu equipo domina la IA",
          desc: "Talleres donde tu equipo aprende a trabajar con IA — adaptados a tu industria y a las herramientas que ya usan.",
          tag: "Taller en vivo",
        },
      ],
      ctaTitle: "Tu negocio podría estar operando en piloto esta semana.",
      ctaSub: "Agenda una auditoría gratuita y descubre qué procesos puedes delegar a un agente.",
      ctaBtn: "Ver planes y precios →",
      trainingConsult: {
        title: "¿Buscas capacitación IA para tu equipo?",
        desc: "Diseñamos talleres adaptados a los flujos de trabajo y herramientas reales de tu empresa.",
        btn: "Solicitar consulta"
      }
    },
    cta: {
      spots: "SOLO 3 PROYECTOS POR MES",
      title: "El proceso es tuyo. El agente trabaja por ti.",
      sub: "Analizamos cómo funciona tu negocio, construimos el agente que ejecuta tus procesos clave y lo lanzamos para que opere 24/7 — mientras tú te enfocas en crecer.",
      note: "Primera auditoría de procesos sin costo. Sin compromiso.",
      whatsapp: "Escribir por WhatsApp",
      email: "Enviar un correo",
      emailSubject: "Quiero una auditoría de procesos para mi negocio",
      emailBody: "Hola, me interesa agendar una auditoría gratuita de procesos para ver qué puedo automatizar con IA.",
      check1: "✓ Auditoría de procesos incluida",
      check2: "✓ Respuesta en < 24h",
      check3: "✓ Sin compromiso",
      contactOptions: [
        { label: "Business AI Setup", msg: "¡Hola! Me interesa el Business AI Setup para activar el agente de WhatsApp en mi negocio." },
        { label: "Agente WhatsApp a Medida", msg: "¡Hola! Me gustaría un agente WhatsApp programado que se conecte a mis sistemas." },
        { label: "Capacitación & Talleres", msg: "¡Hola! Me interesa capacitación en IA para mi equipo." },
        { label: "Otras Consultas", msg: "¡Hola! Tengo una consulta sobre sus servicios de IA." },
      ],
    },
    crypto: {
      eyebrow: "Pagos Rápidos",
      title: "Aceptamos Criptomonedas",
      sub: "Pagos sin fronteras y entrega inmediata. Priorizamos la agilidad en cada paso.",
      features: [
        { title: "USDT / USDC", desc: "Base, Polygon & Ethereum" },
        { title: "Bitcoin / ETH", desc: "Pagos directos on-chain" },
        { title: "Zero Fees", desc: "Sin comisiones bancarias" },
        { title: "Global", desc: "Desde cualquier lugar" }
      ]
    },
    footer: {
      nav: "Navegación",
      services: "Servicios & Precios",
      portfolio: "Portfolio",
      process: "Proceso",
      faq: "FAQ",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      made: "Construido para negocios que delegan, escalan y lideran con IA.",
    },
    seo: {
      title: "Browns Studio | Agentes IA para Negocios en LATAM",
      description: "Browns Studio construye agentes de IA a medida que atienden clientes, agendan citas y califican leads por WhatsApp — 24/7. Análisis de procesos, integración con tus sistemas y lanzamiento en 7 días.",
      keywords: ["agente IA WhatsApp", "automatización WhatsApp para negocios", "agente inteligente para clínicas", "agente IA para inmobiliarias", "WhatsApp Business AI LATAM", "agente de ventas WhatsApp", "agente de agendamiento IA", "implementar IA en mi negocio", "Browns Studio agentes IA", "calificación de leads con IA", "chatbot personalizado WhatsApp", "Business AI Setup"],
    },
    useCases: {
      eyebrow: "Agent as a Service",
      title: "Diseñado para actuar. Construido para escalar.",
      sub: "Nuestros agentes potencian tu operación — atienden clientes 24/7, actúan en tus sistemas reales, capacitan a tu equipo y liberan tiempo valioso.",
      sectionTitleLeft: "Procesos de Negocio",
      sectionSubLeft: "Qué procesos delegamos y automatizamos",
      sectionTitleRight: "Garantías de Ingeniería",
      sectionSubRight: "Cómo funciona la tecnología bajo el capó",
      items: [
        {
          title: "Agente de Ventas",
          desc: "Califica leads, responde consultas, cotiza y agenda llamadas por WhatsApp — 24/7, sin intervención humana.",
          tag: "WhatsApp · CRM · Leads",
          result: "Leads calificados sin esfuerzo",
        },
        {
          title: "Agente de Operaciones",
          desc: "Gestiona tu CRM, genera reportes automáticos y coordina flujos internos sin que nadie tenga que recordarlo.",
          tag: "Make · n8n · Zapier",
          result: "Operación interna en piloto automático",
        },
        {
          title: "El Capacitador IA",
          desc: "Agente de WhatsApp para inducción y procesos. Resuelve dudas de tu equipo en texto, imagen y voz con tu wiki estilo Obsidian. Alerta a supervisores si se traba.",
          tag: "WhatsApp · Obsidian · Alertas de Escalación",
          result: "Procesos y entrenamiento en piloto automático",
        },
        {
          title: "Agente Multi-Canal",
          desc: "Opera en WhatsApp, email, web y tu sistema a la vez — un agente que nunca pierde contexto entre canales.",
          tag: "Omnicanal · API · Base de datos",
          result: "Presencia coherente multicanal",
        },
      ],
      pillars: [
        {
          title: "Razona antes de actuar",
          desc: "El agente evalúa el contexto, consulta tu knowledge base y decide la mejor acción — no solo hace matching de palabras clave.",
        },
        {
          title: "Conectado a tus herramientas",
          desc: "Calendar, CRM, Shopify, Sheets. El agente actúa en tus sistemas reales en tiempo real, sin intermediarios.",
        },
        {
          title: "Humano en el bucle",
          desc: "Antes de cualquier acción crítica (cobro, cancelación, envío masivo) el agente pausa y espera tu aprobación.",
        },
        {
          title: "Recuerda a cada cliente",
          desc: "Memoria persistente vía RAG: el agente conoce el historial, preferencias y conversaciones previas de cada cliente.",
        },
      ],
      cta: "Cuéntanos tu proceso",
      bottomNote: "¿No sabes qué plan necesitas? ",
      bottomLink: "Agenda una auditoría gratuita de 45 min.",
    },
    processAuditor: {
      eyebrow: "AUDITORÍA OPERATIVA",
      title: "Audita tus procesos y calcula tu ROI",
      sub: "Selecciona tu industria, ajusta tus métricas mensuales y descubre el impacto real de automatizar tus operaciones con un Agente IA de BrownsOS.",
      industryLabel: "Selecciona tu Industria",
      leadsLabel: "Prospectos (Leads) Mensuales",
      valueLabel: "Valor Promedio por Cliente",
      delayLabel: "Tiempo de Respuesta Humana",
      delayOptions: {
        instant: "Inmediato (< 1 min) - Excelente retención",
        moderate: "Moderado (15 min - 1 hr) - 15% de fuga",
        slow: "Lento (1 - 4 hrs) - 35% de fuga",
        nextDay: "Día Siguiente (> 12 hrs) - 60% de fuga"
      },
      industries: {
        dental: "Clínicas Dentales",
        aesthetic: "Clínicas Estéticas",
        legal: "Estudios Jurídicos",
        realEstate: "Inmobiliarias",
        ecommerce: "E-Commerce / Retail",
        b2b: "Consultorías / B2B"
      },
      workflowTitle: "Flujo Agéntico Propuesto",
      workflowSteps: {
        dental: [
          "Atención Instantánea: El Agente IA responde al prospecto en menos de 45 segundos.",
          "Calificación RAG: Filtra el tipo de tratamiento dental de interés e identifica el nivel de urgencia.",
          "Agendamiento Directo: Consulta horarios libres e integra la cita en el CRM y agenda de la clínica.",
          "Nurturing & Prep: Envía por WhatsApp instrucciones de preparación y recordatorios de ayuno/radiografía."
        ],
        aesthetic: [
          "Atención Instantánea: Responde consultas de tratamientos de rejuvenecimiento facial y bótox.",
          "Triage Estético: Filtra preferencias de doctor y presupuesto inicial.",
          "Reserva VIP: Agenda evaluación directamente y bloquea el box clínico en tiempo real.",
          "Pre-atención: Envía consejos de cuidado previo y consentimiento informado por correo/WhatsApp."
        ],
        legal: [
          "Filtro de Caso: El Agente de Admisión evalúa la materia jurídica (civil, comercial, penal) y cuantía.",
          "Clasificación Premium: Identifica casos de alta prioridad y requiere datos clave del cliente.",
          "Agendamiento Senior: Reserva espacio en la agenda de un Socio Senior y crea sala Zoom.",
          "Seguridad NDA: Despacha acuerdo preliminar de confidencialidad de manera automática."
        ],
        realEstate: [
          "Captura de Lead: Responde inmediatamente consultas por propiedades de portales inmobiliarios.",
          "Pre-Calificación: Valida requisitos mínimos (ingresos, aval, DICOM) en lenguaje amable.",
          "Coordinación de Visita: Agenda recorrido con el corredor asignado de forma autónoma.",
          "Envío de Carpeta: Solicita y organiza documentación inicial del cliente antes de la cita."
        ],
        ecommerce: [
          "Asistente de Compra: Guía al cliente en la selección de productos según tallas, colores o stock.",
          "Recuperación de Carrito: Escribe de forma proactiva a carritos abandonados con incentivos suaves.",
          "Soporte Post-Venta: Resuelve estados de envío, reembolsos y preguntas frecuentes de despacho.",
          "Fidelización IA: Ofrece cupones y productos cruzados basados en historial de compra."
        ],
        b2b: [
          "Calificación Ejecutiva: Filtra empresas por tamaño, industria, presupuesto y dolor operativo.",
          "Diagnóstico Express: Solicita información sobre herramientas actuales (CRM, ERP, bases de datos).",
          "Reunión de Consultoría: Reserva fecha de auditoría estratégica e inyecta al CRM corporativo.",
          "Seguimiento Comercial: Envía presentación ejecutiva de BrownsOS posterior a la simulación."
        ]
      },
      resultsTitle: "Auditoría de Impacto Financiero y Apalancamiento Agéntico",
      lostRevenue: "Ingreso Perdido por Demoras",
      lostRevenueNote: "Fuga anual proyectada debido a la lentitud en calificar y responder.",
      recoveredRevenue: "Ingreso Recuperado Mensual",
      recoveredRevenueNote: "Ingresos adicionales asegurados por la velocidad de respuesta 24/7 del Agente IA.",
      hoursSaved: "Horas de Trabajo Liberadas",
      hoursSavedNote: "Tiempo de atención al cliente delegado por completo al Agente de BrownsOS.",
      roiTitle: "Retorno de Inversión (ROI)",
      roiNote: "Multiplicador estimado de retribución financiera contra el costo de implementación.",
      efficiencyLabel: "Eficiencia Operativa",
      ctaBtn: "Obtener Plan de Ejecución y Capacitación",
      whatsappTemplate: "Hola Cristian, acabo de realizar la auditoría de procesos para mi {industry}. Mis métricas estimadas son {leads} prospectos/mes con un ticket promedio de {value}. Mi tiempo de respuesta actual es {delay} y el auditor estima que puedo recuperar {recovered}/mes. ¡Quiero estructurar el blueprint de mi agente!"
    }
  },

  pt: {
    nav: {
      services: "Serviços",
      portfolio: "Portfólio",
      process: "Processo",
      pricing: "Preços",
      faq: "FAQ",
      formacion: "Formação",
      solutions: "Soluções",
      solutionsList: {
        dentistas: "Clínicas Odontológicas",
        salud: "Centros de Saúde",
        estetica: "Estéticas & Spas",
        abogados: "Advogados e Firmas",
        "clases-privadas": "Academias e Aulas",
        propiedades: "Imobiliárias"
      },
      auditor: "Auditor de Processos",
      cta: "Orçar Projeto",
    },
    hero: {
      badge: "IA CONVERSACIONAL E ALAVANCAGEM",
      line1: "Automatize suas Vendas,",
      line2: "Capacite sua Equipe.",
      line3: "",
      sub: "Agentes de IA avançados que impulsionam seu negócio: automatizamos a aquisição de clientes e digitalizamos seus manuais para treinar sua equipe 24/7 no WhatsApp.",
      cta1: "Começar Agora →",
      cta2: "Ver Soluções",
      stat1: "Clientes",
      stat2: "Certs. Google IA",
      stat3: "Satisfação",
      trustedBy: "Projetos realizados",
      chatSims: [
        {
          tabName: "Dental",
          hudActive: "Odonto AI",
          hudLead: "Paciente Qualificado",
          hudStatus: "Consulta Reservada",
          hudValue: "$140.000",
          prospect: "Olá! Tenho interesse no tratamento de alinhadores invisíveis. Qual é o valor aproximado e se vocês têm horários livres nas quintas-feiras à tarde? É o meu único período disponível.",
          agent1: "Olá, que ótimo que entrou em contato! 😊 A consulta diagnóstica e estudo 3D inicia a partir de $140.000 (sujeito à avaliação). Entendido que as quintas-feiras à tarde são o melhor horário para você — deixe-me ver o que temos disponível nesse dia...",
          tool1: "⚙️ Consultando agenda da clínica...",
          tool1Success: "✓ Horários livres encontrados para Quinta-feira",
          agent2: "Temos a Dra. Silva disponible nesta Quinta-feira às 16h30 ou às 18h00. Qual desses horários funciona melhor para você?",
          prospect2: "O das 16h30 funciona perfeito para mim.",
          tool2: "⚙️ Registrando no CRM e reservando consulta...",
          tool2Success: "✓ Consulta agendada (Ref. $140.000) & Notificações enviadas",
          agent3: "Perfeito, você está agendado! 🚀 Consulta confirmada para esta Quinta-feira às 16h30 com a Dra. Silva. Enviei a confirmação por e-mail e WhatsApp com todas as orientações. Até breve!"
        },
        {
          tabName: "Estética",
          hudActive: "Dermo AI",
          hudLead: "Cliente VIP",
          hudStatus: "Avaliação Agendada",
          hudValue: "$120.000",
          prospect: "Olá, gostaria de saber sobre o tratamento de rejuvenescimento facial com botox e preenchimento. Quanto custa e vocês têm horários esta semana?",
          agent1: "Olá! Botox e preenchimento são uma ótima combinação para um resultado natural 😊 A sessão de avaliação estética inicia a partir de $120.000 (sujeito à avaliação). Você tem preferência por manhã ou tarde esta semana? Deixe-me consultar a agenda do Dr. Rossi...",
          tool1: "⚙️ Verificando agenda dermatológica...",
          tool1Success: "✓ Vagas VIP disponíveis no calendário",
          agent2: "O Dr. Rossi tem horários disponíveis nesta Sexta-feira às 11h00 ou às 15h30. Qual prefere?",
          prospect2: "O das 15h30 é perfeito para mim.",
          tool2: "⚙️ Bloqueando vaga VIP e enviando orientações...",
          tool2Success: "✓ Avaliação agendada (Ref. $120.000) & SMS enviado",
          agent3: "Confirmado! ✨ Sua avaliação estética está reservada para esta Sexta-feira às 15h30 com o Dr. Rossi. Enviei o protocolo de recomendações pré-atendimento por WhatsApp. Te esperamos!"
        },
        {
          tabName: "Legal",
          hudActive: "Legal AI",
          hudLead: "Caso Qualificado",
          hudStatus: "Consulta Agendada",
          hudValue: "Prioridade Alta",
          prospect: "Olá, preciso de assessoria jurídica urgente para elaborar um contrato de compra e venda de imóvel de alto valor. Quanto custa a consulta estratégica e tem advogado disponível?",
          agent1: "Olá, compreendo perfeitamente a urgência e estamos prontos para ajudar 🤝 Para este tipo de operação, realizamos uma triagem rápida para alocar o especialista ideal. Você prefere uma reunião pela manhã ou à tarde? Deixe-me verificar a disponibilidade do Dr. Mendoza...",
          tool1: "⚙️ Triando caso por matéria e valor...",
          tool1Success: "✓ Caso qualificado para Sócio Sênior",
          agent2: "O Dr. Mendoza tem um espaço disponível nesta Segunda às 9h00 ou às 11h30. Qual desses horários se encaixa melhor na sua agenda?",
          prospect2: "Segunda-feira às 11h30 é perfeito.",
          tool2: "⚙️ Criando sala Zoom privada e registrando caso...",
          tool2Success: "✓ Reunião premium agendada (Caso Designado)",
          agent3: "Tudo confirmado! ⚖️ Sua sessão estratégica com o Dr. Mendoza está marcada para Segunda-feira às 11h30. Enviei o pré-contrato de confidencialidade e o link de acesso para seu e-mail. Até logo!"
        },
        {
          tabName: "Academia",
          hudActive: "Tutor AI",
          hudLead: "Aluno Qualificado",
          hudStatus: "Aula Agendada",
          hudValue: "$95.000",
          prospect: "Olá, procuro aulas de preparação intensiva para o exame de admissão de cálculo avançado. Qual é o valor do ciclo e vocês têm tutores disponíveis?",
          agent1: "Olá! Que ótimo que você está se preparando para esse exame 💪 O ciclo de diagnóstico e plano de estudo inicia a partir de $95.000 (sujeito à avaliação). Você prefere aulas durante a semana ou nos fins de semana? Deixe-me encontrar o tutor certo para você...",
          tool1: "⚙️ Buscando tutores experientes em Cálculo...",
          tool1Success: "✓ 2 tutores sêniores com horários livres",
          agent2: "Temos um tutor sênior disponível nesta Quarta às 17h00 ou no Sábado às 10h00. Qual fica melhor para você?",
          prospect2: "Quarta às 17h00 seria excelente.",
          tool2: "⚙️ Alocando tutor sênior e registrando matrícula...",
          tool2Success: "✓ Curso intensivo agendado ($95.000)",
          agent3: "Ótima escolha! Sua aula inicial está confirmada para esta Quarta às 17h00. O material introdutório em PDF e o link da sala já estão no seu WhatsApp! 📚"
        },
        {
          tabName: "Saúde",
          hudActive: "Saúde AI",
          hudLead: "Paciente VIP",
          hudStatus: "Checkup Confirmado",
          hudValue: "$115.000",
          prospect: "Olá, gostaria de cotar e agendar o programa de checkup médico executivo integral de um dia. Qual é o valor e quando há vagas?",
          agent1: "Olá! Que ótima decisão cuidar da saúde de forma preventiva 🙌 Nosso programa de checkup executivo custa a partir de $115.000 (sujeito à avaliação). Você tem alguma preferência de dia ou qualquer dia desta semana funciona? Deixe-me consultar a agenda clínica...",
          tool1: "⚙️ Consultando exames e especialistas...",
          tool1Success: "✓ Vagas com preparo de jejum disponíveis",
          agent2: "Temos vagas disponíveis para esta Terça ou na próxima Quinta às 7h30 (requer jejum prévio). Qual dia prefere?",
          prospect2: "Esta Terça às 7h30 é perfeito.",
          tool2: "⚙️ Reservando suíte médica e alocando equipe...",
          tool2Success: "✓ Checkup executivo agendado ($115.000)",
          agent3: "Tudo certo! 🏥 Seu checkup executivo está confirmado para esta Terça às 7h30. Enviei o protocolo de jejum e preparo por e-mail. Cuide-se e até breve!"
        },
        {
          tabName: "Imóveis",
          hudActive: "Broker AI",
          hudLead: "Lead Qualificado",
          hudStatus: "Visita Agendada",
          hudValue: "Aluguel Confirmado",
          prospect: "Olá, vi o anúncio do apartamento de 2 quartos no Brooklin. Ainda está disponível? Gostaria de visitar esta semana se possível.",
          agent1: "Olá, que ótimo que se interessou! 😊 Sim, o apartamento ainda está disponível. 58 m², 2 quartos, 1 banheiro e vaga de garagem incluída. Aluguel: R$ 2.800/mês. Para organizar a visita, qual dia da semana fica melhor para você — durante a semana ou no fim de semana?",
          tool1: "⚙️ Verificando disponibilidade de visitas...",
          tool1Success: "✓ Horários de visita disponíveis nesta semana",
          agent2: "Perfeito! Temos disponível nesta Quarta às 11h00 ou na Quinta às 18h00. Qual fica melhor para você?",
          prospect2: "Quinta às 18h00 é perfeito.",
          tool2: "⚙️ Agendando visita e notificando o corretor...",
          tool2Success: "✓ Visita confirmada e corretor designado",
          agent3: "Feito! 🏠 Sua visita está confirmada para Quinta às 18h00. Enviei o endereço exato e os dados do seu corretor por WhatsApp. Mal podemos esperar para você conhecer o apartamento!"
        },
        {
          tabName: "Integração Técnica",
          hudActive: "Processos AI",
          hudLead: "Operador de Planta",
          hudStatus: "Estoque & ERP Calibrados",
          hudValue: "Tool Calibrated",
          prospectLabel: "Operador (Equipe)",
          agentLabel: "Treinamento IA",
          prospect: "🎤 [Áudio - 14s] Olá, a fresadora do torno CNC-800 começou a vibrar estranho ao cortar aço temperado e o acabamento ficou áspero. Preciso trocar a peça ou posso calibrar o RPM? Enviando foto.",
          agent1: "Olá, Carlos! Analisei seu áudio e a imagem enviada. A vibração de baixa frequência e o padrão de rebarbas indicam um desgaste de flanco abrasivo de ~0,45mm no gume principal. ⚠️ **Não é seguro continuar operando.** Consultando o manual técnico da CNC-800...",
          tool1: "⚙️ Escaneando manuais técnicos e identificando peça...",
          tool1Success: "✓ Manual Técnico CNC-800 (Seção 4.2: Fresa de Reposição) consultado",
          agent2: "O manual instrui a substituir a fresa pela peça de reposição **FR-202** (Corredor 4, Prateleira B). Além disso, configure o painel do torno para **1.800 RPM** e avanço de **0,15 mm/rev**. Quer que eu registre a baixa do item no ERP de estoque?",
          prospect2: "📸 [Foto - Torno] Feito, fresa substituída pela FR-202 e parâmetros calibrados no painel CNC-800. Pode registrar.",
          tool2: "⚙️ Conectando ao BrownsERP & registrando baixa da FR-202...",
          tool2Success: "✓ Peça FR-202 baixada do estoque & Incidência registrada",
          agent3: "Perfeito! O estoque foi atualizado e a calibração foi registrada sob o seu ID de operador. A máquina está segura e pronta para operar. Bom trabalho e lembre-se de usar seus óculos de proteção! 🛡️"
        },
        {
          tabName: "Treinamento Comercial",
          hudActive: "Vendas Ops AI",
          hudLead: "Time Comercial",
          hudStatus: "Orçamento Gerado",
          hudValue: "Desconto VIP",
          prospectLabel: "Vendedora (Equipe)",
          agentLabel: "Treinamento IA",
          prospect: "🎤 [Áudio - 10s] Olá, um cliente corporativo está me pedindo um desconto de 15% para comprar 50 unidades do nosso produto premium, mas o manual diz que o limite é 10%. Posso aprovar?",
          agent1: "Olá, Sofia! Entendo sua dúvida. Verificando o manual de políticas comerciais 2026 no seu Obsidian... ⚠️ O limite padrão é 10%. No entanto, a seção 3.4 especifica que para pedidos de mais de 50 unidades você pode escalar para o gerente para um desconto especial. Permita-me consultar...",
          tool1: "⚙️ Consultando tabela de aprovações e contatando supervisor...",
          tool1Success: "✓ Gerência autorizou um código especial de 15% para compras no atacado",
          agent2: "O supervisor aprovou o código de desconto comercial especial **DESC-CORP-15** para este cliente. Deseja que eu elabore o orçamento formal com os 15% aplicados para enviar imediatamente?",
          prospect2: "Excelente! Sim, por favor, elabore o orçamento para que eu possa enviá-lo agora.",
          tool2: "⚙️ Conectando ao BrownsFaturamento & gerando orçamento em PDF...",
          tool2Success: "✓ Orçamento em PDF gerado com 15% de desconto para atacado",
          agent3: "Pronto! Orçamento formal **#COT-8849** gerado e enviado para o seu e-mail corporativo. Também deixei pronto no seu WhatsApp. Muito sucesso com o fechamento dessa venda corporativa! 🚀"
        },
        {
          tabName: "Protocolo Clínico",
          hudActive: "Saúde Ops AI",
          hudLead: "Time Recepção",
          hudStatus: "Código Vermelho",
          hudValue: "Médico Alertado",
          prospectLabel: "Recepcionista (Equipe)",
          agentLabel: "Treinamento IA",
          prospect: "🎤 [Áudio - 12s] Olá, acabei de receber um paciente com dor torácica aguda, mas ele não tem consulta agendada e todos os horários estão cheios. Qual protocolo de emergência devo ativar de acordo com o manual?",
          agent1: "Olá, Matias! Alerta de segurança. ⚠️ **Dor torácica aguda é Código Vermelho.** De acordo com o protocolo de triagem médica da clínica, você deve encaminhar o paciente imediatamente para a sala de reanimação e alertar o cardiologista de plantão. Consultando o médico escalado hoje...",
          tool1: "⚙️ Consultando escala de plantão médico no ERP...",
          tool1Success: "✓ Cardiologista de plantão identificado: Dr. Silva (Piso 1, Box 4)",
          agent2: "O cardiologista de plantão é o **Dr. Silva**. Já enviei um alerta prioritário automático para o celular dele. Por favor, acompanhe o paciente até a **Sala de Reanimação 2** (Piso 1) imediatamente. Deseja que eu notifique o supervisor da recepção para lhe dar apoio físico?",
          prospect2: "Sim, por favor! Avise a supervisora Ana para que ela possa me ajudar a recebê-lo.",
          tool2: "⚙️ Enviando alerta urgente para Supervisora Ana...",
          tool2Success: "✓ Alerta urgente enviada para Supervisora Ana & Protocolo ativado",
          agent3: "Pronto! A supervisora Ana já está a caminho para apoiá-lo na recepção. O Dr. Silva já está alertado na sala. Você fez um excelente trabalho seguindo o protocolo de Código Vermelho. Mantenha a calma! 🛡️"
        }
      ]
    },
    portfolio: {
      eyebrow: "Nosso Trabalho",
      title: "Projetos que falam por si só",
      prevLabel: "Projeto anterior",
      nextLabel: "Próximo projeto",
      dotLabel: "Ir para o projeto",
      cta: "Pronto para que seus processos trabalhem sozinhos?",
      ctaBtn: "Quero meu agente",
      introEyebrow: "PORTFÓLIO EXCLUSIVO",
      introTitle: "Soluções de Elite em Software e IA",
      introSub: "Uma seleção com curadoria de nossos trabalhos mais recentes. Projetamos e implementamos ecossistemas digitais de alto desempenho, automações personalizadas e plataformas web robustas construídas para escalar.",
    },
    about: {
      eyebrow: "Quem está por trás",
      greeting: "Olá, sou Cristian. Founder da Browns Studio.",
      role: "Founder da Browns Studio",
      available: "Disponível",
      verified: "Freelancer verificado",
      bio: "Olá, sou Cristian. Especialista em IA certificado pelo Google. Escreva-me e vamos tornar sua ideia realidade: no Browns Studio não apenas construímos software, mas projetamos agentes autônomos de elite que aprendem seus processos e os executam por você para escalar seu negócio no piloto automático.",
      certTitle: "Certificado pelo Google em IA",
      certSub: "Inteligência Artificial com Gemini · Google Cloud",
      certs: "certs.",
      certNote: "Cada certificação = uma ferramenta real aplicada ao seu negócio.",
      ctaBtn: "Vamos conversar sobre seu projeto",
      certNames: [
        "AI Fundamentals", "AI for App Building", "AI for Data Analysis",
        "AI for Content", "AI for Writing", "AI for Research", "AI for Brainstorming",
      ],
      certDescs: [
        "Base sólida em IA", "Apps com IA integrada", "Dados que tomam decisões",
        "Conteúdo automatizado", "Textos potencializados por IA", "Pesquisa assistida", "Ideias e estratégia com IA",
      ],
    },
    pricing: {
      eyebrow: "Serviços de Agentes IA",
      title: "Escolha o agente para o seu negócio",
      sub: "Agentes construídos sob medida que se conectam aos seus sistemas reais, trabalham 24/7 e liberam sua equipe para o que só humanos podem fazer.",
      tabWeb: "Agentes IA & Automação",
      tabAI: "Agentes IA",
      tabTraining: "Mentoria & Workshops",
      popular: "Mais Recomendado",
      ctaBtn: "Orçar Projeto",
      combo: "Não sabe qual serviço precisa? Agende uma auditoria de processos grátis de 45 min — sem compromisso.",
      moreDetails: "Ver detalhes e cronograma ➔",
      modalTitle: "Detalhes do Serviço e Cronograma",
      deliverables: "O Que Inclui (Entregáveis)",
      timeline: "Cronograma de Implantação",
      close: "Fechar",
      plans: [
        {
          name: "WhatsApp Lead Triage & Sales Closer",
          desc: "Qualificação e perfilamento autônomo de prospectos no WhatsApp 24/7 com transição silenciosa para humanos.",
          price: "800.000 CLP",
          priceSuffix: " setup + 125.000 CLP/mês (Pago Anual) ou 250.000 CLP/mês (Pago Mensual)",
          features: [
            "Qualificação conversacional de leads",
            "Sincronização com Google Sheets",
            "Transição silenciosa para humanos (handoff)"
          ],
          longFeatures: [
            "Qualificação conversacional de leads no WhatsApp 24/7 sem botões rígidos",
            "Sincronização de contatos qualificados com Google Sheets em tempo real",
            "Agendamento automático via integração nativa com o Calendly",
            "Transição silenciosa para humanos (handoff) com histórico de chat gravado no Firestore",
            "Processamento e transcrição de notas de voz em tempo real com Gemini",
            "Painel de administração web (/admin) privado para auditar chats e leads",
            "Filtros de segurança programáticos (Anti-Abuso e Anti-Flood integrados)"
          ],
          howWeDoIt: [
            { step: "Dia 1-2: Escopo Conversacional", desc: "Definimos as 5 perguntas de perfilamento e o tom de voz do seu bot." },
            { step: "Dia 3-4: Base de Conhecimento Obsidian", desc: "Estruturamos arquivos markdown com seus serviços, diretrizes de preços e FAQs comuns." },
            { step: "Dia 5-7: Webhooks & Integrações", desc: "Conectamos as APIs da Meta, Calendly e Google Sheets dentro do nosso sistema agêntico." },
            { step: "Dia 8-10: Testes de Estresse & Implantação", desc: "Realizamos mais de 30 conversas de teste reais e liberamos o bot para produção ativa." }
          ]
        },
        {
          name: "Internal Process & Knowledge Copilot",
          desc: "Automação de suporte interno e integração (onboarding) de funcionários com RAG multimídia.",
          price: "1.200.000 - 2.500.000 CLP",
          priceSuffix: " setup + 145.000 CLP/mês de suporte e hospedagem",
          features: [
            "Base de conhecimento Obsidian",
            "RAG vetorial local (0ms latência, grátis)",
            "Processamento de áudio, imagem e texto"
          ],
          longFeatures: [
            "Integração de base de conhecimento estruturada estilo Obsidian (markdown/wiki)",
            "Busca RAG vetorial em memória (0ms de latência) sem taxas caras de banco de dados",
            "Processamento de consultas multimídia: lida com texto, notas de voz e anexos de imagem",
            "Alertas em tempo real e escalonamento para supervisores se a IA precisar de ajuda humana",
            "Redução de 75% no tempo de suporte interno e duração do onboarding de funcionários",
            "Implantação nativa no Slack, Microsoft Teams ou WhatsApp corporativo",
            "Pré-compilação automática do cache de embeddings durante a fase de build (pronto para Vercel)"
          ],
          howWeDoIt: [
            { step: "Dia 1-3: Auditoria de Informação", desc: "Escaneamos seus manuais de onboarding, diretrizes operacionais e wikis da empresa." },
            { step: "Dia 4-6: Estruturação do RAG Vetorial", desc: "Organizamos a bóveda do Obsidian e configuramos o cache incremental text-embedding-004." },
            { step: "Dia 7-8: Implantação de Canais", desc: "Conectamos o bot diretamente nos canais do Slack, Teams ou WhatsApp da sua empresa." },
            { step: "Dia 9-10: Calibração & Lançamento", desc: "Validamos as respostas do bot contra alucinações com testes de estresse." }
          ]
        },
        {
          name: "Custom Agential Systems & Workflows",
          desc: "Agentes autônomos hiperconectados que executam ações reais nos seus sistemas internos.",
          price: "900.000 - 1.800.000 CLP",
          priceSuffix: " setup + 125.000 CLP/mês de suporte e hospedagem",
          features: [
            "Agente programado sob medida em código",
            "Integração bidirecional de CRMs",
            "Automação de tarefas em segundo plano"
          ],
          longFeatures: [
            "Sistema agêntico totalmente codificado sob medida (Node.js/TypeScript, arquitetura limpa)",
            "Integração bidirecional em tempo real com CRMs (HubSpot, Salesforce, Pipedrive)",
            "Sincronização transacional com e-commerce, ERPs e bancos de dados personalizados",
            "Automação avançada de tarefas complexas em segundo plano via workflows no Kapso",
            "Lógica de roteamento avançada e interações seguras diretas com APIs proprietárias",
            "Chaveiro de credenciais API criptografado de nível bancário",
            "Suporte de engenharia prioritário e atualizações proativas para mudanças de API"
          ],
          howWeDoIt: [
            { step: "Dia 1-3: Arquitetura & Escopo de API", desc: "Analisamos as APIs do seu CRM/ERP e desenhamos o mapa de dados lógico." },
            { step: "Dia 4-8: Engenharia de Backend", desc: "Construímos as rotinas lógicas personalizadas e funções de nuvem no Kapso." },
            { step: "Dia 9-11: Testes de Integração", desc: "Realizamos testes de ponta a ponta em ambiente sandbox de todas as sincronizações." },
            { step: "Dia 12: Implantação & Produção", desc: "Liberamos o sistema conectado com segurança às suas operações reais." }
          ],
          popular: true
        },
        {
          name: "Sistema Agêntico Empresarial",
          desc: "Arquitetura de orquestração multi-agente para operações corporativas complexas de grande escala.",
          price: "A Cotizar",
          priceSuffix: " + 350.000+ CLP/mês de suporte e engenharia",
          features: [
            "Orquestração multi-agente avançada",
            "Processamento inteligente de documentos",
            "SLA de engenharia garantido"
          ],
          longFeatures: [
            "Sistema multi-agente soberano com roteamento inteligente entre agentes especializados",
            "Processamento inteligente de documentos e extração segura de dados (PDFs, planilhas)",
            "Integrações ilimitadas com bancos de dados proprietários e sistemas legados",
            "Painel de administração corporativo personalizado multi-função",
            "Monitoramento proativo da saúde do sistema e hospedagem de alta disponibilidade na Vercel",
            "Criptografia de dados de nível bancário e conformidade estrita com padrões de privacidade",
            "Suporte de engenharia dedicado 24/7 e garantia de SLA de tempo de resposta"
          ],
          howWeDoIt: [
            { step: "Fase 1: Consultoria & Blueprint", desc: "Mapeamos toda a operação da empresa e desenhamos o blueprint multi-agente completo." },
            { step: "Fase 2: Engenharia de Sandbox", desc: "Construímos e executamos o ecossistema multi-agente em um sandbox isolado e seguro." },
            { step: "Fase 3: Banco de Dados & Conexão", desc: "Conectamos os agentes ao seu banco de dados central e aos sistemas em tempo real." },
            { step: "Fase 4: Implantação & Treinamento", desc: "Liberamos o sistema gradualmente e treinamos sua equipe executiva." }
          ]
        }
      ],
      trainingPlans: [
        {
          name: "Vibecoding 1-1 Intensivo",
          desc: "Mentoria personalizada para dominar a engenharia agêntica",
          price: "Sob consulta",
          features: [
            "4 mentorias 1-1 privadas (1.5h cada)",
            "Implementação direta em seus projetos reais",
            "Templates de engenharia de prompts de nível expert",
            "Gravação + código-fonte das sessões",
          ],
          popular: true,
        },
        {
          name: "Mastery em Swarms Agênticos",
          desc: "Imersão profunda em sistemas multi-agentes autônomos",
          price: "Sob consulta",
          features: [
            "8 sessões privadas em 4 semanas",
            "Construção de pipelines agênticos sob medida",
            "Auditoria e otimização de arquitetura privada",
            "Suporte de engenharia prioritário por 60 dias",
          ],
        },
        {
          name: "Estratégia IA Executiva",
          desc: "Roteiro de alto nível para o seu negócio",
          price: "Sob consulta",
          features: [
            "90 min de imersão privada",
            "Auditoria de transformação e design de fluxos",
            "Roteiro passo a passo de integração agêntica",
            "Acesso direto ao fundador pelo WhatsApp",
          ],
        },
        {
          name: "Workshops para Equipes",
          desc: "Treinamento IA sob medida para toda a sua equipe",
          price: "Sob consulta",
          features: [
            "Roteiro para fluxos da equipe",
            "Sessões ao vivo (presencial ou remoto)",
            "Suporte na implementação de projetos grupais",
            "Stack agêntico avançado para empresas",
          ],
        },
      ],
      aiPlans: [],
      trainingNote: {
        title: "Treinamento para Equipes",
        desc: "Procurando um plano personalizado para toda a sua equipe? Projetamos programas sob medida para empresas e startups.",
        btn: "Consulte o treinamento da sua equipe"
      }
    },
    process: {
      eyebrow: "Como Trabalhamos",
      title: "Um processo claro, sem surpresas",
      steps: [
        { num: "01", title: "Mapeamento", desc: "Documentamos cada processo que você quer delegar. Sem custo, sem compromisso.", details: "Mapeamos em profundidade suas operações de negócio — fluxos, tarefas repetitivas, pontos de decisão e gargalos. Isso nos dá o plano exato que o agente precisa para atuar como uma verdadeira extensão da sua equipe." },
        { num: "02", title: "Design", desc: "Projetamos a arquitetura do agente sob medida antes de escrever uma linha de código.", details: "Projetamos a lógica, memória e integrações do agente com base nos seus processos mapeados. Você valida cada fluxo de decisão antes do desenvolvimento começar — a arquitetura é sua." },
        { num: "03", title: "Treinamento", desc: "Treinamos o agente com sua lógica, sua voz, suas regras.", details: "O agente é treinado com sua base de conhecimento, tom, regras de negócio e casos especiais. O integramos nativamente com suas ferramentas atuais — CRM, WhatsApp, agenda, bancos de dados — para que se encaixe perfeitamente na sua operação." },
        { num: "04", title: "Autonomia", desc: "O agente opera sozinho. Você supervisiona, ele executa.", details: "Implantação em infraestrutura Edge de alto desempenho com disponibilidade 24/7. Seu agente gerencia seus processos atribuídos de forma autônoma enquanto você mantém visibilidade e controle total. Incluímos uma sessão de onboarding para que sua equipe saiba exatamente como trabalhar junto a ele." },
      ],
      learnMore: "Saber mais",
      understood: "Entendido",
      step: "Passo",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Suas dúvidas, resolvidas",
      cta: "Tem uma pergunta que não está aqui? Escreva para nós no WhatsApp.",
      items: [
        {
          q: "Quanto tempo leva para criar meu projeto?",
          a: "Depende do serviço: uma landing page básica em 5 dias úteis; um site profissional entre 10 e 15 dias; um projeto com chatbot ou IA integrada pode levar 3–4 semanas. Sempre damos um prazo exato na proposta antes de começar.",
        },
        {
          q: "Aceitam pagamentos parcelados?",
          a: "Sim. Trabalhamos com um esquema de 50% no início e 50% na entrega. Para projetos maiores, também podemos acordar um plano em 3 parcelas. Aceitamos transferência bancária, PayPal e cripto (USDT/USDC).",
        },
        {
          q: "Quantas revisões meu projeto inclui?",
          a: "Cada plano inclui um número definido de revisões: Básico 2, Profissional 3 e Premium 5. Antes de escrever o código, apresentamos um mockup completo do design para sua aprovação, o que minimiza mudanças na etapa final.",
        },
        {
          q: "Vocês fazem treinamento em IA para empresas ou equipes?",
          a: "Sim — é um dos nossos serviços principais. Realizamos workshops (presenciais ou remotos) onde sua equipe aprende a usar ferramentas como ChatGPT, Gemini, Notion AI e plataformas de automação como Make ou Zapier. As sessões são adaptadas à sua indústria.",
        },
        {
          q: "Oferecem manutenção e mudanças futuras?",
          a: "Sim. Após o lançamento, oferecemos planos de manutenção mensal que incluem atualizações de conteúdo, ajustes de design, backup do site e suporte técnico. O plano Premium inclui 1 mês de suporte sem custo.",
        },
        {
          q: "Os preços incluem hospedagem e domínio?",
          a: "Os preços são pelo desenvolvimento e configuração do site. Hospedagem e domínio são contratados separadamente — recomendamos opções conforme seu orçamento e ajudamos na configuração completa. Custo estimado de 9.500 - 19.000 CLP por mês.",
        },
      ],
    },
    aiShowcase: {
      eyebrow: "IA · Bots · Treinamento",
      title: "O que construímos e ensinamos com IA",
      sub: "De bots personalizados a treinamento de equipe — veja o que é possível quando a IA trabalha para o seu negócio.",
      videoLabel: "Ver: O que podemos fazer com IA",
      videoCta: "Ver planos e preços",
      categories: [
        {
          icon: "🤖",
          title: "Bots que trabalham 24/7",
          desc: "Bots de WhatsApp que vendem, agendam e respondem o dia todo. Construídos para o seu negócio exato — não um modelo genérico.",
          tag: "Bot personalizado",
        },
        {
          icon: "⚡",
          title: "Fluxos no piloto automático",
          desc: "Conectamos suas ferramentas e eliminamos tarefas repetitivas. Make, Zapier, n8n — automações que economizam horas toda semana.",
          tag: "Automação",
        },
        {
          icon: "🎓",
          title: "Equipes que dominam a IA",
          desc: "Workshops ao vivo onde sua equipe aprende ChatGPT, Gemini, Notion AI e mais — adaptados à sua indústria.",
          tag: "Workshop ao vivo",
        },
        {
          icon: "🛠️",
          title: "Crie suas próprias ferramentas de IA",
          desc: "Ensinamos você a construir ferramentas de IA sob medida com a plataforma do Google — sem código. Sua equipe se torna a especialista.",
          tag: "Skill de plataforma",
        },
      ],
      ctaTitle: "Sua equipe poderia estar usando IA esta semana.",
      ctaSub: "Veja os planos e comece a transformação IA em dias, não meses.",
      ctaBtn: "Ver planos e preços →",
    },
    cta: {
      spots: "APENAS 3 PROJETOS POR MÊS",
      title: "O processo é seu. O agente trabalha por você.",
      sub: "Projetamos o agente sob medida, o treinamos com a lógica do seu negócio e o liberamos para operar no piloto automático — enquanto você se concentra no que só você pode fazer.",
      note: "Aceitamos apenas 3 projetos por mês para garantir foco absoluto e excelência técnica.",
      whatsapp: "Escrever pelo WhatsApp",
      email: "Enviar um e-mail",
      emailSubject: "Consulta sobre engenharia de alto rendimento",
      emailBody: "Olá, tenho interesse em orçar um projeto ou mentoria para o meu negócio.",
      check1: "✓ Auditoria Agêntica incluída",
      check2: "✓ Resposta em < 24h",
      check3: "✓ Sem compromisso",
      contactOptions: [
        { label: "Desenvolvimento Web / Vibecoding", msg: "Olá! Tenho interesse em orçar um projeto de Desenvolvimento Web / Vibecoding." },
        { label: "Agentes IA & Automação", msg: "Olá! Gostaria de informações sobre Agentes IA e Automação." },
        { label: "Treinamento & Workshops", msg: "Olá! Tenho interesse em treinamento de IA para minha equipe." },
        { label: "Outras Consultas", msg: "Olá! Tenho uma pergunta sobre seus serviços." },
      ],
    },
    crypto: {
      eyebrow: "Pagamentos Rápidos",
      title: "Aceitamos Criptomoedas",
      sub: "Pagos sem fronteiras e entrega imediata. Priorizamos a agilidade em cada passo.",
      features: [
        { title: "USDT / USDC", desc: "Base, Polygon & Ethereum" },
        { title: "Bitcoin / ETH", desc: "Pagamentos diretos on-chain" },
        { title: "Zero Fees", desc: "Sem comissões bancárias" },
        { title: "Global", desc: "De qualquer lugar" }
      ]
    },
    footer: {
      nav: "Navegação",
      services: "Serviços & Preços",
      portfolio: "Portfólio",
      process: "Processo",
      faq: "FAQ",
      contact: "Contato",
      rights: "Todos os direitos reservados.",
      made: "Para negócios que querem crescer com IA — onde quer que você esteja.",
    },
    seo: {
      title: "Browns Studio | Design Web Premium + IA para Negócios",
      description: "A Browns Studio cria presenças digitais de alto impacto com design web profissional e inteligência artificial. Chatbots, automações e sites que convertem para negócios na América Latina.",
      keywords: ["desenvolvimento web LATAM", "sites para negócios", "design web profissional", "chatbot WhatsApp para negócios", "bot inteligência artificial", "automação com IA", "site para clínicas", "site para restaurantes", "agência digital LATAM", "presença digital premium", "chatbot IA para clínicas", "chatbot IA para restaurantes"],
    },
    useCases: {
      eyebrow: "Agent as a Service",
      title: "Desenhado para agir. Construído para escalar.",
      sub: "Nossos agentes potencializam sua operação — atendem clientes 24/7, agem nos seus sistemas reais e liberam sua equipe para focar no que realmente importa.",
      sectionTitleLeft: "Processos de Negócio",
      sectionSubLeft: "Processos que mais delegamos e automatizamos",
      sectionTitleRight: "Garantias de Engenharia",
      sectionSubRight: "Como a tecnologia funciona sob o capô",
      items: [
        {
          title: "Agente de Vendas",
          desc: "Qualifica leads, responde consultas, faz orçamentos e agenda ligações pelo WhatsApp — 24/7, sem intervenção humana.",
          tag: "WhatsApp · CRM · Leads",
          result: "Leads qualificados sem esforço da equipe",
        },
        {
          title: "Agente de Operações",
          desc: "Gerencia seu CRM, gera relatórios automáticos e coordena fluxos internos sem que ninguém precise lembrar.",
          tag: "Make · n8n · Zapier",
          result: "Operação interna no piloto automático",
        },
        {
          title: "O Capacitador IA",
          desc: "Agente de WhatsApp para integração e processos. Responde dúvidas da equipe em texto, imagem e voz usando sua wiki estilo Obsidian. Alerta supervisores se travar.",
          tag: "WhatsApp · Obsidian · Alertas de Escalonamento",
          result: "Processos e treinamento no piloto automático",
        },
        {
          title: "Agente Multi-Canal",
          desc: "Opera no WhatsApp, e-mail, web y no seu sistema ao mesmo tempo — um agente que nunca perde o contexto.",
          tag: "Omnicanal · API · Banco de dados",
          result: "Presença coerente multicanal",
        },
      ],
      pillars: [
        {
          title: "Raciocina antes de agir",
          desc: "O agente avalia o contexto, consulta sua knowledge base e decide a melhor ação — não apenas faz matching de palavras.",
        },
        {
          title: "Conectado às suas ferramentas",
          desc: "Calendar, CRM, Shopify, Sheets. O agente age nos seus sistemas reais em tempo real, sem intermediários.",
        },
        {
          title: "Humano no laço",
          desc: "Antes de qualquer ação crítica (cobrança, cancelamento, envio em massa) o agente pausa e aguarda sua aprovação.",
        },
        {
          title: "Lembra de cada cliente",
          desc: "Memória persistente via RAG: o agente conhece o histórico, preferências e conversas anteriores de cada cliente.",
        },
      ],
      cta: "Conte-nos seu processo",
      bottomNote: "Não sabe qual plano precisa? ",
      bottomLink: "Agende uma auditoria gratuita de 45 min.",
    },
    processAuditor: {
      eyebrow: "AUDITORIA OPERACIONAL",
      title: "Audite seus processos e calcule seu ROI",
      sub: "Selecione sua indústria, ajuste suas métricas mensais e descubra o impacto financeiro real de automatizar suas operações com um Agente de IA da BrownsOS.",
      industryLabel: "Selecione sua Indústria",
      leadsLabel: "Leads Mensais / Convs",
      valueLabel: "Valor Médio por Cliente",
      delayLabel: "Tempo de Resposta Humana",
      delayOptions: {
        instant: "Imediato (< 1 min) - Excelente retenção",
        moderate: "Moderado (15 min - 1 hr) - 15% de perda",
        slow: "Lento (1 - 4 hrs) - 35% de perda",
        nextDay: "Dia Seguinte (> 12 hrs) - 60% de perda"
      },
      industries: {
        dental: "Clínicas Odontológicas",
        aesthetic: "Estéticas & Spas",
        legal: "Escritórios de Advocacia",
        realEstate: "Imobiliárias",
        ecommerce: "E-Commerce / Varejo",
        b2b: "Consultorias / B2B"
      },
      workflowTitle: "Fluxo Agêntico Proposto",
      workflowSteps: {
        dental: [
          "Atendimento Imediato: O Agente de IA responde ao lead em menos de 45 segundos.",
          "Qualificação RAG: Identifica o tratamento odontológico de interesse e o nível de urgência.",
          "Agendamento Direto: Consulta horários livres e reserva a consulta no CRM/agenda da clínica.",
          "Nurturing & Prep: Envia por WhatsApp instruções de preparação e lembretes de exames."
        ],
        aesthetic: [
          "Atendimento Imediato: Responde dúvidas de rejuvenescimento e toxina botulínica 24/7.",
          "Triagem Estética: Filtra preferências de médico e orçamento inicial.",
          "Reserva VIP: Agenda a avaliação diretamente e bloqueia a sala clínica em tempo real.",
          "Pré-Procedimento: Envia recomendações pré-triagem e formulários de consentimento."
        ],
        legal: [
          "Filtro de Caso: O Agente de Admissão avalia a área do direito (civil, empresarial, etc.) e o valor da causa.",
          "Classificação Premium: Identifica casos corporativos de alta prioridade e solicita dados cruciais.",
          "Agendamento com Sócio: Reserva horário com um Sócio Senior e cria sala segura do Zoom.",
          "NDA Automático: Gera e despacha um acordo preliminar de confidencialidade ao e-mail do cliente."
        ],
        realEstate: [
          "Captura de Lead: Responde imediatamente a consultas sobre imóveis em portais imobiliários.",
          "Pré-Qualificação: Valida requisitos mínimos (renda, fiador, histórico) de forma muito amigável.",
          "Visita Automatizada: Agenda a visita ao imóvel com o corretor responsável de forma autônoma.",
          "Documentação: Solicita e organiza os documentos iniciais do cliente antes da visita."
        ],
        ecommerce: [
          "Assistente de Compras: Guia o cliente na escolha de produtos segundo tamanho, cores ou estoque.",
          "Recuperação de Carrinho: Envia mensagens proativas a carrinhos abandonados com cupons suaves.",
          "Suporte Pós-Venda: Esclarece status de entrega, trocas e perguntas frequentes sobre frete.",
          "Fidelização IA: Recomenda produtos cruzados com base no histórico de compras do cliente."
        ],
        b2b: [
          "Qualificação Executiva: Filtra empresas por tamanho, setor, orçamento e dor operacional.",
          "Diagnóstico Rápido: Pergunta sobre ferramentas atuais (CRM, ERP, BD) para checar compatibilidade.",
          "Reunião de Consultoria: Reserva vaga para auditoria estratégica e registra no CRM corporativo.",
          "Acompanhamento: Envia apresentação executiva da BrownsOS logo após a simulação."
        ]
      },
      resultsTitle: "Auditoria de Impacto Financeiro e Alavancagem Agêntica",
      lostRevenue: "Receita Perdida por Atrasos",
      lostRevenueNote: "Perda anual projetada devido à lentidão da equipe em responder e qualificar.",
      recoveredRevenue: "Receita Recuperada Mensal",
      recoveredRevenueNote: "Média de receita mensal capturada pelo Agente IA respondendo 24/7 em 45 segundos.",
      hoursSaved: "Horas de Trabalho Liberadas",
      hoursSavedNote: "Qualificação e agendamento de clientes totalmente delegados ao Agente BrownsOS.",
      roiTitle: "Retorno do Investimento (ROI)",
      roiNote: "Multiplicador financeiro estimado contra o custo de implantação.",
      efficiencyLabel: "Eficiência Operacional",
      ctaBtn: "Obter Plano de Execução e Capacitação",
      whatsappTemplate: "Olá Cristian, acabei de realizar a auditoria de processos para minha {industry}. Minhas métricas são {leads} leads/mês com valor médio de {value}. Nosso tempo de resposta é {delay} e o auditor estima que podemos recuperar {recovered}/mês. Quero estruturar o blueprint do meu agente!"
    }
  },
} as const;

export type Lang = keyof typeof translations;
export type Translations = typeof translations.en;
