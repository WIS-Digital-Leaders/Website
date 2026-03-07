# Events Data Directory

This folder contains all event data for the WIS Digital Leaders Events page.

## How it works

Each event lives in its own **self-contained `.txt` file**. The file uses a simple frontmatter
format: a few metadata lines, a `---` separator, and then the event description.

`events.json` is a **simple ordered manifest** — an array of `.txt` filenames sorted
chronologically. It is **auto-generated** by a GitHub Actions workflow whenever `.txt` files
are pushed to the repository; you never need to edit it manually.

---

## Adding a New Event — one step only

Create a new `.txt` file in this directory. Use the event title as the filename (lowercase,
hyphens instead of spaces, no special characters):

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

Push the file. The **Update events manifest** GitHub Actions workflow will automatically rescan
all `.txt` files in this directory, sort them by date, and write the result to `events.json`.
No further edits are needed.

---

## Frontmatter field reference

| Field       | Type    | Required | Description                                                      |
|-------------|---------|----------|------------------------------------------------------------------|
| `date`      | string  | ✅       | ISO date string: `YYYY-MM-DD`                                    |
| `title`     | string  | ✅       | Display title of the event card                                  |
| `category`  | string  | ✅       | One of: `Workshop`, `Talk`, `Initiative`, `Support`, `Showcase`, `Hackathon`, `Stall` |
| `cancelled` | boolean | ✅       | `true` if the event was or is cancelled; otherwise `false`       |

The text after `---` is the event description shown on the events page.

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

Push this file → the workflow runs → `events.json` is updated → the event appears on the page.

---

## Notes

- Filenames may only contain lowercase letters, digits, and hyphens (`-`). No spaces or special characters.
- If two events share a similar title, add a suffix such as `-2025` or `-2` to distinguish them.
- The `cancelled: false` line must still be present even when the event is not cancelled.
- `events.json` is maintained automatically. Do not edit it by hand.
