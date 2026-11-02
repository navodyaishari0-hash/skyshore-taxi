# Skyshore Taxi Service — Website

A simple, professional website for a taxi service based in Tangalle, Sri Lanka.
Built with **HTML5, CSS3 and vanilla JavaScript** only — no frameworks, no databases, no PHP.

> The project is a **GitHub Pages** repository named **`skyshore-taxi`**.
> All image/asset paths are relative, so the site works both locally and at
> `https://YOUR-USERNAME.github.io/skyshore-taxi/`.

## Project structure

```
skyshore-taxi/
├── index.html        ← the page structure (all 7 sections)
├── css/
│   └── style.css     ← all design: colors, layout, animations (mobile-first)
├── js/
│   └── script.js     ← all interactivity (menu, form, WhatsApp, lightbox...)
├── assets/
│   └── images/       ← the four vehicle photos
├── photo/            ← your original uploaded photos (backup copy)
├── .nojekyll         ← tells GitHub Pages to serve assets without processing
└── README.md
```

### Vehicle photos (in `assets/images/`)

| File name          | Photo                                  |
|--------------------|----------------------------------------|
| `van.jpg`          | black Toyota van                       |
| `white-car.jpg`    | white car (can be decorated for weddings) |
| `grey-car.jpg`     | grey car (can be decorated for weddings) |
| `wedding-cars.jpg` | both wedding cars together             |

If a photo were ever missing, the site shows a neat "Photo coming soon" box
instead of a broken image. Originals are kept in the `photo/` folder.

## Deploying to GitHub Pages (repository: `skyshore-taxi`)

1. Push this folder's contents to a GitHub repository named **`skyshore-taxi`**.
2. In the repository: **Settings → Pages**.
3. Under "Build and deployment" choose **Deploy from a branch** → branch `main`, folder `/ (root)`.
4. Save. The site publishes at:
   `https://YOUR-USERNAME.github.io/skyshore-taxi/`
5. All links (`tel:`, `wa.me`, `#sections`) and relative paths
   (`css/style.css`, `js/script.js`, `assets/images/...`) work as-is — no changes needed.

## How to run the website locally (VS Code Live Server)

1. Open the `skyshore-taxi` folder in **VS Code** (File → Open Folder).
2. Install the **Live Server** extension.
3. Right-click `index.html` → **"Open with Live Server"**.
4. The site opens at `http://127.0.0.1:5500` and reloads automatically when you save.

You can also simply double-click `index.html` — everything works from a local file too.

## How it works (in simple English)

- **index.html** — the *skeleton*: navigation, hero, about, vehicles, services,
  booking form, gallery, contact and footer, plus the floating WhatsApp and
  Call buttons. Semantic tags (`<header>`, `<section>`, `<article>`, `<footer>`)
  are used for clean structure and accessibility.
- **style.css** — the *appearance*, written **mobile-first**: the base styles are
  for phones (hamburger menu, stacked layouts), and `@media (min-width: 720px / 1020px)`
  blocks add the tablet and desktop layouts. Palette: deep navy `#172B3A`, warm
  off-white `#F7F6F2`, muted gold `#BA965B`, ink `#252525`. Fonts: Inter
  (headings/UI) with DM Sans (body).
- **script.js** — the *behavior*: mobile menu toggle, navbar/back-to-top on scroll,
  form validation, WhatsApp message generation, gallery lightbox, scroll-reveal
  animations, and the automatic copyright year.

### Floating buttons (great for phones)

- **WhatsApp button** (green circle) — bottom-right on every screen, opens
  WhatsApp with a "book a ride" message.
- **Call actions** — "Call Us" button in the hero, a quick-call button next to
  the hamburger on mobile, phone links in the header, contact section and footer.

### How the WhatsApp booking works

When the form passes validation, JavaScript builds a formatted text message with
all the booking details (vehicle, pickup, destination, date, time, name, phone),
encodes it with `encodeURIComponent()`, and opens:

```
https://wa.me/94773964515?text=<the-encoded-message>
```

This opens WhatsApp with the message ready to send. The form sends a **booking
enquiry only** — no confirmation is displayed until the business confirms the
ride through the WhatsApp conversation.

## How to update things later

| What you want to change | Where to change it |
|---|---|
| Phone / WhatsApp numbers | `index.html` (search `94773964515`) and the `WHATSAPP_NUMBER` constant in `js/script.js` |
| Photos | Replace the files in `assets/images/` keeping the same names |
| Section text / headings | `index.html` |
| Colors / fonts / spacing | `css/style.css` (palette is documented at the top) |
| Services & vehicle descriptions | `index.html` (sections 3 & 4) |

## Notes

- No customer reviews, prices or certifications were invented — all content
  reflects what was provided by the business.
- Promotion is taxi/transportation only.
- All code is beginner-readable with comments explaining each step.
