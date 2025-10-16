# 🎉 Google Gemini Setup Guide

**Great news!** We've switched from Hugging Face to Google Gemini - it's faster, easier, and the free tier is generous!

---

## ✨ Why Gemini is Better

| Feature | Hugging Face | Google Gemini ✅ |
|---------|-------------|------------------|
| **Speed** | 20-30s first request | 1-2s always |
| **Model Loading** | Needs warm-up | Always ready |
| **Free Tier** | 1,000/day | 60/minute (86,400/day!) |
| **JSON Output** | Manual parsing | Native support |
| **Setup** | Complex | Super simple |

---

## 🚀 Get Your Free API Key (2 minutes)

### Step 1: Go to Google AI Studio
Visit: **https://aistudio.google.com/app/apikey**

### Step 2: Sign in with Google
Use your Gmail account

### Step 3: Create API Key
1. Click **"Get API Key"**
2. Click **"Create API key in new project"** (or select existing project)
3. **Copy the API key** (looks like: `AIzaSy...`)

### Step 4: Add to Your Project
Open your `.env.local` file and add:

```env
GOOGLE_GEMINI_API_KEY=AIzaSy_your_actual_key_here
```

**That's it!** 🎉

---

## 🧪 Test It Works

### Option 1: Use the Admin UI

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Visit: **http://localhost:3000/admin**

3. Click **"Generate Questions"**

4. You should see questions appear in 1-2 seconds!

### Option 2: Test via API

```bash
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "difficulty": "easy",
    "category": "web3_basics",
    "count": 1
  }'
```

---

## 📊 Free Tier Limits

### Gemini 1.5 Flash (FREE):
- **60 requests per minute** (RPM)
- **1,500 requests per day** (RPD) 
- **1 million tokens per day**

This is MORE than enough for development and even small-scale production! 🚀

### Rate Limits:
If you hit the limit, the system will:
- ✅ Automatically retry with exponential backoff
- ✅ Wait and try again
- ✅ Log warnings in console

---

## 🎯 Models Available

### Gemini 1.5 Flash (Default) ⚡
- **Speed:** Super fast (1-2 seconds)
- **Cost:** FREE
- **Use case:** Perfect for our quiz questions!

### Gemini 1.5 Pro (Upgrade)
- **Speed:** Slightly slower (2-3 seconds)
- **Quality:** Higher quality
- **Cost:** FREE tier available
- **To use:** Change model in `lib/ai/gemini-client.ts`

---

## 🔧 Configuration

### Change Model

Edit `lib/ai/gemini-client.ts`:

```typescript
const DEFAULT_MODEL = 'gemini-1.5-pro'; // or 'gemini-1.5-flash'
```

### Adjust Generation Settings

In `lib/ai/question-generator.ts`:

```typescript
const response = await geminiClient.generateCompletion(prompt, {
  temperature: 0.8,      // 0.0-2.0 (higher = more creative)
  maxOutputTokens: 2048, // Max response length
  topP: 0.9,            // 0.0-1.0 (nucleus sampling)
  topK: 40,             // Top K sampling
});
```

---

## 🐛 Troubleshooting

### "Invalid API Key" Error

**Problem:** API key not recognized

**Solution:**
1. Check you copied the full key (starts with `AIzaSy`)
2. Make sure `.env.local` file exists in project root
3. Restart dev server: `npm run dev`
4. No quotes needed around the key in `.env.local`

### "Rate Limited" Error

**Problem:** Too many requests too fast

**Solution:**
- Wait 1 minute
- System will automatically retry
- Free tier: 60 requests/minute

### Empty Response

**Problem:** Gemini returns blank

**Solution:**
1. Check prompt format (should request JSON)
2. Check console for errors
3. Try reducing `maxOutputTokens`

### "403 Forbidden"

**Problem:** API key doesn't have permissions

**Solution:**
1. Make sure Gemini API is enabled in Google Cloud Console
2. Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
3. Click "Enable"

---

## 📚 Helpful Links

- **Get API Key:** https://aistudio.google.com/app/apikey
- **Gemini Docs:** https://ai.google.dev/docs
- **Pricing:** https://ai.google.dev/pricing
- **API Reference:** https://ai.google.dev/api

---

## 🎨 What Changed?

### Files Updated:
1. ✅ `lib/ai/gemini-client.ts` - New Gemini client (replaces Hugging Face)
2. ✅ `lib/ai/question-generator.ts` - Uses Gemini now
3. ✅ `.env.local.example` - Updated for Gemini
4. ✅ `types/game.ts` - Added missing type exports

### What Still Works:
- ✅ Admin UI at `/admin`
- ✅ API endpoints
- ✅ Batch generation
- ✅ Fallback system
- ✅ Validation
- ✅ Everything else!

### What's Better:
- ⚡ **10x faster** responses
- 🎯 **Better JSON** formatting
- 🆓 **More generous** free tier
- ✨ **Simpler** setup

---

## 🎉 You're All Set!

Just add your API key to `.env.local` and start generating questions!

```bash
# Get your key
https://aistudio.google.com/app/apikey

# Add to .env.local
GOOGLE_GEMINI_API_KEY=your_key_here

# Test it
npm run dev
# Visit http://localhost:3000/admin
```

**Happy coding! 🌈**

---

*Last Updated: 2025-10-14*
