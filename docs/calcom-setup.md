# Cal.com event types — DriveTheMus1c

Paste-ready configuration for the four paid services. Slugs match the service
ids in `src/config.ts`, so the finished booking links drop straight in.

**Before creating events:** install the **Stripe app** in Cal.com (Apps →
Stripe → Install → connect the same Stripe account Payhip pays into). Price
fields only appear on an event type once Stripe is connected.

Durations below are recommendations, not your instructions — adjust freely. The
implied rate is ~$50–60/hr across all four, which is internally consistent.

---

## Settings that apply to every event

| Setting | Value | Why |
|---|---|---|
| Buffer after event | **15 min** | Notes, and a call that runs over doesn't collide with the next |
| Minimum notice | **12 hours** | Time to read their intake answers before the call |
| Booking limit | **2 per day**, 6 per week | Support calls are draining; protects against a bad week |
| Location | **Cal Video** (or Zoom/Meet) | Screen sharing is essential — they need to show you FL Studio |
| Requires confirmation | Off (except in-person) | Instant booking converts better |
| Currency | USD | |

### Booking questions — add these to all four

Answers arrive before the call, which is the difference between solving the
problem and spending twenty minutes asking what hardware they own.

| Question | Type | Required |
|---|---|---|
| What are you stuck on? Be as specific as you can. | Long text | Yes |
| FL Studio version (Help → About) | Short text | Yes |
| Operating system (Windows 10/11, macOS version) | Short text | Yes |
| Audio interface (make and model) | Short text | Yes |
| Microphone | Short text | No |
| Link to a screenshot or screen recording of the issue | URL | No |
| Have you bought the Beginner Recording Pack? | Radio: Yes / No / Not yet | No |

### Cancellation / reschedule policy (paste into each description)

```
Reschedule or cancel free up to 12 hours before. Inside 12 hours, or a no-show,
is non-refundable — the slot is held for you.
```

---

## 1. Quick Fix Call

- **Title:** `Quick Fix Call`
- **Slug:** `quick-fix`
- **Duration:** 30 minutes
- **Price:** $30

**Description:**

```
One problem, sorted.

Bring a single specific issue — no signal from your mic, latency you can't get
rid of, crackling audio, a routing setup that isn't behaving, an export that
sounds wrong. We get on a call, you share your screen, we fix it.

Best for: you're mostly working, but one thing is blocking you.

Not sure it's a 30-minute problem? Book the Beginner Studio Setup Call instead,
or email drivethemus1cmail@gmail.com and I'll tell you which one you need.
```

---

## 2. Beginner Studio Setup Call

- **Title:** `Beginner Studio Setup Call`
- **Slug:** `studio-setup`
- **Duration:** 60 minutes
- **Price:** $50

**Description:**

```
Get your whole setup working properly, once.

We go through FL Studio's audio settings and driver selection, get your mic and
interface recognised and levelled, set up MIDI if you use it, install and sort
your plugins, build your vocal routing, and cover exporting and keeping projects
organised so you can find things later.

Best for: you're new, nothing is set up yet, and you want it done right rather
than guessed at.

Includes the Beginner Recording Pack (a $15 value) if you don't already own it —
so you leave the call with a working template installed.
```

---

## 3. First Song Setup Session

- **Title:** `First Song Setup Session`
- **Slug:** `first-song`
- **Duration:** 90 minutes
- **Price:** $75

**Description:**

```
From nothing to a recorded song.

The full workflow, start to finish: get your setup running, load a beat, set
levels, record your main vocal, stack doubles and ad-libs, keep the session
organised, and export something you can actually send to someone.

Best for: you want to record your first song and would rather be walked through
it than figure it out alone.

Includes the Beginner Recording Pack (a $15 value) if you don't already own it.

Have a beat ready if you can — bring the file, or we'll find something to work
with on the call.
```

---

## 4. In-Person Studio Setup — Santa Cruz Area

- **Title:** `In-Person Studio Setup (Santa Cruz Area)`
- **Slug:** `in-person`
- **Duration:** 2 hours (block 3 to be safe)
- **Price:** **$50 booking deposit** — balance due in person
- **Location:** In Person → **Attendee address**
- **Requires confirmation:** **ON** — so you can check the location is in range before it's locked in

**Description:**

```
I come to you and set the room up properly.

Hardware, cabling, interface and driver install, speaker or headphone
monitoring, FL Studio configured end to end, and a walkthrough so you can
actually run it after I leave. Santa Cruz area only.

PRICING: total is $100–$150 depending on how much gear is involved and how long
it takes. You pay a $50 deposit to book; the balance is due in person once we've
agreed the scope. Nothing is charged beyond the deposit without you agreeing to
it first.

Requests are confirmed manually — I'll check the location is within range and
come back to you before the booking is locked in.
```

**Extra booking questions for this one:**

| Question | Type | Required |
|---|---|---|
| Address or neighbourhood (to confirm it's in range) | Short text | Yes |
| What gear do you have already? | Long text | Yes |
| What do you want working by the end? | Long text | Yes |

---

## Confirmation email — add to every event

Cal.com → event type → Advanced → append to the confirmation email:

```
Before our call, please have ready:

• FL Studio installed, opened at least once
• Your audio interface plugged in with its driver installed
• Your mic connected
• Headphones (not speakers — we'll be recording)
• The DriveTheMus1c pack downloaded and extracted, if you have it

If any of that isn't working yet, come anyway — that's often the thing we fix.

Questions before we talk: drivethemus1cmail@gmail.com
```

---

## When they're live

Send me the four booking URLs and I'll drop them into the `url` fields in
`src/config.ts` — one line each. Until then every "Book this" button opens a
pre-filled email, so nothing is broken in the meantime.
