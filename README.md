# Mama Africa Bukka Hub & Sports Bar — Website

A fully responsive, single-page website for **Mama Africa Bukka Hub & Sports Bar**, an authentic Nigerian bukka, bakery and match-day sports bar in Ogombo, Ajah, Lagos.

Built with semantic HTML5, Tailwind CSS (via CDN), and vanilla JavaScript — no build step, no dependencies to install.

## Features

- Immersive hero section with parallax background
- Filterable digital menu (Native Soups & Swallow, Bush Meat & Peppersoup Specials, Delicacies & Small Chops, Grills & Bush Bar Specials, Rice & Sides)
- Mama Africa Bread bakery showcase (sardine bread, meat pies, cakes, pastries)
- The Bush Bar & Sports Lounge section — drinks menu built for match day
- Frontend cart drawer with Pickup/Dine-in toggle and WhatsApp checkout
- Table reservation form that hands off to WhatsApp with prefilled booking details
- Heritage/story section, gallery with lightbox, testimonials carousel
- Floating WhatsApp + Call buttons, sticky header, mobile nav
- Google Maps embed and full contact footer

## Project Structure

```
mama-africa-bukka-hub/
├── index.html              # Single-page site (all sections)
├── assets/
│   ├── css/style.css       # Custom styles, animations, components
│   ├── js/main.js          # Menu data, cart, reservations, interactivity
│   └── images/             # Logo and dish photos
└── README.md
```

## Previewing Locally

No build tools required. Pick any one of these:

**Option A — VS Code Live Server**
Open the folder in VS Code, install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

**Option B — Python**
```bash
cd mama-africa-bukka-hub
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

**Option C — Node**
```bash
npx serve mama-africa-bukka-hub
```

## Editing the Menu

All menu items, drinks, bakery items, gallery entries, and testimonials live as plain data arrays at the top of `assets/js/main.js` (`MENU`, `DRINKS`, `BAKERY`, `GALLERY`, `TESTIMONIALS`). Add, remove, or edit an item by editing its object — the page re-renders automatically, no other code changes needed.

Menu items without a real photo (`img`) fall back to a branded placeholder card using an `icon` (emoji) — replace `icon` with `img: IMG("your-file.jpeg")` once a real photo is available in `assets/images/`.

## Ordering & Reservations

This is a frontend-only site (no backend/payment processor). "Checkout" and "Reserve" actions open WhatsApp (`wa.me`) with a prefilled message containing the order or booking details, sent directly to the restaurant's number. Update `WHATSAPP_NUMBER` at the top of `assets/js/main.js` to change the destination number.

## Deploying / Verifying the GitHub Push

This repo is pushed to **github.com/BAWIZO-OPTIMUS/Bawizo-Optimus**.

To verify the push locally:
```bash
git clone https://github.com/BAWIZO-OPTIMUS/Bawizo-Optimus.git
cd Bawizo-Optimus
python -m http.server 8080   # then visit http://localhost:8080
```

Or view it directly on GitHub — all files (`index.html`, `assets/`, `README.md`) should be present in the repo root.

### Hosting it live (free options)

- **GitHub Pages**: repo Settings → Pages → Deploy from branch `main` / root. Site goes live at `https://bawizo-optimus.github.io/Bawizo-Optimus/`.
- **Vercel / Netlify**: import the GitHub repo, no build command needed, output directory is the repo root.
