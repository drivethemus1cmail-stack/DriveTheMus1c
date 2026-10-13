/**
 * DriveTheMus1c client CRM — Google Apps Script.
 *
 * Paste this into Extensions → Apps Script on a blank Google Sheet, then:
 *   1. Run setupCrm() once. It builds the Clients and Dashboard tabs.
 *   2. Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 *   3. Put the web app URL in CRM_ENDPOINT in src/config.ts.
 *
 * Every sign-up on drivethemus1c.com/start then lands as a new row, and you get
 * an email about it. Recordings uploaded with send-in sign-ups are saved to a
 * "DriveTheMus1c client recordings" folder in your Drive and linked in the row.
 * Full walkthrough: docs/crm-setup.md.
 */

const NOTIFY_EMAIL = "drivethemus1cmail@gmail.com";
const CLIENTS = "Clients";
const DASHBOARD = "Dashboard";
const RECORDINGS_FOLDER = "DriveTheMus1c client recordings";

/** Column order. The web form fills the ones marked "form"; the rest are yours. */
const COLUMNS = [
  { name: "ID", width: 90 },
  { name: "Added", width: 110 },              // form
  { name: "Name", width: 160 },               // form
  { name: "Email", width: 210 },              // form
  { name: "Phone", width: 130 },              // form
  { name: "Instagram", width: 130 },          // form
  { name: "Service", width: 210 },            // form
  { name: "Status", width: 130 },
  { name: "Location", width: 140 },           // form
  { name: "DAW", width: 120 },                // form
  { name: "Mic & interface", width: 180 },    // form
  { name: "What they want", width: 300 },     // form
  { name: "Sound like", width: 200 },         // form
  { name: "Recording", width: 200 },          // form
  { name: "Source", width: 120 },             // form
  { name: "Session / due date", width: 140 },
  { name: "Price", width: 90 },
  { name: "Paid", width: 100 },
  { name: "Next step", width: 220 },
  { name: "Follow up on", width: 120 },
  { name: "Notes", width: 300 },
];

const SERVICES = [
  "Online Custom Mix Session",
  "Send-In Custom Mix",
  "In-Person Studio Session",
  "Base FL Studio Preset",
  "Other",
];
const STATUSES = ["New lead", "Contacted", "Booked", "In progress", "Done", "Follow up", "Repeat client", "Not a fit"];
const PAID = ["Unpaid", "Paid", "Refunded"];
const SOURCES = ["Website", "Instagram", "A friend", "YouTube", "Google", "In person", "Other"];

/** Price filled in automatically for new sign-ups. In-person is quoted per job. */
const DEFAULT_PRICE = { "Online Custom Mix Session": 50, "Send-In Custom Mix": 50 };

const NEXT_STEP = {
  "Send-In Custom Mix": "Listen to recording, send payment link",
  "In-Person Studio Session": "Text to confirm location, price and time",
};

function col(name) {
  return COLUMNS.findIndex((c) => c.name === name) + 1;
}

function colLetter(name) {
  return String.fromCharCode(64 + col(name));
}

// ---------------------------------------------------------------------------
// One-time setup
// ---------------------------------------------------------------------------

function setupCrm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename("DriveTheMus1c — Clients");

  const sheet = ss.getSheetByName(CLIENTS) || ss.insertSheet(CLIENTS, 0);
  const rows = 1000;
  if (sheet.getMaxRows() < rows) sheet.insertRowsAfter(sheet.getMaxRows(), rows - sheet.getMaxRows());
  if (sheet.getMaxColumns() < COLUMNS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), COLUMNS.length - sheet.getMaxColumns());
  }

  // Header
  const header = sheet.getRange(1, 1, 1, COLUMNS.length);
  header
    .setValues([COLUMNS.map((c) => c.name)])
    .setFontWeight("bold")
    .setFontColor("#e3bb74")
    .setBackground("#201d18")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 32);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(3);
  COLUMNS.forEach((c, i) => sheet.setColumnWidth(i + 1, c.width));

  // Body formats
  const body = (name) => sheet.getRange(2, col(name), rows - 1, 1);
  body("Added").setNumberFormat("mmm d, yyyy");
  body("Session / due date").setNumberFormat("mmm d, yyyy");
  body("Follow up on").setNumberFormat("mmm d, yyyy");
  body("Price").setNumberFormat("$#,##0");
  body("What they want").setWrap(true);
  body("Notes").setWrap(true);
  sheet.getRange(2, 1, rows - 1, COLUMNS.length).setVerticalAlignment("top");

  // Dropdowns
  const list = (values) => SpreadsheetApp.newDataValidation().requireValueInList(values, true).build();
  const date = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build();
  body("Service").setDataValidation(list(SERVICES));
  body("Status").setDataValidation(list(STATUSES));
  body("Paid").setDataValidation(list(PAID));
  body("Source").setDataValidation(list(SOURCES));
  body("Session / due date").setDataValidation(date);
  body("Follow up on").setDataValidation(date);

  // Highlights: new leads in gold, overdue follow-ups in red, paid in green.
  const status = colLetter("Status");
  const follow = colLetter("Follow up on");
  const all = sheet.getRange(2, 1, rows - 1, COLUMNS.length);
  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$${status}2="New lead"`)
      .setBackground("#fbefd5")
      .setRanges([all])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(
        `=AND($${follow}2<>"", $${follow}2<=TODAY(), $${status}2<>"Not a fit", $${status}2<>"Repeat client")`,
      )
      .setFontColor("#c0392b")
      .setBold(true)
      .setRanges([sheet.getRange(2, col("Follow up on"), rows - 1, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Paid")
      .setBackground("#d9f2e0")
      .setRanges([body("Paid")])
      .build(),
  ]);

  if (!sheet.getFilter()) sheet.getRange(1, 1, rows, COLUMNS.length).createFilter();

  buildDashboard(ss);

  // A fresh spreadsheet comes with "Sheet1"; drop it if it's still empty.
  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0) ss.deleteSheet(blank);

  ss.setActiveSheet(sheet);
}

function buildDashboard(ss) {
  const sheet = ss.getSheetByName(DASHBOARD) || ss.insertSheet(DASHBOARD);
  sheet.clear();

  const c = (name) => `${CLIENTS}!${colLetter(name)}2:${colLetter(name)}`;
  const rows = [
    ["DriveTheMus1c — at a glance", ""],
    ["", ""],
    ["Total clients", `=COUNTA(${c("Name")})`],
    ["New leads (not contacted yet)", `=COUNTIF(${c("Status")},"New lead")`],
    ["Booked", `=COUNTIF(${c("Status")},"Booked")`],
    ["In progress", `=COUNTIF(${c("Status")},"In progress")`],
    ["Done", `=COUNTIF(${c("Status")},"Done")+COUNTIF(${c("Status")},"Follow up")+COUNTIF(${c("Status")},"Repeat client")`],
    ["Follow-ups due", `=COUNTIFS(${c("Follow up on")},"<="&TODAY(),${c("Status")},"<>Not a fit",${c("Status")},"<>Repeat client")`],
    ["Sign-ups this month", `=COUNTIFS(${c("Added")},">="&EOMONTH(TODAY(),-1)+1)`],
    ["", ""],
    ["Revenue (paid)", `=SUMIFS(${c("Price")},${c("Paid")},"Paid")`],
    ["Revenue this month (by session / due date)", `=SUMIFS(${c("Price")},${c("Paid")},"Paid",${c("Session / due date")},">="&EOMONTH(TODAY(),-1)+1)`],
    ["", ""],
    ["By service", ""],
    ...SERVICES.map((s) => [s, `=COUNTIF(${c("Service")},"${s}")`]),
    ["", ""],
    ["By source", ""],
    ...SOURCES.map((s) => [s, `=COUNTIF(${c("Source")},"${s}")`]),
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);

  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 120);
  sheet.getRange("A1").setFontSize(16).setFontWeight("bold");
  sheet.getRange(1, 1, rows.length, 2).setVerticalAlignment("middle");
  ["Revenue (paid)", "Revenue this month (by session / due date)"].forEach((label) => {
    const r = rows.findIndex((row) => row[0] === label) + 1;
    sheet.getRange(r, 2).setNumberFormat("$#,##0");
  });
  ["By service", "By source"].forEach((label) => {
    const r = rows.findIndex((row) => row[0] === label) + 1;
    sheet.getRange(r, 1).setFontWeight("bold").setFontColor("#c9974a");
  });
  sheet.getRange(3, 2, rows.length - 2, 1).setFontWeight("bold").setHorizontalAlignment("right");
}

// ---------------------------------------------------------------------------
// Web app — receives sign-ups from the site
// ---------------------------------------------------------------------------

/** Visiting the URL in a browser just confirms it's deployed. */
function doGet() {
  return ContentService.createTextOutput("DriveTheMus1c CRM endpoint is live.");
}

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot: real people never see this field.
  if (p.company) return json({ ok: true });

  const name = clean(p.name, 120);
  const email = clean(p.email, 200);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Name and a valid email are required." });
  }

  const service = SERVICES.indexOf(p.service) >= 0 ? p.service : "Other";
  const source = SOURCES.indexOf(p.source) >= 0 ? p.source : "Website";

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENTS);
    const id = nextId(sheet);

    const row = new Array(COLUMNS.length).fill("");
    const put = (column, value) => (row[col(column) - 1] = value);
    put("ID", id);
    put("Added", new Date());
    put("Name", name);
    put("Email", email);
    put("Phone", clean(p.phone, 40));
    put("Instagram", clean(p.instagram, 60));
    put("Service", service);
    put("Status", "New lead");
    put("Location", clean(p.location, 120));
    put("DAW", clean(p.daw, 60));
    put("Mic & interface", clean(p.gear, 200));
    put("What they want", clean(p.goals, 2000));
    put("Sound like", clean(p.reference, 300));
    put("Recording", saveRecording(p, name) || clean(p.recordingLink, 500));
    put("Source", source);
    put("Price", DEFAULT_PRICE[service] || "");
    put("Paid", "Unpaid");
    put("Next step", NEXT_STEP[service] || "Reach out to schedule");

    sheet.appendRow(row);
    notify(id, row);
  } finally {
    lock.releaseLock();
  }

  return json({ ok: true });
}

/**
 * Saves an uploaded recording to the recordings folder in Drive and returns
 * its link. The file stays private to you.
 */
function saveRecording(p, clientName) {
  if (!p.recordingData) return "";
  const folders = DriveApp.getFoldersByName(RECORDINGS_FOLDER);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(RECORDINGS_FOLDER);
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const fileName = `${stamp} ${clientName} - ${String(p.recordingName || "recording").slice(0, 100)}`;
  const blob = Utilities.newBlob(
    Utilities.base64Decode(p.recordingData),
    p.recordingType || "application/octet-stream",
    fileName,
  );
  return folder.createFile(blob).getUrl();
}

function nextId(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return "DTM-001";
  const ids = sheet.getRange(2, col("ID"), last - 1, 1).getValues().flat();
  const max = ids.reduce((m, v) => Math.max(m, Number(String(v).replace("DTM-", "")) || 0), 0);
  return "DTM-" + String(max + 1).padStart(3, "0");
}

function notify(id, row) {
  const get = (column) => row[col(column) - 1];
  const lines = COLUMNS.filter((c) => !["ID", "Added", "Status", "Paid", "Next step"].includes(c.name))
    .map((c) => [c.name, get(c.name)])
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}: ${v}`);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: get("Email"),
    subject: `New client sign-up: ${get("Name")} — ${get("Service")} (${id})`,
    body: `${lines.join("\n")}\n\nOpen the CRM: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  });
}

/**
 * Trim, cap the length, and stop anything that looks like a formula from being
 * run by the sheet (someone typing =IMPORTXML(...) into the form).
 */
function clean(value, max) {
  const s = String(value || "").trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
