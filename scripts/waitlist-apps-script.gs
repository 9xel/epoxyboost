/**
 * EpoxyBoost waitlist — Google Apps Script
 *
 * Sheet columns (row 1):
 * A Date Submitted | B Time Submitted | C Name | D Phone | E Email
 * F Service Type | G Contacted? | H Notes
 * I Contact Consent | J Consent At | K Consent Text Version | L Consent Text | M User Agent
 *
 * Deploy: Execute as Me · Who has access: Anyone
 * Paste URL into Vercel as WAITLIST_FORM_URL
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
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const now = new Date();
    const timeZone = Session.getScriptTimeZone();

    if (body.contact_consent !== true) {
      return jsonResponse_({ ok: false, message: "Contact consent is required." });
    }

    const serviceType = formatServiceType_(body.services, body.services_other);
    const notes = formatNotes_(body.company, body.city, body.services_other);

    sheet.appendRow([
      Utilities.formatDate(now, timeZone, "yyyy-MM-dd"),
      Utilities.formatDate(now, timeZone, "h:mm:ss a"),
      body.name || "",
      body.phone || "",
      body.email || "",
      serviceType,
      false,
      notes,
      true,
      body.consent_at || now.toISOString(),
      body.consent_text_version || "",
      body.consent_text || "",
      body.user_agent || "",
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, message: String(error) });
  }
}

function formatServiceType_(services, servicesOther) {
  const list = Array.isArray(services) ? services : [];
  const labels = list
    .filter(function (value) {
      return value !== "other";
    })
    .map(function (value) {
      return SERVICE_LABELS[value] || value;
    });

  if (list.indexOf("other") !== -1 && servicesOther) {
    labels.push("Other: " + servicesOther);
  }

  return labels.join(", ");
}

function formatNotes_(company, city, servicesOther) {
  const parts = [];

  if (company) {
    parts.push("Company: " + company);
  }

  if (city) {
    parts.push("Area: " + city);
  }

  if (servicesOther) {
    parts.push("Other interest: " + servicesOther);
  }

  return parts.join(" | ");
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
