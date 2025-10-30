# SSV Content Generator v6.0 - Ultimate Production Version

**Automatic blog content generation system for Sherrod Sports Visas**

Built based on real testing feedback and video transcripts. This system **actually works** - tested and verified.

## 🎯 What This Does

Generates **2 high-quality blog articles daily** with:
- ✅ Real website scraping (finds actual names from your site)
- ✅ Real current events research (not placeholders)
- ✅ Articles matching your example quality exactly
- ✅ Professional thumbnails generated AFTER content (context-aware)
- ✅ Logo integration ready (uses your tiiny.site URLs)
- ✅ 90%+ confidence threshold with self-verification
- ✅ Zero human review needed - auto-publish ready

## 🚀 Quick Start (5 Minutes)

### Step 1: Create Google Sheet
1. Create a new Google Sheet
2. Name it "SSV Content Generator"

### Step 2: Add the Script
1. In your sheet: **Extensions → Apps Script**
2. Delete the default `function myFunction() {}` code
3. Copy the ENTIRE content from `SSV_ULTIMATE_CONTENT_GENERATOR.gs`
4. Paste into the Apps Script editor
5. Click **Save** (disk icon)

### Step 3: Add API Keys
1. In Apps Script: **Project Settings** (gear icon)
2. Scroll to **Script Properties**
3. Click **Add script property**
4. Add these two properties:
   ```
   Property: ANTHROPIC_API_KEY
   Value: sk-ant-xxxxx (your Claude API key)

   Property: OPENAI_API_KEY
   Value: sk-xxxxx (your OpenAI API key)
   ```

### Step 4: Initialize
1. In Apps Script editor, find the function dropdown (says "Select function")
2. Select `initializeSystem`
3. Click **Run** (play button)
4. When prompted, click **Review Permissions**
5. Choose your Google account
6. Click **Advanced** → **Go to SSV Content Generator (unsafe)**
7. Click **Allow**

Wait ~10 seconds. Your sheets will be created automatically!

### Step 5: Test
1. Back in your Google Sheet, you'll see a new menu: **🚀 SSV Content**
2. Click **🚀 SSV Content → ▶️ Generate Content Now**
3. Wait 2-3 minutes
4. Check your email! You should receive 2 articles with thumbnails

### Step 6: Set Up Daily Automation
1. **🚀 SSV Content → ⏰ Setup Daily 4AM Trigger**
2. Done! You'll receive 2 articles every morning at 4 AM EST

## 📊 What Gets Created

The system creates these sheets automatically:

| Sheet | Purpose |
|-------|---------|
| **Config** | Settings and configuration |
| **Content_Archive** | History of all generated articles |
| **Error_Log** | Error tracking (should stay empty!) |
| **Website_URLs** | URLs to scrape for content |
| **Verified_Names** | Athlete names (prevents errors) |

## 🎨 About the Thumbnails

Thumbnails are generated **AFTER** the articles are written, so they're contextually perfect for each topic.

**Important:** You need to add your SSV logo to each thumbnail:
1. Download the thumbnail from email
2. Open in Photoshop/Canva/Figma
3. Add SSV logo to bottom-right corner (space is reserved)
4. Logo size: ~300x200px
5. Upload to Squarespace

Logo files are hosted at:
- Full logo: https://ssv-logo-file-full.tiiny.site/
- Icon logo: https://icon-ssv-logo.tiiny.site/

## 📧 Email Recipients

Articles are automatically sent to:
- sherrod@oaklg.com
- codechefdeveloper@gmail.com
- clickup@innovativeautomations.dev

To change recipients:
1. Open the **Config** sheet
2. Edit the EMAIL_RECIPIENTS row

## ⚙️ Settings You Can Change

In the **Config** sheet:

| Setting | Default | What It Does |
|---------|---------|--------------|
| EMAIL_RECIPIENTS | (see above) | Who receives the articles |
| CONFIDENCE_THRESHOLD | 90 | Minimum quality score (%) |
| MIN_WORD_COUNT | 1500 | Minimum article length |
| MAX_WORD_COUNT | 3000 | Maximum article length |
| DAILY_TRIGGER_HOUR | 4 | Hour for daily generation (EST) |
| ARTICLES_PER_DAY | 2 | Number of articles per run |

## 🔧 Troubleshooting

### "Missing API Key" Error
- Go to Apps Script → Project Settings → Script Properties
- Make sure both `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` are added
- Keys should start with `sk-ant-` and `sk-` respectively

### No Email Received
- Check spam folder
- Check Error_Log sheet for issues
- Run **Test Email Delivery** from menu
- Verify email addresses in Config sheet

### Articles Not Generated
- Check Error_Log sheet
- Make sure you have API credits (Claude & OpenAI)
- Try running manually first: **Generate Content Now**

### Permission Errors
- Make sure you clicked "Allow" during setup
- Try: **Extensions → Apps Script → Run → initializeSystem** again

## 💰 Cost Estimate

Based on typical usage:
- **Claude API** (articles): ~$0.50 per run (2 articles)
- **OpenAI DALL-E** (images): ~$0.08 per image ($0.16 total)
- **Total per day**: ~$0.66
- **Monthly** (30 days): ~$20

You need credits on both platforms.

## 🎯 Quality Features

### What Makes This v6.0 Better

Based on video feedback, this version:

1. **Actually scrapes website** - finds real names from your pages
2. **Real current events** - researches actual recent news
3. **Matches example quality** - uses your Isaac Thomson article as template
4. **Context-aware images** - generated AFTER content, specific to topic
5. **Logo-ready** - leaves space for SSV logo in corner
6. **Self-verifying** - 90%+ confidence, no human review needed
7. **Name verification** - biggest concern addressed, only uses verified names

### Triple-Layer Verification

Every article goes through:
1. **Confidence Score** - Must be ≥90%
2. **Name Verification** - Every name checked against approved list
3. **Critical Elements** - Spell check on "Sherrod Seward", word count, meta length

## 📋 What You Get in Each Email

1. **Article 1 Markdown** (.md file) - ready to paste into Squarespace
2. **Article 2 Markdown** (.md file) - ready to paste into Squarespace
3. **Thumbnail 1 Image** (.jpg) - add logo and upload
4. **Thumbnail 2 Image** (.jpg) - add logo and upload
5. **Detailed Metadata** - SEO info, keywords, meta descriptions

## 🛠️ Advanced: Customizing URLs to Scrape

Want to add more pages to scrape?

1. Open **Website_URLs** sheet
2. Add new rows with:
   - Column A: Full URL
   - Column B: `true` (to enable)
   - Column C: (leave blank, auto-populated)

Example:
```
https://www.sherrodsportsvisas.com/new-page | true |
```

## 📈 Monitoring

### Content Archive
See all generated articles in **Content_Archive** sheet:
- When generated
- Titles
- Quality scores
- Execution IDs

### Error Log
If something fails, check **Error_Log** sheet:
- Error type
- Message
- When it happened

Should stay empty if everything's working!

## 🔄 Updates & Maintenance

### Checking Verified Names
The **Verified_Names** sheet tracks:
- All approved athlete names
- How many times used
- Last usage date
- Auto-discovered names (from scraping)

New names found during scraping are added automatically with "Auto-discovered" label.

### Updating Configuration
Any changes to **Config** sheet take effect immediately on next run.

## 🤝 Support

If you need help:
1. Check **Error_Log** sheet
2. Check **📧 View Error Log** from menu
3. Review this README
4. Contact: codechefdeveloper@gmail.com

## 📝 Version History

### v6.0 (Current) - Ultimate Production Version
- Based on video feedback and testing
- Real website scraping
- Real current events research
- Context-aware thumbnail generation
- Logo integration ready
- 90%+ confidence threshold
- Complete error handling

### v5.0
- Initial working version (had issues with quality)

### v4.0 and earlier
- Development versions

## 🎉 You're All Set!

The system is now fully automatic. You'll receive 2 high-quality articles every morning at 4 AM EST.

Just:
1. Download the email attachments
2. Add SSV logo to thumbnails
3. Upload to Squarespace
4. Publish!

**Estimated time to publish:** 10-15 minutes per day

---

Built for Sherrod Sports Visas
Generated content is triple-verified and ready to publish with minimal editing.
