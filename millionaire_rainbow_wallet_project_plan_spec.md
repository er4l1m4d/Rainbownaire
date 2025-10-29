# "Who Wants To Be A Millionaire" — Rainbow Wallet App (Vibecoding)

**Goal:** Build a mobile-first, web3-enabled quiz game inspired by *Who Wants To Be A Millionaire*, optimized for Rainbow Wallet users. Players connect via Rainbow (or any WalletConnect-compatible wallet) to play, answer themed questions, and climb the prize ladder.

---

## 🧠 **1. Vision & Vibe**

**Project Name:** Rainbow Millionaire  
**Tagline:** Play. Learn. Glow with Rainbow.  
**Core Idea:** A Rainbow Wallet–themed quiz experience where players test their crypto knowledge, connect their wallet, and rise through vibrant, Web3-inspired challenges.  

**Problem Statement:** Trivia and learning experiences in Web3 are often dull or technical. Rainbow Millionaire transforms education about wallets, Ethereum, and digital ownership into an engaging, gamified experience.  

**Vibe Keywords:** Playful, Futuristic, Gradient, Friendly, Educational  

**Success Looks Like:** Players feel connected to the Rainbow Wallet ecosystem through a visually immersive quiz experience that educates while entertaining — colorful, simple, and joyful.  

---

## ⚙️ **2. Core Features**

|Feature|User Goal|Description|Priority (M/S/C)|Technical Notes|
|---|---|---|---|---|
|Wallet Login|Connect their Rainbow Wallet easily|Use RainbowKit + Wagmi for seamless connect & session identity|M|RainbowKit with WalletConnect v2|
|15-Question Game|Play progressive difficulty rounds|Single-player session with scaling difficulty (easy → hard)|M|Server-served questions|
|Lifelines|Get help during play|50:50, Ask the Network, and Phone a Friend options|M|Supabase-tracked usage per session|
|Leaderboard|See global ranks|Display wallet-based leaderboard of scores|M|Supabase aggregation|
|AI-Generated Rainbow Questions|Fresh content tied to Rainbow Wallet|Use OpenAI API to generate Rainbow Wallet–themed trivia questions (validated + stored in Supabase)|S|LLM prompt ensures JSON format, auto-validates & stores|
|Session History|Track past games|Store past sessions for analytics + streaks|C|Supabase table `sessions`|

---

## 🧩 **3. Architecture Overview**

**System Layers:**

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind + Framer Motion for smooth UI transitions.
- **Backend / DB:** Supabase (PostgreSQL) for questions, sessions, leaderboards.
- **AI Question Service:** Cron or manual API endpoint that calls OpenAI API to generate new Rainbow Wallet–themed questions weekly; results are validated and stored in Supabase.
- **Storage:** Supabase for question bank, user sessions, and leaderboards.
- **Integrations:** RainbowKit (wallet login), WalletConnect (mobile linking), OpenAI API (AI question generation), Vercel analytics.

**Data Flow:**
1. Player connects wallet.
2. Backend fetches a randomized 15-question set (mix of curated + AI-generated Rainbow trivia).
3. Game session stores progress + used question IDs.
4. Scores written to Supabase leaderboard.
5. AI generator runs periodically to inject new Rainbow questions.

---

## 👤 **4. User Personas**

|Persona|Description|Motivation|Key Actions|
|---|---|---|---|
|The Curious Player|Web3 user discovering Rainbow|Wants to learn through fun, bite-sized trivia|Connect wallet, play sessions|
|The Enthusiast|Rainbow fan who loves crypto culture|Seeks recognition and leaderboard rank|Play regularly, share results|
|The Educator|Community manager or content creator|Wants to teach others about wallets and crypto|Suggests question topics, reviews AI output|

---

## 🎨 **5. Design & UX Principles**

**Visual Direction:**

- **Palette:** Neon gradients — purples, pinks, teals, yellows. Inspired by Rainbow Wallet’s palette (`#635BFF`, `#F5A623`, `#00E0A4`, `#FF8CF9`).
- **Typography:** Rounded, friendly sans-serifs like Inter or Plus Jakarta Sans.
- **Layout:** Centered game flow with glowing glassmorphism panels.
- **Moodboard keywords:** Vibrant, Soft, Futuristic, Playful, Clean.

**Interaction Rules:**
- Animations should feel smooth and celebratory.
- Buttons and feedback should glow subtly on hover.
- Navigation should emphasize simplicity and clarity.

**Tone of Voice:** Friendly, curious, confident, colorful.

---

## 🧱 **6. Technical Requirements**

**Tech Stack:**
- Frontend: Next.js + TailwindCSS + Framer Motion + RainbowKit
- Backend: Vercel Functions + Supabase REST APIs
- Database: Supabase (PostgreSQL)
- Deployment: Vercel

**Data Models:**
- `users`: { id, wallet_address, username, joined_at }
- `questions`: { id, question_text, options[], correct_option, difficulty, category, source (ai/manual), times_used }
- `sessions`: { id, player_address, used_question_ids[], score, created_at }
- `leaderboard`: { id, player_address, total_score, rank }

**Integration Notes:**
- **Auth:** Wallet signature login via RainbowKit.
- **APIs:** Supabase and OpenAI REST.
- **Wallets:** Rainbow (primary), WalletConnect (fallback).
- **AI Logic:** LLM prompt generates Rainbow Wallet–themed questions in JSON (validated for duplicates + balance before insert).

---

## 🚀 **7. Milestones / Development Phases**

|Phase|Focus|Deliverables|Success Criteria|
|---|---|---|---|
|**1. Foundations**|Setup + Architecture|Next.js scaffold with RainbowKit, Supabase schema, API routes.|Wallet connect + DB working.|
|**2. Core Gameplay**|Game engine & lifelines|Quiz logic, session tracking, 3 lifelines.|Playable game from start to finish.|
|**3. AI Question Engine**|Dynamic question generation|Cron/API to call OpenAI → validate + store Rainbow questions.|AI-generated Rainbow trivia appear in games.|
|**4. Leaderboard + UX Polish**|Engagement & aesthetics|Leaderboard, animations, gradient UI.|UI feels like Rainbow Wallet.|
|**5. Launch & Feedback Loop**|Testing + Launch|Deploy to Vercel + gather feedback.|100+ sessions played, stable performance.|

**Each Phase Tasks (sample breakdown):**
- Phase 1: Repo setup → Tailwind theme → RainbowKit config → Supabase migration.
- Phase 2: Game state logic → Lifeline hooks → Session result recording.
- Phase 3: OpenAI integration → JSON validation → Question insert → Admin review page.
- Phase 4: Leaderboard → Gradient polish → Framer Motion transitions.
- Phase 5: PWA setup → Analytics → Launch tweet thread + community testing.

---

## 🧪 **8. Testing & Validation**

**Functional Tests:**
- Wallet connect/disconnect.
- Game progression & answer validation.
- AI-generated question validation script.

**UX Validation:**
- Gradient consistency & color contrast.
- Mobile responsiveness.
- Animations smooth on mid-tier phones.

**AI Validation:**
- Ensure LLM output JSON matches schema.
- Verify all questions are about Rainbow Wallet or Web3 concepts.

---

## 🌍 **9. Launch & Growth Plan**

**Launch Goals:** Soft launch to Rainbow community for playtesting and feedback.

**Distribution:** X (Twitter), Rainbow Discord, website landing page.

**Metrics to Track:**
- Daily active players
- Session completions
- AI question generation success rate

**Future Roadmap (v2+ ideas):**
- Multiplayer trivia mode
- AI-powered difficulty scaling
- In-wallet mini version for Rainbow Browser

---

## 🪩 **10. Ethos / Creative Principles**
- Playfulness over rigidity  
- Learning over speculation  
- Community over competition  
- Clarity over clutter  
- Color over complexity  

---

**Question Generation System (Addendum)**  
- Uses OpenAI API for dynamic, Rainbow Wallet–themed trivia generation.  
- AI prompt structure ensures balanced questions in JSON (question, 4 options, correct answer, difficulty).  
- Supabase stores generated questions and tracks `times_used` to prevent repetition.  
- Weighted randomization ensures lesser-used questions are prioritized.  
- Cron job runs weekly to refresh 10–20 new questions automatically.

