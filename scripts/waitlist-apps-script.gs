/**
 * EpoxyBoost waitlist — Google Apps Script
 *
 * Sheet columns (row 1):
 * A Date Submitted      B Time Submitted     C Name              D Phone
 * E Email               F Company            G Main Service Area
 * H Website + SEO       I Branding           J Growth Strategy
 * K Courses / Training  L Start Own Epoxy Co M Other
 * N Services Other      O Contacted?         P Notes
 * Q Contact Consent     R Consent At         S Consent Text Version
 * T Consent Text        U User Agent
 *
 * Deploy: Execute as Me · Who has access: Anyone
 * After editing: Deploy → Manage deployments → Edit → New version → Deploy
 *
 * Email alerts are sent by the Next.js API via Resend (not MailApp).
 */

const SERVICE_LABELS = {
  "website-seo": "Website + SEO",
  branding: "Branding / Company Image",
  "growth-strategy": "Growth Strategy",
  "courses-training": "Future Courses / Training",
  "start-company": "I want to start my own epoxy company.",
  other: "Other",
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getWaitlistSheet_();
    const now = new Date();
    const timeZone = Session.getScriptTimeZone();
    const services = normalizeServices_(body.services);

    if (body.contact_consent !== true) {
      return jsonResponse_({ ok: false, message: "Contact consent is required." });
    }

    const rowValues = [
      Utilities.formatDate(now, timeZone, "yyyy-MM-dd"),
      Utilities.formatDate(now, timeZone, "h:mm:ss a"),
      body.name || "",
      body.phone || "",
      body.email || "",
      body.company || "",
      body.city || "",
      isServiceSelected_(services, "website-seo"),
      isServiceSelected_(services, "branding"),
      isServiceSelected_(services, "growth-strategy"),
      isServiceSelected_(services, "courses-training"),
      isServiceSelected_(services, "start-company"),
      isServiceSelected_(services, "other"),
      body.services_other || "",
      false,
      "",
      true,
      body.consent_at || now.toISOString(),
      body.consent_text_version || "",
      body.consent_text || "",
      body.user_agent || "",
    ];

    const nextRow = getNextSubmissionRow_(sheet);
    sheet.getRange(nextRow, 1, 1, rowValues.length).setValues([rowValues]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, message: String(error) });
  }
}

function normalizeServices_(services) {
  if (!Array.isArray(services)) {
    return [];
  }

  const labelToSlug = {};
  Object.keys(SERVICE_LABELS).forEach(function (slug) {
    labelToSlug[SERVICE_LABELS[slug]] = slug;
  });

  return services.map(function (service) {
    return labelToSlug[service] || service;
  });
}

function isServiceSelected_(services, slug) {
  return services.indexOf(slug) !== -1;
}

function getWaitlistSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();

  for (var i = 0; i < sheets.length; i++) {
    const header = String(sheets[i].getRange("A1").getValue()).trim();
    if (header === "Date Submitted") {
      return sheets[i];
    }
  }

  throw new Error(
    'Could not find a sheet with "Date Submitted" in cell A1. Check your header row.',
  );
}

/**
 * Finds the next row after the last real submission.
 * Uses Date Submitted (A) or Name (C) so stray formatting/checkboxes
 * far down the sheet do not push new rows to row 1000+.
 */
function getNextSubmissionRow_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 2;
  }

  const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  var lastDataRow = 1;

  for (var i = 0; i < values.length; i++) {
    const dateSubmitted = String(values[i][0]).trim();
    const name = String(values[i][2]).trim();

    if (dateSubmitted !== "" || name !== "") {
      lastDataRow = 2 + i;
    }
  }

  return lastDataRow + 1;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
