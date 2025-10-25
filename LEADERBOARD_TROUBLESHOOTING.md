# 🏆 Rainbownaire Leaderboard Troubleshooting Guide

## 🔍 **Common Issues & Solutions**

### **1. "Database not configured" Error**
**Problem**: Missing Supabase environment variables in Vercel deployment.

**Solution**:
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Rainbownaire project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. **Redeploy** your project

**Get Supabase credentials**:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon/public key**

---

### **2. "Database tables not set up" Error**
**Problem**: Required database tables don't exist.

**Solution**:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Copy the entire contents of `setup_database_minimal.sql`
5. Paste and run the SQL script

**This creates**:
- ✅ `players` table (user data & nicknames)
- ✅ `quiz_sessions` table (game tracking)
- ✅ `leaderboard_entries` table (scores)
- ✅ Proper indexes and security policies

---

### **3. "No scores submitted yet" Message**
**Problem**: No quiz scores in the database.

**Solution**:
1. **Complete a full quiz** (15 questions)
2. **Scores are automatically submitted** when you finish
3. **Check the leaderboard** after completing a quiz

**The quiz automatically submits scores** when you:
- ✅ Complete all 15 questions
- ✅ Click "View Results" on the final question
- ✅ Your nickname (if set) is included with the score

---

### **4. "Cannot connect to database" Error**
**Problem**: Database connection issues.

**Solution**:
1. **Verify Supabase credentials** are correct
2. **Check Supabase project** is active (not paused)
3. **Ensure API keys** have proper permissions
4. **Try redeploying** your Vercel project

**Test database connection**:
- Visit `/api/health` in your deployed app
- This shows detailed connection status

---

## 🛠️ **Debugging Tools**

### **Health Check API**
Visit `/api/health` in your deployed app to see:
- ✅ Environment variable status
- ✅ Database connection health
- ✅ Table accessibility
- ✅ Total leaderboard entries

### **Browser Console**
Open browser dev tools and check for:
- Network errors when loading `/api/leaderboard`
- Console errors during quiz completion
- Failed API requests

### **Vercel Logs**
Check your Vercel deployment logs:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Deployments** → **Latest**
4. Click **View Logs** for detailed error information

---

## ✅ **How the Leaderboard Works**

### **Score Submission Process**:
1. **User completes quiz** → Quiz calculates final score
2. **Automatic submission** → Score sent to `/api/leaderboard` POST endpoint
3. **Database storage** → Score saved with player info and nickname
4. **Leaderboard display** → GET `/api/leaderboard` fetches and ranks scores

### **Nickname Integration**:
- ✅ **Set nickname** on home page → Saved to localStorage + database
- ✅ **Quiz completion** → Nickname automatically included with score
- ✅ **Leaderboard display** → Shows nickname instead of wallet address
- ✅ **Fallback** → Shows shortened address if no nickname set

### **Data Flow**:
```
Quiz Page → Score Submission → Database → Leaderboard Display
    ↓              ↓              ↓              ↓
Nickname      API POST      Players Table   API GET
Included      to /leaderboard  with scores   to fetch rankings
```

---

## 🚀 **Quick Test**

To verify everything works:

1. **Set a nickname** on the home page
2. **Complete a full quiz** (15 questions)
3. **Check the results page** - should show "Score automatically submitted to leaderboard!"
4. **Visit the leaderboard** - should see your score with nickname
5. **Check `/api/health`** - should show database connection status

---

## 📞 **Still Having Issues?**

1. **Check the health endpoint**: Visit `/api/health`
2. **Review error messages**: They now show specific setup instructions
3. **Verify database setup**: Run the SQL script in Supabase
4. **Check environment variables**: Ensure they're set in Vercel
5. **Test with a fresh quiz**: Complete a new quiz to submit a score

The leaderboard should work perfectly once the database is properly configured! 🌈✨
