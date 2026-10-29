/**
 * ============================================================================
 * 7th International Yogini Awards & Conference 2027 — Google Apps Script Backend
 * ============================================================================
 * 
 * INSTRUCTIONS FOR EVENT ORGANIZERS:
 * 
 * 1. Create a new Google Sheet:
 *    - Name it: "7th International Yogini Awards 2027 Nominations (Private)"
 *    - Set sharing settings to: "Restricted - Only people with access can open with the link"
 * 
 * 2. Set Up the Header Row:
 *    In Sheet1 (or rename it to "Nominations"), paste the following 23 headers into Row 1:
 *    [A1:W1]:
 *    A: Application ID
 *    B: Submission Timestamp
 *    C: Full Name
 *    D: Email
 *    E: Mobile Number
 *    F: WhatsApp Number
 *    G: Age
 *    H: City
 *    I: State
 *    J: Country
 *    K: Professional Role
 *    L: Years of Experience
 *    M: Institution
 *    N: Area of Expertise
 *    O: Biography
 *    P: Achievements
 *    Q: Community Impact
 *    R: Award Category
 *    S: Award Level
 *    T: Nomination Reason
 *    U: Portfolio URL
 *    V: Privacy Consent Status
 *    W: Application Status
 * 
 * 3. Open Script Editor:
 *    - In your Google Sheet, click Extensions > Apps Script.
 *    - Delete any code in Code.gs and replace it with this entire file.
 *    - Save the script (Ctrl+S).
 * 
 * 4. Deploy as Web App:
 *    - Click "Deploy" > "New deployment".
 *    - Select type: "Web app".
 *    - Description: "Yogini Awards 2027 Nomination Receiver"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (Required so applicants' browsers can submit form data)
 *    - Click "Deploy" and authorize access when prompted.
 *    - Copy the generated Web App URL (starts with https://script.google.com/macros/s/...).
 * 
 * 5. Connect to Frontend:
 *    - Open js/app.js (or set window.YOGINI_CONFIG in index.html):
 *      window.YOGINI_CONFIG.googleSheetWebhookUrl = 'YOUR_DEPLOYED_WEB_APP_URL_HERE';
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Prevent concurrent write collisions
  var success = lock.tryLock(30000);
  if (!success) {
    return createJsonResponse({ status: 'error', message: 'Server busy. Please retry.' }, 429);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    ensureHeaders(sheet);

    var rawData = e.postData ? e.postData.contents : '';
    var data = {};
    if (rawData) {
      try {
        data = JSON.parse(rawData);
      } catch (err) {
        // Fallback for form-urlencoded
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    // Input Sanitization to prevent Formula Injection in Google Sheets
    function sanitize(val) {
      if (val === null || val === undefined) return '';
      var str = String(val).trim();
      // If starts with =, +, -, @, prefix with single quote so it displays as plain text
      if (/^[=+\-@]/.test(str)) {
        return "'" + str;
      }
      return str;
    }

    var row = [
      sanitize(data.applicationId || 'YOGINI-2027-' + Utilities.getUuid().substring(0, 6).toUpperCase()),
      sanitize(data.timestamp || new Date().toISOString()),
      sanitize(data.fullName),
      sanitize(data.email),
      sanitize(data.mobile),
      sanitize(data.whatsapp),
      sanitize(data.age),
      sanitize(data.city),
      sanitize(data.state),
      sanitize(data.country),
      sanitize(data.primaryRole),
      sanitize(data.experienceYears),
      sanitize(data.institution),
      sanitize(data.expertise),
      sanitize(data.biography),
      sanitize(data.achievements),
      sanitize(data.communityImpact),
      sanitize(data.awardCategory),
      sanitize(data.awardLevel),
      sanitize(data.nominationReason),
      sanitize(data.portfolioUrl),
      sanitize(data.privacyConsent || 'AGREED'),
      sanitize(data.status || 'PENDING_REVIEW')
    ];

    sheet.appendRow(row);

    return createJsonResponse({
      status: 'success',
      applicationId: row[0],
      message: 'Nomination recorded successfully in private organizer sheet.'
    });

  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Yogini Awards 2027 Submission Endpoint is Active (Restricted Private Access).");
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Application ID",
      "Submission Timestamp",
      "Full Name",
      "Email",
      "Mobile Number",
      "WhatsApp Number",
      "Age",
      "City",
      "State",
      "Country",
      "Professional Role",
      "Years of Experience",
      "Institution",
      "Area of Expertise",
      "Biography",
      "Achievements",
      "Community Impact",
      "Award Category",
      "Award Level",
      "Nomination Reason",
      "Portfolio URL",
      "Privacy Consent Status",
      "Application Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#8C003D").setFontColor("#FFFFFF");
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
