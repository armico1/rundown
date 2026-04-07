# Footnote — Full Backend & Automation Guide

Everything you need to connect the website to a fully automated daily newsletter pipeline.

---

## The Full Stack

| Layer | Tool | What it does | Cost |
|---|---|---|---|
| Frontend | Next.js on Vercel | The website | Free |
| Automation | Make.com | The brain connecting everything | Free–$9/mo |
| Email delivery | Kit (ConvertKit) | Sends newsletters, manages subscribers | Free up to 10k |
| AI content | Claude API | Writes the daily briefings | ~$0.15–0.50/day |
| Archive / DB | Airtable | Stores newsletters + subscriber prefs | Free |
| Audio (optional) | ElevenLabs | Converts text to speech | Free up to 10k chars/mo |
| Podcast (optional) | Transistor.fm | RSS podcast hosting | $19/mo |

---

## Part 1: Vercel Deployment

### Step 1: Deploy the site

Open Terminal and run these from your project folder:

```bash
cd "/Users/aricohen/Documents/coding/Project test daily rundown"
npm install
npx vercel login
npx vercel
```

Follow the prompts — Vercel auto-detects Next.js. You'll get a URL like `footnote-abc123.vercel.app`.

For production deploys going forward, just run:
```bash
npx vercel --prod
```

### Step 2: Connect a custom domain (optional but recommended)

1. Buy a domain (Namecheap, Google Domains, etc.) — e.g. `getfootnote.com`
2. In Vercel dashboard → your project → **Settings → Domains**
3. Add your domain and follow the DNS instructions

---

## Part 2: Airtable Setup (your database)

Airtable stores all your subscriber data and newsletter archive.

### Step 1: Create a free account at airtable.com

### Step 2: Create a base called "Footnote"

Create two tables:

**Table 1: Subscribers**

| Field | Type | Notes |
|---|---|---|
| Email | Email | Primary field |
| Name | Text | |
| Topics | Long text | Comma-separated: "world-news,ai,sports" |
| Custom Topics | Text | e.g. "NBA, Tesla" |
| Frequency | Single select | daily / every-other-day / 3x-week / weekly |
| Format | Single select | read / listen / both |
| Subscribed At | Date | |
| Active | Checkbox | Default: checked |

**Table 2: Newsletter Archive**

| Field | Type | Notes |
|---|---|---|
| Date | Date | e.g. 2026-04-07 |
| Topic Combo | Text | Hash of topics for deduplication |
| Subject Line | Text | Email subject |
| HTML Content | Long text | Full email HTML |
| Text Content | Long text | Plain text version |
| Audio URL | URL | ElevenLabs output link |
| Sent To Count | Number | How many subscribers got this |

### Step 3: Get your Airtable API key

1. Go to airtable.com/create/tokens
2. Create a Personal Access Token
3. Scopes needed: `data.records:read`, `data.records:write`
4. Select your "Footnote" base
5. Copy the token — you'll need it in Make.com

---

## Part 3: Kit (ConvertKit) Setup

Kit handles all email delivery.

### Step 1: Create a free account at kit.com

### Step 2: Create a Form

1. In Kit dashboard → **Grow → Landing Pages & Forms → New Form**
2. Name it "Footnote Website Signup"
3. Skip the design (you won't use the form itself, just the ID)
4. Save it and copy the **Form ID** from the URL (e.g. `12345678`)

### Step 3: Create Custom Fields

Go to **Settings → Custom Fields** and add these:
- `topics` (text)
- `custom_topics` (text)
- `frequency` (text)
- `format` (text)

### Step 4: Get your API key

Go to **Settings → Developer → API Keys** → copy your v3 API Key and API Secret.

---

## Part 4: Claude API Setup

### Step 1: Get an API key

1. Go to console.anthropic.com
2. Create an account (separate from your Claude.ai subscription)
3. Go to **API Keys → Create Key**
4. Copy the key — starts with `sk-ant-...`

### Step 2: Add billing

Go to **Billing** and add a payment method. This is pay-as-you-go — a typical daily newsletter run costs **$0.15–0.50** depending on subscriber count.

**Recommended limits**: Set a monthly budget cap of $30 in the billing settings to stay safe.

---

## Part 5: ElevenLabs Setup (audio, optional)

### Step 1: Create account at elevenlabs.io (free tier works)

### Step 2: Pick a voice

1. Go to **VoiceLab → Voice Library**
2. Pick a clear, professional-sounding voice (recommended: "Adam" or "Rachel")
3. Copy the **Voice ID** from the voice settings

### Step 3: Get API key

**Settings → API Key** → copy it

---

## Part 6: Make.com — The Automation Brain

Make.com connects everything. You need **3 scenarios**:

---

### Scenario 1: Subscribe (triggered when someone signs up)

**Trigger**: Webhook → receives data from your Next.js site
**Flow**: New subscriber → Add to Airtable → Add to Kit

**How to build it:**

1. Go to make.com → **Create a new scenario**
2. **Module 1**: Webhooks → Custom Webhook
   - Click "Add" → name it "Footnote Subscribe"
   - Copy the webhook URL (looks like `https://hook.us1.make.com/abc123`)
   - **Save this URL** — you'll add it to Vercel env vars

3. **Module 2**: Airtable → Create a Record
   - Table: Subscribers
   - Map fields: Email → `{{1.email}}`, Name → `{{1.name}}`, etc.

4. **Module 3**: HTTP → Make a Request
   - URL: `https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe`
   - Method: POST
   - Body (JSON):
   ```json
   {
     "api_key": "YOUR_KIT_API_KEY",
     "email": "{{1.email}}",
     "first_name": "{{1.name}}",
     "fields": {
       "topics": "{{1.topics}}",
       "frequency": "{{1.frequency}}",
       "format": "{{1.format}}"
     }
   }
   ```

5. **Turn the scenario ON** (toggle in top-right)

---

### Scenario 2: Daily Newsletter (scheduled, runs every morning)

This is the core of Footnote. It runs every day at 7:00 AM ET.

**Flow**: Fetch subscribers from Airtable → Group by topic combo → For each unique combo, generate content with Claude → Send personalized email via Kit → Archive in Airtable

**How to build it:**

1. **Module 1**: Schedule trigger
   - Set to run daily at 7:00 AM ET (11:00 AM UTC)

2. **Module 2**: Airtable → Search Records
   - Table: Subscribers
   - Filter: `Active = true`
   - This returns all active subscribers

3. **Module 3**: Tools → Set Variable
   - Group subscribers by their `topics` field to batch similar readers

4. **Module 4 (repeat for each unique topic combo)**: HTTP → Make a Request (Claude API)
   - URL: `https://api.anthropic.com/v1/messages`
   - Method: POST
   - Headers:
     - `x-api-key`: `YOUR_ANTHROPIC_API_KEY`
     - `anthropic-version`: `2023-06-01`
     - `content-type`: `application/json`
   - Body (JSON):
   ```json
   {
     "model": "claude-opus-4-6",
     "max_tokens": 2000,
     "messages": [{
       "role": "user",
       "content": "Today is {{formatDate(now; 'MMMM D, YYYY')}}. Write a personalized Footnote morning briefing for a subscriber interested in: {{topics}}. Custom interests: {{customTopics}}.\n\nFormat:\n- Greeting line\n- THE BIG STORY (150-200 words on the most important story across their topics)\n- 3-4 shorter IN OTHER NEWS items (50-75 words each, only covering their selected topics)\n- Sign-off\n\nTone: Informed but conversational. Like a smart friend who read everything so you don't have to. US-focused but globally aware. No fluff. Write in plain text formatted for email."
     }]
   }
   ```

5. **Module 5**: Airtable → Create Record
   - Table: Newsletter Archive
   - Store the generated content, date, and topic combo

6. **Module 6**: HTTP → Send email via Kit
   - Use Kit's broadcast API to send to the subscriber segment matching this topic combo

---

### Scenario 3: Catch Me Up (triggered on demand)

**Trigger**: Webhook from your website's `/api/catchup` endpoint
**Flow**: Receive topics + timeframe → Generate catch-up with Claude → Return JSON to website + send email

**How to build it:**

1. **Module 1**: Webhooks → Custom Webhook
   - Name it "Footnote Catchup"
   - Copy the webhook URL → save as `MAKE_CATCHUP_WEBHOOK_URL`

2. **Module 2**: HTTP → Make a Request (Claude API)
   - Same headers as Scenario 2
   - Body (JSON):
   ```json
   {
     "model": "claude-opus-4-6",
     "max_tokens": 2500,
     "messages": [{
       "role": "user",
       "content": "Create a catch-up briefing for someone who missed the last {{days}} days of news. Topics they care about: {{topics}}. Today is {{formatDate(now; 'MMMM D, YYYY')}}.\n\nReturn a JSON array of stories in this format:\n[\n  {\n    \"headline\": \"Short punchy headline\",\n    \"summary\": \"2-3 sentence summary of what happened and why it matters\",\n    \"topic\": \"the topic id from this list: world-news, politics, stocks, business-tech, science, health, sports, entertainment, climate, ai, crypto\",\n    \"date\": \"e.g. Mon, Apr 7\"\n  }\n]\n\nInclude 5-8 stories. Only return the JSON array, no other text."
     }]
   }
   ```

3. **Module 3**: Webhooks → Webhook Response
   - Return the parsed stories array as JSON back to the website

---

## Part 7: Add Environment Variables to Vercel

Once you have all your webhook URLs and API keys, add them to Vercel:

1. Go to vercel.com → your Footnote project → **Settings → Environment Variables**
2. Add each one:

```
MAKE_WEBHOOK_URL          = https://hook.us1.make.com/your-subscribe-hook
MAKE_CATCHUP_WEBHOOK_URL  = https://hook.us1.make.com/your-catchup-hook
KIT_API_KEY               = your-kit-v3-api-key
KIT_FORM_ID               = your-kit-form-id
```

3. After adding, redeploy: run `npx vercel --prod` from your project folder

---

## Part 8: VSCode + Claude Code Workflow

For ongoing development:

### VSCode setup
1. Open VSCode
2. File → Open Folder → select your project folder
3. Install extensions: **ESLint**, **Prettier**, **Tailwind CSS IntelliSense**

### Claude Code setup
```bash
npm install -g @anthropic-ai/claude-code
claude
```

Claude Code can help you:
- Add new features to the Next.js site
- Debug issues
- Write new Make.com module configurations
- Iterate on the Claude API prompts

### Git workflow
Keep your code version-controlled:
```bash
cd "/Users/aricohen/Documents/coding/Project test daily rundown"
git init
git add .
git commit -m "Initial Footnote build"
```

For deploying updates:
```bash
git add .
git commit -m "describe your change"
npx vercel --prod
```

---

## Part 9: The Daily Flow (End to End)

Here's exactly what happens every day:

```
7:00 AM ET
  └── Make.com Schedule Trigger fires
      └── Fetch all active subscribers from Airtable
          └── Group by unique topic combinations
              └── For each unique combo:
                  ├── Send topics to Claude API
                  ├── Claude writes personalized briefing
                  ├── Save to Airtable archive
                  └── Send via Kit to matching subscribers
                      └── Subscribers receive personalized email ✓
```

If audio is enabled:
```
                  ├── Send text to ElevenLabs API
                  ├── ElevenLabs returns audio file URL
                  └── Include audio link in email
```

---

## Part 10: Recommended Build Order

Do this in order to avoid circular dependencies:

1. ✅ Deploy site to Vercel (get a live URL first)
2. ✅ Set up Airtable base + tables
3. ✅ Set up Kit account + form + custom fields
4. ✅ Get Claude API key + add billing
5. ✅ Build Make.com Scenario 1 (subscribe) → test with real signup
6. ✅ Add env vars to Vercel → redeploy
7. ✅ Test subscribe form end to end (sign up → check Airtable + Kit)
8. ✅ Build Make.com Scenario 2 (daily send) → run manually to test
9. ✅ Set the daily schedule → let it run automatically
10. ✅ Build Make.com Scenario 3 (catch-up) → test the Catch Me Up page
11. ✅ ElevenLabs audio (optional, add last)

---

## Estimated Monthly Costs at Launch (0-500 subscribers)

| Service | Cost |
|---|---|
| Vercel | Free |
| Make.com | Free (1,000 ops/mo) → $9 after |
| Kit | Free (up to 10,000 subscribers) |
| Claude API | ~$4–15/mo |
| Airtable | Free |
| ElevenLabs | Free (10k chars) → $5/mo |
| **Total** | **~$0–25/mo** |
