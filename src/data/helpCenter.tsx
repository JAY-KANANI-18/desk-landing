/* ═══════════════════════════════════════════════════════════════
   AxoDesk Help Center — CMS-ready Documentation Data Layer
   Schema: category → section → article
   Drop-in ready for Contentful / Sanity / Notion API
═══════════════════════════════════════════════════════════════ */

export type DocStatus = "published" | "draft" | "updated";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface DocAuthor {
  name: string;
  role: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface DocStep {
  title: string;
  body: string;
  tip?: string;
  warning?: string;
  imagePlaceholder?: string;
  code?: string;
}

export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  section: string;
  tags: string[];
  status: DocStatus;
  difficulty: DifficultyLevel;
  readingTimeMin: number;
  lastUpdated: string;
  author: DocAuthor;
  featured?: boolean;
  popular?: boolean;
  steps: DocStep[];
  relatedSlugs?: string[];
}

export interface DocSection {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  articles: string[]; // article slugs in order
}

export interface DocCategory {
  id: string;
  slug: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  accentRaw: string;
  sections: DocSection[];
}

/* ─── Authors ─── */
const AUTHORS: Record<string, DocAuthor> = {
  sarah: { name: "Sarah Chen", role: "Documentation Lead", avatarInitials: "SC", avatarColor: "bg-brand-600" },
  james: { name: "James Okafor", role: "Developer Advocate", avatarInitials: "JO", avatarColor: "bg-violet-600" },
  priya: { name: "Priya Nair", role: "Customer Success", avatarInitials: "PN", avatarColor: "bg-emerald-600" },
  alex: { name: "Alex Müller", role: "Solutions Engineer", avatarInitials: "AM", avatarColor: "bg-rose-600" },
};

/* ─── Articles ─── */
export const HELP_ARTICLES: DocArticle[] = [
  /* ══ GETTING STARTED ══ */
  {
    id: "gs-001",
    slug: "create-your-account",
    title: "Create Your AxoDesk Account",
    excerpt: "Sign up, verify your email, and set up your workspace in under 5 minutes.",
    category: "getting-started",
    section: "account-setup",
    tags: ["signup", "onboarding", "workspace"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 3,
    lastUpdated: "2026-03-15",
    author: AUTHORS.sarah,
    featured: true,
    popular: true,
    steps: [
      { title: "Visit the Sign-Up Page", body: "Navigate to axodesk.in and click Get Started Free in the top navigation. You can also sign up with Google or Microsoft SSO.", imagePlaceholder: "Screenshot: AxoDesk homepage with signup CTA highlighted" },
      { title: "Enter Your Details", body: "Fill in your full name, work email address, and a strong password (min. 12 characters, must include uppercase, number, and symbol).", warning: "Use your work email — workspace billing and team invites are tied to your email domain." },
      { title: "Verify Your Email", body: "Check your inbox for a verification email from noreply@axodesk.in. Click Verify Email. Check spam if it does not arrive within 2 minutes.", tip: "Whitelist @axodesk.in in your email client to ensure deliverability." },
      { title: "Create Your Workspace", body: "Choose a workspace name (typically your company name), select your industry, and enter your team size. This helps AxoDesk pre-configure recommended settings.", imagePlaceholder: "Screenshot: Workspace creation form" },
      { title: "Invite Your Team", body: "Add team member emails separated by commas. Assign roles: Owner, Admin, Agent, or Viewer. You can skip this step and invite later from Settings → Team.", tip: "You can add up to 5 team members on the free trial without entering payment details." },
    ],
    relatedSlugs: ["connect-whatsapp", "configure-your-inbox", "invite-team-members"],
  },
  {
    id: "gs-002",
    slug: "configure-your-inbox",
    title: "Configure Your Inbox",
    excerpt: "Customise inbox views, notification settings, conversation labels, and assignment rules from day one.",
    category: "getting-started",
    section: "account-setup",
    tags: ["inbox", "notifications", "labels", "customisation"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 5,
    lastUpdated: "2026-03-20",
    author: AUTHORS.priya,
    steps: [
      { title: "Access Inbox Settings", body: "From the left sidebar, click your workspace name → Settings → Inbox. You will see all connected channels and their individual configuration panels.", imagePlaceholder: "Screenshot: Settings → Inbox panel overview" },
      { title: "Set Up Conversation Labels", body: "Labels let you categorise conversations (e.g. VIP, Urgent, Follow-up). Go to Settings → Labels → New Label. Assign a colour and optionally a keyboard shortcut.", imagePlaceholder: "Screenshot: Label creation modal" },
      { title: "Configure Notification Preferences", body: "Go to Profile → Notifications. Choose which events trigger desktop, email, or mobile push notifications: new assignment, mention, first reply, etc.", tip: "Enable browser notifications for fastest first-response time." },
      { title: "Create Inbox Views", body: "Saved Views let you filter your inbox by assignee, label, channel, or status. Click + New View above your inbox list and define your filter criteria.", imagePlaceholder: "Screenshot: Saved Views configuration panel" },
      { title: "Set Working Hours", body: "Go to Settings → Business Hours. Define operating hours per day. Outside these hours, automated away messages are sent and SLA timers pause.", warning: "Ensure your timezone is correctly set — all SLA counters depend on it." },
    ],
    relatedSlugs: ["create-your-account", "invite-team-members", "automation-workflows"],
  },
  {
    id: "gs-003",
    slug: "invite-team-members",
    title: "Invite and Manage Team Members",
    excerpt: "Add agents to your workspace, assign roles, create teams, and control permissions.",
    category: "getting-started",
    section: "account-setup",
    tags: ["team", "roles", "permissions", "agents"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 4,
    lastUpdated: "2026-03-22",
    author: AUTHORS.sarah,
    steps: [
      { title: "Go to Team Settings", body: "Navigate to Settings → Team Members. You will see all current members listed with their role, status, and last-active timestamp.", imagePlaceholder: "Screenshot: Team Members settings panel" },
      { title: "Send Invitations", body: "Click Invite Members. Enter one or more email addresses and select a role for each. Click Send Invites — recipients receive an email with a secure join link valid for 48 hours." },
      { title: "Understand Role Permissions", body: "Owner: full access, billing control. Admin: all settings except billing. Agent: conversations, contacts, reports. Viewer: read-only access to reports and conversations.", imagePlaceholder: "Diagram: Role permissions matrix table" },
      { title: "Create Teams", body: "Teams are groups of agents that can be assigned conversations collectively. Go to Settings → Teams → New Team. Name it, add members, and set a routing priority.", tip: "Create teams per channel (e.g. WhatsApp Team) or per function (e.g. Sales, Support) based on your workflow." },
      { title: "Set Availability Status", body: "Each agent can set their availability to Online, Busy, or Away. Conversations are only auto-assigned to Online agents when round-robin is enabled." },
    ],
    relatedSlugs: ["create-your-account", "configure-your-inbox"],
  },

  /* ══ CHANNELS ══ */
  {
    id: "ch-001",
    slug: "connect-whatsapp",
    title: "Connect WhatsApp Business API",
    excerpt: "Link your WhatsApp Business number to AxoDesk via the official Meta Business API — step by step.",
    category: "channels",
    section: "whatsapp",
    tags: ["whatsapp", "meta", "api", "channels"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 8,
    lastUpdated: "2026-04-01",
    author: AUTHORS.james,
    featured: true,
    popular: true,
    steps: [
      { title: "Prerequisites", body: "You need: a verified Meta Business Manager account, a dedicated phone number (not previously used on WhatsApp personal or Business App), and an active AxoDesk Pro or above plan.", warning: "Numbers previously used on WhatsApp personal cannot be registered on the API without first deleting the existing account." },
      { title: "Open Channel Settings", body: "In AxoDesk go to Settings → Channels → Add Channel → WhatsApp Business API. Click Connect with Meta.", imagePlaceholder: "Screenshot: Add Channel → WhatsApp selection screen" },
      { title: "Authorise Meta Business Manager", body: "You will be redirected to Meta's OAuth flow. Log in with the Facebook account that manages your Business Manager. Grant the requested permissions — these are required for message sending and webhook access.", imagePlaceholder: "Screenshot: Meta OAuth permission grant dialog" },
      { title: "Select or Add Your Phone Number", body: "Choose an existing number from your Meta Business Manager, or click Add New Number and follow Meta's in-product verification steps (OTP via SMS or voice call)." },
      { title: "Configure Webhook", body: "AxoDesk automatically sets the webhook URL and token in your WABA settings. Verify that all webhook fields (messages, message_deliveries, message_reads) are subscribed.", code: "Webhook URL (auto-filled):\nhttps://api.axodesk.in/webhooks/whatsapp/{workspace-id}\n\nVerify Token (auto-filled):\nomni_wh_{unique-token}" },
      { title: "Send a Test Message", body: "Use the Test Message panel in AxoDesk to send a template message to your own number. If received, the channel is live.", tip: "You must use a pre-approved message template for the first outbound message to a number that has not messaged you in the last 24 hours." },
    ],
    relatedSlugs: ["whatsapp-message-templates", "whatsapp-broadcast", "connect-instagram"],
  },
  {
    id: "ch-002",
    slug: "whatsapp-message-templates",
    title: "Create & Submit WhatsApp Message Templates",
    excerpt: "Build, submit, and manage Meta-approved message templates for outbound campaigns and automation triggers.",
    category: "channels",
    section: "whatsapp",
    tags: ["whatsapp", "templates", "campaigns", "meta-approval"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 7,
    lastUpdated: "2026-04-02",
    author: AUTHORS.james,
    steps: [
      { title: "Navigate to Templates", body: "Go to Settings → Channels → WhatsApp → Message Templates. Click New Template.", imagePlaceholder: "Screenshot: Message Template builder interface" },
      { title: "Choose Template Category", body: "Marketing: promotional messages, offers. Utility: transactional, order updates, receipts. Authentication: OTP codes. Choose correctly — Meta reviews each category differently.", warning: "Misclassifying a template category can lead to rejection or account restrictions." },
      { title: "Build Your Template Body", body: "Write your template text. Use {{1}}, {{2}} etc. for dynamic variables. Keep body under 1024 characters. Add header (optional: text, image, video, document), footer, and CTA/quick-reply buttons.", imagePlaceholder: "Screenshot: Template body editor with variable insertion panel" },
      { title: "Add Media Header (optional)", body: "Image headers must be JPG/PNG (≤5MB). Video headers must be MP4 (≤16MB). Document headers must be PDF (≤100MB). When using media variables, provide a sample URL during submission.", code: "Example template body:\nHi {{1}}, your order #{{2}} has shipped!\nEstimated delivery: {{3}}.\n[Track Order] [Contact Support]" },
      { title: "Submit for Meta Review", body: "Click Submit for Approval. Meta typically reviews within 24–48 hours. You will receive an email and in-app notification on approval or rejection.", tip: "Rejected templates can be edited and resubmitted. Common rejection reasons: promotional content in Utility category, vague variable placeholders, or broken URL buttons." },
    ],
    relatedSlugs: ["connect-whatsapp", "whatsapp-broadcast"],
  },
  {
    id: "ch-003",
    slug: "whatsapp-broadcast",
    title: "Send WhatsApp Broadcast Campaigns",
    excerpt: "Reach thousands of opted-in contacts simultaneously using approved templates via the AxoDesk broadcast tool.",
    category: "channels",
    section: "whatsapp",
    tags: ["whatsapp", "broadcast", "campaigns", "bulk-messaging"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 6,
    lastUpdated: "2026-04-03",
    author: AUTHORS.priya,
    popular: true,
    steps: [
      { title: "Navigate to Broadcasts", body: "From the left sidebar open Broadcasts. Click New Broadcast.", imagePlaceholder: "Screenshot: Broadcast list screen with New Broadcast button" },
      { title: "Select Channel & Template", body: "Choose your connected WhatsApp Business number. Select an approved message template. Preview renders in real time on the right." },
      { title: "Build Your Audience", body: "Choose recipients by: uploading a CSV, selecting a saved contact segment, or filtering contacts dynamically by label, channel, or custom attribute.", imagePlaceholder: "Screenshot: Audience selection panel with CSV upload and segment filter" },
      { title: "Personalise Variables", body: "Map template variables ({{1}}, {{2}}) to contact attributes (First Name, Company, Order ID, etc.) or set fixed defaults for contacts missing that attribute." },
      { title: "Schedule or Send", body: "Send immediately or schedule for a future date and time (respects your workspace timezone). Broadcasts to >1,000 contacts are sent in staggered batches to comply with Meta rate limits.", warning: "Only send to contacts who have explicitly opted in to receive WhatsApp messages from your business. Non-compliance can result in WABA suspension." },
      { title: "Monitor Delivery Analytics", body: "After sending, the Broadcast detail screen shows: Sent, Delivered, Read, Replied, and Failed counts with timestamps. Export the report as CSV.", imagePlaceholder: "Screenshot: Broadcast analytics dashboard with delivery funnel chart" },
    ],
    relatedSlugs: ["whatsapp-message-templates", "connect-whatsapp", "contact-segments"],
  },
  {
    id: "ch-004",
    slug: "connect-instagram",
    title: "Connect Instagram Direct Messages",
    excerpt: "Link your Instagram Business or Creator account to receive and reply to DMs and story mentions inside AxoDesk.",
    category: "channels",
    section: "social-channels",
    tags: ["instagram", "meta", "social", "dm"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 5,
    lastUpdated: "2026-03-28",
    author: AUTHORS.james,
    steps: [
      { title: "Requirements", body: "Your Instagram account must be a Business or Creator account (not personal) and must be linked to a Facebook Page managed in your Meta Business Manager.", imagePlaceholder: "Screenshot: Meta Business Manager page linking settings" },
      { title: "Add Instagram Channel", body: "Go to Settings → Channels → Add Channel → Instagram Direct. Click Connect with Meta and grant the required permissions.", imagePlaceholder: "Screenshot: Instagram channel connection flow" },
      { title: "Select Your Instagram Account", body: "Choose the Instagram account from the list of accounts connected to your Meta Business Manager. Only accounts linked to a Facebook Page will appear." },
      { title: "Configure Message Types", body: "Choose which message types to receive: DMs, Story Mentions, Story Replies, Post Comments. Each can be toggled independently.", tip: "Enabling Story Mentions lets you see when customers tag your brand in their stories and respond directly in AxoDesk." },
      { title: "Test the Connection", body: "Send a DM to your Instagram account from another account. It should appear in your AxoDesk inbox within seconds.", imagePlaceholder: "Screenshot: Instagram message appearing in AxoDesk inbox" },
    ],
    relatedSlugs: ["connect-whatsapp", "connect-facebook-messenger"],
  },
  {
    id: "ch-005",
    slug: "connect-facebook-messenger",
    title: "Connect Facebook Messenger",
    excerpt: "Receive page messages and comments from your Facebook Business Page directly in your team inbox.",
    category: "channels",
    section: "social-channels",
    tags: ["facebook", "messenger", "meta", "social"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 4,
    lastUpdated: "2026-03-25",
    author: AUTHORS.sarah,
    steps: [
      { title: "Go to Add Channel", body: "Settings → Channels → Add Channel → Facebook Messenger. Click Connect with Meta.", imagePlaceholder: "Screenshot: Channel selection screen with Facebook Messenger option" },
      { title: "Select Your Facebook Page", body: "Choose your Facebook Business Page from the list. If your page is not listed, ensure the logged-in Facebook account is an admin of that page in Meta Business Manager." },
      { title: "Grant Permissions", body: "Accept all requested permissions. These include: pages_messaging, pages_manage_metadata, and instagram_manage_messages (if also connecting Instagram)." },
      { title: "Subscribe to Webhook Events", body: "AxoDesk automatically subscribes your page to the required webhook fields (messages, messaging_postbacks, messaging_optins). No manual action required.", tip: "If existing messages stop appearing after connection, check your Facebook Page settings for conflicting inbox apps and remove duplicates." },
    ],
    relatedSlugs: ["connect-instagram", "connect-whatsapp"],
  },
  {
    id: "ch-006",
    slug: "connect-email",
    title: "Connect Email (Gmail, Outlook, IMAP/SMTP)",
    excerpt: "Bring your support or sales email into AxoDesk — connect Gmail, Outlook, or any custom IMAP/SMTP mailbox.",
    category: "channels",
    section: "email",
    tags: ["email", "gmail", "outlook", "imap", "smtp"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 7,
    lastUpdated: "2026-04-01",
    author: AUTHORS.alex,
    steps: [
      { title: "Add Email Channel", body: "Go to Settings → Channels → Add Channel → Email. Choose your provider: Gmail, Microsoft 365, or Custom IMAP/SMTP.", imagePlaceholder: "Screenshot: Email channel provider selection screen" },
      { title: "Connect Gmail", body: "For Gmail: click Connect Google Account. Authorise AxoDesk with your Google Workspace account. Select the Gmail mailbox to sync. AxoDesk uses Gmail API (not IMAP) for reliable deliverability.", warning: "Ensure you are authorising with the email address you want to use as the support inbox, not your personal Gmail." },
      { title: "Connect Outlook / Microsoft 365", body: "For Outlook: click Connect Microsoft Account. Authorise via Microsoft OAuth. Choose the target mailbox. AxoDesk syncs via Microsoft Graph API.", imagePlaceholder: "Screenshot: Microsoft OAuth consent screen" },
      { title: "Connect Custom IMAP/SMTP", body: "Enter: IMAP host, IMAP port (993 for SSL), SMTP host, SMTP port (587 for TLS), email address, and app password. Test the connection before saving.", code: "Common IMAP/SMTP settings:\nGmail IMAP: imap.gmail.com:993 (SSL)\nGmail SMTP: smtp.gmail.com:587 (TLS)\nOutlook IMAP: outlook.office365.com:993 (SSL)\nOutlook SMTP: smtp.office365.com:587 (TLS)" },
      { title: "Configure Email Settings", body: "Set a Display Name (shown to recipients), Reply-to address, email signature, and out-of-office auto-reply content.", imagePlaceholder: "Screenshot: Email channel configuration panel with signature editor" },
    ],
    relatedSlugs: ["configure-your-inbox", "automation-workflows"],
  },

  /* ══ INBOX & CONVERSATIONS ══ */
  {
    id: "ib-001",
    slug: "manage-conversations",
    title: "Managing Conversations in Your Inbox",
    excerpt: "Assign, label, snooze, merge, and resolve conversations — everything your team needs to run a clean inbox.",
    category: "inbox",
    section: "conversations",
    tags: ["inbox", "conversations", "assign", "labels", "resolve"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 6,
    lastUpdated: "2026-03-30",
    author: AUTHORS.priya,
    popular: true,
    steps: [
      { title: "Anatomy of a Conversation", body: "Every conversation has: a contact profile (left panel), the message thread (center), and the conversation detail panel (right) with assignee, labels, custom attributes, and timeline.", imagePlaceholder: "Screenshot: Full conversation view with panels labelled" },
      { title: "Assign Conversations", body: "Click the Assign button in the right panel. Search for a team member or team. You can also set auto-assignment rules in Settings → Automation → Assignment Rules.", tip: "Mentioning a teammate with @name in the conversation notes also sends them a notification, but does not transfer assignment." },
      { title: "Apply Labels", body: "Click Labels in the right panel. Apply one or more labels. Labels appear as colour-coded chips in the inbox list and can be used for filtering and reporting.", imagePlaceholder: "Screenshot: Label picker on a conversation" },
      { title: "Snooze a Conversation", body: "Click the Snooze icon (clock) to temporarily hide a conversation until a set time (e.g. In 2 hours, Tomorrow 9am, Custom date). Snoozed conversations auto-return to Open at the scheduled time." },
      { title: "Merge Duplicate Conversations", body: "If the same customer contacts you from two channels, merge their conversations: open one conversation → ⋮ More → Merge → search and select the duplicate. The full history is preserved." },
      { title: "Resolve & Reopen", body: "Click Resolve (green checkmark) to mark a conversation as done. Resolved conversations move to the Resolved tab. If the customer replies, the conversation automatically reopens.", warning: "Resolving a conversation does not delete it — all history is preserved and searchable." },
    ],
    relatedSlugs: ["contact-profiles", "configure-your-inbox"],
  },
  {
    id: "ib-002",
    slug: "contact-profiles",
    title: "Contact Profiles & Custom Attributes",
    excerpt: "Build rich contact profiles with custom fields, conversation history, CRM data, and activity timelines.",
    category: "inbox",
    section: "contacts",
    tags: ["contacts", "crm", "profiles", "attributes", "segments"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 5,
    lastUpdated: "2026-04-02",
    author: AUTHORS.sarah,
    steps: [
      { title: "Access Contact Profiles", body: "Click on any contact name in a conversation to open their full profile in the right panel. Click the arrow icon to open the full-screen contact page.", imagePlaceholder: "Screenshot: Contact profile panel with conversation history timeline" },
      { title: "Add Custom Attributes", body: "Go to Settings → Custom Attributes → New Attribute. Choose: Contact or Conversation attribute. Set field type: Text, Number, Date, Boolean, or List.", imagePlaceholder: "Screenshot: Custom attribute creation form" },
      { title: "Import Contacts via CSV", body: "Go to Contacts → Import. Download the CSV template. Fill in: name, email, phone, company, and custom attributes. Upload. AxoDesk deduplicates by email and phone.", code: "Required CSV columns:\nname, email, phone\nOptional columns:\ncompany, location, tags, custom_attr_1, custom_attr_2" },
      { title: "Create Contact Segments", body: "Segments are dynamic groups. Go to Contacts → Segments → New Segment. Define filter conditions (e.g. Country = US AND Tag = VIP). Segments update automatically as contacts match/unmatch criteria.", tip: "Use segments as audiences for broadcast campaigns for precise targeting without manual contact selection." },
      { title: "Sync CRM Data", body: "If using HubSpot, Salesforce, or Pipedrive integration, contact data syncs bidirectionally. Changes in AxoDesk reflect in your CRM and vice versa — no duplicate data entry.", imagePlaceholder: "Screenshot: CRM sync settings panel showing field mappings" },
    ],
    relatedSlugs: ["manage-conversations", "contact-segments", "crm-integrations"],
  },
  {
    id: "ib-003",
    slug: "contact-segments",
    title: "Contact Segments — Advanced Filtering & Targeting",
    excerpt: "Build dynamic contact segments using multi-condition logic for personalised broadcasts and automation triggers.",
    category: "inbox",
    section: "contacts",
    tags: ["segments", "contacts", "filters", "targeting"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 5,
    lastUpdated: "2026-04-04",
    author: AUTHORS.priya,
    steps: [
      { title: "Create a New Segment", body: "Go to Contacts → Segments → New Segment. Give it a descriptive name (e.g. High-LTV E-commerce Customers).", imagePlaceholder: "Screenshot: Segment builder with filter condition rows" },
      { title: "Add Filter Conditions", body: "Click Add Condition. Each condition has: field selector, operator (is, is not, contains, greater than, etc.), and a value. Combine conditions with AND (all must match) or OR (any must match)." },
      { title: "Available Filter Fields", body: "Contact fields: Name, Email, Phone, Company, Country, City, Tags, Custom Attributes, Channel, Last Seen, Created At. Conversation fields: Resolved count, Labels, Assignee, Last Activity.", imagePlaceholder: "Screenshot: Full list of available segment filter fields" },
      { title: "Preview & Save", body: "Before saving, click Preview to see a live count and sample of matching contacts. Once saved, the segment is dynamic — contacts enter and exit automatically." },
      { title: "Use Segment in Broadcast", body: "When creating a WhatsApp Broadcast, select a saved segment as your audience. The recipient count updates in real time as the segment re-evaluates." },
    ],
    relatedSlugs: ["contact-profiles", "whatsapp-broadcast"],
  },

  /* ══ AI & AUTOMATION ══ */
  {
    id: "ai-001",
    slug: "ai-agent-setup",
    title: "Setting Up Your AI Agent",
    excerpt: "Configure AxoDesk&#39;s AI Agent to autonomously handle FAQs, qualify leads, and escalate to humans — without any coding.",
    category: "ai-automation",
    section: "ai-agent",
    tags: ["ai", "ai-agent", "automation", "faq", "no-code"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 9,
    lastUpdated: "2026-04-05",
    author: AUTHORS.james,
    featured: true,
    popular: true,
    steps: [
      { title: "Enable AI Agent", body: "Go to Settings → AI → AI Agent. Toggle Enable AI Agent. Select which connected channels the agent should monitor: all channels or specific ones.", imagePlaceholder: "Screenshot: AI Agent settings panel with channel toggles" },
      { title: "Connect Your Knowledge Base", body: "The AI Agent learns from your content. Upload: PDFs, DOCX files, or paste plain text. Or connect a public URL (help docs, FAQ page, product pages) — AxoDesk crawls and indexes automatically.", tip: "The more structured and factual your knowledge base content, the more accurate AI responses will be. Avoid promotional language in source materials." },
      { title: "Write Your AI Persona", body: "Define your agent&#39;s name (e.g. Aria), tone (professional, friendly, casual), and any topics it should always/never discuss. This shapes how the LLM constructs responses.", imagePlaceholder: "Screenshot: AI persona configuration form with preview" },
      { title: "Set Escalation Triggers", body: "Define when the AI should hand off to a human: frustration keywords (angry, cancel, refund), unanswered questions, high-intent phrases (ready to buy, speak to manager), or after N AI-only message turns.", code: "Example escalation keywords:\ncancel, refund, speak to human,\nurgent, not working, broken,\nlawyer, sue, complaint" },
      { title: "Configure Fallback Behaviour", body: "When escalating: set the message the AI sends before handing off, choose which team or agent to assign to, and whether to add an Escalated label automatically.", imagePlaceholder: "Screenshot: Escalation configuration with fallback message editor" },
      { title: "Test Your AI Agent", body: "Use the built-in simulator (Settings → AI → Test Agent). Type test messages and observe the AI responses. Inspect which knowledge base chunk was referenced for each answer.", tip: "Run at least 20 test scenarios covering your top FAQ categories before going live." },
      { title: "Set Agent Hours", body: "Optionally limit AI Agent to specific hours (e.g. after-hours only, or 24/7). During business hours, conversations can go direct to agents, with AI assist in co-pilot mode instead." },
    ],
    relatedSlugs: ["ai-assist", "automation-workflows", "configure-your-inbox"],
  },
  {
    id: "ai-002",
    slug: "ai-assist",
    title: "AI Assist — Copilot for Your Agents",
    excerpt: "Use AI Assist to get real-time reply suggestions, smart summaries, tone adjusters, and auto-translations as your team chats.",
    category: "ai-automation",
    section: "ai-assist",
    tags: ["ai", "ai-assist", "copilot", "suggestions", "translation"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 5,
    lastUpdated: "2026-04-04",
    author: AUTHORS.sarah,
    popular: true,
    steps: [
      { title: "Enable AI Assist", body: "Go to Settings → AI → AI Assist. Toggle on. Choose which features to enable for your team: Reply Suggestions, Conversation Summary, Tone Adjuster, Auto-Translation.", imagePlaceholder: "Screenshot: AI Assist feature toggles panel" },
      { title: "Reply Suggestions", body: "When typing a reply, AI Assist generates 3 contextual suggestions below the text box based on conversation history and your knowledge base. Click to insert, then edit before sending.", tip: "Agents can upvote/downvote suggestions — this feedback improves suggestion quality over time for your workspace." },
      { title: "Conversation Summary", body: "Click the Summarise button (spark icon) in any conversation to get a concise AI summary of the entire thread. Useful when taking over a conversation mid-session or reviewing a long history.", imagePlaceholder: "Screenshot: AI-generated conversation summary card" },
      { title: "Tone Adjuster", body: "Select any text in the reply box → right-click → Adjust Tone. Choose: More formal, More friendly, More concise, or Apologetic. AI rewrites without changing the core meaning." },
      { title: "Auto-Translation", body: "Enable Auto-Translate in AI Assist settings. When a customer messages in a language different from your workspace default, messages are shown with a translation below. Your reply is auto-translated before sending.", warning: "Always review auto-translated messages before sending for high-stakes languages or nuanced customer situations." },
    ],
    relatedSlugs: ["ai-agent-setup", "automation-workflows"],
  },
  {
    id: "ai-003",
    slug: "automation-workflows",
    title: "Build Automation Workflows",
    excerpt: "Create no-code trigger-condition-action automation flows for routing, tagging, replying, escalating, and CRM syncing.",
    category: "ai-automation",
    section: "automation",
    tags: ["automation", "workflows", "no-code", "routing", "triggers"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 8,
    lastUpdated: "2026-04-06",
    author: AUTHORS.alex,
    featured: true,
    steps: [
      { title: "Open Automation Builder", body: "Go to Settings → Automation → Workflows → New Workflow. You will enter the visual drag-and-drop automation canvas.", imagePlaceholder: "Screenshot: Automation workflow canvas overview" },
      { title: "Choose a Trigger", body: "Every workflow starts with a trigger: Conversation Created, Message Received, Conversation Resolved, Contact Created, Label Added, Business Hours Start/End, or Scheduled Time.", imagePlaceholder: "Screenshot: Trigger type selection panel" },
      { title: "Add Conditions (optional)", body: "Conditions filter when the workflow runs. Examples: Channel is WhatsApp AND Label contains VIP. Message Contains buy OR interested. You can nest AND/OR logic blocks.", tip: "Always add conditions to scope your workflow precisely — triggering on every conversation without conditions wastes compute and can cause unintended actions." },
      { title: "Add Actions", body: "Actions are what the workflow does. Available actions: Assign to Agent/Team, Add/Remove Label, Send Message (template or free text), Update Contact Attribute, Create CRM Deal, Webhook Request, Wait (delay), Branch (if/else).", imagePlaceholder: "Screenshot: Action type picker with all action categories shown" },
      { title: "Test in Sandbox", body: "Use the Test Workflow panel to simulate a trigger event and see exactly which conditions matched and which actions were (or would be) executed, with full logs." },
      { title: "Activate & Monitor", body: "Toggle the workflow to Active. In the Workflow List view, each workflow shows: Triggered count, Actions executed, Error count, and Last run timestamp.", imagePlaceholder: "Screenshot: Workflow list with performance stats per workflow" },
    ],
    relatedSlugs: ["ai-agent-setup", "configure-your-inbox"],
  },

  /* ══ INTEGRATIONS ══ */
  {
    id: "in-001",
    slug: "crm-integrations",
    title: "CRM Integrations — HubSpot, Salesforce & Pipedrive",
    excerpt: "Sync contacts, deals, and conversation data bidirectionally between AxoDesk and your CRM.",
    category: "integrations",
    section: "crm",
    tags: ["crm", "hubspot", "salesforce", "pipedrive", "sync"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 7,
    lastUpdated: "2026-04-03",
    author: AUTHORS.alex,
    popular: true,
    steps: [
      { title: "Go to Integrations", body: "Navigate to Settings → Integrations. Find your CRM: HubSpot, Salesforce, or Pipedrive. Click Connect.", imagePlaceholder: "Screenshot: Integrations marketplace with CRM cards" },
      { title: "Authenticate", body: "HubSpot: OAuth with your HubSpot admin account. Salesforce: OAuth with Salesforce — requires System Administrator or API-Enabled profile. Pipedrive: API token from your Pipedrive account settings." },
      { title: "Configure Field Mappings", body: "Map AxoDesk contact fields to CRM fields. Standard mappings are pre-built (email, phone, company). Add custom field mappings for your specific CRM properties.", imagePlaceholder: "Screenshot: Field mapping configuration table" },
      { title: "Set Sync Direction", body: "Choose per-field: AxoDesk → CRM only, CRM → AxoDesk only, or Bidirectional. For most teams: bidirectional for contacts, AxoDesk → CRM for conversation timestamps and labels." },
      { title: "Enable Deal/Ticket Creation", body: "Optionally auto-create CRM deals (HubSpot/Pipedrive) or cases (Salesforce) when a conversation is created or when specific labels are applied.", tip: "Set a condition on the deal-creation automation (e.g. Label = Sales Qualified) to avoid creating CRM records for every support conversation." },
      { title: "Test the Sync", body: "Create a test contact in AxoDesk and verify it appears in your CRM within 60 seconds. Update a field in the CRM and confirm it reflects in AxoDesk.", imagePlaceholder: "Screenshot: Sync activity log showing successful contact sync events" },
    ],
    relatedSlugs: ["contact-profiles", "automation-workflows"],
  },
  {
    id: "in-002",
    slug: "zapier-make-integration",
    title: "Connect via Zapier & Make (Integromat)",
    excerpt: "Use AxoDesk&#39;s native Zapier and Make apps to connect with 5,000+ external tools — no code required.",
    category: "integrations",
    section: "no-code-integrations",
    tags: ["zapier", "make", "integromat", "no-code", "webhooks"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 6,
    lastUpdated: "2026-03-28",
    author: AUTHORS.sarah,
    steps: [
      { title: "Get Your API Key", body: "Go to Settings → Integrations → API → Generate API Key. Copy and store securely — it will not be shown again.", warning: "Never share your API key or commit it to public repositories. Rotate it immediately if compromised." },
      { title: "Zapier Setup", body: "In Zapier, search for AxoDesk. Click Connect and enter your API key. Create a Zap with AxoDesk as Trigger (e.g. New Conversation) or Action (e.g. Send Message, Create Contact).", imagePlaceholder: "Screenshot: Zapier AxoDesk app with trigger/action options listed" },
      { title: "Make (Integromat) Setup", body: "In Make, add the AxoDesk module. Authenticate with your API key. Available modules: Watch Conversations, Send Message, Create Contact, Update Contact, Search Contacts.", imagePlaceholder: "Screenshot: Make scenario canvas with AxoDesk module connected to Google Sheets" },
      { title: "Common Use Cases", body: "New conversation → add row to Google Sheets. New WA message from VIP number → create Trello card. Conversation resolved → update Airtable record. New contact → add to Mailchimp list." },
    ],
    relatedSlugs: ["rest-api-overview", "crm-integrations"],
  },

  /* ══ ANALYTICS ══ */
  {
    id: "an-001",
    slug: "reports-overview",
    title: "Analytics & Reports Overview",
    excerpt: "Understand every report available in AxoDesk — team performance, CSAT, conversation metrics, and custom dashboards.",
    category: "analytics",
    section: "reports",
    tags: ["analytics", "reports", "csat", "performance", "dashboard"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 6,
    lastUpdated: "2026-04-04",
    author: AUTHORS.priya,
    popular: true,
    steps: [
      { title: "Navigate to Reports", body: "Click Reports in the left sidebar. The overview page shows high-level KPIs for the selected date range: total conversations, resolved, avg first-response time, CSAT score.", imagePlaceholder: "Screenshot: Reports overview dashboard with KPI cards" },
      { title: "Conversation Reports", body: "Shows: conversation volume over time, channel breakdown, incoming vs outgoing ratio, resolution rate, and average handling time. Filter by channel, team, or agent.", imagePlaceholder: "Screenshot: Conversation report with line chart and breakdown panels" },
      { title: "Team & Agent Performance", body: "Per-agent metrics: conversations handled, avg first-response time, avg resolution time, CSAT received, and messages sent. Sort and export to CSV.", imagePlaceholder: "Screenshot: Agent performance table sorted by CSAT score" },
      { title: "CSAT Reports", body: "Customer Satisfaction scores sent automatically after resolution (if enabled). View: average CSAT, response rate, score distribution, and verbatim comments. Filter by agent, team, channel, or date.", tip: "Aim for CSAT response rate above 30%. Add a personalised message to the CSAT survey to increase response rates." },
      { title: "Custom Dashboards", body: "Combine any available metrics into a custom dashboard. Go to Reports → Dashboards → New Dashboard. Add widgets: line chart, bar chart, pie chart, metric card, or table.", imagePlaceholder: "Screenshot: Custom dashboard builder with widget library open" },
      { title: "Schedule & Export Reports", body: "Any report can be exported as CSV instantly. Scheduled reports can be sent via email (daily, weekly, monthly) to any email address — useful for stakeholder reporting." },
    ],
    relatedSlugs: ["configure-your-inbox", "automation-workflows"],
  },

  /* ══ DEVELOPER API ══ */
  {
    id: "dev-001",
    slug: "rest-api-overview",
    title: "REST API Overview",
    excerpt: "Introduction to AxoDesk&#39;s RESTful API — authentication, base URLs, rate limits, pagination, and error codes.",
    category: "developer",
    section: "api-reference",
    tags: ["api", "rest", "developer", "authentication", "webhook"],
    status: "published",
    difficulty: "advanced",
    readingTimeMin: 10,
    lastUpdated: "2026-04-06",
    author: AUTHORS.james,
    steps: [
      { title: "Base URL & Versioning", body: "All API requests use the base URL below. The current stable version is v2. Include the version in the URL path. Breaking changes will always be released under a new version with 12 months deprecation notice.", code: "Base URL:\nhttps://api.axodesk.in/v2\n\nExample endpoint:\nGET https://api.axodesk.in/v2/contacts" },
      { title: "Authentication", body: "All requests require a Bearer token in the Authorization header. Generate API keys in Settings → Integrations → API Keys. Keys can be scoped to specific permissions (read-only, full access).", code: "Authorization: Bearer omni_live_xxxxxxxxxxxxxxxx\nContent-Type: application/json" },
      { title: "Rate Limits", body: "Default rate limits per API key: 1,000 requests/minute for read endpoints, 100 requests/minute for write endpoints. Rate limit headers are included in every response.", code: "Response headers:\nX-RateLimit-Limit: 1000\nX-RateLimit-Remaining: 987\nX-RateLimit-Reset: 1712400000" },
      { title: "Pagination", body: "List endpoints are paginated with cursor-based pagination. Pass after={cursor} to get the next page. Each response includes has_more and next_cursor.", code: "GET /v2/contacts?limit=50&after=cnt_abc123\n\nResponse:\n{\n  \"data\": [...],\n  \"has_more\": true,\n  \"next_cursor\": \"cnt_xyz789\"\n}" },
      { title: "Error Codes", body: "AxoDesk uses standard HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 500 Internal Server Error.", code: "Error response body:\n{\n  \"error\": {\n    \"code\": \"validation_error\",\n    \"message\": \"email is required\",\n    \"field\": \"email\"\n  }\n}" },
      { title: "Webhooks", body: "Webhooks push events to your server in real time. Subscribe in Settings → Integrations → Webhooks. Sign webhook requests with the shared secret to verify authenticity.", code: "Webhook signature verification (Node.js):\nconst sig = req.headers['x-axodesk-signature'];\nconst expected = crypto\n  .createHmac('sha256', WEBHOOK_SECRET)\n  .update(JSON.stringify(req.body))\n  .digest('hex');\nif (sig !== expected) return res.status(401).send('Invalid signature');" },
    ],
    relatedSlugs: ["zapier-make-integration", "crm-integrations"],
  },

  /* ══ SECURITY & COMPLIANCE ══ */
  {
    id: "sc-001",
    slug: "security-overview",
    title: "Security, Compliance & Data Privacy",
    excerpt: "AxoDesk&#39;s security architecture, compliance certifications, data residency options, and GDPR tools for enterprise customers.",
    category: "security",
    section: "compliance",
    tags: ["security", "gdpr", "compliance", "encryption", "sso"],
    status: "published",
    difficulty: "intermediate",
    readingTimeMin: 7,
    lastUpdated: "2026-04-05",
    author: AUTHORS.alex,
    steps: [
      { title: "Data Encryption", body: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Message content, contact data, and attachments are stored in encrypted form with keys managed via AWS KMS.", imagePlaceholder: "Diagram: AxoDesk data encryption architecture overview" },
      { title: "Compliance Certifications", body: "AxoDesk holds: SOC 2 Type II, ISO 27001, and GDPR compliance (EU). Enterprise plans include BAA for HIPAA-eligible US healthcare customers. Compliance documents available on request from your account manager.", imagePlaceholder: "Placeholder: Compliance badge grid — SOC2, ISO27001, GDPR, HIPAA" },
      { title: "Data Residency", body: "Enterprise customers can select data residency region: US (AWS us-east-1), EU (AWS eu-west-1), or Singapore (AWS ap-southeast-1). All data — messages, contacts, attachments — is stored within the selected region.", warning: "Data residency region can only be set at workspace creation and cannot be changed without full data migration. Contact sales before creating your workspace." },
      { title: "SSO & SAML 2.0", body: "Enable SSO via SAML 2.0 for Pro and Enterprise plans. Compatible with Okta, Microsoft Entra ID (Azure AD), Google Workspace, and any SAML-compliant IdP. Set up in Settings → Security → SSO.", imagePlaceholder: "Screenshot: SSO configuration panel with SAML metadata fields" },
      { title: "GDPR Tools", body: "AxoDesk provides: Contact data export (full JSON/CSV), Contact deletion (individual or bulk), Consent tracking via custom attribute, and Data Processing Agreement (DPA) signing in-app.", tip: "Use Contact Segments to identify and batch-process contacts requiring GDPR deletion requests at scale." },
      { title: "Audit Logs", body: "Enterprise plan: full audit log of all admin actions, login events, data exports, and permission changes. Logs are retained for 12 months and exportable as CSV. Go to Settings → Security → Audit Logs.", imagePlaceholder: "Screenshot: Audit log table with action type, user, timestamp, and IP address columns" },
    ],
    relatedSlugs: ["invite-team-members", "rest-api-overview"],
  },

  /* ══ BILLING ══ */
  {
    id: "bi-001",
    slug: "billing-plans",
    title: "Billing, Plans & Subscription Management",
    excerpt: "Understand AxoDesk pricing tiers, manage your subscription, add seats, download invoices, and handle upgrades.",
    category: "billing",
    section: "subscription",
    tags: ["billing", "pricing", "plans", "subscription", "invoices"],
    status: "published",
    difficulty: "beginner",
    readingTimeMin: 5,
    lastUpdated: "2026-04-04",
    author: AUTHORS.priya,
    steps: [
      { title: "View Your Current Plan", body: "Go to Settings → Billing. You will see your current plan, billing cycle, next renewal date, and current seat count.", imagePlaceholder: "Screenshot: Billing overview page showing plan details" },
      { title: "Upgrade Your Plan", body: "Click Upgrade Plan. A comparison modal shows all plan features side by side. Select a plan and confirm — upgrades are prorated immediately and your new limits apply instantly.", tip: "Annual billing is 20% cheaper than monthly. You can switch billing cycle at any renewal date from the Billing settings." },
      { title: "Add or Remove Seats", body: "Click Manage Seats. Use the +/- controls to adjust agent seat count. Adding seats is prorated immediately. Removing seats takes effect at the next billing cycle." },
      { title: "Payment Methods", body: "AxoDesk accepts all major credit cards (Visa, Mastercard, Amex) and ACH bank transfers (US only, Enterprise). Go to Billing → Payment Methods to add or update." },
      { title: "Download Invoices", body: "All past invoices are listed in Billing → Invoices. Click any invoice to download as PDF. Invoices include your company name, VAT/tax ID (if configured), line items, and payment status.", imagePlaceholder: "Screenshot: Invoice list with download buttons" },
    ],
    relatedSlugs: ["create-your-account", "security-overview"],
  },
];

/* ─── Categories & Sections ─── */
export const HELP_CATEGORIES: DocCategory[] = [
  {
    id: "cat-gs",
    slug: "getting-started",
    label: "Getting Started",
    description: "Set up your workspace, add your team, and connect your first channel.",
    icon: "🚀",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    accentRaw: "#10b981",
    sections: [
      { id: "s-gs-1", slug: "account-setup", title: "Account Setup", description: "Create account, configure inbox, and invite team", icon: "⚙️", articles: ["create-your-account", "configure-your-inbox", "invite-team-members"] },
    ],
  },
  {
    id: "cat-ch",
    slug: "channels",
    label: "Channels",
    description: "Connect WhatsApp, Instagram, Messenger, Email, and more.",
    icon: "📡",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    accentRaw: "#0ea5e9",
    sections: [
      { id: "s-ch-1", slug: "whatsapp", title: "WhatsApp Business API", description: "Connect and configure WhatsApp", icon: "💬", articles: ["connect-whatsapp", "whatsapp-message-templates", "whatsapp-broadcast"] },
      { id: "s-ch-2", slug: "social-channels", title: "Social Channels", description: "Instagram and Facebook Messenger", icon: "📱", articles: ["connect-instagram", "connect-facebook-messenger"] },
      { id: "s-ch-3", slug: "email", title: "Email", description: "Gmail, Outlook, and custom IMAP/SMTP", icon: "✉️", articles: ["connect-email"] },
    ],
  },
  {
    id: "cat-ib",
    slug: "inbox",
    label: "Inbox & Contacts",
    description: "Manage conversations, contacts, labels, and segments.",
    icon: "📬",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    accentRaw: "#8b5cf6",
    sections: [
      { id: "s-ib-1", slug: "conversations", title: "Conversations", description: "Assign, label, snooze, and resolve", icon: "💭", articles: ["manage-conversations"] },
      { id: "s-ib-2", slug: "contacts", title: "Contacts & Segments", description: "Profiles, custom attributes, and segments", icon: "👥", articles: ["contact-profiles", "contact-segments"] },
    ],
  },
  {
    id: "cat-ai",
    slug: "ai-automation",
    label: "AI & Automation",
    description: "AI Agent, AI Assist copilot, and no-code workflow builder.",
    icon: "🤖",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/20",
    accentRaw: "#4f46e5",
    sections: [
      { id: "s-ai-1", slug: "ai-agent", title: "AI Agent", description: "Autonomous conversation handling", icon: "🤖", articles: ["ai-agent-setup"] },
      { id: "s-ai-2", slug: "ai-assist", title: "AI Assist", description: "Reply suggestions and copilot tools", icon: "✨", articles: ["ai-assist"] },
      { id: "s-ai-3", slug: "automation", title: "Automation Workflows", description: "Trigger-condition-action builder", icon: "⚡", articles: ["automation-workflows"] },
    ],
  },
  {
    id: "cat-in",
    slug: "integrations",
    label: "Integrations",
    description: "Connect CRMs, Zapier, Make, and 200+ tools.",
    icon: "🔗",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    accentRaw: "#f97316",
    sections: [
      { id: "s-in-1", slug: "crm", title: "CRM Integrations", description: "HubSpot, Salesforce, Pipedrive", icon: "🏢", articles: ["crm-integrations"] },
      { id: "s-in-2", slug: "no-code-integrations", title: "No-Code Integrations", description: "Zapier, Make, and webhooks", icon: "⚙️", articles: ["zapier-make-integration"] },
    ],
  },
  {
    id: "cat-an",
    slug: "analytics",
    label: "Analytics",
    description: "Reports, dashboards, CSAT, and performance metrics.",
    icon: "📊",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    accentRaw: "#06b6d4",
    sections: [
      { id: "s-an-1", slug: "reports", title: "Reports & Dashboards", description: "Conversation, team, and CSAT reports", icon: "📈", articles: ["reports-overview"] },
    ],
  },
  {
    id: "cat-dev",
    slug: "developer",
    label: "Developer",
    description: "REST API, webhooks, SDKs, and technical integration guides.",
    icon: "⌨️",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    accentRaw: "#f59e0b",
    sections: [
      { id: "s-dev-1", slug: "api-reference", title: "API Reference", description: "Authentication, endpoints, and webhooks", icon: "🔌", articles: ["rest-api-overview"] },
    ],
  },
  {
    id: "cat-sc",
    slug: "security",
    label: "Security",
    description: "SOC 2, GDPR, SSO, data residency, and audit logs.",
    icon: "🔒",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    accentRaw: "#f43f5e",
    sections: [
      { id: "s-sc-1", slug: "compliance", title: "Compliance & Privacy", description: "Security certifications and GDPR tools", icon: "🛡️", articles: ["security-overview"] },
    ],
  },
  {
    id: "cat-bi",
    slug: "billing",
    label: "Billing",
    description: "Plans, seats, invoices, and subscription management.",
    icon: "💳",
    color: "text-slate-300",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
    accentRaw: "#94a3b8",
    sections: [
      { id: "s-bi-1", slug: "subscription", title: "Plans & Subscription", description: "Manage billing and invoices", icon: "💳", articles: ["billing-plans"] },
    ],
  },
];

/* ─── Helper utilities ─── */
export function getCategoryBySlug(slug: string): DocCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug);
}
export function getArticleBySlug(slug: string): DocArticle | undefined {
  return HELP_ARTICLES.find((a) => a.slug === slug);
}
export function getArticlesByCategory(catSlug: string): DocArticle[] {
  return HELP_ARTICLES.filter((a) => a.category === catSlug);
}
export function getArticlesBySection(sectionSlug: string): DocArticle[] {
  return HELP_ARTICLES.filter((a) => a.section === sectionSlug);
}
export function getRelatedArticles(article: DocArticle): DocArticle[] {
  if (!article.relatedSlugs?.length) return [];
  return article.relatedSlugs.map((s) => getArticleBySlug(s)).filter(Boolean) as DocArticle[];
}
export function searchArticles(query: string): DocArticle[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return HELP_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q)) ||
      a.steps.some((s) => s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q))
  );
}
export const POPULAR_ARTICLES = HELP_ARTICLES.filter((a) => a.popular);
export const FEATURED_ARTICLES = HELP_ARTICLES.filter((a) => a.featured);
export function formatDocDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
