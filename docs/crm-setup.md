# Client CRM — Google Sheets setup

A Google Sheet that holds every client, plus a script that adds a new row each
time someone signs up at **drivethemus1c.com/start** and emails you about it.
Send-in clients' uploaded recordings are saved to a **DriveTheMus1c client
recordings** folder in your Drive and linked from their row. About 10 minutes, once.

> **The sheet already exists:** [DriveTheMus1c CRM](https://docs.google.com/spreadsheets/d/1gI2B6jYVe-ZGgQtNSE8v7LuKzRoze6hLXpwQ4OP4_D0/edit)
> (owned by drivethemus1cmail@gmail.com), built with the Clients and Dashboard
> tabs. Open it while signed in as that account and start at step 2 of part 1 —
> skip step 4 (`setupCrm`). Then do part 3 so the website can write to it.

The script is [`docs/crm/Code.gs`](crm/Code.gs).

---

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new) while signed in to the Google account you
   want the CRM in (drivethemus1cmail@gmail.com makes sense — sign-up emails come
   from whichever account owns the script).
2. **Extensions → Apps Script.** A code editor opens in a new tab.
3. Delete what's in `Code.gs`, paste in the whole of [`docs/crm/Code.gs`](crm/Code.gs),
   and press **Save** (💾).
4. In the toolbar's function dropdown pick **`setupCrm`**, then **Run**.
5. Google asks for permission the first time: Sheets (to add rows), Gmail (to
   email you about sign-ups) and Drive (to save uploaded recordings). **Review permissions** → choose your
   account → you'll see *"Google hasn't verified this app"* — that's normal for a
   script you wrote yourself → **Advanced → Go to (project name) → Allow**.

Back in the sheet you now have:

| Tab | What it's for |
|---|---|
| **Clients** | One row per person. Dropdowns for Service, Status, Paid and Source. New leads are highlighted gold; overdue follow-ups go red; paid rows go green. Filter buttons on every column. |
| **Dashboard** | Totals that update themselves — clients, new leads, booked, follow-ups due, sign-ups this month, revenue, and breakdowns by service and source. |

Running `setupCrm` again is safe — it reapplies formatting and rebuilds the
dashboard without touching client rows.

## 2. Add your current clients

Type them straight into **Clients**, one per row. Leave **ID** blank or give them
`DTM-001`, `DTM-002`… — new sign-ups continue numbering from the highest ID.

How to use the columns day to day:

- **Status** moves left to right: `New lead → Contacted → Booked → In progress →
  Done → Follow up → Repeat client` (or `Not a fit`). "In progress" is for send-in
  presets you're building.
- **Follow up on** — put a date in and it turns red when it's due. Check the
  Dashboard's *Follow-ups due* number each morning.
- **Recording / Sound like** — for send-in clients: a link to their vocal (opens
  in your Drive) and who they want to sound like.
- **Price / Paid** — set Price when you quote it (online and send-in fill in $50
  automatically; in-person is per job), flip Paid to `Paid` when the money lands. Revenue only
  counts rows marked Paid.
- **Next step** — one line, always the very next thing ("Text to confirm Sat 2pm").

## 3. Connect the website sign-up form

1. In the Apps Script tab: **Deploy → New deployment**.
2. Gear icon next to *Select type* → **Web app**.
3. Settings:
   - Description: `Website sign-ups`
   - Execute as: **Me**
   - Who has access: **Anyone** *(the site's visitors aren't signed in to Google;
     this only lets them submit the form, not see the sheet)*
4. **Deploy** → copy the **Web app URL** (ends in `/exec`).
5. Open that URL in a browser — it should say *"DriveTheMus1c CRM endpoint is live."*
6. Send the URL to Claude, or paste it into `CRM_ENDPOINT` in
   [`src/config.ts`](../src/config.ts) yourself:

   ```ts
   export const CRM_ENDPOINT: string = "https://script.google.com/macros/s/…/exec";
   ```

Until it's set, the sign-up form opens a pre-filled email to you instead — so it
works from day one, it just doesn't land in the sheet automatically.

## 4. Test it

Submit the form at `/start` with your own details. Within a few seconds you
should see a new gold **New lead** row in Clients and an email titled
*"New client sign-up: …"*. Hitting **Reply** on that email replies to the client.

---

## Changing the script later

Edit the code, Save, then **Deploy → Manage deployments → ✏️ (edit) → Version: New
version → Deploy**. That keeps the same URL, so the site doesn't need changing.
(A *New deployment* would make a new URL.)

If you add or rename a service in `src/config.ts`, add the same name to `SERVICES`
at the top of `Code.gs` and re-run `setupCrm` so the dropdown matches. Sign-ups
with a service name the script doesn't know are filed as `Other`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Form says "That didn't go through" | Open the `/exec` URL in a browser. If it asks you to sign in, *Who has access* isn't set to **Anyone** — edit the deployment. |
| Form fails only when a file is attached | The Drive permission wasn't granted. Run `setupCrm` (or any function) once more and accept, then redeploy a new version. Files over 15 MB are refused by the form itself. |
| Row appears but no email | Apps Script → **Executions** (left sidebar) shows the error. Usually the mail permission wasn't granted — run `setupCrm` once more and accept. |
| Nothing at all | Check `CRM_ENDPOINT` ends in `/exec`, not `/dev`, and the site was rebuilt after changing it. |
