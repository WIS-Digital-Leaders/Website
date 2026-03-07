# Events Data Directory

This folder contains all event data for the WIS Digital Leaders Events page.

## How it works

Each event lives in its own **self-contained `.txt` file**. The file uses a simple frontmatter
format: a few metadata lines, a `---` separator, and then the event description.

`events.json` is a **simple ordered manifest** — an array of `.txt` filenames in
chronological order (oldest first). The events page reads the manifest, fetches every listed
file in parallel, and renders the results automatically.

---

## Adding a New Event

### Step 1 — Create the `.txt` file

Create a new file in this directory. Use the event title as the filename (lowercase, hyphens
instead of spaces, no special characters):

```
my-new-event.txt
```

The file must start with metadata lines (`key: value`), followed by `---`, then the event
description:

```
date: 2025-03-15
title: My New Event
category: Workshop
cancelled: false
---
A short description of what the event involves and who it is for.
```

#### Frontmatter field reference

| Field       | Type    | Required | Description                                                      |
|-------------|---------|----------|------------------------------------------------------------------|
| `date`      | string  | ✅       | ISO date string: `YYYY-MM-DD`                                    |
| `title`     | string  | ✅       | Display title of the event card                                  |
| `category`  | string  | ✅       | One of: `Workshop`, `Talk`, `Initiative`, `Support`, `Showcase`, `Hackathon`, `Stall` |
| `cancelled` | boolean | ✅       | `true` if the event was or is cancelled; otherwise `false`       |

The text after `---` is the event description shown on the events page.

---

### Step 2 — Add the filename to `events.json`

`events.json` is just an ordered array of filenames. Open it and insert the new filename in
the correct chronological position:

```json
[
  "earlier-event.txt",
  "my-new-event.txt",
  "later-event.txt"
]
```

---

## Example

**File:** `kick-off-assembly.txt`
```
date: 2024-09-05
title: Kick-Off Assembly
category: Talk
cancelled: false
---
Introduction to Digital Leaders for new members and interested students.
```

**Entry in `events.json`** (in correct date order):
```json
"kick-off-assembly.txt"
```

---

## Notes

- Keep `events.json` sorted by `date` (oldest first) to make reviewing history easier.
- Filenames may only contain lowercase letters, digits, and hyphens (`-`). No spaces or special characters.
- If two events share a similar title, add a suffix such as `-2025` or `-2` to distinguish them.
- The `cancelled: false` line must still be present even when the event is not cancelled.
