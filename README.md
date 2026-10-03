# Skyline Realty

A four-page real-estate website with a searchable, filterable property listings page and an enquiry form.

**Live:** https://skyline-realty-nu.vercel.app

Source code is in this repo — hand-written HTML/CSS/vanilla JS, no build step. Serve the folder locally (see below).

## About

Skyline Realty is a demo property-consultancy site: a four-page build with a homepage, a property listings page, an about page and contact. The listings page is the substantive part — twelve property cards tagged with buy/rent mode, city, property type and budget band, filtered live in the browser.

## Tech stack

| | |
|---|---|
| Markup | HTML5, four pages |
| Styling | `css/style.css`, CSS custom properties, `clamp()` type scale |
| Script | `js/main.js` — vanilla ES6+ in one IIFE, no dependencies |
| Fonts | Google Fonts |
| Images | 12 local JPEGs in `images/` (`prop-01.jpg` … `prop-12.jpg`) |
| Build | None. No `package.json`, no dependencies |
| Hosting | Vercel, static hosting |

## Features

Everything below is implemented in the repo.

- **Four pages** — `index.html`, `listings.html`, `about.html`, `contact.html` — sharing one stylesheet and one script.
- **Listings filtering** — 12 cards filtered by four dimensions at once: Buy/Rent tab (`data-mode`), city (`data-city`), property type (`data-type`) and budget band (`data-budget`). Non-matching cards are hidden and the visible total updates live ("12 properties found").
- **Featured property grid** on the homepage — six cards from the same `.prop` component as the listings page.
- **Hero search form** — Buy/Rent tabs plus city, property type and budget dropdowns, submitting to the listings page.
- **Validated enquiry form** (`#contact-form`) — required name, phone, interest and message; empty fields are flagged on their `.form-group` and submission stops until they are filled. A valid submission opens a pre-filled email.
- **Count-up statistics** — figures animate from 0 to their `data-count` target on scroll, with thousands separators.
- **Scroll progress bar** and **reveal-on-scroll** via `IntersectionObserver`.
- **Staggered reveals** — grid children get an incremental `transition-delay`.
- **Hero parallax** — a decorative layer translates on scroll, throttled through `requestAnimationFrame`.
- **Cursor spotlight** — cards track the pointer and expose `--mx` / `--my` custom properties.
- **Mobile navigation** — links panel toggles with `aria-expanded` kept in sync and closes when a link is tapped.
- **Accessibility / motion** — `prefers-reduced-motion: reduce` disables parallax and the spotlight; scroll listeners are `passive`.
- **Responsive** — breakpoints at 960px and 600px.

## Project structure

```
.
├── index.html        # homepage + hero search
├── listings.html     # filterable property listings
├── about.html        # story, values, team
├── contact.html      # contact + enquiry form
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/           # prop-01.jpg … prop-12.jpg
├── favicon.svg
├── .gitignore        # ignores .vercel
└── .vercel/          # Vercel project link (projectName: skyline-realty)
```

## Local preview

No install step. The pages cross-link each other and load `css/`, `js/` and `images/` by relative path, so serve them over HTTP:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- **Practice build.** Skyline Realty, its properties, prices, agents, reviews and clients are sample content written for the demo — not a real agency and not a delivered client project.
- The hero search form is a `GET` to `listings.html`; the filtering on that page is driven by the filter controls there, not by the submitted query string.
- There is no backend. The enquiry form validates client-side and then hands off by email.
