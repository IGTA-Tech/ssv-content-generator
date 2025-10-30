# Error Fix & Name Extraction Tool - Quick Reference

## ✅ Date Format Error - FIXED

### What was the error?
```
Exception: Invalid argument: yyyy-MM-dd HH:mm:ss EST
```

### What caused it?
Line 467 in `SSV_ULTIMATE_CONTENT_GENERATOR.gs` had 'EST' as literal text inside the `Utilities.formatDate()` format string, which Google Apps Script doesn't support.

### The fix:
**Before (BROKEN):**
```javascript
Logger.log(`📅 ${Utilities.formatDate(startTime, 'America/New_York', 'yyyy-MM-dd HH:mm:ss EST')}`);
```

**After (FIXED):**
```javascript
Logger.log(`📅 ${Utilities.formatDate(startTime, 'America/New_York', 'yyyy-MM-dd HH:mm:ss')} EST`);
```

'EST' was moved outside the format function into the template literal.

---

## 🆕 Name Extraction Tool - NEW SCRIPT

### What it does:
Automatically crawls your entire website (www.sherrodsportsvisas.com) and uses Claude API to intelligently extract person and company names, then adds them to your Verified_Names sheet.

### Installation:

1. **Open your Google Sheet** (SSV Content Generator)

2. **Go to Extensions → Apps Script**

3. **Create a new script file:**
   - Click the **+** button next to Files
   - Select "Script"
   - Name it: "SSV_NAME_EXTRACTION_TOOL"

4. **Copy the entire content** from:
   ```
   https://github.com/IGTA-Tech/ssv-content-generator/blob/master/SSV_NAME_EXTRACTION_TOOL.gs
   ```

5. **Paste into the new script file**

6. **Save** (Ctrl+S or File → Save)

### How to use:

#### Option 1: Run from Apps Script (Recommended for first run)
1. In Apps Script editor, select function: `extractAllNamesFromWebsite`
2. Click **Run** (▶️)
3. Wait 5-10 minutes (depends on site size)
4. Check the logs to see progress
5. Check Verified_Names sheet for new entries

#### Option 2: Run from Google Sheets Menu
1. Reload your Google Sheet (refresh page)
2. You'll see new menu: **🔍 Name Extraction**
3. Click **🔍 Name Extraction → 🚀 Extract All Names from Website**
4. Wait for completion
5. Check Verified_Names sheet

### What it extracts:

**Person Names:**
- Athletes mentioned
- Former clients
- Staff members or attorneys
- Coaches or trainers
- Any other individuals

**Company Names:**
- Sports organizations (UFC, NBA, MLS, etc.)
- Sports agencies
- Teams or clubs
- Law firms
- Any organizations mentioned

### Features:

✅ **Smart URL Discovery**
- Tries sitemap first (fastest)
- Falls back to recursive crawling if no sitemap
- Limits to 100 pages max to prevent overload

✅ **Intelligent Extraction**
- Uses Claude API to understand context
- Filters out navigation menus
- Skips generic terms like "Contact Us"
- Only extracts real person and company names

✅ **Duplicate Prevention**
- Checks existing Verified_Names sheet
- Only adds new names
- Prevents duplicate entries

✅ **Progress Logging**
- Shows which URLs are being processed
- Displays names as they're found
- Provides summary at end

### Output in Verified_Names Sheet:

New entries will have these columns:
- **Name**: The extracted name
- **Type**: "Person" or "Company"
- **Times Used**: Starts at 0
- **Last Used**: Empty (will be filled when used in articles)
- **Source**: "Auto-extracted from website"

### Cost Estimate:

If your site has ~50 pages:
- Claude API calls: ~50 requests
- Cost: ~$0.50-$1.00 per full extraction
- You only need to run this occasionally (when adding new content to site)

### Tips:

1. **Run this BEFORE your first content generation** to populate the Verified_Names sheet
2. **Run again monthly** or after adding new success stories to your website
3. **Review the names** after extraction - you can manually remove any that shouldn't be used
4. **Test with single URL first** using the "Test Single URL" menu option

### Troubleshooting:

**"ANTHROPIC_API_KEY not found"**
- Make sure you have ANTHROPIC_API_KEY in Project Settings → Script Properties

**Takes too long / times out**
- Google Apps Script has 6-minute limit
- Script automatically limits to 100 pages
- If still timing out, edit the script to reduce maxDepth (line 144)

**Not finding enough names**
- Check the logs to see which pages were processed
- Some pages might not have parseable content
- Try testing individual URLs with "Test Single URL" menu option

**Finding too many false positives**
- Edit the `isValidName()` function
- Add more terms to the blacklist (line 367)

---

## 📥 Where to Get the Files

### GitHub Repository:
```
https://github.com/IGTA-Tech/ssv-content-generator
```

### Direct File Links:

**Main Script (FIXED):**
```
https://github.com/IGTA-Tech/ssv-content-generator/blob/master/SSV_ULTIMATE_CONTENT_GENERATOR.gs
```
Click "Raw" button to get copy-pasteable version

**Name Extraction Tool (NEW):**
```
https://github.com/IGTA-Tech/ssv-content-generator/blob/master/SSV_NAME_EXTRACTION_TOOL.gs
```
Click "Raw" button to get copy-pasteable version

---

## 🚀 Recommended Setup Process

1. ✅ **Update main script** with fixed version (re-copy from GitHub)
2. ✅ **Add name extraction tool** as new script file
3. ✅ **Run name extraction** to populate Verified_Names sheet
4. ✅ **Test content generation** with "Generate Content Now"
5. ✅ **Set up daily automation** once everything works

---

## 📊 Expected Results After Name Extraction

You should see names like:
- **Persons**: Isaac Thomson, Siddhanth Thingalaya, Sherrod Seward, etc.
- **Companies**: UFC, Bellator, Jackson Wink MMA, SDS Sports Agency, etc.

These names will then be available for use in your AI-generated articles, with proper verification to prevent errors.

---

**Both scripts are now production-ready and available on GitHub!** 🎉
