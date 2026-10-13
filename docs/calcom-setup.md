# Cal.com event types — DriveTheMus1c

Paste-ready configuration for the two live sessions. The Send-In Custom Mix
needs no Cal.com event — there's nothing to schedule. Sign-ups arrive in the CRM
with their recording; reply with a payment link, build the preset, send it back.

Clients sign up at `/start` first (that puts them in the CRM — see [crm-setup.md](crm-setup.md)); if a
service has a booking link in `src/config.ts`, the "You're in" screen then
offers a **Pick your time** button. Without one, it says you'll reach out within
24 hours, and you schedule by text.

**Before creating events:** install the **Stripe app** in Cal.com (Apps →
Stripe → Install → connect the same Stripe account Payhip pays into). Price
fields only appear on an event type once Stripe is connected.

**Retire the old events** — Quick Fix ($30), Beginner Studio Setup ($50/60 min),
First Song ($75) and In-Person ($100). Hide them rather than deleting, so any
existing bookings stay intact.

---

## Settings that apply to both

| Setting | Value | Why |
|---|---|---|
| Buffer after event | **15 min** | Notes, and a session that runs over doesn't collide with the next |
| Minimum notice | **12 hours** | Time to read their sign-up answers in the CRM first |
| Currency | USD | |

### Cancellation / reschedule policy (paste into each description)

```
Reschedule or cancel free up to 12 hours before. Inside 12 hours, or a no-show,
is non-refundable — the slot is held for you.
```

---

## 1. Online Custom Mix Session

- **Title:** `Online Custom Mix Session`
- **Slug:** `custom-mix-session`
- **Duration:** 30 minutes
- **Price:** $50
- **Location:** Cal Video (or Zoom/Meet) — screen sharing is essential
- **Requires confirmation:** Off

**Description:**

```
Your vocal preset, built live.

We get on a screen-share and build your vocal chain from scratch while you
record into it — EQ, compression, de-essing, and space, tuned to your voice,
your mic, and your room. You leave with it saved as a preset you load on every
session.

Have ready: your DAW open, mic and interface plugged in, headphones on.
```

Once it's live, put the link in the `url` field of the `online` service in
`src/config.ts`:

```ts
url: "https://cal.com/drivethemus1c/custom-mix-session",
```

---

## 2. In-Person Studio Session — Santa Cruz Area

Priced **$150–200 depending on the job**, which Cal.com can't express as one
fixed price. Two options:

- **Recommended — no Cal.com event.** Leave `url` empty. Sign-ups land in the
  CRM, you text them, confirm the price for their setup, and send a Stripe
  payment link (or take payment on the day). Fits a quoted service best.
- **Or a deposit event:** `in-person-studio-session`, 2 hours, **$50 deposit**,
  Location → *Attendee address*, **Requires confirmation: ON**, balance of
  $100–150 collected on the day. Description must state the total range.

---

## Confirmation email — add to the online event

Cal.com → event type → Advanced → append to the confirmation email:

```
Before our call, please have ready:

• Your DAW installed and opened at least once
• Your audio interface plugged in with its driver installed
• Your mic connected
• Headphones (not speakers — we'll be recording)

If any of that isn't working yet, come anyway — that's often the thing we fix.

Questions before we talk: drivethemus1cmail@gmail.com
```
