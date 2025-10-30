# SSV Content Generator - Troubleshooting Guide

## 🚨 "Failed to generate quality articles after 3 attempts"

### What This Error Means

This error occurs when the system tried 3 times to generate articles but failed each time. The **new version** now tells you EXACTLY what failed instead of this generic message.

---

## ✅ FIXES DEPLOYED (Latest Version)

### 1. **Detailed Error Logging**
**Before:** "Failed to generate quality articles after 3 attempts"
**Now:** Specific error like:
- "❌ AUTHENTICATION FAILED: Invalid ANTHROPIC_API_KEY"
- "❌ RATE LIMIT: Too many requests to Claude API"
- "❌ Article 1: UNVERIFIED NAME: 'John Doe' - not in approved list"
- "❌ BAD REQUEST: Claude API returned 400"

### 2. **Step-by-Step Validation Logging**
Every validation step is now logged:
```
Validating Article 1...
✓ Confidence: 95%
✓ Word count: 2000
✓ Title length: 45 chars
✓ Meta description: 155 chars
✓ All names verified: Isaac Thomson, Sherrod Seward
✓ Attorney name correct
✓ Heading structure present
✓ Image context: 120 chars
✅ Article 1 validation PASSED
```

### 3. **API Call Diagnostics**
```
🔑 API Key: sk-ant-api03-x...
📡 Calling Claude API (max_tokens: 8000)...
📥 API Response Status: 200
✅ API call successful, parsing response...
✅ Response received (12453 chars), extracting articles...
✅ JSON extracted (11234 chars), parsing...
✅ Article 1: "From Australia to America..." (2145w, 95%)
✅ Article 2: "Breaking Through Barriers..." (1987w, 93%)
```

### 4. **Context-Specific Error Emails**
Error emails now include troubleshooting specific to your problem.

---

## 🔧 Common Issues & Solutions

### Issue 1: Authentication Failed (401)

**Error Message:**
```
❌ AUTHENTICATION FAILED: Invalid ANTHROPIC_API_KEY.
Check your API key in Project Settings → Script Properties.
Key should start with 'sk-ant-'.
```

**Solution:**
1. Open Apps Script editor
2. Click **Project Settings** (gear icon on left)
3. Scroll to **Script Properties**
4. Verify `ANTHROPIC_API_KEY` exists
5. Value should start with `sk-ant-`
6. Get new key from: https://console.anthropic.com/settings/keys
7. Make sure you have **API credits** (check billing)

**How to Check Credits:**
1. Go to https://console.anthropic.com/settings/billing
2. Verify you have a payment method
3. Check current balance/usage

---

### Issue 2: Rate Limit (429)

**Error Message:**
```
❌ RATE LIMIT: Too many requests to Claude API.
Wait a few minutes and try again, or check your API usage limits.
```

**Solution:**
1. Wait 15-30 minutes before trying again
2. Check usage: https://console.anthropic.com/settings/usage
3. Verify you haven't exceeded rate limits
4. Consider upgrading to higher tier
5. Reduce `MAX_RETRIES` in Config sheet temporarily

**Rate Limits by Tier:**
- Free tier: 5 requests/minute
- Tier 1: 50 requests/minute
- Tier 2: 1,000 requests/minute

---

### Issue 3: Unverified Name

**Error Message:**
```
❌ Article 1: UNVERIFIED NAME: "John Doe" - not in approved list. This is CRITICAL.
📋 Approved names: Isaac Thomson, Siddhanth Thingalaya, Gustavo Zampieri...
```

**Solution:**

**Option A - Add Name Manually:**
1. Open **Verified_Names** sheet
2. Add new row:
   ```
   Name: John Doe
   Type: Person
   Times Used: 0
   Last Used:
   Source: Manually added
   ```
3. Run again

**Option B - Run Name Extraction Tool:**
1. Go to Apps Script
2. Open **SSV_NAME_EXTRACTION_TOOL.gs** script
3. Run: `extractAllNamesFromWebsite()`
4. Wait 5-10 minutes
5. Check Verified_Names sheet for new entries
6. Run content generation again

**Option C - Let It Retry:**
- System automatically retries with different content
- Claude will try different names on next attempt
- Usually resolves itself within 2-3 attempts

---

### Issue 4: Low Confidence

**Error Message:**
```
❌ Article 1: Confidence 85% < 90%
```

**Solution:**

**Temporary Fix:**
1. Open **Config** sheet
2. Change `CONFIDENCE_THRESHOLD` from 90 to 85
3. Run again

**Better Long-term Fix:**
1. Add more URLs to **Website_URLs** sheet
2. Add more names to **Verified_Names** sheet
3. Make sure example articles are embedded in code
4. Keep threshold at 90 for quality

---

### Issue 5: JSON Parsing Error

**Error Message:**
```
❌ Failed to parse articles from Claude response: Unexpected token...
Response preview: {"article1": {
```

**Solution:**
1. This is usually temporary (Claude sometimes returns malformed JSON)
2. System will **automatically retry**
3. Usually works on 2nd or 3rd attempt
4. If persists after 3 attempts:
   - Check Claude API status: https://status.anthropic.com/
   - Check Apps Script logs for full response
   - May need to adjust prompt format

---

### Issue 6: Missing API Key

**Error Message:**
```
❌ ANTHROPIC_API_KEY is missing or empty.
Check Project Settings → Script Properties.
```

**Solution:**
1. Apps Script → Project Settings (gear icon)
2. **Script Properties** section
3. Click **+ Add script property**
4. Add:
   ```
   Property: ANTHROPIC_API_KEY
   Value: sk-ant-api03-xxxxx (your key)
   ```
5. Add second property:
   ```
   Property: OPENAI_API_KEY
   Value: sk-xxxxx (your key)
   ```
6. Click **Save script properties**

---

### Issue 7: Network Error

**Error Message:**
```
Network error calling Claude API: Connection timeout
```

**Solution:**
1. This is usually temporary
2. Check internet connection
3. Check Claude API status: https://status.anthropic.com/
4. Wait 5-10 minutes and try again
5. System will retry tomorrow at 4 AM automatically

---

## 📋 Diagnostic Checklist

Before running, verify:

### ✅ API Keys Set
- [ ] `ANTHROPIC_API_KEY` in Script Properties
- [ ] `OPENAI_API_KEY` in Script Properties
- [ ] Keys start with correct prefix (`sk-ant-` and `sk-`)
- [ ] Keys are valid and active

### ✅ API Credits Available
- [ ] Claude account has credits/payment method
- [ ] OpenAI account has credits
- [ ] No rate limits exceeded

### ✅ Sheets Initialized
- [ ] Config sheet exists with settings
- [ ] Verified_Names sheet has names
- [ ] Website_URLs sheet has URLs
- [ ] Content_Archive sheet exists
- [ ] Error_Log sheet exists

### ✅ Configuration Valid
- [ ] `CONFIDENCE_THRESHOLD` is reasonable (90-95)
- [ ] `MIN_WORD_COUNT` and `MAX_WORD_COUNT` set
- [ ] `EMAIL_RECIPIENTS` has valid emails
- [ ] `ARTICLES_PER_DAY` is set (usually 2)

---

## 🔍 How to Debug

### Step 1: Check Apps Script Logs
1. Apps Script → **Executions** tab (left sidebar)
2. Find your execution by timestamp
3. Click to see full log
4. Look for specific error messages

**What to look for:**
- ❌ symbols indicate failures
- ✅ symbols indicate success
- Look for "API Response Status: XXX"
- Check which validation step failed

### Step 2: Check Error_Log Sheet
1. Open your Google Sheet
2. Go to **Error_Log** tab
3. Find most recent entry
4. Check error message column

### Step 3: Test Components Individually

**Test API Keys:**
```
Menu: 🚀 SSV Content → 🔧 Test Configuration
```
Should say "Configuration Valid"

**Test Email:**
```
Menu: 🚀 SSV Content → 📧 Test Email Delivery
```
Should receive test email

**Test Name Extraction:**
```
Apps Script → Run: extractAllNamesFromWebsite()
```
Should add names to Verified_Names sheet

**Test Manual Generation:**
```
Menu: 🚀 SSV Content → ▶️ Generate Content Now
```
Wait 2-3 minutes, check email

---

## 📧 Understanding Error Emails

### Example Error Email:

```
SSV CONTENT GENERATION FAILURE ALERT

Execution ID: 99a7a85c
Failed At: Thu Oct 30 2025 14:51:53 GMT-0400
Duration: 12 seconds

ERROR:
❌ AUTHENTICATION FAILED: Invalid ANTHROPIC_API_KEY.
Check your API key in Project Settings → Script Properties.
Key should start with 'sk-ant-'.

🔧 TROUBLESHOOTING:
1. Go to Apps Script → Project Settings (gear icon)
2. Check Script Properties section
3. Verify ANTHROPIC_API_KEY exists and starts with "sk-ant-"
4. Get new key from https://console.anthropic.com/
5. Make sure you have API credits

📋 NEXT STEPS:
1. Check Error_Log sheet for details
2. Review Apps Script logs (Extensions → Apps Script → Executions)
3. System will retry tomorrow at 4 AM EST
4. Or run manually: SSV Content → Generate Content Now

📚 Documentation:
https://github.com/IGTA-Tech/ssv-content-generator
```

**Key Parts:**
- **Duration: 12 seconds** = Failed very quickly (probably auth issue)
- **Duration: 120+ seconds** = Failed during generation (quality/validation issue)
- **ERROR section** = Specific problem
- **🔧 TROUBLESHOOTING** = Context-specific steps
- **📋 NEXT STEPS** = What to do next

---

## ⚡ Quick Fixes

### "It's not working at all"
1. Check Script Properties have both API keys
2. Run `initializeSystem()` function
3. Run `testConfiguration()` from menu
4. Check Error_Log sheet

### "Works sometimes, fails other times"
- Probably rate limits or random validation failures
- System retries automatically
- Check if errors are consistent or random

### "Always fails at validation"
- Check Verified_Names sheet
- Run Name Extraction Tool
- Lower CONFIDENCE_THRESHOLD temporarily

### "API call fails"
- Check API keys are correct
- Verify API credits exist
- Check API status pages
- Wait and retry

---

## 📞 Getting Help

### Where to Get Support:

1. **Check Documentation:**
   - README.md
   - SETUP_GUIDE.md
   - DEPLOYMENT_COMPLETE.md
   - This file (TROUBLESHOOTING_GUIDE.md)

2. **Check Error Logs:**
   - Error_Log sheet
   - Apps Script Executions tab
   - Email alerts

3. **Test Components:**
   - Test Configuration
   - Test Email Delivery
   - Manual generation

4. **Contact Support:**
   - codechefdeveloper@gmail.com
   - sherrod@oaklg.com
   - clickup@innovativeautomations.dev

**Include in support request:**
- Execution ID from error email
- Error message from Error_Log sheet
- Apps Script logs (screenshot or copy)
- What you've tried already

---

## 🎯 What the New Version Fixes

### Old Version Problems:
❌ Generic error: "Failed to generate quality articles after 3 attempts"
❌ No visibility into what actually failed
❌ Hard to diagnose issues
❌ Had to guess what was wrong
❌ No troubleshooting guidance

### New Version Solutions:
✅ Specific error messages for each failure type
✅ Step-by-step logging shows exactly where it failed
✅ API response codes displayed
✅ Validation details for each check
✅ Context-specific troubleshooting steps
✅ Detailed error emails with solutions
✅ Better error handling and retry logic

---

## 🚀 Performance Expectations

### Normal Execution Times:
- **Phase 1 (Scraping):** 10-30 seconds
- **Phase 2 (Current Events):** 10-15 seconds
- **Phase 3 (Article Generation):** 60-90 seconds
- **Phase 4 (Thumbnails):** 30-45 seconds
- **Phase 5 (Email):** 5-10 seconds
- **Phase 6 (Archiving):** 5 seconds
- **Total:** 2-3 minutes

### If It Fails Quickly (< 30 seconds):
- Probably API authentication issue
- Missing API key
- Invalid API key
- Network connection problem

### If It Fails Late (> 90 seconds):
- Probably validation failure
- Quality threshold not met
- Unverified name used
- Meta description wrong length

---

## 📊 Success Indicators

### ✅ Everything Working:
```
🚀 SSV CONTENT GENERATION START v6.0
📅 2025-10-30 04:00:00 EST
🆔 Execution ID: abc123

📡 PHASE 1: COMPREHENSIVE WEBSITE SCRAPING
✅ Scraped 5 URLs, found 0 new names

🔬 PHASE 2: REAL CURRENT EVENTS RESEARCH
✅ Found 8 current events

📝 PHASE 3: HIGH-QUALITY ARTICLE GENERATION
🔑 API Key: sk-ant-api03-x...
📡 Calling Claude API (max_tokens: 8000)...
📥 API Response Status: 200
✅ API call successful, parsing response...
✅ Article 1: "Title..." (2145w, 95%)
✅ Article 2: "Title..." (1987w, 93%)
✅ Validation passed

🎨 PHASE 4: CONTEXT-AWARE THUMBNAILS
✅ Thumbnail 1 generated
✅ Thumbnail 2 generated

📧 PHASE 5: SENDING CONTENT EMAIL
✅ Email sent

💾 PHASE 6: ARCHIVING
✅ Content archived

✅ GENERATION COMPLETE - 145s total
```

---

## 🔄 Update Instructions

### To Update to Latest Version:

1. **Get Latest Code:**
   - Go to: https://github.com/IGTA-Tech/ssv-content-generator
   - Click: `SSV_ULTIMATE_CONTENT_GENERATOR.gs`
   - Click: **Raw** button
   - Select All (Ctrl+A), Copy (Ctrl+C)

2. **Update Your Script:**
   - Open your Google Sheet
   - Extensions → Apps Script
   - Select ALL existing code
   - Paste new code
   - File → Save

3. **Test:**
   - Run: **🚀 SSV Content → ▶️ Generate Content Now**
   - Check Apps Script logs
   - Verify detailed error messages appear

---

**Version:** 6.1 (Enhanced Error Handling)
**Last Updated:** 2025-10-30
**Repository:** https://github.com/IGTA-Tech/ssv-content-generator

---

*You should now see EXACTLY what's failing instead of generic error messages.*
