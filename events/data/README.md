# Events Data Directory

This folder contains all event data for the WIS Digital Leaders Events page.

## How it works

Each event has **two parts**:

1. **A `.txt` file** — contains the event description (plain text, filename = event title in slug form)
2. **An entry in `events.json`** — contains the event metadata and references the `.txt` file

---

## Adding a New Event

### Step 1 — Create the `.txt` file

Create a new file in this directory. The filename should be the event title in lowercase with spaces replaced by hyphens (no special characters):

```
my-new-event.txt
```

The file contents should be just the event description (plain text):

```
A short description of what the event involves and who it is for.
```

### Step 2 — Add an entry to `events.json`

Open `events.json` and add a new entry to the array. Insert it in the correct date order:

```json
{
  "date": "YYYY-MM-DD",
  "title": "My New Event",
  "category": "Workshop",
  "cancelled": false,
  "file": "my-new-event.txt"
}
```

#### Field reference

| Field       | Type    | Required | Description                                                      |
|-------------|---------|----------|------------------------------------------------------------------|
| `date`      | string  | ✅       | ISO date string: `YYYY-MM-DD`                                    |
| `title`     | string  | ✅       | Display title of the event card                                  |
| `category`  | string  | ✅       | One of: `Workshop`, `Talk`, `Initiative`, `Support`, `Showcase`, `Hackathon`, `Stall` |
| `cancelled` | boolean | ✅       | Set to `true` if the event was or is cancelled; otherwise `false` |
| `file`      | string  | ✅       | Filename of the corresponding `.txt` file in this directory      |

---

## Example

**File:** `kick-off-assembly.txt`
```
Introduction to Digital Leaders for new members and interested students.
```

**Entry in `events.json`:**
```json
{
  "date": "2024-09-05",
  "title": "Kick-Off Assembly",
  "category": "Talk",
  "cancelled": false,
  "file": "kick-off-assembly.txt"
}
```

---

## Notes

- Keep `events.json` sorted by `date` (oldest first) to make reviewing history easier.
- Filenames may only contain lowercase letters, digits, and hyphens (`-`). No spaces or special characters.
- If two events share a similar title, add a suffix such as `-2025` or `-2` to distinguish them.
