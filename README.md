# DENWIN LSD (Local Services Directory)

Welcome to the codebase for **DENWIN LSD**, a lightweight, WhatsApp-first local services directory for Ruaka.

## 📂 Project Structure

```
denwin-lsd/
├── index.html      # Main HTML structure (Single Page App)
├── styles.css      # All styling (Mobile-first, Premium design)
├── script.js       # Logic for Rendering, Search, Filtering, and WhatsApp Links
├── data.js         # The "Database" - Array of provider objects
└── assets/         # Folder for images/icons (currently valid placeholders)
```

## 🚀 How to Run Locally

Since this is a static site (HTML/CSS/JS), you don't need a complex server.

1.  **Open `index.html`** directly in your browser (Chrome/Edge).
    - _Note: Some features might behave better accessed via a local server due to browser security policies, but basic functionality will work._
2.  **VS Code Live Server (Recommended):**
    - Open this folder in VS Code.
    - Install the "Live Server" extension.
    - Right-click `index.html` -> "Open with Live Server".

## 🛠 Features & Logic

- **Search Engine:** Filters by Name, Category, Location, Description, and Tags.
- **Smart Links:** Clicking "Chat on WhatsApp" automatically pre-fills a message with the category and context (e.g., "I need help with Plumbing").
- **Data Management:** To add more providers, simply edit `data.js`. No database setup required.

## 🌍 Deployment

This site is "Drop-ready". You can deploy it instantly:

- **Netlify:** Drag and drop this entire folder into the Netlify dashboard.
- **Vercel:** Install Vercel CLI (`npm i -g vercel`) and run `vercel deploy`, or connect a GitHub repo.

## 📝 Editing Content

- **Providers:** Edit `data.js`.
- **Static Text (FAQ, Hero):** Edit `index.html`.
- **Colors/Styles:** Edit `styles.css` (check `:root` variables at the top).
