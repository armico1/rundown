export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "divider" };

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  body: ContentBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "why-we-built-footnote",
    slug: "why-we-built-footnote",
    category: "Behind the Product",
    title: "Why we built Footnote: the media diet problem",
    excerpt:
      "Most people want to stay informed. The problem isn't motivation — it's the firehose. We built Footnote because we were drowning too.",
    author: "The Footnote Team",
    date: "Mar 28, 2026",
    readTime: "4 min read",
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "There's a question we used to ask ourselves every morning: why do I feel less informed after an hour of reading the news than I did when I woke up?",
      },
      {
        type: "paragraph",
        text: "We'd open Twitter, scroll for twenty minutes, get anxious, close it. Open a news app, skim headlines, feel overwhelmed, put the phone down. Open a newsletter, see 3,000 words, archive it unread. Repeat. We weren't learning anything — we were just consuming.",
      },
      {
        type: "heading",
        text: "The problem isn't the news itself",
      },
      {
        type: "paragraph",
        text: "Journalism is not broken. There is extraordinary reporting happening every day — on climate, on science, on markets, on politics. The problem is the delivery model. The incentives of digital media have created a system where the goal is to capture your attention for as long as possible, not to leave you feeling informed and ready to move on.",
      },
      {
        type: "paragraph",
        text: "Engagement algorithms reward outrage. Infinite scroll removes natural stopping points. Breaking news push notifications retrain your brain to expect constant input. None of these features were designed to help you understand the world. They were designed to keep you inside an app.",
      },
      {
        type: "quote",
        text: "We weren't building a news product. We were building an antidote to how news had started to feel.",
        attribution: "The Footnote Team",
      },
      {
        type: "heading",
        text: "What we tried first",
      },
      {
        type: "paragraph",
        text: "Before building anything, we spent six months trying everything that existed. We subscribed to a dozen newsletters. Some were excellent — well-written, well-sourced, clearly the product of serious journalism. But they were generic. The same stories everyone else was reading, because the same things were trending. If you care about space and personal finance and international relations and not much else, no newsletter spoke to you specifically.",
      },
      {
        type: "paragraph",
        text: "We tried curating our own RSS feeds. That worked better — until it didn't, because maintaining a custom feed is a part-time job. We tried podcast briefings. Good for commutes, but impossible to skim or revisit.",
      },
      {
        type: "paragraph",
        text: "The pattern was always the same: every solution was either too broad, too much work to maintain, or too rigid in format.",
      },
      {
        type: "heading",
        text: "The insight that became Footnote",
      },
      {
        type: "paragraph",
        text: "The solution, we eventually realized, wasn't a better news source. It was a better filter — one that knew what you cared about and applied that filter every single day without you having to do anything.",
      },
      {
        type: "paragraph",
        text: "That's what Footnote is. You tell us your topics once. We build a briefing around those topics every morning. You spend five minutes reading or seven minutes listening. You're done, and you're genuinely caught up on the things that matter to your life and work.",
      },
      {
        type: "list",
        items: [
          "Personalized to your actual interests, not trending topics",
          "Short enough to complete — 5 minutes to read, 7 to listen",
          "Delivered on your schedule, not the news cycle's",
          "No ads, no engagement tricks, no infinite scroll",
        ],
      },
      {
        type: "heading",
        text: "Why free, always",
      },
      {
        type: "paragraph",
        text: "We made a deliberate choice to keep Footnote free. Not freemium, not free for 30 days — free. Staying informed is not a luxury. The ability to understand what's happening in the world shouldn't depend on what you can afford to pay for it.",
      },
      {
        type: "paragraph",
        text: "We're building a sustainable business model that doesn't require charging readers or selling their attention to advertisers. More on that in a future post.",
      },
      {
        type: "paragraph",
        text: "For now: if you've ever felt like staying informed was exhausting, that's not a personal failing. The system was designed to be exhausting. We built Footnote to be the opposite of that.",
      },
    ],
  },
  {
    id: "picking-topics",
    slug: "picking-topics",
    category: "Tips & Tricks",
    title: "How to pick the right topics for your morning brief",
    excerpt:
      "Start narrow, not wide. The readers who get the most value from Footnote pick 3–5 topics they genuinely care about, not 15.",
    author: "The Footnote Team",
    date: "Mar 21, 2026",
    readTime: "3 min read",
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "When people first subscribe to Footnote, we notice two types of behavior. Some pick 3 or 4 topics and never look back. Others select 12, 14, sometimes all 25 — and then quietly stop opening their briefs within two weeks.",
      },
      {
        type: "paragraph",
        text: "The pattern is consistent enough that we've thought hard about it. Here's what we've learned about how to choose topics that will actually make your brief feel useful every morning.",
      },
      {
        type: "heading",
        text: "The paradox of more topics",
      },
      {
        type: "paragraph",
        text: "It feels like more topics means more value. You'll be informed on more things. But it works the opposite way: when you pick 15 topics, your brief tries to cover everything, which means it can't go deep on anything. Stories that would have held your interest get compressed into fragments. The briefing starts to feel like a list of headlines rather than something you actually absorbed.",
      },
      {
        type: "paragraph",
        text: "Three to five topics is the sweet spot. It's enough diversity to keep each morning feeling fresh, narrow enough that every story feels directly relevant to your life.",
      },
      {
        type: "heading",
        text: "Distinguish between your real interests and your guilt interests",
      },
      {
        type: "paragraph",
        text: "This is the most useful distinction we've found. A \"real interest\" is something you'd naturally bring up in conversation, something you'd click on instinctively, something you're genuinely curious about. A \"guilt interest\" is something you feel like you should care about — because it's important, because everyone's talking about it, because you once thought you should know more about it.",
      },
      {
        type: "paragraph",
        text: "Both types of interest are valid. But your brief should be built on real interests, not guilt ones. If you add \"International Affairs\" because you feel you should care about geopolitics but you never find yourself thinking about it during the day, drop it. You're not going to read those stories, and they'll dilute the parts of your brief you actually care about.",
      },
      {
        type: "quote",
        text: "The best brief is one you look forward to, not one that covers everything you think you should know.",
        attribution: "The Footnote Team",
      },
      {
        type: "heading",
        text: "Practical guide to choosing your topics",
      },
      {
        type: "list",
        items: [
          "Think about the last three conversations you had where you talked about something happening in the world. What were those topics?",
          "What do you Google news about when something comes up at work or at dinner?",
          "What sections of a physical newspaper would you actually read cover-to-cover?",
          "What topics come up repeatedly in your professional life and you wish you were more current on?",
        ],
      },
      {
        type: "paragraph",
        text: "The answers to those questions are your real topics. Start there. You can always add more later — Footnote lets you change your topics anytime.",
      },
      {
        type: "heading",
        text: "Use the custom interests field",
      },
      {
        type: "paragraph",
        text: "Our 25 categories cover the major domains, but they're necessarily broad. If you select \"Science\" but you're really only interested in neuroscience and climate science, tell us that in the custom interests field. If \"Sports\" means specifically the NBA and nothing else, say so. The more specific you are, the better calibrated your brief will be.",
      },
      {
        type: "paragraph",
        text: "The custom field is freeform — you can write as naturally as you'd type a message to someone. \"I'm interested in AI, especially large language models and their effect on white-collar work\" gives us much more to work with than just selecting \"Artificial Intelligence.\"",
      },
    ],
  },
  {
    id: "science-of-5min",
    slug: "science-of-5min",
    category: "Research",
    title: "The science behind the 5-minute news brief",
    excerpt:
      "Cognitive load research suggests your brain absorbs structured summaries better than long-form articles when the goal is retention. Here's how we designed for that.",
    author: "The Footnote Team",
    date: "Mar 14, 2026",
    readTime: "5 min read",
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "One of the most common questions we get is some version of: \"Isn't five minutes too short to actually learn anything?\" It's a fair question. It seems to stand to reason that more time spent reading equals more information absorbed.",
      },
      {
        type: "paragraph",
        text: "The research, though, points in a surprising direction. For the specific goal of staying informed on current events — understanding what happened, why it matters, and what comes next — short, well-structured summaries consistently outperform longer articles on retention and comprehension. Here's why.",
      },
      {
        type: "heading",
        text: "Cognitive load and working memory",
      },
      {
        type: "paragraph",
        text: "Working memory — the mental workspace where we process and temporarily hold information — has a limited capacity. Cognitive load theory, developed by educational psychologist John Sweller, describes how complex or poorly organized information can overwhelm this capacity, leading to what researchers call \"cognitive overload.\"",
      },
      {
        type: "paragraph",
        text: "When you're reading a long news article that jumps between context, quotes, historical background, and analysis, your working memory is spending significant resources just organizing the material — figuring out what's signal and what's context. That leaves less capacity for actually encoding the information into long-term memory.",
      },
      {
        type: "paragraph",
        text: "A well-structured summary does that organizational work for you. It presents information in a logical, hierarchical sequence: what happened, why it matters, what comes next. Your working memory can focus on comprehension rather than curation.",
      },
      {
        type: "heading",
        text: "The forgetting curve and news retention",
      },
      {
        type: "paragraph",
        text: "Hermann Ebbinghaus's forgetting curve, replicated countless times since the 1880s, shows that without reinforcement, we forget roughly 50% of new information within an hour and up to 90% within a week. Most people who read the news are not trying to retain it long-term — they're trying to maintain a general picture of what's happening that they can draw on in conversation and decision-making.",
      },
      {
        type: "paragraph",
        text: "For this purpose, daily brief exposure to well-structured information is more effective than occasional deep dives. A five-minute briefing every morning builds and reinforces a mental model of the world incrementally. Occasional two-hour reading sessions, however thorough, produce spikes that fade quickly.",
      },
      {
        type: "quote",
        text: "The goal of news consumption for most people isn't expertise. It's orientation — a working map of what's happening. Short, structured, daily exposure is the most effective way to build and maintain that map.",
        attribution: "The Footnote Team",
      },
      {
        type: "heading",
        text: "The structure of every Footnote brief",
      },
      {
        type: "paragraph",
        text: "We designed Footnote's briefing format specifically around these principles. Every brief follows the same structure, which matters more than most people realize: when readers know what to expect, comprehension improves because they spend less cognitive energy navigating format and more processing content.",
      },
      {
        type: "list",
        items: [
          "The Big Story: 150–250 words on your most important topic. What happened, why it matters, what's next.",
          "Your Beat: 2–3 shorter stories from your other selected topics. One to two sentences each.",
          "In Other News: Brief mentions of 3–4 additional items that touched your interest areas.",
          "The Close: A single sentence framing the day ahead.",
        ],
      },
      {
        type: "paragraph",
        text: "The length constraints are deliberate. 150–250 words is enough to provide real context — significantly more than a headline, significantly less than a full article. It's enough to understand a story, not enough to get lost in it.",
      },
      {
        type: "heading",
        text: "What about depth?",
      },
      {
        type: "paragraph",
        text: "We're not suggesting that short summaries should replace deep journalism. They shouldn't. Long-form reporting and investigative journalism are irreplaceable — they're what makes the summaries meaningful in the first place.",
      },
      {
        type: "paragraph",
        text: "Footnote is designed for a specific use case: staying oriented on a broad range of topics without spending an hour every morning to do it. For topics that draw you in and demand more, the brief should be the starting point, not the destination. We're working on ways to surface deeper reading for the stories that earn it.",
      },
    ],
  },
  {
    id: "bias-free-ai",
    slug: "bias-free-ai",
    category: "Behind the Product",
    title: "Our approach to summarization without the spin",
    excerpt:
      "AI summarization can amplify bias just as easily as reduce it. Here's the methodology we developed to keep our briefings as neutral as possible.",
    author: "The Footnote Team",
    date: "Mar 7, 2026",
    readTime: "6 min read",
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "When we decided to use AI for news summarization, we knew we were taking on a real responsibility. AI systems don't magically produce neutral summaries — they reflect the biases present in their training data, and they can introduce new ones through the choices made during summarization. We spent months thinking about how to do this responsibly before we wrote a single line of code.",
      },
      {
        type: "paragraph",
        text: "This post explains our approach. We're sharing it publicly because we think transparency here is important, and because we want to be held accountable to the standards we describe.",
      },
      {
        type: "heading",
        text: "The problem with single-source summarization",
      },
      {
        type: "paragraph",
        text: "The simplest approach to AI news summarization is to take a single article and ask an AI to shorten it. The problem is that you're then amplifying whatever framing, selection bias, or editorial perspective was present in that source. If the source calls something a \"crisis,\" the summary calls it a \"crisis.\" If the source emphasizes one set of voices and ignores others, the summary does the same — often with even less room to provide counterbalancing context.",
      },
      {
        type: "paragraph",
        text: "We don't use single-source summarization for any story in your Footnote brief.",
      },
      {
        type: "heading",
        text: "Multi-source aggregation",
      },
      {
        type: "paragraph",
        text: "For every story, we aggregate coverage from multiple sources across the political and editorial spectrum before summarizing. This serves two purposes. First, it allows our system to identify the facts that multiple independent sources agree on — those are the most reliable elements to include. Second, it exposes places where coverage meaningfully diverges, which is often itself a signal worth noting in the summary.",
      },
      {
        type: "paragraph",
        text: "Our source set is carefully curated. We include outlets across the political spectrum — not to create false equivalence between fringe and mainstream sources, but to ensure that well-reported perspectives from across the spectrum inform our summaries. We weight sources by editorial standards, not by political leaning.",
      },
      {
        type: "heading",
        text: "Hedging language and attribution",
      },
      {
        type: "paragraph",
        text: "AI systems have a tendency to state things with more certainty than the underlying reporting warrants. A source might write \"officials say the situation is serious\" and an AI summary might write \"the situation is serious\" — stripping the attribution and converting reported opinion into apparent fact.",
      },
      {
        type: "paragraph",
        text: "We have explicit instructions in our summarization pipeline to preserve attribution and hedging language. When sources say something \"may\" happen, our summaries say it \"may\" happen. When something is reported by one source but not confirmed widely, we flag it. When officials or experts disagree about a situation, we note the disagreement rather than picking a winner.",
      },
      {
        type: "quote",
        text: "A good summary doesn't tell you what to think about a story. It tells you what happened, who says so, and what they say it means — clearly distinguishing between facts and interpretations.",
        attribution: "The Footnote Team",
      },
      {
        type: "heading",
        text: "What we can't fully solve",
      },
      {
        type: "paragraph",
        text: "We want to be honest about the limits of our approach. Source selection is itself a form of editorial judgment, and our editorial team makes those calls. We're transparent that this involves human choices, and we're not claiming to have eliminated all bias from our briefings.",
      },
      {
        type: "paragraph",
        text: "AI systems can also fail in ways that are hard to predict. They can misread context, miss irony, or apply patterns from their training that don't fit the specific story. We have human review processes for our highest-volume story types, but we don't have a human editor reviewing every brief before it goes out — that's not scalable. We're investing in better automated checking and in making it easy for readers to flag summaries that feel off.",
      },
      {
        type: "list",
        items: [
          "If a brief you receive feels biased or inaccurate, reply directly to the email and tell us specifically what felt wrong.",
          "We review every piece of feedback and use it to improve our summarization guidelines.",
          "We will never claim to be perfectly neutral — that's not an achievable standard. Our goal is to be fair, consistent, and transparent about our methodology.",
        ],
      },
      {
        type: "heading",
        text: "Why this matters",
      },
      {
        type: "paragraph",
        text: "AI-generated content is going to become a larger and larger part of how people consume information. The practices that get established now — about source diversity, attribution, hedging, transparency about uncertainty — will shape whether AI news tools are net positive or net negative for public discourse.",
      },
      {
        type: "paragraph",
        text: "We're a small team, and we can't solve this industry-wide. But we can hold ourselves to high standards in what we build, and we can share our approach publicly so others can critique it, build on it, or hold us to it.",
      },
    ],
  },
  {
    id: "healthier-news",
    slug: "healthier-news",
    category: "Wellness",
    title: "Building a healthier relationship with the news",
    excerpt:
      "Doomscrolling is a real phenomenon with measurable mental health effects. How one intentional daily brief can help break the cycle.",
    author: "The Footnote Team",
    date: "Feb 28, 2026",
    readTime: "4 min read",
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "In 2020, the American Psychological Association coined the term \"doomscrolling\" to describe the compulsive consumption of negative news content, even when it causes distress. By 2024, studies in multiple countries had found that a significant portion of adults reported feeling worse after reading the news — more anxious, more helpless, less able to concentrate — and yet continued doing it.",
      },
      {
        type: "paragraph",
        text: "This isn't a moral failing. It's a predictable response to how modern news products are designed. Understanding why it happens is the first step to doing something about it.",
      },
      {
        type: "heading",
        text: "Why your brain keeps scrolling",
      },
      {
        type: "paragraph",
        text: "The human brain evolved to pay close attention to threats. Bad news isn't just emotionally harder to process — it's literally more attention-grabbing at a neurological level. News platforms know this, and their engagement models exploit it. Headlines are written to create anxiety. \"Breaking news\" alerts interrupt your attention at random intervals, training your brain to expect that at any moment something terrible might be happening that you need to know about immediately.",
      },
      {
        type: "paragraph",
        text: "The variable reward pattern — sometimes you open a push notification and it's genuinely important, sometimes it's nothing — is the same mechanism that makes slot machines so compelling. You can't predict which pull will pay off, so you keep pulling.",
      },
      {
        type: "heading",
        text: "What the research shows",
      },
      {
        type: "paragraph",
        text: "Research on news consumption and mental health has become substantially more robust over the past decade. The consistent findings: exposure to distressing news content is associated with increased anxiety, depressive symptoms, and a sense of helplessness. High-frequency news checking — looking at your phone or refreshing news apps many times per day — is more strongly associated with these effects than total daily consumption time.",
      },
      {
        type: "paragraph",
        text: "In other words, checking the news ten times for two minutes each is worse for your wellbeing than reading the news once for twenty minutes, even if the total time is the same. Frequency of exposure to interruption and anxiety-inducing content is the key variable, not duration.",
      },
      {
        type: "quote",
        text: "The goal isn't to be uninformed. It's to be informed without being consumed by the process of becoming informed.",
        attribution: "The Footnote Team",
      },
      {
        type: "heading",
        text: "Practical steps toward a healthier news diet",
      },
      {
        type: "list",
        items: [
          "Turn off all news push notifications. If something is genuinely important enough to need your attention immediately, someone will tell you.",
          "Choose one time of day to read or listen to the news, and close it when you're done. Morning works well for many people because it sets a frame for the day without leaving you distracted all afternoon.",
          "Distinguish between \"staying informed\" and \"monitoring the situation.\" You don't need to watch a story develop in real time. The outcome will be what it is whether or not you're watching.",
          "Unsubscribe from sources that reliably make you feel worse. Being informed about something is not worth the cognitive and emotional cost if the source is designed to enrage rather than inform.",
          "Give yourself permission not to have an opinion on everything. You don't need to be caught up on every story, every day.",
        ],
      },
      {
        type: "heading",
        text: "Where Footnote fits",
      },
      {
        type: "paragraph",
        text: "Footnote is designed to be your one news interaction of the day, not a supplement to the existing fire hose. If you're using it well, you read or listen in the morning, feel genuinely informed on the things that matter to you, and don't feel compelled to check anything else.",
      },
      {
        type: "paragraph",
        text: "That's an ambitious goal, and we know it depends on Footnote being good enough to deserve that trust. We take it seriously. The brief should leave you feeling oriented and ready to engage with your day — not anxious, not overwhelmed, not hooked.",
      },
    ],
  },
  {
    id: "mission",
    slug: "mission",
    category: "Community",
    title: "Why we want to change how you consume the news",
    excerpt:
      "The news isn't broken — the delivery model is. We started Footnote to prove that staying informed shouldn't feel like a second job.",
    author: "The Footnote Team",
    date: "Feb 21, 2026",
    readTime: "3 min read",
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "There's a version of staying informed that feels good. You spend a few minutes in the morning, you understand what's happening, you go about your day with a clearer picture of the world. You're not anxious. You're not exhausted. You just know things.",
      },
      {
        type: "paragraph",
        text: "That version of staying informed used to exist. When newspapers were the primary medium, you'd read the paper at breakfast, fold it up, and that was enough. The news had a beginning and an end. The paper didn't follow you through the day, demanding your attention every time something changed.",
      },
      {
        type: "heading",
        text: "What broke",
      },
      {
        type: "paragraph",
        text: "Digital media didn't just change the format of news — it changed its economic model, and that changed everything. When the revenue comes from advertising, the product optimizes for attention. More time on platform, more impressions, more ad revenue. The incentive isn't to inform you well. It's to keep you engaged.",
      },
      {
        type: "paragraph",
        text: "The result is a media ecosystem that competes ferociously for your attention by any means necessary. Outrage works. Fear works. Drama works. Uncertainty works — because if you're not sure what's going to happen, you'll keep checking. None of these mechanisms were designed with your wellbeing in mind.",
      },
      {
        type: "heading",
        text: "The delivery model failure",
      },
      {
        type: "paragraph",
        text: "It's important to separate this from a critique of journalism itself. There is serious, important, life-changing reporting happening every day. Journalists risk their safety to document things that need to be documented. Investigative teams spend years on stories that hold power accountable. This work is essential.",
      },
      {
        type: "paragraph",
        text: "The problem isn't the journalism. It's the delivery layer — the apps and platforms and algorithms that sit between the journalism and the reader. That layer has been optimized for engagement at the expense of understanding.",
      },
      {
        type: "quote",
        text: "Great journalism deserves to be understood, not merely encountered.",
        attribution: "The Footnote Team",
      },
      {
        type: "heading",
        text: "What we're trying to build",
      },
      {
        type: "paragraph",
        text: "Footnote is a bet that a delivery model can be built around the reader's interests rather than around engagement metrics. The brief is short not because we're cutting corners, but because five minutes is genuinely enough to stay well-informed when the curation is excellent and the format is designed for comprehension. It arrives once a day not because we're lazy, but because once a day is how often you need it.",
      },
      {
        type: "list",
        items: [
          "We don't show you more content when you're anxious — we close.",
          "We don't have a comment section or a share mechanic that rewards outrage.",
          "We don't send you breaking news alerts at midnight.",
          "We don't track which stories made you click most and show you more of that.",
        ],
      },
      {
        type: "paragraph",
        text: "Those are easy things to not do, and every other product does them anyway, because engagement is how they make money.",
      },
      {
        type: "heading",
        text: "Our north star",
      },
      {
        type: "paragraph",
        text: "Our goal is simple: at the end of your Footnote brief, you should feel informed, calm, and done. Not compelled to check something else. Not worried you missed something. Done.",
      },
      {
        type: "paragraph",
        text: "If we achieve that, we'll have built something genuinely useful. We're just getting started.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  return BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || true)
  ).slice(0, count);
}
