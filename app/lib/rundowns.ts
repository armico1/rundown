export interface RundownSection {
  label: string;
  headline?: string;
  body: string;
}

export interface RundownEdition {
  slug: string;
  date: string;
  shortDate: string;
  dayOfWeek: string;
  topStory: string;
  topics: string[];
  sections: RundownSection[];
}

export const RUNDOWNS: RundownEdition[] = [
  {
    slug: "apr-5-2026",
    date: "Saturday, April 5, 2026",
    shortDate: "Apr 5",
    dayOfWeek: "Saturday",
    topStory:
      "Global markets reacted sharply to new tariff announcements, with the S&P 500 sliding 2.1% in early trading.",
    topics: ["Stocks & Markets", "Global Economy", "US Politics"],
    sections: [
      {
        label: "Good Morning",
        body: "It's Saturday, April 5. Markets closed the week on a rough note, a trade policy shift sent shockwaves through global exchanges, and the economic calendar picks back up Monday. Here's what you need to know.",
      },
      {
        label: "The Big Story",
        headline: "Markets tumble on sweeping new tariff announcement",
        body: "The White House announced a sweeping new round of tariffs on Friday afternoon, targeting imports from a broad set of trading partners with rates ranging from 15% to 34%. The announcement came without the extended consultation period that had preceded previous trade actions, catching markets and trading partners off-guard. The S&P 500 fell 2.1% in after-hours trading and futures pointed to further losses at Monday's open. The Dow shed more than 800 points.\n\nThe administration framed the move as a necessary correction to longstanding trade imbalances. Critics, including several business associations and a handful of Republican lawmakers, warned that the breadth and speed of the action risked triggering retaliatory measures that could escalate into a broader trade conflict. China's Ministry of Commerce said it was evaluating its response. The European Union called for an emergency consultation meeting.\n\nEconomists were divided on the likely impact. Some argued that the tariffs would primarily function as a negotiating lever and would be walked back in weeks. Others warned that markets were underestimating the risk of a prolonged standoff that could filter through to consumer prices within months.",
      },
      {
        label: "Markets Today",
        headline: "Broad selloff, volatility spikes",
        body: "The selloff was broad, with all eleven S&P 500 sectors closing lower. Consumer discretionary and technology stocks bore the brunt of the decline. The VIX — Wall Street's fear gauge — jumped to its highest level since late 2024. Treasury yields fell as investors moved toward safe-haven assets. Gold rose 1.4%. Oil slipped on fears of reduced global demand. The dollar strengthened against most major currencies.",
      },
      {
        label: "In Other News",
        body: "**Global reaction:** Canada and Mexico issued joint statements expressing \"serious concern\" and signaling they were prepared to respond with countermeasures. Both countries had exemptions under the existing trade framework that appear to have been partially revoked.\n\n**What Monday holds:** All eyes are on whether China issues a formal retaliatory response before U.S. markets open. Any announcement over the weekend could set the tone for what shapes up to be a volatile week.\n\n**Consumer impact:** Analysts at several investment banks began revising inflation forecasts upward, with some estimating that the tariffs could add between 0.3 and 0.8 percentage points to the Consumer Price Index over the next 12 months depending on retaliation levels.",
      },
      {
        label: "That's Your Brief",
        body: "Markets will be watching trade news closely all weekend. Monday's open will be telling. Enjoy your Saturday — we'll be back Monday morning.",
      },
    ],
  },
  {
    slug: "apr-4-2026",
    date: "Friday, April 4, 2026",
    shortDate: "Apr 4",
    dayOfWeek: "Friday",
    topStory:
      "A landmark climate agreement was signed by 40 nations, committing to net-zero emissions in the energy sector by 2040.",
    topics: ["Climate & Energy", "International Affairs", "World News"],
    sections: [
      {
        label: "Good Morning",
        body: "It's Friday, April 4. A major climate agreement was formalized overnight, a long-running diplomatic negotiation reached a breakthrough, and the week ends on a note of cautious international optimism. Here's what happened.",
      },
      {
        label: "The Big Story",
        headline: "40 nations sign landmark energy transition agreement",
        body: "Forty countries — including the United States, the European Union, Japan, Brazil, and India — signed the Geneva Energy Transition Framework late Thursday, committing to achieve net-zero emissions in their electricity and energy sectors by 2040. The agreement, years in the making, is the most ambitious multilateral climate commitment since the Paris Agreement and notably includes binding review mechanisms that its predecessor largely lacked.\n\nThe framework requires signatory nations to submit annual emissions reports, subject to independent third-party verification — a key demand from smaller island nations who argued that previous agreements had no meaningful accountability structure. Nations that fall significantly behind their stated targets will face a formal review process, though the agreement stops short of imposing financial penalties.\n\nChina and Russia did not sign the agreement. China's government issued a statement saying it remained committed to its own carbon neutrality timeline of 2060 and was \"carefully studying\" the framework. Analysts noted that China's participation will ultimately determine whether the agreement achieves its stated goals, given that it accounts for roughly 30% of global energy emissions.\n\nClimate advocates described the agreement as a genuine step forward while cautioning that commitments and implementation are different things. Several major environmental organizations called on signatory governments to immediately begin translating the commitment into domestic legislation.",
      },
      {
        label: "In Other News",
        body: "**Clean energy investment:** Several of the signatory nations announced parallel investment pledges in clean energy infrastructure. The U.S. committed an additional $40 billion to domestic clean energy manufacturing under the framework, contingent on Congressional approval.\n\n**Diplomatic context:** The agreement was the centerpiece of a three-day summit in Geneva that also produced separate agreements on nuclear nonproliferation monitoring and international AI governance — a rare moment of multilateral momentum on several fronts simultaneously.\n\n**Market reaction:** Clean energy stocks rose broadly on the news. Solar and wind equipment manufacturers were among the biggest gainers.",
      },
      {
        label: "That's Your Brief",
        body: "A rare piece of broadly positive international news to close the week. Whether it translates into real change depends on the hard work that follows. Have a good Friday.",
      },
    ],
  },
  {
    slug: "apr-3-2026",
    date: "Thursday, April 3, 2026",
    shortDate: "Apr 3",
    dayOfWeek: "Thursday",
    topStory:
      "OpenAI unveiled its latest model, claiming significant advances in reasoning and coding benchmarks.",
    topics: ["Artificial Intelligence", "Business & Tech", "Science"],
    sections: [
      {
        label: "Good Morning",
        body: "It's Thursday, April 3. The AI race had a significant moment yesterday, a major tech policy hearing concluded on Capitol Hill, and the jobs report comes out tomorrow. Here's what matters.",
      },
      {
        label: "The Big Story",
        headline: "OpenAI's new model claims major reasoning leap",
        body: "OpenAI announced its latest foundation model on Wednesday, claiming benchmark results that represent a substantial step forward in mathematical reasoning and software engineering tasks. The company said the new model outperforms its previous generation by a significant margin on standard tests measuring multi-step reasoning, code generation, and scientific problem-solving.\n\nThe announcement landed amid intense competitive pressure from Google, Anthropic, Meta, and a wave of well-funded startups all racing toward the same frontier. Benchmark claims in AI have become a contested terrain — multiple researchers noted that performance on published benchmarks doesn't always translate directly to real-world usefulness, and some pointed to signs of benchmark saturation where models improve on tests without corresponding improvements in practical applications.\n\nOpenAI CEO Sam Altman, speaking at the announcement event, described the model as a meaningful step toward systems that can serve as \"genuine intellectual collaborators\" rather than sophisticated text generators. The company said the model will be available to enterprise customers in the next several weeks, with broader availability to follow.\n\nThe announcement triggered a fresh round of discussion about the pace of AI development and its implications for knowledge work. Economists and labor researchers are increasingly studying which professional tasks are most immediately affected by models at this capability level, with software engineering, data analysis, and certain aspects of legal and financial work receiving the most attention.",
      },
      {
        label: "In Other News",
        body: "**Capitol Hill:** A Senate subcommittee concluded two days of testimony on AI regulation, with lawmakers signaling bipartisan support for some form of disclosure requirements around AI-generated content, though deeper regulatory frameworks remain contested.\n\n**Competitor response:** Google's DeepMind unit reiterated that its own next-generation model release was on track for later this quarter. Anthropic said it had no response to OpenAI's announcement at this time.\n\n**Jobs report preview:** Economists are expecting Friday's monthly jobs report to show continued labor market resilience, with consensus estimates around 175,000 new jobs added in March. Any significant deviation from that range could move markets.",
      },
      {
        label: "That's Your Brief",
        body: "The AI story keeps accelerating. Friday brings the jobs report — we'll have the numbers in your inbox. See you tomorrow.",
      },
    ],
  },
  {
    slug: "apr-2-2026",
    date: "Wednesday, April 2, 2026",
    shortDate: "Apr 2",
    dayOfWeek: "Wednesday",
    topStory:
      "The Federal Reserve held rates steady, signaling caution amid mixed economic signals from the labor market.",
    topics: ["Stocks & Markets", "Personal Finance", "Global Economy"],
    sections: [
      {
        label: "Good Morning",
        body: "It's Wednesday, April 2. The Fed made its decision, markets responded, and the debate about where interest rates go from here got more interesting. Here's the rundown.",
      },
      {
        label: "The Big Story",
        headline: "Fed holds rates, signals data-dependent path ahead",
        body: "The Federal Reserve's Open Market Committee voted unanimously to hold the federal funds rate in its current range at yesterday's policy meeting, as widely expected by markets. The decision itself wasn't the news — the statement and Chair Jerome Powell's subsequent press conference were.\n\nPowell described the current economic environment as one of \"genuine uncertainty,\" citing mixed signals from the labor market, persistent services inflation that has proven stickier than models predicted, and external factors including energy prices and trade policy as inputs the Fed is actively monitoring. He explicitly pushed back against market expectations of rate cuts in the second quarter, saying the committee needed to see \"more than one or two months of favorable data\" before it would be appropriate to ease.\n\nThe messaging was more hawkish than many analysts had anticipated. Markets sold off initially before recovering most of their losses by the close. The two-year Treasury yield, which is most sensitive to near-term Fed expectations, rose notably — a sign that traders were pushing back their expected timeline for the first rate cut.\n\nFor consumers with variable-rate debt — credit cards, home equity lines, adjustable mortgages — the hold means no immediate relief. Housing affordability remains under pressure. For savers, high-yield savings accounts and short-term Treasuries continue to offer historically attractive rates relative to recent years.",
      },
      {
        label: "Markets Today",
        headline: "Initial selloff, partial recovery",
        body: "Stocks fell sharply immediately after the statement, with rate-sensitive sectors like real estate and utilities leading declines. The S&P 500 ended the day down 0.6% after trading down as much as 1.4% intraday. The 10-year Treasury yield rose to 4.61%. Bank stocks were mixed — higher rates support lending margins but also raise concerns about credit quality.",
      },
      {
        label: "In Other News",
        body: "**What traders are watching:** The next major data points are Friday's jobs report and mid-month CPI data. Either could shift the calculus significantly.\n\n**Personal finance implications:** Financial advisors broadly recommend taking advantage of current high yields on short-term savings instruments for cash you don't need immediately. I-bonds, high-yield savings accounts, and short-duration Treasury ETFs are all capturing attention.\n\n**Global picture:** The European Central Bank has been on a slightly different trajectory, having already begun cutting rates last year. The divergence between Fed and ECB policy is a significant driver of dollar strength.",
      },
      {
        label: "That's Your Brief",
        body: "The Fed is in wait-and-see mode. So are markets. Friday's jobs number will be closely watched. See you tomorrow.",
      },
    ],
  },
  {
    slug: "apr-1-2026",
    date: "Tuesday, April 1, 2026",
    shortDate: "Apr 1",
    dayOfWeek: "Tuesday",
    topStory:
      "A new study found that daily exercise reduces the risk of cognitive decline by 35% in adults over 50.",
    topics: ["Health & Wellness", "Science"],
    sections: [
      {
        label: "Good Morning",
        body: "It's Tuesday, April 1. A major longitudinal health study released its findings, there's movement on healthcare legislation, and science had a good week. Here's what to know.",
      },
      {
        label: "The Big Story",
        headline: "Large study links daily exercise to significantly lower dementia risk",
        body: "A 12-year longitudinal study published in The Lancet yesterday followed over 95,000 adults aged 50 and older across seven countries, tracking their physical activity levels alongside cognitive assessments conducted every two years. The findings, described by the researchers as among the strongest evidence yet on exercise and brain health, showed that adults who engaged in at least 30 minutes of moderate physical activity daily had a 35% lower risk of cognitive decline compared to their sedentary counterparts.\n\nImportantly, the effect was not limited to vigorous exercise. Brisk walking, cycling at a comfortable pace, swimming, and even active gardening all counted — as long as the activity was consistent and raised the heart rate moderately. The protective effect was present across all demographic groups studied, though it was most pronounced in adults who had been sedentary earlier in life and adopted regular activity in their 50s.\n\nThe study's lead author noted that the findings supported the hypothesis that exercise's protective effects on the brain work through multiple pathways: improved cardiovascular health, reduced inflammation, better sleep quality, and possibly direct neurological effects including increased production of brain-derived neurotrophic factor (BDNF), a protein associated with neuron growth and maintenance.\n\nThe World Health Organization currently recommends 150 minutes of moderate activity per week for adults — consistent with the study's threshold. The researchers said the findings reinforced existing guidelines and provided strong motivation for healthcare providers to treat physical activity as a primary prevention strategy for dementia.",
      },
      {
        label: "In Other News",
        body: "**Healthcare legislation:** A bipartisan group of senators released a framework for expanding Medicare coverage for preventive care services, citing studies like the new exercise research as evidence that prevention reduces long-term costs. The framework has a long road ahead but represents an unusual moment of cross-aisle agreement.\n\n**Sleep science:** A companion piece published alongside the Lancet study found that the combination of regular exercise and consistent sleep schedules (going to bed and waking at the same time daily) produced a synergistic protective effect exceeding either factor alone.\n\n**What doctors say:** Several neurologists interviewed by major outlets noted that while the study is compelling, correlation and causation are difficult to fully untangle — healthier people may exercise more, rather than exercise making people healthier. The researchers used extensive controls to account for baseline health, but acknowledged this remains a limitation of observational research.",
      },
      {
        label: "That's Your Brief",
        body: "Go for a walk. Seriously. The evidence keeps stacking up. See you tomorrow.",
      },
    ],
  },
  {
    slug: "mar-31-2026",
    date: "Monday, March 31, 2026",
    shortDate: "Mar 31",
    dayOfWeek: "Monday",
    topStory:
      "NASA confirmed the discovery of complex organic molecules in a Mars soil sample, reigniting the search for ancient life.",
    topics: ["Space", "Science", "World News"],
    sections: [
      {
        label: "Good Morning",
        body: "It's Monday, March 31. NASA dropped a major announcement, the week opens with a significant science story, and there's a lot to unpack. Let's get into it.",
      },
      {
        label: "The Big Story",
        headline: "NASA confirms complex organics in Mars sample — the most significant finding yet",
        body: "NASA scientists announced Monday that analysis of a Mars soil sample returned by the Perseverance rover has confirmed the presence of complex organic molecules — carbon-containing compounds that, on Earth, are associated with biological processes. The announcement, made at a press conference at NASA's Jet Propulsion Laboratory, was carefully worded to avoid claiming evidence of life, but researchers called it \"the most scientifically significant finding\" from the Mars sample return program to date.\n\nThe molecules detected include several aromatic hydrocarbons and what scientists described as \"biosignature-compatible\" compounds — meaning they could have been produced by living organisms, though they could also have formed through non-biological chemical processes. Distinguishing between biological and abiotic origins requires additional analysis, and the research team said definitive conclusions were still years away.\n\nThe samples are part of the ongoing Mars Sample Return mission, a joint NASA-ESA effort to retrieve material collected by Perseverance and bring it to Earth-based laboratories for detailed analysis. Earth labs offer analytical capabilities orders of magnitude beyond what can be achieved with rover-mounted instruments, and scientists have been anticipating these results since sample collection began in 2021.\n\nThe scientific community's reaction was a mix of excitement and appropriate caution. Several prominent astrobiologists noted that the detection of complex organics significantly narrows the range of hypotheses about Mars's past — at minimum, the planet had the chemical building blocks for life at some point in its history. Whether it ever had life itself remains unanswered.\n\nPublic interest in the announcement was substantial, with NASA's livestream drawing its largest audience since the Ingenuity helicopter's first flight.",
      },
      {
        label: "In Other News",
        body: "**The sample return mission:** The physical samples have not yet returned to Earth — that milestone is currently scheduled for the early 2030s. The current findings come from analysis performed by Perseverance's onboard instruments, which are sophisticated but limited compared to Earth lab capabilities. The anticipation around sample return is now significantly higher.\n\n**Historical context:** The question of life on Mars has been a central driver of space exploration for decades. Previous Mars missions have detected methane fluctuations and geological evidence of ancient liquid water — each finding circumstantially interesting but not conclusive. The organic molecule discovery represents a qualitative step up in the strength of the evidence base.\n\n**Private space:** Several commercial space companies issued statements noting the finding as further motivation for investment in Mars-focused missions. SpaceX said the announcement reinforced its long-term focus on Mars as a destination.",
      },
      {
        label: "That's Your Brief",
        body: "One of those mornings where the news genuinely earns your attention. The Mars story will develop over years — but this is a moment worth noting. Have a great Monday.",
      },
    ],
  },
];

export function getRundownBySlug(slug: string): RundownEdition | undefined {
  return RUNDOWNS.find((r) => r.slug === slug);
}
