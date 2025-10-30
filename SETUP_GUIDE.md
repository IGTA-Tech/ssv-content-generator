# Complete Setup Guide - SSV Content Generator

## Video Transcript Requirements Implemented

Based on your video transcripts, this system addresses ALL your feedback:

### ✅ Issues Fixed from Your Testing:

| Issue from Video | How v6.0 Fixes It |
|------------------|-------------------|
| "Didn't scrape for new names" | Now actually scrapes website and finds real names |
| "Didn't get current events" | Real API call to Claude for actual recent news |
| "Articles not same quality as examples" | Uses your Isaac Thomson article as exact template |
| "Images not good enough" | Professional prompts generated AFTER content |
| "Need logos" | Uses your tiiny.site URLs, leaves space for logo |
| "Prompt needs to be way better" | Context-aware prompts based on article content |

### ✅ Your Specific Requirements:

- ✓ **Google Apps Script** (not Cloud Code)
- ✓ **Logo URLs** from tiiny.site integrated
- ✓ **Email to**: sherrod@oaklg.com, codechefdeveloper@gmail.com, clickup@innovativeautomations.dev
- ✓ **Two per day at 4 AM EST**
- ✓ **90%+ confidence threshold**
- ✓ **Self-verification** (no human review)
- ✓ **Auto-publish ready**
- ✓ **Biggest concern addressed**: Strict name verification

## Complete Installation Steps

### 1. Get Your API Keys

#### Claude (Anthropic) API Key:
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys
4. Create new key (starts with `sk-ant-`)
5. Copy and save it

#### OpenAI API Key:
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Go to API Keys
4. Create new secret key (starts with `sk-`)
5. Copy and save it

**Cost**: ~$20/month for daily generation

### 2. Create Google Sheet

1. Go to https://sheets.google.com/
2. Click **Blank** to create new sheet
3. Name it: "SSV Content Generator"

### 3. Add the Script

1. In your sheet: **Extensions → Apps Script**
2. You'll see default code - DELETE IT ALL
3. Go to the `SSV_ULTIMATE_CONTENT_GENERATOR.gs` file
4. Copy ENTIRE contents
5. Paste into Apps Script editor
6. **File → Save** or Ctrl+S
7. Name the project: "SSV Content System"

### 4. Add API Keys to Script Properties

1. In Apps Script editor, click **Project Settings** (gear icon on left)
2. Scroll down to **Script Properties**
3. Click **+ Add script property**

Add these TWO properties:

**Property 1:**
```
Property: ANTHROPIC_API_KEY
Value: sk-ant-api03-xxxxx (paste your Claude API key)
```

**Property 2:**
```
Property: OPENAI_API_KEY
Value: sk-xxxxx (paste your OpenAI API key)
```

Click **Save script properties**

### 5. Initialize the System

1. Back in Apps Script editor
2. Find dropdown that says "Select function" (top center)
3. Choose `initializeSystem`
4. Click **Run** (play button ▶️)

**First time authorization:**
1. You'll see "Authorization required"
2. Click **Review permissions**
3. Choose your Google account
4. Google will say "This app isn't verified" - that's okay, it's YOUR script
5. Click **Advanced**
6. Click **Go to SSV Content System (unsafe)**
7. Click **Allow**

Wait ~10 seconds. System will create all necessary sheets.

### 6. Verify Installation

1. Go back to your Google Sheet
2. You should see new tabs at bottom:
   - Config
   - Content_Archive
   - Error_Log
   - Website_URLs
   - Verified_Names

3. You should see a new menu at top: **🚀 SSV Content**

If you see both, installation successful! ✅

### 7. Test the System

1. Click **🚀 SSV Content → 🔧 Test Configuration**
   - Should say "Configuration Valid"
   - If error, check your API keys

2. Click **🚀 SSV Content → 📧 Test Email Delivery**
   - Check your email (may take 30 seconds)
   - Should receive test email

3. Click **🚀 SSV Content → ▶️ Generate Content Now**
   - This will take 2-3 minutes
   - Check email when done
   - You'll receive 2 articles + thumbnails

### 8. Set Up Daily Automation

Once testing works:

1. **🚀 SSV Content → ⏰ Setup Daily 4AM Trigger**
2. Click OK
3. Done!

Now you'll receive 2 articles every morning at 4 AM EST automatically.

## Understanding the Sheets

### Config Sheet
Settings for the system. You can edit values in Column B:
- `EMAIL_RECIPIENTS`: Who receives articles
- `CONFIDENCE_THRESHOLD`: Quality requirement (90 = 90%)
- `MIN_WORD_COUNT`: Minimum article length
- `MAX_WORD_COUNT`: Maximum article length
- `DAILY_TRIGGER_HOUR`: What time to run (4 = 4 AM)

### Content_Archive Sheet
History of all generated content:
- When it was created
- Article titles
- Quality scores
- Execution IDs

### Error_Log Sheet
If something goes wrong, errors appear here.
Should stay empty if working correctly!

### Website_URLs Sheet
Pages to scrape for content. Edit this to add more pages:
- Column A: URL
- Column B: `true` or `false` (enable/disable)
- Column C: Last scraped (auto-updated)

Default URLs:
- Main page
- MMA immigration success
- Indian track star P1 visa
- Soccer coach O1A visa
- Success stories

### Verified_Names Sheet
Athlete names approved for use in articles.
New names discovered during scraping are added automatically.

## How to Publish (Daily Workflow)

When you receive the email:

### 1. Download Attachments
- `article1.md` - Article 1 content
- `article2.md` - Article 2 content
- `thumbnail_1_xxxxx.jpg` - Thumbnail 1
- `thumbnail_2_xxxxx.jpg` - Thumbnail 2

### 2. Add Logo to Thumbnails

**Option A - Canva (Easiest):**
1. Go to Canva.com
2. Upload thumbnail
3. Download SSV logo from: https://ssv-logo-file-full.tiiny.site/
4. Add logo to bottom-right corner
5. Resize to ~300x200px
6. Download

**Option B - Photoshop:**
1. Open thumbnail in Photoshop
2. Place SSV logo in bottom-right corner
3. Resize to ~300x200px
4. Ensure it's visible (may need drop shadow)
5. Export as JPEG

### 3. Login to Squarespace
1. Go to your SSV website admin
2. Navigate to **Blog** section

### 4. Create Blog Post 1
1. Click **New Post**
2. **Title**: Copy from email (exact)
3. **Content**:
   - Open `article1.md` in text editor
   - Copy ALL content
   - Paste into Squarespace (markdown is supported)
4. **Featured Image**: Upload branded thumbnail 1
5. **URL Slug**: Copy from email metadata
6. **SEO Description**: Copy meta description from email (155 chars)
7. **Categories/Tags**: Add relevant tags from email
8. **Publish**

### 5. Create Blog Post 2
Repeat step 4 for Article 2

**Total time**: 10-15 minutes

## Troubleshooting

### "Authorization required" every time
- Script properties might not be saved
- Re-add API keys in Project Settings → Script Properties

### No email received
1. Check spam folder
2. Check Error_Log sheet
3. Verify EMAIL_RECIPIENTS in Config sheet
4. Run "Test Email Delivery" from menu

### "Missing API Key" error
- Go to Apps Script → Project Settings → Script Properties
- Make sure BOTH keys are there:
  - ANTHROPIC_API_KEY
  - OPENAI_API_KEY

### Articles generated but low quality
- Check CONFIDENCE_THRESHOLD in Config (should be 90)
- Check Error_Log for validation failures
- May need to add more URLs to Website_URLs sheet

### Thumbnails not generated
- Check OpenAI API credits
- DALL-E 3 costs $0.04 per image
- Error will be in Error_Log sheet

### Script takes too long / times out
- Google Apps Script has 6-minute limit per execution
- Script is optimized to run in ~2-3 minutes
- If timing out, check Error_Log

### Want to change generation time
1. Open Config sheet
2. Change DAILY_TRIGGER_HOUR value
3. Run "Setup Daily Trigger" again from menu

### Want to generate more than 2 articles
1. Open Config sheet
2. Change ARTICLES_PER_DAY
3. Note: Will increase API costs proportionally

## Advanced Configuration

### Adding More URLs to Scrape

Want to scrape more pages?

1. Open **Website_URLs** sheet
2. Add rows:
   ```
   URL                                          | Active | Last Scraped
   https://www.sherrodsportsvisas.com/new-page | true   |
   ```

### Changing Email Recipients

1. Open **Config** sheet
2. Find EMAIL_RECIPIENTS row
3. Edit value (Column B)
4. Format: `email1@example.com,email2@example.com,email3@example.com`
5. Changes take effect on next run

### Adjusting Quality Threshold

Default is 90% confidence. To change:

1. Open **Config** sheet
2. Find CONFIDENCE_THRESHOLD
3. Change value (90 = 90%, 95 = 95%, etc.)
4. Higher = stricter (may cause more retries)
5. Lower = more lenient (may reduce quality)

Recommended: 90-95%

### Word Count Limits

Current: 1500-3000 words per article

To change:
1. Open **Config** sheet
2. Edit MIN_WORD_COUNT and/or MAX_WORD_COUNT
3. Longer articles = higher API costs

## Monitoring & Analytics

### Check Generation History
**Content_Archive** sheet shows:
- All generated articles
- When created
- Quality scores
- Execution IDs

### Check for Errors
**Error_Log** sheet shows any failures.

From menu:
- **📊 View Archive** - Opens Content_Archive
- **❌ View Error Log** - Opens Error_Log

### Verify Name Usage
**Verified_Names** sheet tracks:
- Which names are used
- How many times
- Last usage date

## Cost Management

### Typical Monthly Costs

**Daily generation (2 articles + 2 images):**
- Claude API: ~$0.50/day
- OpenAI DALL-E: ~$0.16/day
- Total: ~$0.66/day
- Monthly: ~$20

### Reducing Costs

1. **Generate less frequently:**
   - Change from daily to 3x/week
   - Modify trigger in Apps Script

2. **Reduce articles per day:**
   - Change ARTICLES_PER_DAY in Config
   - 1 article/day = ~$10/month

3. **Disable thumbnails:**
   - Edit script to skip image generation
   - Save ~$5/month

4. **Use shorter articles:**
   - Reduce MAX_WORD_COUNT
   - Less tokens = lower cost

## Best Practices

### Daily Workflow
1. Check email at 4:30 AM EST (or whenever convenient)
2. Download attachments
3. Add logos to thumbnails (5 min)
4. Publish to Squarespace (10 min)
5. Total: 15 min/day

### Weekly Checks
- Review Content_Archive
- Check Error_Log (should be empty)
- Verify articles are publishing correctly
- Monitor website traffic (Squarespace analytics)

### Monthly Maintenance
- Review Verified_Names sheet
- Add any new successful client names
- Check API usage/costs
- Review and archive old content if needed

## Getting Help

### Common Questions

**Q: Can I edit the articles before publishing?**
A: Yes! But they're designed to be publish-ready. Minor edits okay, but shouldn't need much.

**Q: What if I don't like an article?**
A: Regenerate! Just run "Generate Content Now" again. Or edit before publishing.

**Q: Can I use this for other websites?**
A: Yes, but you'd need to customize:
- Website URLs
- Logo URLs
- Example articles
- Verified names

**Q: Is this safe?**
A: Yes! All code runs in YOUR Google account. We don't store or access anything.

**Q: What happens if API goes down?**
A: Error logged in Error_Log sheet, alert email sent. Will retry next scheduled time.

### Support Contacts

- **Technical issues**: codechefdeveloper@gmail.com
- **Content questions**: sherrod@oaklg.com
- **Automation help**: clickup@innovativeautomations.dev

## Next Steps

✅ System installed
✅ Tested successfully
✅ Daily automation set up

Now you:
1. Receive 2 articles every morning
2. Add logos to thumbnails (5 min)
3. Publish to Squarespace (10 min)
4. Done!

**Welcome to automated content creation!** 🎉

---

**Version**: 6.0
**Last Updated**: Based on video feedback and testing
**Built for**: Sherrod Sports Visas
**Status**: Production Ready ✅
