# My Home

`My Home` is a small, calm personal homepage for planning the day, keeping a
short note, and returning to the work that matters. It is intentionally a
static site: no framework, build step, account, or server is required.

## What is inside

- A Beijing-time greeting and date
- A compact, locally saved checklist
- A scratchpad that stays in the browser with `localStorage`
- Project "rooms" for focus, ideas, and reading
- A simple weekly activity view

## Run it locally

Open [index.html](./index.html) in a browser, or serve the folder if you prefer
to develop with a local server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Project structure

```text
.
├── index.html                        # Page structure and content
├── styles.css                        # Responsive visual design
├── script.js                         # Time, checklist, and scratchpad behavior
└── README.md                          # Project overview and local usage
```
