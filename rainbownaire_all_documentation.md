# Rainbownaire

## Project Description
# 🎯 **Project Overview — “Who Wants To Be A Rainbownaire”**

### 🌈 **Tagline:**

> A Web3 twist on the classic “Who Wants to Be a Millionaire,” built for the Rainbow Wallet community.

---

## 🧠 **Core Concept**

**Who Wants To Be A Rainbownaire** is an interactive quiz game designed for the **Rainbow Wallet ecosystem** — blending **education, fun, and wallet-based identity** into a smooth, colorful experience.
Instead of testing general trivia, the app focuses on **Rainbow Wallet culture**, **Web3 basics**, and **crypto literacy**, wrapped in the playful, elegant aesthetic of Rainbow itself.

Players connect their wallets (via **RainbowKit**), start a quiz session, and answer progressively harder questions for increasing points. The further they go, the higher their “Rainbownaire” score climbs.

The app uses **AI-powered question generation** to keep content fresh, random, and thematically relevant — ensuring every round feels new, challenging, and delightful.

---

## 💡 **Why It Exists**

Most crypto experiences are either too technical or purely transactional.
**Rainbownaire** flips that narrative — it’s about *learning through play*, *celebrating wallet culture*, and *connecting communities* through lighthearted competition.

By integrating **Rainbow Wallet login**, the app eliminates traditional signups — your wallet *is* your profile.
No tokens, no NFTs, no staking — just pure, fun gameplay for the modern Web3 audience.

---

## 🧩 **Core Features**

| Feature                          | Description                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 🎮 **Quiz Gameplay**             | Answer 15 progressively harder questions about Rainbow Wallet, Web3 culture, and crypto basics.                |
| 🧠 **AI Question Generator**     | Uses a **free AI model** (via Hugging Face API) to automatically generate themed and randomized questions.     |
| 🦄 **Wallet Login (RainbowKit)** | Players connect their Rainbow Wallet to start. Their wallet address acts as their identity in the leaderboard. |
| 🏆 **Leaderboard System**        | Supabase tracks wallet addresses and scores so players can compete globally.                                   |
| 💬 **Lifelines**                 | Classic Millionaire lifelines (50:50, Ask the Network, Phone a Friend) implemented as fun UI interactions.     |
| 🎨 **Rainbow-Themed UI**         | Inspired by the Rainbow Wallet app — bright gradients, playful motion, modern typography.                      |
| 📊 **Supabase Backend**          | Securely stores player sessions, scores, and question data.                                                    |
| 🚀 **Vercel Deployment**         | Seamless deployment for instant scalability and performance.                                                   |

---

## 🏗️ **Technical Architecture**

**Frontend:**
Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** for smooth animations.

**Backend / Database:**
Powered by **Supabase**, which stores user sessions, questions, and leaderboard data. The Supabase client handles both reads and writes securely.

**AI Question Engine:**
Integrates with a **free AI model** (like `Hugging Face Transformers API`) that generates Rainbow-themed questions dynamically, ensuring replayability and diversity in gameplay.

**Wallet Layer:**
Leverages **RainbowKit**, **wagmi**, and **viem** for effortless Web3 wallet connections — optimized for the Rainbow Wallet experience but compatible with others via WalletConnect.

**Deployment:**
Fully deployable to **Vercel** with environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_AI_ENDPOINT`) managed via `.env.local`.

---

## 🎨 **Design Direction**

**Visuals:**

* Vibrant gradients that mirror the Rainbow Wallet brand
* Soft, rounded UI elements with motion feedback
* Clean typography (SF Pro / Inter)
* Light/dark modes to match Rainbow’s aesthetic

**Interactions:**

* Smooth page transitions via Framer Motion
* Animated progress bar for question advancement
* Playful microinteractions on wallet connect and lifelines

**Tone:**

* Friendly, confident, and educational
* Never preachy or overly technical
* Celebrates curiosity and discovery

---

## 🧱 **Tech Stack Summary**

| Layer          | Technology                                            |
| -------------- | ----------------------------------------------------- |
| **Framework**  | Next.js 14 + React 18                                 |
| **Styling**    | Tailwind CSS + Framer Motion                          |
| **Wallet**     | RainbowKit + wagmi + viem                             |
| **Database**   | Supabase                                              |
| **AI**         | Hugging Face API (free model for question generation) |
| **Deployment** | Vercel                                                |
| **Tooling**    | TypeScript, ESLint, Prettier                          |

---

## 🔮 **Future Possibilities (v2+)**

* Player streaks and achievements
* Themed “challenge” weeks (e.g., Ethereum, NFTs, Layer 2s)
* Global “Rainbow IQ” leaderboard with gamified ranks
* Community question submissions
* Optional profile avatars from ENS names or Rainbow PFPs

---

## 💬 **In One Sentence**

> “Who Wants To Be A Rainbownaire” is a sleek, Web3-native trivia game that celebrates the joy and color of the Rainbow Wallet ecosystem — where every connected wallet is a player, and every round is a chance to learn something new.


## Product Requirements Document
Rainbownaire Product Requirements Document

1. Introduction
1.1 Project Name
Who Wants To Be A Rainbownaire

1.2 Tagline
A Web3 twist on the classic “Who Wants to Be a Millionaire,” built for the Rainbow Wallet community.

1.3 Project Goal
To provide an interactive, educational, and fun quiz game within the Rainbow Wallet ecosystem. Rainbownaire aims to enhance Web3 literacy, celebrate Rainbow Wallet culture, and foster community connection through lighthearted competition, making crypto experiences approachable and engaging.

1.4 Target Audience
The primary audience is 18–35 year-old digital-native, mobile-first users located in global Web3 hubs. They are comfortable with mobile apps and Web3 tools, often using wallets for NFTs, crypto, or on-chain identity. This audience values fun, accessibility, self-expression, and innovation, engaging with short, gamified, community-driven content. They are active in Web3 social platforms and dislike crypto gatekeeping.

1.5 Vision
Rainbownaire envisions a future where learning about Web3 and wallet culture is a delightful, intuitive experience. By blending familiar game mechanics with innovative Web3 technology and Rainbow Wallet's vibrant aesthetic, the product aims to become a staple for onboarding new users and deepening engagement for existing community members, reinforcing Rainbow's brand as human, approachable, and fun.

2. Product Goals & Objectives
2.1 Business Objectives
*   **Increase Rainbow Wallet Engagement:** Drive daily and weekly active users (DAU/WAU) by providing a compelling, replayable experience within the Rainbow ecosystem.
*   **Enhance Brand Affinity:** Position Rainbow Wallet as an innovative, fun, and user-centric brand beyond transactional capabilities, strengthening emotional connection with its community.
*   **Foster Web3 Education:** Simplify complex Web3 concepts into an accessible, gamified learning format, improving crypto literacy among users.
*   **Community Building:** Create a platform for friendly competition and shared experience, encouraging interaction and discussion among Rainbow Wallet users.
*   **Data-Driven Insights:** Gather anonymized data on user engagement, popular topics, and learning patterns to inform future product development and content strategies.

2.2 User Objectives
*   **Learn Through Play:** Users want to understand Web3 basics and Rainbow Wallet culture in an enjoyable, non-intimidating way.
*   **Feel Connected:** Users seek participation in community culture and lighthearted competition with peers.
*   **Seamless Experience:** Users expect a smooth, wallet-native login and an intuitive mobile-first interface.
*   **Personal Achievement:** Users desire to test their knowledge, track their progress, and improve their "Rainbownaire" score.
*   **Entertained:** Users want a refreshing, engaging alternative to purely transactional crypto applications.

2.3 Key Performance Indicators (KPIs) & Success Metrics
*   **Daily Active Users (DAU) & Monthly Active Users (MAU):** Aim for 1,500 DAU and 5,000 MAU within the first 3 months.
*   **Average Session Length:** Target 3-6 minutes per quiz session.
*   **Quiz Completion Rate:** Target >70% of started quiz sessions completed.
*   **Leaderboard Engagement:** Aim for >10% of players submitting a score to the leaderboard.
*   **Replay Rate:** Target >50% of players starting a new game after completing one.
*   **User Feedback (Sentiment):** Achieve a 4.5/5 average rating in post-game surveys or social sentiment, indicating satisfaction with the UI/UX and learning experience.
*   **API Latency (p95):**
    *   Session creation: <= 200-300 ms
    *   Question fetch (batched 15): <= 200-400 ms
    *   Answer submit: <= 150-300 ms
    *   Leaderboard read: <= 150-300 ms
*   **Frontend Performance:** Cold page load (FCP) <= 1.5s, Time to Interactive (TTI) <= 2.5s on mobile.
*   **Availability:** Overall app availability > 99.9%.

3. Core Features & Functionality
3.1 Quiz Gameplay
*   **Structure:** Each game consists of 15 progressively harder multiple-choice questions.
*   **Content:** Questions focus on Rainbow Wallet culture, Web3 basics, and crypto literacy.
*   **Scoring System:**
    *   Correct answer: +100 points
    *   Fast answer (within 10s): +25 bonus points
    *   Consecutive correct streak (3 in a row): +50 multiplier bonus
    *   Using a lifeline: -10 points penalty (except 50:50)
    *   Wrong answer (Casual Mode - MVP): -50 points, game continues.
*   **Timing:** 20 seconds per question with a visual progress ring. If time runs out, it's marked as incorrect.
*   **Game Over:** In MVP, the game continues even with wrong answers (Casual Mode). The final score is accumulated points at the end of 15 questions.
*   **UI Elements:** Displays current question number (e.g., "1 / 15"), current score, and available lifelines.

3.2 Wallet Login (RainbowKit)
*   **Connection:** Players connect their Rainbow Wallet via RainbowKit upon app launch.
*   **Identity:** The connected wallet address (or ENS name) serves as the player's unique identity for game sessions and leaderboard entries, eliminating traditional sign-ups.
*   **Seamless Experience:** Optimized for Rainbow Wallet mobile users (in-app browser) and compatible with other wallets via WalletConnect.

3.3 AI Question Generator
*   **Generation:** Utilizes a free AI model (e.g., google/flan-t5-base via Hugging Face API) to generate themed and randomized questions.
*   **Content Curation:** Questions are pre-generated in batches (e.g., daily cron job) and stored in Supabase.
*   **Filtering & Validation:** Post-generation, questions undergo filtering for relevance, grammar, structure, and duplication before being saved.
*   **Replayability:** Ensures a fresh set of questions for every new game session, reducing repetition.
*   **No Live AI Dependence:** Gameplay does not wait for live AI generation; questions are served from the pre-curated Supabase pool.

3.4 Lifelines
Players start each game with three distinct lifelines, represented by circular icon buttons: 50:50 (⚖️), Ask the Network (🌐), and Phone a Friend (📞).

3.4.1 50:50 Lifeline
*   **Purpose:** Eliminates two incorrect answers, increasing the player's chances of selecting the correct option.
*   **UX Flow:** Player taps the ⚖️ icon. The icon pulses and desaturates. Two incorrect options visually fade out and become disabled. The remaining two options are slightly highlighted.
*   **Functional Implementation:** Frontend logic removes two randomly chosen incorrect answers from the displayed options.
*   **Limitations:** Usable once per game session. No point penalty.

3.4.2 Ask the Network Lifeline
*   **Purpose:** Simulates a "community vote" to provide insight into what others might choose.
*   **UX Flow:** Player taps the 🌐 icon. The icon animates with a wave pattern. The answer area transitions into a bar graph overlay showing simulated vote percentages for each option (e.g., correct answer weighted higher but not guaranteed). A text overlay reads: "Here's what the Rainbow network thinks 🌈". After 5 seconds, the bar graph fades, and the player can select their answer.
*   **Functional Implementation:** Frontend generates simulated vote distributions based on question difficulty.
*   **Limitations:** Usable once per game session. -10 points penalty.

3.4.3 Phone a Friend Lifeline
*   **Purpose:** Emulates seeking advice from a friend, adding a social and whimsical element.
*   **UX Flow:** Player taps the 📞 icon. A modal appears offering a "Quick Simulation." After 3 seconds, an animated chat bubble appears with a randomized, personality-driven message, such as "👋 Your friend thinks it's probably B) — but they're only 70% sure!". The simulated friend's accuracy is randomized (60-80% correct).
*   **Functional Implementation:** Frontend-only simulation for MVP.
*   **Limitations:** Usable once per game session. -10 points penalty.

3.5 Leaderboard System
*   **Tracking:** Supabase securely stores player scores and wallet addresses from completed quiz sessions.
*   **Display:** A global leaderboard displays the top 10 players, showing their ENS/short address, final score, and date achieved.
*   **Filtering:** Option to filter the leaderboard by "This Week" or "All Time."
*   **Personal Best:** Celebratory modal if a player beats their personal best score.

3.6 Rainbow-Themed UI
*   **Visuals:** Inspired by the Rainbow Wallet app, featuring vibrant gradients, soft rounded UI elements, and modern typography (SF Pro / Inter).
*   **Interactions:** Smooth page transitions (Framer Motion), animated progress bar, playful micro-interactions on wallet connect and lifeline usage.
*   **Tone:** Friendly, confident, and educational; never preachy or overly technical, celebrating curiosity and discovery.
*   **Delightful Elements:** Button ripple and glow feedback, correct/incorrect answer animations, unique lifeline activation cues, score particles, end-of-game confetti animation.

4. User Experience (UX) & Design
4.1 Design Philosophy
The core design philosophy is "It should feel like playing with color, not clicking buttons." The interface aims to evoke joy through motion, light, and flow, reinforcing vibrancy, curiosity, and accomplishment.

4.2 Visuals & Interactions
*   **Gradients:** Vibrant, animated gradients mirroring the Rainbow Wallet brand.
*   **UI Elements:** Soft, rounded elements with subtle motion feedback.
*   **Typography:** Clean, legible fonts (SF Pro / Inter) for questions and answers.
*   **Micro-Interactions:**
    *   **Button Feedback:** Neon gradient pulse with subtle haptics on tap/click.
    *   **Answer Animations:** Correct answers glow green with rainbow particle burst; incorrect answers dim to red with a soft "thud."
    *   **Streak Glow:** Visual "rainbow light" trail for 3+ consecutive correct answers.
    *   **Lifeline Cues:** Unique animations and sound effects for each lifeline (e.g., 50:50 swirl, Ask the Network "community cloud," Phone a Friend chat bubble).
    *   **Progress Feedback:** Gradient fill for question numbers, score particles floating upwards on correct answers.
    *   **End-of-Game:** Rainbow explosion animation for results, "drop-in" leaderboard card.

4.3 Accessibility Principles
*   **Color Contrast:** WCAG AA (min 4.5:1) contrast for all interactive text, pairing vibrant gradients with dark backdrops. Correct/incorrect indicators use both color and iconography (✔️ / ✖️).
*   **Keyboard & Focus Navigation:** Full support for tab-based navigation with glowing Rainbow gradient outlines for focused elements. Shortcut keys (1, 2, 3) for lifelines.
*   **Motion Sensitivity:** "Reduce Motion" toggle in settings to disable intense animations and respect `prefers-reduced-motion` CSS media query.
*   **Readability & Typography:** Min. 16px base font size; clear hierarchy for questions (font-bold text-xl) and options (font-medium text-base).

4.4 Tone
The tone is consistently friendly, confident, and educational. It avoids preachy or overly technical jargon, celebrating curiosity and discovery within the Web3 space. Error messages are human-friendly and themed, e.g., "Your wallet flew away 🪄 — reconnect to continue your rainbow streak!"

4.5 Emotional Arc
*   **Start:** Excitement, drawn in by colorful animations and friendly copy.
*   **Mid-game:** Flow, a balanced mix of challenge and reward, satisfying streaks.
*   **End:** Accomplishment, confetti, scores, and leaderboard encouraging pride and replay.
*   **Replay Motivation:** Curiosity, driven by AI-generated questions and the desire to beat scores.

5. Technical Requirements
5.1 Architecture Overview
*   **Frontend:** Next.js 14 (App Router) with React 18, TypeScript, Tailwind CSS, and Framer Motion. Handles UI rendering, user interactions, game logic, and API calls.
*   **Backend / Database:** Supabase for persistent data storage (player profiles, questions, quiz sessions, leaderboard). Supabase client manages secure read/write operations.
*   **AI Question Engine:** Integrates with a free AI model (e.g., Hugging Face Transformers API) via a serverless function to generate questions. Pre-generation and caching strategy ensure no live AI latency during gameplay.
*   **Wallet Layer:** RainbowKit, wagmi, and viem for seamless Web3 wallet connections, optimized for Rainbow Wallet but compatible with others.
*   **Deployment:** Vercel for scalable and performant deployment, managing environment variables securely.

5.2 Tech Stack
*   **Framework:** Next.js 14 + React 18
*   **Styling:** Tailwind CSS + Framer Motion
*   **Wallet:** RainbowKit + wagmi + viem
*   **Database:** Supabase (PostgreSQL)
*   **AI:** Hugging Face API (google/flan-t5-base)
*   **Deployment:** Vercel
*   **Tooling:** TypeScript, ESLint, Prettier

5.3 Database Schema (Supabase)
The schema is designed around four main data domains: Players, Questions, Quiz Sessions, and Leaderboard Entries, with an optional `quiz_session_questions` table for detailed analytics. All tables include UUID primary keys and timestamps.

5.3.1 Table: `players`
*   `id`: uuid (PK, default gen_random_uuid()) - Unique player ID.
*   `wallet_address`: text (unique, indexed) - Player's connected Rainbow Wallet address.
*   `display_name`: text - Optional user-friendly name (editable).
*   `avatar_url`: text - Optional profile image.
*   `joined_at`: timestamptz - Player's first connection time.
*   `total_games_played`: integer (default 0) - Total number of sessions completed.
*   `total_points`: integer (default 0) - Cumulative score across sessions.
*   `last_active`: timestamptz - Last session played timestamp.
*   **Relationships:** `players.id` -> `quiz_sessions.player_id`, `players.id` -> `leaderboard_entries.player_id`.

5.3.2 Table: `questions`
*   `id`: uuid (PK) - Unique question ID.
*   `question_text`: text - The question itself.
*   `answer_options`: jsonb - Array of 4 possible answers, e.g. ["A) …", "B) …", "C) …", "D) …"].
*   `correct_answer`: text - Correct answer (A, B, C, or D).
*   `difficulty`: text - e.g., 'easy', 'medium', 'hard'.
*   `category`: text - e.g., 'wallets', 'nfts', 'security'.
*   `source_type`: text - 'ai' or 'manual'.
*   `created_by`: uuid (nullable) - Admin ID (optional).
*   `created_at`: timestamptz - Creation timestamp.
*   **Notes:** AI-generated questions are pre-filtered and inserted.

5.3.3 Table: `quiz_sessions`
*   `id`: uuid (PK) - Unique session ID.
*   `player_id`: uuid (FK -> `players.id`) - The player who started the session.
*   `current_question_index`: integer - Tracks progress (0–14 for 15 questions).
*   `score`: integer - Current accumulated score.
*   `is_active`: boolean - Whether the session is ongoing.
*   `lifelines_used`: jsonb - Tracks which lifelines were used, e.g. {"fiftyFifty": true, "askNetwork": false}.
*   `start_time`: timestamptz - Session start timestamp.
*   `end_time`: timestamptz - Session end timestamp.
*   `completed`: boolean - Whether player finished all questions.
*   `total_time_spent`: integer - Total seconds spent on the game.
*   **Relationships:** `quiz_sessions.player_id` -> `players.id`.

5.3.4 Table: `quiz_session_questions` (Recommended for scalability and analytics)
*   `id`: uuid (PK) - Unique record.
*   `session_id`: uuid (FK -> `quiz_sessions.id`) - Linked quiz session.
*   `question_id`: uuid (FK -> `questions.id`) - Question asked.
*   `selected_answer`: text - Player's chosen answer (A–D).
*   `is_correct`: boolean - Whether player was correct.
*   `answered_at`: timestamptz - Time answered.

5.3.5 Table: `leaderboard_entries`
*   `id`: uuid (PK) - Entry ID.
*   `player_id`: uuid (FK -> `players.id`) - Player reference.
*   `score`: integer - Final session score.
*   `session_id`: uuid (FK -> `quiz_sessions.id`) - Link to the session.
*   `rank`: integer - Calculated leaderboard rank (optional, computed view).
*   `achieved_at`: timestamptz - Time when score was recorded.
*   **Ranking:** A Supabase function or view dynamically computes ranks using `ROW_NUMBER() OVER (ORDER BY score DESC, achieved_at ASC)`.

5.4 AI Model Constraints & Strategy
*   **Model Selection:** `google/flan-t5-base` via Hugging Face API for free inference.
*   **Limitations & Mitigations:**
    *   **Latency:** Mitigated by pre-generating and caching question batches in Supabase. Gameplay does not wait for live AI calls.
    *   **Rate Limits (Free Tier):** Mitigated by implementing scheduled daily batches (e.g., cron job generates 50-100 questions daily).
    *   **Off-topic/Nonsensical Output:** Addressed with strict prompt constraints, post-generation keyword filtering, grammar/length checks, and deduplication.
    *   **Repetition:** Seed prompts with variation weights and track question history.
*   **Prompt Engineering:** Use a structured prompt template guiding the AI to generate multiple-choice questions with 4 options and a clear correct answer, focusing on Rainbow/Web3 topics.
*   **Post-Processing Pipeline:** After AI generation, questions are parsed, checked for keyword relevance, validated for grammar/length, and deduplicated before being saved to the `questions` table.
*   **Quality Assurance:** Only high-quality, filtered questions are stored in Supabase for gameplay.

5.5 Error Handling & Resilience
*   **Philosophy:** User-centric, graceful degradation, playful, and forgiving. All errors are human-friendly, themed, and avoid technical jargon.
*   **Key Strategies:**
    *   **User Never Sees Raw Errors:** All errors are converted into themed messages.
    *   **Fail Soft:** App continues in degraded mode if possible, using cached/placeholder content.
    *   **Automatic Recovery:** Silent retries for network requests, reconnections, and cache fallbacks.
    *   **Telemetry:** All errors logged to Sentry (frontend + backend) with context for debugging.
*   **Major Failure Scenarios & Handling:**
    *   **Wallet Disconnects Mid-Game:** Game pauses, progress saved locally (localStorage), prompt to reconnect.
    *   **AI API Failure:** Retry with exponential backoff; fallback to pre-cached question sets from Supabase.
    *   **Supabase Connection Error:** Retry with exponential backoff; fallback to cached player profile + local leaderboard snapshot.
    *   **Question Fetch Fails:** Trigger request for next available batch; display "Rainbow Shuffling..."
    *   **Answer Submission Error:** Allow retry, temporarily disable button.
    *   **Leaderboard Load Fails:** Show locally cached leaderboard, auto-refresh.
    *   **Unexpected App Crash (Frontend):** React Error Boundaries display a themed fallback screen ("Rainbow broke a wing 🪶"), log to Sentry, offer "Reload App."
    *   **Rate Limits (AI):** Switch to backup question cache, optionally show cooldown timer.
*   **Recovery Mechanisms:** Local state backup (localStorage for game progress), limited offline mode (Service Worker for static assets, last session, leaderboard), silent retries (2-3 times with delay), soft error logging.
*   **Developer Safety Net:** Global React Error Boundary, API middleware for serverless functions, Supabase + AI health checks (cron job).

5.6 Performance & Scalability
*   **Usage Estimates (first 3-6 months):**
    *   DAU: Starting from 500-1,500, growing to 10,000-40,000.
    *   Peak Concurrent Users (PCU): Starting from 50-150, growing to 1,000-3,000.
*   **Monitoring & Observability:**
    *   Vercel Analytics: Edge metrics, latency, request volumes.
    *   Sentry: Error tracking, performance traces.
    *   Supabase Monitoring: Postgres metrics, slow queries, connection usage.
    *   Log aggregation: For serverless logs.
    *   Instrumentation: API response times, DB connections, AI call latency/errors, cache hit ratio, business metrics (sessions, completion, DAU/MAU).
    *   Alerts: For high API error rates, latency spikes, DB connection limits, AI API errors.
*   **Scalability & Resilience Tactics:**
    *   **Frontend/Edge:** Next.js Edge Functions, ISR, SWR/React Query for data fetching, static landing pages.
    *   **Caching & CDNs:** Cache question batches (30m-24h TTL), leaderboard results (30-60s TTL), user profiles (short TTL). Use Vercel/Cloudflare edge cache or Redis (Upstash).
    *   **Database:** Keep read-heavy operations cached; use connection pooling (PgBouncer); index critical fields (`questions.id`, `players.wallet_address`, `leaderboard.score`).
    *   **AI Generation:** Always pre-generate and validate batches; backoff/retry on rate limits; use Edge Functions or cron jobs.
    *   **Queueing:** Light job queue (Supabase Edge Functions + serverless cron or Upstash Redis) for AI generation, leaderboard recompute, email/share links.
    *   **Auto-scaling:** Vercel serverless functions scale automatically; monitor Supabase plan for upgrades.
*   **Load Testing:** Simulate expected PCU (k6/Artillery) for session start, DB reads/writes, and AI generation workflow.
*   **Cost & Operational Considerations:** Leverage free tiers (Supabase, Vercel, Sentry) initially. Aggressive caching to control costs.

6. Future Possibilities (v2+)
6.1 Player Streaks & Progression System
*   **Rationale:** Encourages habitual engagement and daily returns, builds a lightweight meta-game, aligns with Rainbow Wallet's ethos of steady progress.
*   **How it Works:** Track daily play sessions. Award "Streak Points" or visual badges for consistent activity. Display streak count in profile/leaderboard.
*   **Architectural Implications:** Add `player_stats` or `streaks` table to Supabase. Background cron job for streak reset logic.

6.2 Themed Challenges & Seasonal Events
*   **Rationale:** Keeps the experience fresh, drives engagement bursts around crypto events, enables collaboration with communities.
*   **How it Works:** Curated sets of questions (AI or manual) specific to a theme (e.g., "DeFi Week," "NFT Season"). Players compete for event-specific badges or leaderboards.
*   **Architectural Implications:** Extend `questions` with `theme` and `event_id` fields. Add `events` table (name, start/end dates, rewards).

6.3 Community Question Submissions (Moderated AI Layer)
*   **Rationale:** Introduces community co-creation, builds loyalty, reduces AI dependency.
*   **How it Works:** Players submit question proposals via a form. An AI model (Hugging Face) checks grammar/tone. Admin manually approves/rejects questions.
*   **Architectural Implications:** Add `community_questions` table (creator_wallet, question_text, choices[], correct_index, status). Implement moderation workflow.

7. Launch Plan & Milestones
7.1 Target MVP Launch Date
March 31, 2026 (approx. 6 months from now).

7.2 Development Timeline & Milestones
*   **Phase 1: Setup & Foundations (2 weeks)**
    *   **Deliverables:** Next.js 14 + Tailwind + RainbowKit setup, Supabase schema live, Hugging Face AI API integration (mocked), basic quiz logic & question rendering.
    *   **Milestone Criteria:** App builds & runs locally with wallet connection.
*   **Phase 2: Core Game Loop (3 weeks)**
    *   **Deliverables:** 15-question flow, lifelines (50:50, Ask the Network, Phone a Friend), points & leaderboard logic, error handling & retry system.
    *   **Milestone Criteria:** Full game loop functional end-to-end.
*   **Phase 3: AI Question Engine (Free API) (3 weeks)**
    *   **Deliverables:** Hugging Face integration tested, filtering & validation for relevant questions, basic Admin UI for question approval.
    *   **Milestone Criteria:** AI reliably generates valid Web3/Rainbow-themed questions.
*   **Phase 4: UI Polish & UX Delight (3 weeks)**
    *   **Deliverables:** Rainbow Wallet–inspired UI, animations for correct/incorrect answers, sound cues & accessibility improvements.
    *   **Milestone Criteria:** App looks and feels aligned with Rainbow Wallet brand.
*   **Phase 5: Beta Testing & Feedback Loop (2 weeks)**
    *   **Deliverables:** Supabase test data tracking, bug + performance fixes, community feedback collection.
    *   **Milestone Criteria:** Stable gameplay across devices + positive feedback.
*   **Phase 6: MVP Launch (1 week)**
    *   **Deliverables:** Deployed on Vercel, basic landing page, post-launch monitoring & error reporting active.
    *   **Milestone Criteria:** Live app accessible with <500ms latency, <1% crash rate.

7.3 Estimated Budget & Resource Allocation
*   **Development (Frontend + Backend):** ~180 hours
*   **Design & UX Polish:** ~40 hours
*   **Testing & QA:** ~30 hours
*   **Deployment & Infrastructure:** $0 (using free tiers)
*   **Monitoring & Analytics:** $0 (using free tiers)
*   **Marketing & Community Launch:** ~$150–$300 (for visuals)
*   **Total Estimate:** 250–280 hours, approximately 8–10 weeks of focused solo dev time.

7.4 Success Criteria for MVP
*   **Functional:** 95% uptime, smooth game flow, <1s average question load time.
*   **Engagement:** 50+ daily players during beta, 10% leaderboard submissions.
*   **Delight:** Positive user feedback on UI "vibes," game pacing, and replay value.

## Technology Stack
TECHSTACK

Rainbownaire leverages a modern, robust, and Web3-native technology stack designed for performance, scalability, and an exceptional developer and user experience. The choices prioritize rapid development, cost-effectiveness at MVP, and seamless integration with the Rainbow Wallet ecosystem.

1. Overview

Rainbownaire is built on a full-stack JavaScript/TypeScript foundation, utilizing Next.js for the frontend, Supabase for the backend and database, and RainbowKit for Web3 wallet integration. AI question generation is powered by Hugging Face, all deployed on Vercel for optimal performance and scalability.

2. Frontend Technologies

Framework: Next.js 14 (App Router) + React 18
Justification:
Server Components (SSR/SSG/ISR) for superior performance, faster initial page loads (low FCP, TTI), and improved SEO.
App Router provides a modern, co-located architecture for components and data fetching.
Leverages the extensive React ecosystem and community support.
Language: TypeScript
Justification:
Enhances code quality, reduces runtime errors, and improves developer productivity through static type checking.
Critical for Web3 development where data integrity and precision are paramount.
Styling: Tailwind CSS
Justification:
Utility-first CSS framework for rapid UI development and highly customizable designs.
Facilitates the creation of Rainbow-themed vibrant gradients and responsive layouts.
Optimized for performance by purging unused CSS at build time.
Animations & Motion: Framer Motion
Justification:
Provides a declarative API for fluid, physics-based animations, crucial for the \"playful motion\" and \"delightful UI/UX\" design goals.
Enables smooth page transitions, micro-interactions, and visual feedback for actions (e.g., correct/incorrect answers).
State Management: React Hooks (useState, useContext) + SWR / React Query
Justification:
Built-in React Hooks manage local component state and simple global state effectively.
SWR/React Query handles data fetching, caching, revalidation, and optimistic updates for interactions with Supabase and other APIs, ensuring data freshness and a responsive UI.

3. Backend & Database

Backend-as-a-Service (BaaS) / Database: Supabase
Justification:
Provides a managed PostgreSQL database, offering robustness, scalability, and strong relational data capabilities.
Handles authentication (via RLS linked to wallet addresses), real-time capabilities (for potential future features like live leaderboards), and secure data storage.
Supabase Edge Functions are utilized for server-side logic such as AI question pre-generation, score validation, and complex leaderboard calculations, offloading heavy computations from the client.
Offers a cost-effective and developer-friendly experience with excellent Next.js integration.
API Layer: Next.js API Routes + Supabase Edge Functions
Justification:
Next.js API Routes serve as the primary interface for client-side requests (e.g., quiz session creation, answer submission).
Supabase Edge Functions execute background tasks and heavy lifting (like AI interaction) asynchronously, improving frontend responsiveness and managing resource-intensive operations.
Database Schema: (Detailed in \"supabase_initial_schema\" document)
Tables: `players`, `questions`, `quiz_sessions`, `quiz_session_questions`, `leaderboard_entries`.
Key features: UUID primary keys, timestamps, foreign key relationships, indexed fields for performance, Row-Level Security (RLS) for data protection.

4. Web3 Layer

Wallet Connection Library: RainbowKit
Justification:
Provides a beautiful, branded, and highly user-friendly UI for connecting Web3 wallets, seamlessly integrating with Rainbow Wallet.
Abstracts away complexities of WalletConnect, supporting a broad range of wallets while prioritizing the Rainbow experience.
Web3 Hooks & Utilities: wagmi
Justification:
A collection of React Hooks for Ethereum, simplifying interaction with smart contracts, reading chain data, and managing wallet state.
Forms a robust, type-safe foundation for all on-chain (or wallet-centric) interactions.
Low-Level Web3 Utilities: viem
Justification:
A low-level, tree-shakeable library for direct interaction with Ethereum Virtual Machine (EVM) chains, used internally by wagmi for efficient and optimized blockchain communication.

5. AI Layer

AI Model: google/flan-t5-base (via Hugging Face Inference API)
Justification:
Chosen for its instruction-tuned capabilities, suitability for short-form Q&A, and availability on Hugging Face's free inference tier.
Offers a balance of quality, speed, and cost-effectiveness for generating quiz questions.
AI API Provider: Hugging Face Inference API
Justification:
Provides easy access to a vast array of open-source LLMs, simplifying deployment and management of AI models for MVP.
AI Strategy: Batch Pre-generation & Caching
Justification:
To mitigate the latency and rate-limiting inherent in free-tier AI APIs, questions are pre-generated in batches (e.g., daily cron job via Supabase Edge Function).
Generated questions undergo a strict filtering pipeline (relevance, grammar, structure, deduplication) before being stored in the Supabase `questions` table.
Gameplay dynamically pulls from this curated, cached pool, ensuring instant question delivery without relying on real-time AI calls.

6. Deployment & Infrastructure

Hosting Platform: Vercel
Justification:
Optimized for Next.js, offering zero-configuration deployment, automatic scaling for serverless functions, a global CDN, and an exceptional developer experience.
Essential for achieving low latency (FCP, TTI) and high availability targets.
Environment Variables: Vercel Environment Variables (.env.local)
Justification:
Securely manages sensitive API keys (Supabase, Hugging Face) and other configuration settings, critical for production deployments.
Monitoring & Observability: Vercel Analytics, Sentry, Supabase Monitoring
Justification:
Vercel Analytics provides vital edge metrics, latency heatmaps, and request volumes.
Sentry offers detailed error tracking (frontend & serverless) and performance tracing for identifying and resolving issues quickly.
Supabase Monitoring provides insights into database performance, query logs, and connection usage.

7. Tooling & Development Experience

Language: TypeScript
Linter: ESLint
Formatter: Prettier
Version Control: Git / GitHub
Justification:
This combination ensures high code quality, consistency, and a smooth, collaborative development workflow, reducing bugs and improving maintainability.

8. Justifications & Rationale for Technology Choices

Developer Experience: Next.js, TypeScript, Tailwind CSS, Supabase, and RainbowKit collectively offer a modern, type-safe, and efficient development workflow, enabling rapid feature delivery.
Performance: Next.js's rendering capabilities (SSR/ISR/Edge), Vercel's CDN, and strategic caching (questions, leaderboard) are designed to deliver a fast, responsive user experience, meeting stringent FCP, TTI, and API latency KPIs.
Scalability: Vercel's serverless architecture, Supabase's managed PostgreSQL, and the AI pre-generation strategy ensure the application can scale from MVP to tens of thousands of daily active users without significant architectural changes.
Cost-Effectiveness: Extensive reliance on generous free tiers (Vercel, Supabase, Hugging Face) makes Rainbownaire highly cost-efficient for initial launch and growth. AI usage is carefully managed through batching.
Web3 Integration: RainbowKit, wagmi, and viem are leading, secure, and user-friendly choices for wallet integration, directly aligning with Rainbownaire's core Web3 identity and the Rainbow Wallet community focus.
Brand Alignment: Tailwind's flexibility for vibrant gradients, Framer Motion for playful animations, and RainbowKit's UI consistency all contribute to the desired colorful, elegant, and joyful aesthetic of the Rainbow Wallet brand.

9. Scalability & Resilience Considerations

Performance Goals: Targeting low latency (FCP ≤ 1.5s, TTI ≤ 2.5s, API P95 ≤ 300ms) for core actions, as detailed in the \"performance_scalability_goals\" document.
Monitoring: Comprehensive stack with Vercel Analytics, Sentry (frontend & serverless error/performance), Supabase Monitoring (DB health, slow queries), and log aggregation (e.g., Logflare) for full observability.
Resilience Tactics:
Frontend/Edge: Next.js on Vercel Edge Functions, utilizing Incremental Static Regeneration (ISR) and SWR/React Query with stale-while-revalidate for data freshness and resilience against API failures.
Caching: Aggressive caching of question batches (edge cache, Redis/localStorage) and leaderboard results (short TTL in Redis/Vercel cache) to reduce database load and improve response times.
Database Optimization: Strategic indexing on critical fields (wallet addresses, scores), connection pooling (PgBouncer), and future consideration of read replicas for high read loads.
AI Resilience: AI question generation is an offline, pre-batch process with built-in backoff and retry mechanisms for Hugging Face API calls, ensuring gameplay is never blocked by AI service availability or rate limits.
Error Handling: As detailed in \"error_handling_and_resilience,\" the application implements a layered error handling strategy with user-friendly messages, graceful fallbacks (local state, cached data), silent retries, and React Error Boundaries to maintain a delightful UX even during failures.
Auto-scaling: Vercel's serverless platform provides automatic scaling for application logic, while Supabase's managed service can be upgraded to handle increasing database load.

10. Cost Implications

MVP (0-5k DAU): Expected to remain largely within the free tiers of Vercel, Supabase, and Hugging Face Inference API.
Growth (10k-50k DAU): Anticipate potential upgrades for Supabase (PostgreSQL resources), introduction of a managed Redis instance (e.g., Upstash) for more advanced caching, and potentially moving to a paid tier or dedicated instance for Hugging Face or other LLM APIs for increased throughput and quality, as outlined in the \"performance_scalability_goals\" document. Aggressive caching remains key to controlling operational costs.

11. Future Tech Considerations (v2+)

Advanced AI Models: Exploration of larger, fine-tuned LLMs (e.g., Mistral-7B, OpenRouter API) for more nuanced and context-aware question generation.
Realtime Enhancements: Leveraging Supabase Realtime for live leaderboard updates, potentially enabling spectator modes or real-time friend challenges.
Dedicated Queueing: Integration of a lightweight job queue (e.g., Redis-backed via Upstash) for more robust background processing of AI tasks, leaderboard re-computations, and future features.
Advanced Analytics: Integration with a dedicated analytics platform for deeper insights into user behavior, engagement patterns, and feature adoption.
On-chain Game Mechanics: Should the project evolve to include NFTs, tokens, or more complex smart contract interactions, the wagmi/viem foundation is extensible for such requirements.

## Project Structure
PROJECTSTRUCTURE

1.  OVERVIEW

    The "Rainbownaire" project follows a modular and scalable architecture, leveraging Next.js 14's App Router for efficient development and performance. The structure is designed to clearly separate concerns: frontend UI, backend API logic, database interactions, and external service integrations (AI, Web3 wallet). This ensures maintainability, ease of testing, and collaboration.

    Key principles guiding this structure:
    *   **Separation of Concerns**: Each module/folder has a specific responsibility.
    *   **Next.js App Router Best Practices**: Utilizing route groups, layouts, and server/client components effectively.
    *   **TypeScript-first**: Strong typing throughout the codebase for robustness.
    *   **Scalability**: Prepared for growth with clear data access layers and API design.

2.  ROOT DIRECTORY
    
```
    .
    ├── .env.local
    ├── .eslintrc.json
    ├── .gitignore
    ├── .prettierrc
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tsconfig.json
    └── tailwind.config.ts
    ```

    *   `.env.local`: Stores local environment variables (e.g., NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, HUGGING_FACE_API_KEY). Not committed to version control.
    *   `.eslintrc.json`: ESLint configuration for code quality and style.
    *   `.gitignore`: Specifies intentionally untracked files to ignore by Git.
    *   `.prettierrc`: Prettier configuration for consistent code formatting.
    *   `next.config.mjs`: Next.js configuration file (e.g., output settings, image optimization).
    *   `package.json`: Project metadata, script commands, and dependencies.
    *   `postcss.config.js`: PostCSS configuration, primarily for Tailwind CSS.
    *   `README.md`: Project overview, setup instructions, and key information.
    *   `tsconfig.json`: TypeScript compiler configuration.
    *   `tailwind.config.ts`: Tailwind CSS configuration for custom themes, colors, and utilities.

3.  `src/` DIRECTORY

    The `src/` directory contains all the main application source code.
    
```
    src/
    ├── app/
    ├── components/
    ├── config/
    ├── hooks/
    ├── lib/
    ├── public/
    ├── styles/
    ├── types/
    └── middleware.ts
    ```

    *   `app/`: (Next.js App Router) Contains all route segments, layouts, pages, and API routes.
    *   `components/`: Reusable React components (client and server).
    *   `config/`: Application-wide configuration and environment variable handling.
    *   `hooks/`: Custom React hooks for shared logic.
    *   `lib/`: Core utility functions, SDK initializations, and data access layers.
    *   `public/`: Static assets served directly (images, fonts, sounds).
    *   `styles/`: Global CSS files.
    *   `types/`: Centralized TypeScript type definitions.
    *   `middleware.ts`: Next.js middleware for authentication, redirects, etc.

4.  DETAILED `src/` STRUCTURE

    4.1. `src/app/`

    This is the heart of the Next.js application, defining the routes and UI structure.
    
```
    src/app/
    ├── api/
    │   ├── ai/
    │   │   └── generate/route.ts
    │   ├── leaderboard/
    │   │   └── route.ts
    │   ├── questions/
    │   │   └── batch/route.ts
    │   └── session/
    │       ├── [sessionId]/
    │       │   ├── complete/route.ts
    │       │   └── submitAnswer/route.ts
    │       └── new/route.ts
    ├── (game)/
    │   ├── layout.tsx
    │   ├── leaderboard/
    │   │   └── page.tsx
    │   ├── quiz/
    │   │   └── [sessionId]/page.tsx
    │   └── welcome/
    │       └── page.tsx
    ├── layout.tsx
    ├── page.tsx
    ├── global-error.tsx
    ├── not-found.tsx
    ├── favicon.ico
    └── opengraph-image.tsx
    ```

    *   `api/`: Defines backend API endpoints for data fetching and mutations.
        *   `ai/generate/route.ts`: Server-side API for triggering AI question generation (e.g., via cron job).
        *   `leaderboard/route.ts`: Fetches global leaderboard data.
        *   `questions/batch/route.ts`: Fetches a batch of quiz questions (from Supabase cache).
        *   `session/[sessionId]/complete/route.ts`: Marks a quiz session as completed.
        *   `session/[sessionId]/submitAnswer/route.ts`: Submits a player's answer for a specific question.
        *   `session/new/route.ts`: Creates a new quiz session for a player.
    *   `(game)/`: A route group to apply a specific layout (`layout.tsx`) to game-related pages without affecting the URL structure.
        *   `layout.tsx`: Layout specific to the game (e.g., includes game header, lifeline bar).
        *   `leaderboard/page.tsx`: Displays the global leaderboard.
        *   `quiz/[sessionId]/page.tsx`: The main quiz gameplay interface, dynamically loads based on `sessionId`.
        *   `welcome/page.tsx`: Initial welcome screen after wallet connection, prompting to start a new game or view leaderboard.
    *   `layout.tsx`: The root layout for the entire application, wrapping all pages (includes `RainbowKitProvider`, main styling).
    *   `page.tsx`: The primary landing page (e.g., "Connect Wallet" call to action).
    *   `global-error.tsx`: Custom error page for unhandled errors in server components.
    *   `not-found.tsx`: Custom 404 page.
    *   `favicon.ico`, `opengraph-image.tsx`: Favicon and OpenGraph image for SEO.

    4.2. `src/components/`

    Houses all reusable React components.
    
```
    src/components/
    ├── ui/
    │   ├── Button.tsx
    │   ├── Modal.tsx
    │   └── Loader.tsx
    ├── game/
    │   ├── QuestionCard.tsx
    │   ├── LifelineButtons.tsx
    │   ├── ProgressBar.tsx
    │   └── ScoreDisplay.tsx
    ├── layout/
    │   ├── Header.tsx
    │   └── Footer.tsx
    ├── wallet/
    │   └── RainbowConnectButton.tsx
    └── effects/
        ├── Confetti.tsx
        └── GradientTransition.tsx
    ```

    *   `ui/`: Generic, unopinionated UI components (e.g., `Button`, `Modal`, `Loader`).
    *   `game/`: Components specific to the quiz gameplay (e.g., `QuestionCard`, `LifelineButtons`, `ProgressBar`).
    *   `layout/`: Components defining global or sub-layouts (e.g., `Header` with wallet status, `Footer`).
    *   `wallet/`: Components related to wallet connection, specifically for RainbowKit integration (e.g., `RainbowConnectButton`).
    *   `effects/`: Components for visual flair and animations, often using Framer Motion (e.g., `Confetti`, `GradientTransition`).

    4.3. `src/config/`

    Centralized configuration settings.
    
```
    src/config/
    └── env.ts
    ```

    *   `env.ts`: Type-safe helper for accessing environment variables, ensuring they are present and correctly typed at runtime.

    4.4. `src/hooks/`

    Contains custom React hooks for encapsulating and reusing stateful logic.
    
```
    src/hooks/
    ├── useGameSession.ts
    ├── useLifelines.ts
    └── usePlayer.ts
    ```

    *   `useGameSession.ts`: Manages the state and logic for an active quiz session (current question, score, timer).
    *   `useLifelines.ts`: Manages the state and effects of lifelines.
    *   `usePlayer.ts`: Manages the currently connected player's profile data and wallet status.

    4.5. `src/lib/`

    Houses core utility functions, external service clients, and data access layers.
    
```
    src/lib/
    ├── ai/
    │   ├── client.ts
    │   ├── postProcess.ts
    │   └── prompts.ts
    ├── supabase/
    │   ├── client.ts
    │   └── queries.ts
    ├── wagmi/
    │   └── config.ts
    ├── utils/
    │   ├── format.ts
    │   ├── lifelineLogic.ts
    │   ├── scoring.ts
    │   └── timer.ts
    └── constants.ts
    ```

    *   `ai/`: Logic for interacting with the Hugging Face AI API.
        *   `client.ts`: Initializes and manages API calls to Hugging Face.
        *   `postProcess.ts`: Filters, parses, and validates AI-generated questions.
        *   `prompts.ts`: Stores templated prompts for AI question generation.
    *   `supabase/`: Supabase client and data interaction.
        *   `client.ts`: Initializes the Supabase client instance (server and client-side).
        *   `queries.ts`: Encapsulates all database query logic for Supabase (e.g., fetching players, saving sessions, retrieving questions).
    *   `wagmi/`: wagmi and RainbowKit configuration.
        *   `config.ts`: Defines the wagmi client and RainbowKit setup (chains, connectors).
    *   `utils/`: General utility functions.
        *   `format.ts`: Helper functions for formatting text, numbers, wallet addresses.
        *   `lifelineLogic.ts`: Contains the specific logic for each lifeline's effect.
        *   `scoring.ts`: Calculates and updates player scores based on game rules.
        *   `timer.ts`: Manages game countdowns and timers.
    *   `constants.ts`: Stores global constants (e.g., quiz length, score values, lifeline rules).

    4.6. `src/public/`

    Static assets that are served directly by Next.js.
    
```
    src/public/
    ├── images/
    │   ├── rainbow_logo.png
    │   └── mascot.png
    ├── favicons/
    │   ├── favicon-16x16.png
    │   └── favicon-32x32.png
    └── sounds/
        ├── correct.mp3
        └── incorrect.mp3
    ```

    *   `images/`: Project logos, background images, and mascot illustrations.
    *   `favicons/`: Browser favicon files.
    *   `sounds/`: Audio files for UI feedback (e.g., correct/incorrect answer sounds, lifeline activation tones).

    4.7. `src/styles/`

    Contains global CSS files.
    
```
    src/styles/
    └── globals.css
    ```

    *   `globals.css`: Imports Tailwind CSS base styles and defines any global custom styles or utility classes not handled by Tailwind config.

    4.8. `src/types/`

    Central repository for all TypeScript type definitions.
    
```
    src/types/
    ├── ai.ts
    ├── db.ts
    └── game.ts
    ```

    *   `ai.ts`: Types for AI API requests and responses.
    *   `db.ts`: Type definitions for Supabase database tables and views.
    *   `game.ts`: Types for game-specific entities (e.g., `Question`, `QuizSession`, `Player`, `LifelineState`).

    4.9. `src/middleware.ts`

    Next.js middleware for logic that runs before a request is completed.
    
```
    src/middleware.ts
    ```

    *   `middleware.ts`: Could be used for authentication checks, redirects, or header manipulation across specific routes.

5.  TESTING STRATEGY

    
Unit and integration tests will reside within the `src/` directory, mirroring the structure of the code they test.
    
```
    src/
    ├── app/
    │   └── ...
    ├── components/
    │   └── ui/
    │       └── Button.test.tsx
    ├── lib/
    │   ├── utils/
    │   │   └── scoring.test.ts
    │   └── supabase/
    │       └── queries.test.ts
    └── ...
    ```

    *   Test files will typically have a `.test.ts` or `.test.tsx` suffix, allowing for easy discovery by testing frameworks like Jest or React Testing Library.

This comprehensive structure provides a clear, organized, and maintainable codebase for the "Rainbownaire" project, supporting its technical requirements and future growth.

## Database Schema Design
1. SCHEMADESIGN

1.1. Overview

The Rainbownaire database schema, built on Supabase (PostgreSQL), is designed to be efficient, scalable, and secure, supporting a smooth and engaging quiz game experience. It models key entities such as players, quiz questions, individual game sessions, and leaderboard results.

Key Design Principles:
*   **Referential Integrity:** Strong relationships between tables ensure data consistency.
*   **Performance:** Indexed foreign keys and critical fields optimize query performance for common operations like fetching questions or leaderboard data.
*   **Extensibility:** The schema is structured to easily accommodate future features like player achievements, themed challenges, and community-contributed questions.
*   **Security:** Row-Level Security (RLS) is a core consideration, ensuring users only access their own data.

The schema is composed of five core tables: `players`, `questions`, `quiz_sessions`, `quiz_session_questions`, and `leaderboard_entries`. All tables include a UUID primary key (`id`) and standard `created_at` and `updated_at` timestamps.

1.2. Table Details

1.2.1. `players` Table
Purpose: Stores player identity, wallet address, and aggregate profile information. This table acts as the central user profile for the application.

Columns:
*   `id` (uuid, PK): Unique player ID. Default: `gen_random_uuid()`.
*   `wallet_address` (text, Unique, Indexed): The player's connected Rainbow Wallet address. This serves as the primary unique identifier for a player.
*   `display_name` (text, Nullable): An optional, user-editable display name.
*   `avatar_url` (text, Nullable): URL for an optional profile image (e.g., from ENS avatar).
*   `joined_at` (timestamptz, Default `now()`): Timestamp of the player's first connection/registration.
*   `total_games_played` (integer, Default `0`): Cumulative count of quiz sessions completed by the player.
*   `total_points` (integer, Default `0`): Cumulative score across all sessions played.
*   `last_active` (timestamptz, Nullable): Timestamp of the player's last activity or session completion.

Relationships:
*   `players.id` → `quiz_sessions.player_id` (One-to-Many)
*   `players.id` → `leaderboard_entries.player_id` (One-to-Many)

1.2.2. `questions` Table
Purpose: Stores all AI-generated and manually added quiz questions, along with their options and metadata.

Columns:
*   `id` (uuid, PK): Unique question ID. Default: `gen_random_uuid()`.
*   `question_text` (text, Not Null): The full text of the quiz question.
*   `answer_options` (jsonb, Not Null): An array of four possible answers, e.g., `["A) Answer 1", "B) Answer 2", "C) Answer 3", "D) Answer 4"]`.
*   `correct_answer` (text, Not Null): The letter (A, B, C, or D) corresponding to the correct answer.
*   `difficulty` (text, Not Null): Categorization of question difficulty, e.g., 'easy', 'medium', 'hard'.
*   `category` (text, Not Null): Thematic category of the question, e.g., 'wallets', 'nfts', 'security', 'defi'.
*   `source_type` (text, Not Null): Indicates origin: 'ai' (AI-generated) or 'manual' (admin-added).
*   `created_by` (uuid, Nullable): Foreign key to an admin user if manually created.
*   `created_at` (timestamptz, Default `now()`): Timestamp when the question was added.

Notes:
*   AI-generated questions are pre-filtered, validated, and inserted into this table via a Supabase Edge Function to ensure quality and avoid live AI latency during gameplay.
*   Questions are fetched in batches (15 per session) from this table, leveraging caching for performance.

1.2.3. `quiz_sessions` Table
Purpose: Tracks each individual game instance or "round" played by a user, including progress, score, and lifeline usage.

Columns:
*   `id` (uuid, PK): Unique session ID. Default: `gen_random_uuid()`.
*   `player_id` (uuid, FK): Foreign key referencing `players.id`.
*   `current_question_index` (integer, Default `0`): Tracks player's progress through the 15 questions (0-indexed).
*   `score` (integer, Default `0`): The player's current accumulated score within this session.
*   `is_active` (boolean, Default `true`): Flag indicating if the session is currently ongoing.
*   `lifelines_used` (jsonb, Default `{}`): JSON object tracking which lifelines were used, e.g., `{"fiftyFifty": true, "askNetwork": false, "phoneFriend": false}`.
*   `start_time` (timestamptz, Default `now()`): Timestamp when the session began.
*   `end_time` (timestamptz, Nullable): Timestamp when the session ended (completed or game over).
*   `completed` (boolean, Default `false`): Flag indicating if the player finished all 15 questions.
*   `total_time_spent` (integer, Nullable): Total seconds spent on the game session.

Relationships:
*   `quiz_sessions.player_id` → `players.id` (Many-to-One)
*   `quiz_sessions.id` → `quiz_session_questions.session_id` (One-to-Many)
*   `quiz_sessions.id` → `leaderboard_entries.session_id` (One-to-One)

1.2.4. `quiz_session_questions` Table (Recommended for analytics and validation)
Purpose: A junction table to record every question asked within a specific `quiz_session`, including the player's answer and correctness. This enables detailed post-game analytics.

Columns:
*   `id` (uuid, PK): Unique record ID. Default: `gen_random_uuid()`.
*   `session_id` (uuid, FK): Foreign key referencing `quiz_sessions.id`.
*   `question_id` (uuid, FK): Foreign key referencing `questions.id`.
*   `selected_answer` (text, Nullable): The answer chosen by the player (A, B, C, or D).
*   `is_correct` (boolean, Nullable): Flag indicating if the `selected_answer` was correct.
*   `answered_at` (timestamptz, Default `now()`): Timestamp when the question was answered.

Relationships:
*   `quiz_session_questions.session_id` → `quiz_sessions.id` (Many-to-One)
*   `quiz_session_questions.question_id` → `questions.id` (Many-to-One)

1.2.5. `leaderboard_entries` Table
Purpose: Stores top scores and provides data for the global leaderboard. Each entry represents a completed quiz session's score.

Columns:
*   `id` (uuid, PK): Unique entry ID. Default: `gen_random_uuid()`.
*   `player_id` (uuid, FK): Foreign key referencing `players.id`.
*   `score` (integer, Not Null): The final score achieved in the associated session.
*   `session_id` (uuid, FK, Unique): Foreign key referencing `quiz_sessions.id`, ensuring only one leaderboard entry per session.
*   `rank` (integer, Nullable): Calculated leaderboard rank (can be computed dynamically via a Supabase function or view).
*   `achieved_at` (timestamptz, Default `now()`): Timestamp when the score was recorded.

Relationships:
*   `leaderboard_entries.player_id` → `players.id` (Many-to-One)
*   `leaderboard_entries.session_id` → `quiz_sessions.id` (One-to-One)

1.3. Relationships Diagram (Simplified)

```
players <─── quiz_sessions <─── quiz_session_questions ───> questions
   ▲                     ▲
   └───< leaderboard_entries
```

*   One `players` record can have many `quiz_sessions`.
*   One `quiz_sessions` record can have many `quiz_session_questions`.
*   One `quiz_session_questions` record links to one `questions` record.
*   One `players` record can have many `leaderboard_entries` (representing their best scores).
*   One `quiz_sessions` record (once completed) results in one `leaderboard_entry`.

1.4. Critical Data Points by Purpose

*   **Player Identity:** `players.wallet_address`, `players.display_name`, `players.avatar_url`, `players.joined_at`.
*   **Game State Tracking:** `quiz_sessions.current_question_index`, `quiz_sessions.lifelines_used`, `quiz_sessions.is_active`, `quiz_sessions.score`, `quiz_sessions.start_time`, `quiz_sessions.end_time`, `quiz_sessions.completed`.
*   **Question Management:** `questions.question_text`, `questions.answer_options`, `questions.correct_answer`, `questions.category`, `questions.difficulty`, `questions.source_type`.
*   **Score History & Analytics:** `quiz_session_questions.is_correct`, `quiz_sessions.total_time_spent`, `leaderboard_entries.score`, `leaderboard_entries.achieved_at`.

1.5. Scalability & Security Considerations

1.5.1. Row-Level Security (RLS)
*   All tables will implement RLS in Supabase.
*   `players`: Players can read and update their own profile (`display_name`, `avatar_url`).
*   `quiz_sessions`, `quiz_session_questions`, `leaderboard_entries`: Players can read, insert, and update only their own session and leaderboard data.
*   `questions`: Read-only for players. Admin roles will have insert/update permissions.
*   Policies will ensure no player can access or modify another player's game data or questions.

1.5.2. Indexing Strategy
*   `players.wallet_address`: Unique index for fast lookups during wallet connection.
*   `quiz_sessions.player_id`: Index for efficient retrieval of a player's sessions.
*   `leaderboard_entries.score`: B-tree index on `score` (descending) and `achieved_at` (ascending) for fast leaderboard queries.
*   `quiz_session_questions.session_id`, `quiz_session_questions.question_id`: Composite index for efficient session-question lookups.
*   Timestamps (`created_at`, `end_time`) may also be indexed for time-based queries or analytics.

1.5.3. Connection Pooling
*   Supabase's built-in PgBouncer will be utilized for efficient management of database connections, preventing exhaustion under high concurrent load, especially during peak concurrent user spikes.

1.5.4. Supabase Edge Functions & Views
*   **AI Question Generation:** An Edge Function will handle the scheduled invocation of the Hugging Face API, post-processing, and insertion of validated questions into the `questions` table. This decouples AI latency from gameplay.
*   **Score Calculation/Validation:** An Edge Function can be triggered on `quiz_sessions` update (e.g., `completed = true`) to finalize scores, update player aggregates (`total_games_played`, `total_points`), and insert into `leaderboard_entries`, ensuring integrity.
*   **Leaderboard Ranking:** A database view or an Edge Function will dynamically compute ranks for `leaderboard_entries`, potentially with time-based filtering (e.g., "This Week", "All Time").

1.5.5. Caching Strategies
*   **Question Batches:** Pre-generated 15-question packs will be fetched from Supabase and can be cached in an edge cache (Vercel/Cloudflare) or Redis (e.g., Upstash) with a TTL of 30 minutes to 24 hours.
*   **Leaderboard Results:** Leaderboard data will be cached for 30-60 seconds to reduce database load. This cache can be invalidated on new high-score writes or on a timed basis.
*   **User Profile Lookups:** Short TTL caching for `players` data (e.g., `display_name`, `avatar_url`) to minimize redundant reads.

1.6. Future Tables (Phase 3+)

The current schema provides a solid foundation, with explicit considerations for future growth:

1.6.1. `achievements` Table
Purpose: To track player milestones and badges (e.g., "Answered 100 questions," "First Rainbow Streak").
Schema: `id` (uuid, PK), `player_id` (FK), `achievement_type` (text), `unlocked_at` (timestamptz).

1.6.2. `community_questions` Table
Purpose: To support community-driven question submissions and a moderation workflow.
Schema: `id` (uuid, PK), `creator_wallet` (text), `question_text` (text), `answer_options` (jsonb), `correct_answer` (text), `status` (text, e.g., 'pending', 'approved', 'rejected'), `created_at` (timestamptz). This table would feed into the main `questions` table after moderation.

1.6.3. `ai_logs` Table
Purpose: To log raw AI prompts and responses for quality monitoring, debugging, and model fine-tuning.
Schema: `id` (uuid, PK), `prompt_text` (text), `ai_response` (jsonb), `generated_question_id` (uuid, Nullable), `status` (text), `created_at` (timestamptz).

1.6.4. `events` Table
Purpose: To define and manage themed challenges or seasonal events, linking them to specific question sets.
Schema: `id` (uuid, PK), `name` (text), `description` (text), `start_date` (timestamptz), `end_date` (timestamptz), `status` (text), `created_at` (timestamptz). Questions can then have an optional `event_id` column.

1.7. Performance Notes

*   **Read-Heavy Optimization:** The game loop primarily involves reading questions and updating session state. Caching and efficient indexing are crucial here. The `questions` table will be designed for fast, randomized reads of pre-filtered data.
*   **AI Decoupling:** AI question generation is an asynchronous, background process, ensuring it does not impact critical game-play latency.
*   **Supabase Realtime:** While not explicitly used for core gameplay state (which is written to DB directly for auditability), Supabase's Realtime functionality could be explored for future features like live global score updates or 'Ask the Network' lifeline visualizations if data is aggregated in a performant view.

## User Flow
USERFLOW

The "Rainbownaire" user flow outlines the player's complete journey from launching the application to completing a quiz session and interacting with the leaderboard. This document details the step-by-step interactions, system responses, and the core experience design, integrating UI/UX elements, error handling, and gameplay mechanics.

1.  INITIAL APP LOAD & WALLET CONNECTION

    1.1. Launch Screen & Welcome
        *   **User Action**: The player opens the Rainbownaire web app (via mobile browser or desktop).
        *   **System Response**: A visually striking "Rainbow-themed" launch screen loads. This features vibrant gradients, playful animations, and clean typography. A central, prominent button labeled "Connect Wallet to Begin" is displayed.
        *   **UI/UX Details**: The UI instantly evokes the Rainbow Wallet brand, providing immediate familiarity and a sense of "belonging" for the target audience.
        *   **User Feedback**: Soft, ambient background music may play (optional).

    1.2. Wallet Connection via RainbowKit
        *   **User Action**: Player taps "Connect Wallet to Begin".
        *   **System Response**: The RainbowKit modal appears, presenting options to connect.
            *   If Rainbow Wallet is detected (e.g., in-app browser), a seamless "one-tap" connection is prompted.
            *   For other wallets, a WalletConnect QR code or deep link option is shown.
        *   **System Response (Success)**: Upon successful connection, the modal closes. The player's ENS name or a truncated wallet address (e.g., "vibe.eth" or "0x23...d9A") is displayed in the top-right corner of the screen, indicating connection status.
        *   **System Response (Failure/Disconnect)**: If connection fails or disconnects mid-flow, an error message "Your wallet flew away 🪄 -- reconnect to continue your rainbow streak!" appears, prompting reconnection. The system attempts to save local game state for resuming.
        *   **UI/UX Details**: Connection animations are smooth. On success, the wallet icon changes to a vibrant "connected" state.

    1.3. Welcome Modal & Game Entry
        *   **System Response**: A modal appears, greeting the player by their ENS name/address, e.g., "Hey there 🌈 Ready to test your Rainbow energy?".
        *   **User Action**: Player sees two primary options: "Start New Game" and "View Leaderboard".
        *   **UI/UX Details**: Buttons are large, colorful, and clearly differentiated.

2.  STARTING A GAME SESSION

    2.1. Initiate New Game
        *   **User Action**: Player taps "Start New Game".
        *   **System Response**:
            *   **Frontend**: Client-side timer begins.
            *   **Backend (Supabase)**: An API call to `/api/session/new` is made, creating a new entry in the `quiz_sessions` table in Supabase (recording `player_id`, `start_time`, `is_active=true`).
            *   **Backend (Supabase)**: 15 randomized questions (pre-generated by AI and stored in the `questions` table) are fetched for this session. The questions are ordered to progressively increase in difficulty.
            *   **Error Handling**: If question fetching fails, a "Oops! Couldn't find your rainbow quiz 🌈 -- reloading a new one!" message is shown, and the app attempts to load another batch or use a cached set.
        *   **UI/UX Details**: A smooth gradient transition animation sweeps across the screen, signaling the start of the game. A "Rainbow Shuffling..." loading animation may appear briefly.

    2.2. Quiz Screen Layout
        *   **System Response**: The game screen loads, displaying the first question.
        *   **UI Elements**:
            *   **Header**:
                *   Current question number (e.g., "1 / 15").
                *   Player's current score.
                *   Lifeline icons (⚖️ 🌐 📞) – initially active (pulsing gradient).
                *   Countdown timer (20 seconds per question) with a visually depleting progress ring.
            *   **Main Area**:
                *   Question text.
                *   Four multiple-choice answer options (A, B, C, D).
        *   **UI/UX Details**: Elements are spaced clearly. The countdown ring visually depletes, adding subtle tension. Lifeline icons animate softly with a Rainbow-style gradient pulse.

3.  CORE GAMEPLAY LOOP (PER QUESTION)

    3.1. Question Display & Answering
        *   **System Response**: The current question text and four answer options are presented.
        *   **User Action**: Player selects one of the four answer options by tapping or clicking.
        *   **UI/UX Details**:
            *   **Button Feedback**: When an answer is selected, a soft neon gradient pulse expands from the chosen button, accompanied by a slight haptic vibration on mobile.
            *   **Time Limit**: If the 20-second timer runs out, the question is marked incorrect automatically.

    3.2. Scoring & Feedback
        *   **System Response (Answer Submission)**: The selected answer is sent to the backend (Supabase) via an API call, updating the `quiz_session_questions` table (recording `session_id`, `question_id`, `selected_answer`, `is_correct`, `answered_at`). The `quiz_sessions` table `score` is updated.
        *   **System Response (Correct Answer)**:
            *   **UI**: The selected answer tile glows green, emits a soft particle burst (rainbow confetti), and the question number in the progress bar fills with color. A small score particle (e.g., "+100 pts") floats upward.
            *   **Audio**: A gentle "ding" tone + subtle shimmer sound.
            *   **Scoring**: +100 points. If answered within 10 seconds, +25 bonus points. If 3+ consecutive correct answers, +50 streak bonus.
        *   **System Response (Incorrect Answer)**:
            *   **UI**: The selected answer tile fades to red. The screen background dims slightly with a brief "thud" effect.
            *   **Audio**: A low, muffled tone (no harsh buzzer).
            *   **Scoring**: -50 points.
            *   **MVP Game Mode (Casual)**: The game continues to the next question.
            *   **Error Handling (Submission)**: If submission fails, "Couldn't lock in your answer -- try again?" appears. User can retry.
        *   **UI/UX Details**: Visuals are designed for instant, clear feedback without being jarring. Consecutive correct answers can trigger a "streak glow" effect around the next question card.

    3.3. Question Progression
        *   **System Response**: After feedback, the next question automatically loads. The header updates the "X / 15" counter.
        *   **UI/UX Details**: Smooth transitions between questions (e.g., slight fade or slide).

4.  LIFELINE MECHANICS

    4.1. General Lifeline UI
        *   **UI Elements**: Three circular icons (⚖️, 🌐, 📞) at the top of the quiz screen.
        *   **User Action**: Hovering or tapping an icon shows a tooltip explaining its function.
        *   **UI/UX Details**: Active lifelines pulse with a rainbow gradient. Used lifelines desaturate to grey and become disabled.

    4.2. 50:50 Lifeline
        *   **User Action**: Player taps the ⚖️ 50:50 icon.
        *   **System Response**:
            *   **UI**: The icon animates with a quick pulse, then desaturates to grey and disables. Two randomly selected *incorrect* answer options fade out (reduced opacity, disabled interaction). The remaining two answers are slightly highlighted.
            *   **Functional**: No point penalty. Usable once per game session.
            *   **Backend (Supabase)**: `quiz_sessions.lifelines_used` field is updated.
        *   **Audio**: Short digital cut sound.

    4.3. Ask the Network Lifeline
        *   **User Action**: Player taps the 🌐 Ask the Network icon.
        *   **System Response**:
            *   **UI**: Icon animates with a "wave" broadcast pattern, then desaturates/disables. The answer choices area transitions into a bar graph overlay, showing simulated "community votes" for each option (mock data based on weighted probabilities, making correct answer more likely but not guaranteed). A text "Here's what the Rainbow network thinks 🌈" appears.
            *   **Functional**: -10 point penalty. Usable once per game session.
            *   **Backend (Supabase)**: `quiz_sessions.lifelines_used` is updated.
        *   **Audio**: Gentle crowd murmur + ping sound.
        *   **UI/UX Details**: After 5 seconds, the bar graph fades, and the player can still choose their answer.

    4.4. Phone a Friend Lifeline
        *   **User Action**: Player taps the 📞 Phone a Friend icon.
        *   **System Response**:
            *   **UI**: Icon animates, then desaturates/disables. A modal pops up with a "Quick Simulation" option. An animated chat bubble appears after 3 seconds, showing a simulated friend's guess: "👋 Your friend thinks it's probably B) -- but they're only 70% sure!" (randomized accuracy).
            *   **Functional**: -10 point penalty. Usable once per game session.
            *   **Backend (Supabase)**: `quiz_sessions.lifelines_used` is updated.
        *   **Audio**: Playful phone ring tone + typing clicks.
        *   **UI/UX Details**: The message is personality-driven and encourages thoughtful consideration.

5.  END OF GAME & SCORING SUMMARY

    5.1. Session Completion
        *   **System Response**: After the 15th question is answered (or time runs out on the last question), the game concludes.
        *   **Backend (Supabase)**: The `quiz_sessions` table is updated: `is_active=false`, `end_time` recorded, `completed=true`, `score`, `total_time_spent`. If the score is high enough, a new `leaderboard_entries` record is created or updated.
        *   **UI/UX Details**: A celebratory confetti animation engulfs the screen.

    5.2. Post-Game Results
        *   **System Response**: A summary screen is presented.
        *   **UI Elements**:
            *   Final total score.
            *   Player's accuracy percentage.
            *   Number of lifelines used.
            *   Total time spent.
            *   A button to "View Leaderboard".
            *   A prominent "Play Again 🔁" button.
        *   **UI/UX Details**: If the player beats their personal best, a special Rainbow-themed celebratory modal appears: "You just hit a new vibe record! 🌈💪 Keep glowing!". The "Play Again" button may have a subtle wave animation.

6.  LEADERBOARD INTERACTION

    6.1. Accessing the Leaderboard
        *   **User Action**: Player taps "View Leaderboard" from the welcome modal or post-game summary.
        *   **System Response**: An API call fetches the top entries from the `leaderboard_entries` table in Supabase.
        *   **Error Handling**: If leaderboard fails to load, "Leaderboard cloud not syncing ☁️ -- showing offline results." is displayed, and a locally cached leaderboard snapshot is shown.
        *   **UI/UX Details**: The leaderboard appears via a "drop-in" card animation.

    6.2. Leaderboard Display
        *   **UI Elements**:
            *   A list of the global top 10 players.
            *   Each entry shows ENS name/short address, score, and the date achieved.
            *   Filtering options: "This Week" and "All Time" (optional in MVP).
        *   **UI/UX Details**: The leaderboard is clean, well-organized, and continues the Rainbow aesthetic with vibrant accents. Player's own score is highlighted.

7.  REPLAYING THE GAME

    7.1. Starting a New Round
        *   **User Action**: Player taps "Play Again 🔁".
        *   **System Response**: The game restarts the flow from "2. Game Setup & Question Loading" with a fresh set of randomized questions.
        *   **UI/UX Details**: The background animation subtly shifts or changes hues to signal a new round.

8.  ERROR HANDLING & RESILIENCE (USER FACING)

    Rainbownaire aims for a resilient, forgiving, and playful experience. Errors are never raw; instead, they are transformed into user-friendly messages that fit the Rainbow brand.

    *   **Wallet Disconnect**: If the wallet disconnects mid-game, a modal appears: "Lost your rainbow wallet? Tap to reconnect ✨". The app attempts to save current game progress locally.
    *   **Backend/API Failure**: For Supabase or API issues, messages like "Hmm, the rainbow signal's fuzzy -- retrying..." or "Our AI genie took a nap 🤖💤 -- fetching stored questions instead!" are displayed. The system attempts silent retries (2-3 times with exponential backoff) before resorting to fallbacks (e.g., cached questions, local leaderboard data).
    *   **Unexpected App Crash (Frontend)**: React Error Boundaries display a playful full-screen fallback: "Rainbow broke a wing 🪶 -- refresh to fix it.", along with a "Reload App" button.
    *   **User Language**: All error messages maintain a friendly, non-technical, and encouraging tone. Each includes a clear call-to-action (e.g., "Retry", "Reconnect") styled as a glowing Rainbow button.
    *   **Local State Backup**: Game progress (current question, score, lifelines) is continuously saved to `localStorage`, allowing players to resume unfinished sessions after a refresh or disconnect. Upon reload, a prompt "Continue from where you left off?" appears.
    *   **Reduced Motion**: An accessibility setting "Reduce Motion" is available, disabling intense particle bursts and transitions while keeping core animations subtle.
    *   **Color Contrast**: All interactive text and elements meet WCAG AA contrast ratios, and indicators (correct/incorrect) use both color and iconography (✔️ / ✖️).
    *   **Keyboard Navigation**: Full keyboard tab navigation with clear focus outlines is supported.

This comprehensive user flow ensures a delightful, engaging, and robust experience for every Rainbownaire player.

## Styling Guidelines
1. STYLING GUIDELINES: WHO WANTS TO BE A RAINBOWNAIRE

1.1. Introduction & Philosophy

The "Rainbownaire" styling guidelines are crafted to reflect the core essence of the Rainbow Wallet: vibrant, elegant, and user-friendly. Our visual language is designed to be joyful, approachable, and inspiring, transforming complex Web3 concepts into a delightful, gamified experience. Every pixel, animation, and color choice aims to reinforce a sense of discovery, confidence, and community connection, ensuring that the app feels like playing with color, not just clicking buttons.

Inspired by Rainbow Wallet"s aesthetic, our design prioritizes:
*   **Vibrancy & Playfulness:** A rich palette of gradients and dynamic animations.
*   **Clarity & Simplicity:** Clean, modern typography and intuitive layouts.
*   **Responsiveness & Fluidity:** Seamless experiences across devices with smooth transitions.
*   **Accessibility & Inclusivity:** Design choices that welcome all users.

2. VISUAL IDENTITY

2.1. Color Palette

Our palette is the cornerstone of the "Rainbownaire" experience, directly mirroring the iconic Rainbow Wallet brand. Gradients are heavily utilized to create depth and energy.

*   **Primary Rainbow Gradient:**
    *   #8B5CF6 (Purple)
    *   #FF7AE6 (Pink)
    *   #FFD400 (Yellow)
    *   #00FFD1 (Aqua)
    *   Usage: Main backgrounds, interactive elements, loading states, key UI accents.

*   **Accent Colors:**
    *   `--color-success`: #00FFD1 (Bright Aqua) – For correct answers, positive feedback.
    *   `--color-error`: #FF6B6B (Vibrant Red) – For incorrect answers, warnings.
    *   `--color-warning`: #FFD400 (Bright Yellow) – For cautions, informational prompts.
    *   `--color-info`: #8B5CF6 (Purple) – For general information, notifications.
    *   Usage: Semantic feedback, subtle highlights.

*   **Neutral Colors (Dark Mode First):**
    *   `--color-background-dark`: #111111 (Deep Charcoal) – Primary background.
    *   `--color-surface-dark`: #1A1A1A (Dark Grey) – Card backgrounds, elevated surfaces.
    *   `--color-text-primary-dark`: #FFFFFF (Pure White) – Main body text, headings.
    *   `--color-text-secondary-dark`: #CCCCCC (Light Grey) – Subtitles, secondary information.
    *   Usage: Ensures high contrast and readability in our primary dark theme.

2.2. Typography

We prioritize legibility and a friendly, modern aesthetic. Inter is chosen for its versatility and geometric clarity, aligning with Rainbow Wallet"s sophisticated yet approachable vibe.

*   **Font Family:** Inter (or SF Pro Display as a system fallback).
*   **Heading Styles:**
    *   `H1` (Game Title): `font-weight: 800 (ExtraBold)`, `font-size: 3rem-4rem` (responsive) – Bold, commanding.
    *   `H2` (Section Titles): `font-weight: 700 (Bold)`, `font-size: 2rem-2.5rem` – Clear, prominent.
    *   `H3` (Question Text): `font-weight: 600 (SemiBold)`, `font-size: 1.5rem-2rem` – Highly readable, inviting.
*   **Body Text:**
    *   `body-large`: `font-weight: 400 (Regular)`, `font-size: 1.125rem` – For longer paragraphs, descriptions.
    *   `body-base`: `font-weight: 400 (Regular)`, `font-size: 1rem` – Standard UI text, answer options.
    *   `body-small`: `font-weight: 300 (Light)`, `font-size: 0.875rem` – Labels, small print.
*   **UI Elements:**
    *   Buttons: `font-weight: 600 (SemiBold)`, `font-size: 1.125rem`.
    *   Lifelines: `font-weight: 500 (Medium)`, `font-size: 0.875rem` (within icon).
*   **Line Height:** Generally `1.5` for body text, `1.2` for headings, to ensure optimal readability.
*   **Letter Spacing:** Tightly set for headings, slightly looser for body text.

2.3. Iconography

Icons are clean, minimalist, and use a consistent line-art style. They enhance clarity and visual appeal without cluttering the interface.

*   **Style:** Line-art, rounded corners, filled when active.
*   **Color:** Typically white or light grey against dark backgrounds, adopting primary gradient colors when interactive or highlighted.
*   **Usage:** Lifelines (⚖️, 🌐, 📞), navigation elements, feedback indicators (✔️, ✖️).

2.4. Imagery & Illustrations

Minimalist, abstract, or geometric illustrations are preferred, echoing Rainbow Wallet"s modern style.

*   **Style:** Soft gradients, clean shapes, no harsh lines.
*   **Usage:** Welcome screens, empty states, celebratory moments (confetti).
*   **Avoid:** Stock photography, overly complex or realistic imagery.

3. UI COMPONENTS & ELEMENTS

3.1. General Principles

All UI components are designed with soft, rounded edges and ample padding to create a friendly and inviting feel. They emphasize cleanliness, modernity, and a subtle "pop" through gradient use.

3.2. Buttons

Interactive elements are clearly identifiable and provide instant feedback.

*   **Primary CTA (e.g., "Connect Wallet", "Start Game"):**
    *   Rounded rectangular shape.
    *   Background: Full primary Rainbow gradient.
    *   Text: White, bold.
    *   Hover/Active: Subtle scale-up, soft neon gradient pulse from center, haptic feedback (mobile).
*   **Secondary Buttons (e.g., "View Leaderboard", "Replay"):**
    *   Ghost/Outline style, transparent background with gradient border.
    *   Text: Gradient color.
    *   Hover/Active: Gradient fill, subtle pulse.
*   **Lifeline Buttons:**
    *   Circular icons.
    *   Inactive: Desaturated grey, slightly opaque.
    *   Active: Full Rainbow gradient pulse.
    *   Used: Desaturated and greyed out.

3.3. Cards & Containers

Used for questions, leaderboard entries, and information modals.

*   **Style:** Softly rounded rectangles with a `border-radius: 12px` to `24px`.
*   **Background:** `--color-surface-dark` or a subtle gradient overlay.
*   **Shadows:** Soft, diffused shadows to create a sense of elevation without being heavy.

3.4. Inputs & Forms

(Currently minimal, but for future expansions like display name input).

*   **Style:** Rounded corners, subtle border, clear focus state.
*   **Focus State:** A glowing outline matching the primary Rainbow gradient.

3.5. Progress Indicators

Visual representation of progress through the quiz.

*   **Quiz Progress Bar:**
    *   A linear bar at the top, segmenting 15 questions.
    *   Segments fill sequentially with a shifting Rainbow gradient color as questions are answered.
    *   Animated fill transition.
*   **Question Timer (Countdown):**
    *   Circular progress ring around the question number or dedicated timer element.
    *   Color of the ring depletes from a vibrant Rainbow hue to red as time runs out.

4. MOTION & ANIMATION

4.1. General Philosophy

Motion is an integral part of the "Rainbownaire" experience, transforming static UI into a fluid, playful, and responsive environment. All animations are designed to be smooth, purposeful, and non-distracting, enhancing user delight and providing clear feedback. Framer Motion is the primary tool for these effects.

4.2. Page Transitions

*   **Effect:** Subtle gradient fade-in/out transitions between main views (e.g., Welcome to Quiz, Quiz to Leaderboard).
*   **Duration:** Short (300-500ms) to feel responsive.

4.3. Micro-interactions

These small, delightful animations provide crucial feedback.

*   **Button Ripple & Glow:** On tap/click, a soft neon gradient pulse expands from the button, often accompanied by haptic feedback on mobile.
*   **Correct Answer:** Answer tile glows green, emits a soft Rainbow particle burst (confetti), and a gentle "ding" sound.
*   **Incorrect Answer:** Tile briefly fades to red, screen background dims slightly with a soft "thud" sound, then a micro-prompt (e.g., "Try again?").
*   **Streak Glow:** After 3+ consecutive correct answers, a short trail of Rainbow light follows the next question card.
*   **Lifeline Activation:**
    *   **50:50:** Incorrect answers fade out with a subtle swirl animation, leaving subtle question marks.
    *   **Ask the Network:** Screen transitions into a "community cloud" overlay, showing animated dots "voting" in real-time (simulated), then fades back.
    *   **Phone a Friend:** Chat bubble modal appears with a whimsical typing animation before revealing the "friend"s message.
*   **Score Particle:** On each correct answer, a small score particle (e.g., "+100 XP") floats upward like confetti.

4.4. Loading States & Placeholders

*   **Effect:** Subtle pulsating gradients, skeletal loading animations, or thematic icons (e.g., a "Rainbow Shuffling..." message) to indicate activity.
*   **Usage:** During question fetching, leaderboards loading, or AI generation.

4.5. Delight Triggers

Small, unexpected animations that evoke joy.

*   **Color Transitions:** Subtle, slow-moving gradient backgrounds in primary screens.
*   **Micro-Particles:** Random, ephemeral sparkles or bubbles on major interaction areas (e.g., wallet connect, final score screen).
*   **End-of-Game:** Full-screen Rainbow explosion animation reveals the final score, followed by a "drop-in" animation for the leaderboard card.

5. LAYOUT & SPACING

5.1. Grid & Responsive Layout

*   **System:** Uses a 12-column grid for desktop, simplifying to a single-column stack on mobile.
*   **Breakpoints:** Standard Tailwind CSS breakpoints (`sm`, `md`, `lg`, `xl`) are used to ensure responsive behavior.
*   **Mobile-First:** Design and development prioritize the mobile experience, scaling up for larger screens.

5.2. Spacing System

*   **Basis:** A `4px` base unit, consistent with Tailwind CSS utility classes (e.g., `p-4` = 16px).
*   **Usage:** Standardized spacing for margins, padding, and gaps between components to maintain visual harmony and balance.

6. ACCESSIBILITY

Our commitment to accessibility ensures "Rainbownaire" is enjoyable for everyone.

6.1. Color Contrast

*   **WCAG AA Compliance:** All text and interactive elements meet or exceed WCAG AA contrast ratio standards (minimum 4.5:1 for normal text, 3:1 for large text).
*   **Themed Palette:** Base Rainbow gradients are always paired with high-contrast text and dark neutral backgrounds (#111111, #1A1A1A).
*   **Semantic Indicators:** Correct/incorrect feedback uses both color (green/red) and iconography (✔️ / ✖️) for clarity.

6.2. Keyboard & Focus Navigation

*   **Full Keyboard Support:** All interactive elements (buttons, links, form fields) are navigable via keyboard (Tab, Shift+Tab).
*   **Focus States:** Clearly visible focus indicators are provided, typically a glowing outline in a Rainbow gradient stroke around the focused element.
*   **Shortcut Keys:** Lifeline buttons are accessible via shortcut keys (e.g., 1, 2, 3) where intuitive.

6.3. Motion Sensitivity Options

*   **Reduced Motion Toggle:** A setting is provided to "Reduce Motion," which disables intense particle bursts, fast-paced transitions, and complex animations, retaining only subtle opacity or scale changes.
*   **`prefers-reduced-motion`:** The app automatically respects the user"s system-level `prefers-reduced-motion` CSS media query.

6.4. Readability & Typography

*   **Legible Fonts:** Inter is chosen for its excellent readability across various sizes and screen types.
*   **Minimum Font Size:** Base font size for body text is `16px` to ensure comfortable reading.
*   **Text Hierarchy:** Clear visual hierarchy is established using varying font weights and sizes to differentiate between questions, answers, and supplementary information.

7. THEMES

7.1. Dark Mode / Light Mode

"Rainbownaire" will primarily launch with a **Dark Mode** theme, consistent with the Rainbow Wallet"s elegant aesthetic and designed for optimal contrast with vibrant gradients.

*   **Dark Mode:** Deep charcoal backgrounds, white/light grey text, vibrant Rainbow gradients for interactive elements.
*   **Light Mode (Future Iteration):** Will introduce a complementary palette with lighter backgrounds and darker text, ensuring the vibrant Rainbow gradients still pop effectively. A user toggle will be available in settings.
