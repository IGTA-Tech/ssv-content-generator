/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SSV NAME EXTRACTION TOOL
 * Standalone script to crawl sherrodsportsvisas.com and extract names
 * Uses Claude API for intelligent person/company name identification
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * USAGE:
 * 1. Install this script in the same Google Sheet as your SSV Content Generator
 * 2. Make sure ANTHROPIC_API_KEY is set in Project Settings → Script Properties
 * 3. Run: extractAllNamesFromWebsite()
 * 4. Wait 5-10 minutes (depends on site size)
 * 5. Check Verified_Names sheet for new entries
 *
 * WHAT IT DOES:
 * - Discovers all URLs on sherrodsportsvisas.com domain
 * - Fetches content from each page
 * - Uses Claude API to intelligently identify:
 *   * Person names (athletes, clients, staff)
 *   * Company names (organizations, agencies)
 * - Filters out false positives (menu items, generic text)
 * - Adds discovered names to Verified_Names sheet
 * - Logs progress and results
 */

// ═══════════════════════════════════════════════════════════════════════════
// MAIN FUNCTION - Run this to start extraction
// ═══════════════════════════════════════════════════════════════════════════

function extractAllNamesFromWebsite() {
  const startTime = new Date();
  Logger.log('════════════════════════════════════════════════════════════════════════');
  Logger.log('🔍 SSV NAME EXTRACTION TOOL - STARTING');
  Logger.log('════════════════════════════════════════════════════════════════════════');
  Logger.log(`📅 ${Utilities.formatDate(startTime, 'America/New_York', 'yyyy-MM-dd HH:mm:ss')} EST`);
  Logger.log('🌐 Domain: www.sherrodsportsvisas.com');
  Logger.log('════════════════════════════════════════════════════════════════════════\n');

  try {
    // Step 1: Discover all URLs
    Logger.log('📡 STEP 1: DISCOVERING URLS...\n');
    const urls = discoverAllUrls('https://www.sherrodsportsvisas.com');
    Logger.log(`✅ Found ${urls.length} URLs to process\n`);

    // Step 2: Extract names from each URL
    Logger.log('🔎 STEP 2: EXTRACTING NAMES FROM PAGES...\n');
    const allNames = {
      persons: new Set(),
      companies: new Set()
    };

    let processedCount = 0;
    const totalUrls = urls.length;

    for (const url of urls) {
      processedCount++;
      Logger.log(`[${processedCount}/${totalUrls}] Processing: ${url}`);

      try {
        const pageContent = fetchPageContent(url);
        if (pageContent) {
          const names = extractNamesWithClaude(pageContent, url);

          // Add person names
          if (names.persons && names.persons.length > 0) {
            names.persons.forEach(name => {
              if (isValidName(name)) {
                allNames.persons.add(name);
                Logger.log(`   👤 Found person: ${name}`);
              }
            });
          }

          // Add company names
          if (names.companies && names.companies.length > 0) {
            names.companies.forEach(name => {
              if (isValidName(name)) {
                allNames.companies.add(name);
                Logger.log(`   🏢 Found company: ${name}`);
              }
            });
          }
        }

        // Rate limiting - pause between requests
        Utilities.sleep(1000);

      } catch (error) {
        Logger.log(`   ⚠️ Error processing ${url}: ${error.message}`);
      }
    }

    // Step 3: Add names to Verified_Names sheet
    Logger.log('\n💾 STEP 3: ADDING NAMES TO VERIFIED_NAMES SHEET...\n');
    const addedCount = addNamesToVerifiedSheet(allNames);

    // Summary
    const duration = (new Date() - startTime) / 1000;
    Logger.log('\n════════════════════════════════════════════════════════════════════════');
    Logger.log('✅ NAME EXTRACTION COMPLETE');
    Logger.log('════════════════════════════════════════════════════════════════════════');
    Logger.log(`⏱️ Duration: ${Math.round(duration)}s`);
    Logger.log(`📊 URLs processed: ${processedCount}`);
    Logger.log(`👤 Person names found: ${allNames.persons.size}`);
    Logger.log(`🏢 Company names found: ${allNames.companies.size}`);
    Logger.log(`💾 Names added to sheet: ${addedCount}`);
    Logger.log('════════════════════════════════════════════════════════════════════════');

    return {
      success: true,
      personsFound: allNames.persons.size,
      companiesFound: allNames.companies.size,
      namesAdded: addedCount,
      duration
    };

  } catch (error) {
    Logger.log('\n❌ ERROR IN NAME EXTRACTION:');
    Logger.log(error.toString());
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// URL DISCOVERY
// ═══════════════════════════════════════════════════════════════════════════

function discoverAllUrls(baseUrl) {
  const urls = new Set();
  const domain = extractDomain(baseUrl);

  // Try sitemap first (most efficient)
  Logger.log('🗺️ Checking for sitemap...');
  const sitemapUrls = fetchSitemap(baseUrl);

  if (sitemapUrls.length > 0) {
    Logger.log(`✅ Found sitemap with ${sitemapUrls.length} URLs`);
    sitemapUrls.forEach(url => urls.add(url));
  } else {
    Logger.log('⚠️ No sitemap found, using recursive crawl...');
    // Fallback to recursive crawling
    crawlRecursive(baseUrl, domain, urls, 0, 3); // Max depth 3
  }

  // Add common pages if not found
  const commonPages = [
    '/',
    '/about',
    '/services',
    '/success-stories',
    '/blog',
    '/contact',
    '/team',
    '/athletes'
  ];

  commonPages.forEach(page => {
    const fullUrl = baseUrl + page;
    urls.add(fullUrl);
  });

  return Array.from(urls);
}

function fetchSitemap(baseUrl) {
  const urls = [];
  const sitemapUrls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
    `${baseUrl}/sitemap1.xml`
  ];

  for (const sitemapUrl of sitemapUrls) {
    try {
      const response = UrlFetchApp.fetch(sitemapUrl, { muteHttpExceptions: true });
      if (response.getResponseCode() === 200) {
        const xml = response.getContentText();
        const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
        matches.forEach(match => {
          const url = match.replace(/<\/?loc>/g, '');
          urls.push(url);
        });
        if (urls.length > 0) break; // Found valid sitemap
      }
    } catch (error) {
      // Continue to next sitemap URL
    }
  }

  return urls;
}

function crawlRecursive(url, domain, foundUrls, depth, maxDepth) {
  if (depth > maxDepth || foundUrls.size > 100) return; // Limit to 100 pages max
  if (foundUrls.has(url)) return;

  foundUrls.add(url);
  Logger.log(`  Crawling (depth ${depth}): ${url}`);

  try {
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true
    });

    if (response.getResponseCode() === 200) {
      const html = response.getContentText();

      // Extract all links
      const linkRegex = /href=["'](.*?)["']/g;
      let match;

      while ((match = linkRegex.exec(html)) !== null) {
        let link = match[1];

        // Skip anchors, mailto, tel, etc.
        if (link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
          continue;
        }

        // Convert relative URLs to absolute
        if (link.startsWith('/')) {
          link = `https://${domain}${link}`;
        } else if (!link.startsWith('http')) {
          continue;
        }

        // Only follow links on same domain
        if (link.includes(domain) && !foundUrls.has(link)) {
          crawlRecursive(link, domain, foundUrls, depth + 1, maxDepth);
        }
      }
    }
  } catch (error) {
    Logger.log(`  ⚠️ Error crawling ${url}: ${error.message}`);
  }

  Utilities.sleep(500); // Rate limiting
}

function extractDomain(url) {
  const match = url.match(/^https?:\/\/([^\/]+)/);
  return match ? match[1] : '';
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT FETCHING
// ═══════════════════════════════════════════════════════════════════════════

function fetchPageContent(url) {
  try {
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SSV-Name-Extractor/1.0)'
      }
    });

    if (response.getResponseCode() === 200) {
      const html = response.getContentText();

      // Remove scripts, styles, and other non-content elements
      let cleanHtml = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
        .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
        .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');

      // Extract text content
      const text = cleanHtml
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Return first 8000 characters (to stay within Claude limits)
      return text.substring(0, 8000);
    }
  } catch (error) {
    Logger.log(`Error fetching ${url}: ${error.message}`);
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// CLAUDE API NAME EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════

function extractNamesWithClaude(pageContent, url) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not found in Script Properties');
  }

  const prompt = `You are analyzing content from a sports visa law firm website: ${url}

Extract ALL person names and company names mentioned in the content below.

PERSON NAMES to extract:
- Athletes mentioned (any sport)
- Clients or former clients
- Staff members or attorneys
- Coaches or trainers
- Any other individuals mentioned

COMPANY NAMES to extract:
- Sports organizations (UFC, NBA, MLS, etc.)
- Sports agencies
- Teams or clubs
- Law firms or immigration firms
- Any other organizations mentioned

RULES:
- Only extract actual names, not generic terms like "athlete" or "client"
- Skip navigation menu items
- Skip generic phrases like "Contact Us" or "Learn More"
- Include full names (first and last when available)
- For companies, include the full official name

Return your response in this EXACT JSON format:
{
  "persons": ["Full Name 1", "Full Name 2"],
  "companies": ["Company Name 1", "Company Name 2"]
}

If no names found in a category, return empty array for that category.

CONTENT TO ANALYZE:
${pageContent}`;

  try {
    const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      payload: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: prompt
        }]
      }),
      muteHttpExceptions: true
    });

    const result = JSON.parse(response.getContentText());

    if (result.content && result.content[0] && result.content[0].text) {
      const text = result.content[0].text;

      // Extract JSON from response (Claude might wrap it in markdown)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const names = JSON.parse(jsonMatch[0]);
        return {
          persons: names.persons || [],
          companies: names.companies || []
        };
      }
    }

    return { persons: [], companies: [] };

  } catch (error) {
    Logger.log(`Claude API error: ${error.message}`);
    return { persons: [], companies: [] };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// NAME VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

function isValidName(name) {
  if (!name || typeof name !== 'string') return false;

  const trimmed = name.trim();

  // Must be at least 2 characters
  if (trimmed.length < 2) return false;

  // Skip common false positives
  const blacklist = [
    'home', 'about', 'contact', 'services', 'blog', 'menu',
    'learn more', 'read more', 'click here', 'get started',
    'sign up', 'log in', 'login', 'logout', 'search',
    'privacy policy', 'terms', 'cookie', 'navigation',
    'footer', 'header', 'sidebar', 'main', 'content',
    'usa', 'uscis', 'visa', 'immigration', 'sports'
  ];

  const lowerName = trimmed.toLowerCase();
  for (const term of blacklist) {
    if (lowerName === term || lowerName.includes(term + ' ') || lowerName.includes(' ' + term)) {
      return false;
    }
  }

  // Must contain at least one letter
  if (!/[a-zA-Z]/.test(trimmed)) return false;

  // Must not be all caps (likely acronym or menu item) unless it's a known company format
  if (trimmed === trimmed.toUpperCase() && trimmed.length < 10) {
    // Allow well-known acronyms like UFC, NBA, MLS
    const allowedAcronyms = ['UFC', 'NBA', 'NFL', 'MLS', 'MLB', 'NHL', 'FIFA', 'IOC', 'USCIS'];
    if (!allowedAcronyms.includes(trimmed)) {
      return false;
    }
  }

  return true;
}

// ═══════════════════════════════════════════════════════════════════════════
// ADD NAMES TO VERIFIED_NAMES SHEET
// ═══════════════════════════════════════════════════════════════════════════

function addNamesToVerifiedSheet(allNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Verified_Names');

  // Create sheet if it doesn't exist
  if (!sheet) {
    Logger.log('⚠️ Verified_Names sheet not found, creating...');
    sheet = ss.insertSheet('Verified_Names');
    sheet.getRange('A1:E1').setValues([[
      'Name', 'Type', 'Times Used', 'Last Used', 'Source'
    ]]);
    sheet.getRange('A1:E1').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // Get existing names
  const existingData = sheet.getDataRange().getValues();
  const existingNames = new Set();
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][0]) {
      existingNames.add(existingData[i][0].toString().toLowerCase());
    }
  }

  // Prepare new names to add
  const newRows = [];

  // Add person names
  allNames.persons.forEach(name => {
    if (!existingNames.has(name.toLowerCase())) {
      newRows.push([
        name,
        'Person',
        0,
        '',
        'Auto-extracted from website'
      ]);
      existingNames.add(name.toLowerCase());
      Logger.log(`   ✅ Adding person: ${name}`);
    } else {
      Logger.log(`   ⏭️ Skipping duplicate: ${name}`);
    }
  });

  // Add company names
  allNames.companies.forEach(name => {
    if (!existingNames.has(name.toLowerCase())) {
      newRows.push([
        name,
        'Company',
        0,
        '',
        'Auto-extracted from website'
      ]);
      existingNames.add(name.toLowerCase());
      Logger.log(`   ✅ Adding company: ${name}`);
    } else {
      Logger.log(`   ⏭️ Skipping duplicate: ${name}`);
    }
  });

  // Add to sheet
  if (newRows.length > 0) {
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, newRows.length, 5).setValues(newRows);
    Logger.log(`\n💾 Added ${newRows.length} new names to Verified_Names sheet`);
  } else {
    Logger.log('\n⚠️ No new names to add (all were duplicates)');
  }

  return newRows.length;
}

// ═══════════════════════════════════════════════════════════════════════════
// MENU INTEGRATION (Optional - adds menu item to run extraction)
// ═══════════════════════════════════════════════════════════════════════════

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔍 Name Extraction')
    .addItem('🚀 Extract All Names from Website', 'extractAllNamesFromWebsite')
    .addSeparator()
    .addItem('📊 Test Single URL', 'testSingleUrl')
    .addItem('ℹ️ About', 'showAbout')
    .addToUi();
}

function testSingleUrl() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt('Test Name Extraction', 'Enter URL to test:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.OK) {
    const url = response.getResponseText();
    Logger.log(`Testing URL: ${url}`);

    const content = fetchPageContent(url);
    if (content) {
      const names = extractNamesWithClaude(content, url);
      Logger.log('Names found:');
      Logger.log('Persons:', names.persons);
      Logger.log('Companies:', names.companies);

      ui.alert('Test Complete',
        `Found ${names.persons.length} persons and ${names.companies.length} companies.\n\nCheck the Apps Script logs for details.`,
        ui.ButtonSet.OK);
    } else {
      ui.alert('Error', 'Could not fetch content from URL', ui.ButtonSet.OK);
    }
  }
}

function showAbout() {
  const ui = SpreadsheetApp.getUi();
  ui.alert('SSV Name Extraction Tool v1.0',
    'This tool automatically discovers and extracts person and company names from your website.\n\n' +
    'Features:\n' +
    '• Discovers all URLs via sitemap or crawling\n' +
    '• Uses Claude API for intelligent name extraction\n' +
    '• Filters out false positives\n' +
    '• Adds names to Verified_Names sheet\n\n' +
    'To use: Menu → Extract All Names from Website',
    ui.ButtonSet.OK);
}
