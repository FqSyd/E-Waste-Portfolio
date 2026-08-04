# 🌿 E-Waste & Environmental Management Academic E-Portfolio

A university-grade, responsive academic E-Portfolio website designed for the subject **"E-Waste & Environmental Management"** at **Vidyalankar Institute of Technology (VIT, Mumbai)**.

**Student:** Faaeq Sayed  
**Department:** B.Tech Information Technology  
**Academic Year:** 2026-27  

---

## 🚀 Tech Stack

- **Core Framework:** React 18 + Vite
- **Styling & Theme:** Tailwind CSS v3 + Vanilla CSS Glassmorphism
- **Animations:** Framer Motion (Scroll reveal, hero transformation effects, counters)
- **Icon Packs:** Lucide React & React Icons
- **PDF Viewer:** Custom Glassmorphic Modal PDF Viewer
- **Gallery Lightbox:** Masonry Grid + Lightbox Popup with zoom & keyboard navigation
- **Deployment:** GitHub Pages / Netlify / Vercel

---

## 🎨 Color Palette & Design Identity

- **Primary Green:** `#2E7D32`
- **Secondary Green:** `#43A047`
- **Vibrant Accent:** `#00C853`
- **Teal Accent:** `#26A69A`
- **Background Light:** `#F6FBF6`
- **Background Dark:** `#0A120C`
- **Design Style:** Glassmorphism, soft shadows, rounded corners, responsive micro-animations, eco-particles background.

---

## 📁 Project Structure

```text
E-Portfolio/
├── public/
│   ├── assignments/         # Assignment PDF files & preview images
│   ├── gallery/             # Activity photos & event images
│   ├── profile/             # Profile avatar graphics
│   ├── favicon.svg          # Eco leaf favicon
│   └── _redirects           # Netlify SPA routing rules
├── src/
│   ├── components/          # Modular React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── SubjectOverviewSection.jsx
│   │   ├── AssignmentsSection.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── PdfModal.jsx
│   │   ├── GallerySection.jsx
│   │   ├── LightboxModal.jsx
│   │   ├── TimelineSection.jsx
│   │   ├── AchievementsSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── FloatingLeafCanvas.jsx
│   │   ├── CustomCursor.jsx
│   │   └── ReadingProgressBar.jsx
│   ├── context/
│   │   └── ThemeContext.jsx # Dark / Light mode provider
│   ├── data/                # Data-driven JSON/JS storage
│   │   ├── studentData.js
│   │   ├── assignmentData.js
│   │   ├── galleryData.js
│   │   ├── timelineData.js
│   │   └── achievementData.js
│   ├── styles/
│   │   └── index.css        # Tailwind directives & design tokens
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── netlify.toml
├── vercel.json
└── README.md
```

---

## 🛠️ Admin Maintenance: How to Update Content

The website is 100% data-driven. **No code changes** are required to add new coursework or photos!

### 1. How to Add a New Assignment

1. Place your PDF file inside `public/assignments/` (e.g. `public/assignments/assignment-6.pdf`).
2. (Optional) Place a cover image inside `public/assignments/` or use an image URL.
3. Open `src/data/assignmentData.js` and append a new object to the array:

```javascript
{
  id: 8,
  assignmentNumber: "06",
  title: "Assignment 6: E-Waste Management in Smart Cities",
  description: "Research paper on IoT sensors deployed in automated e-waste collection bins.",
  category: "Research", // Choose: 'Reports', 'Research', 'Activities', 'Presentations', 'Practicals'
  date: "September 15, 2026",
  subject: "E-Waste & Environmental Management",
  pdf: "./assignments/assignment-6.pdf",
  image: "https://images.unsplash.com/photo-example",
  tags: ["IoT", "Smart City", "E-Waste"]
}
```

The website will automatically generate the new assignment card with PDF preview and direct download capabilities.

---

### 2. How to Add a New Gallery Photo

1. Place your photo inside `public/gallery/` (e.g. `public/gallery/clean-drive-2.jpg`).
2. Open `src/data/galleryData.js` and add a new entry:

```javascript
{
  id: 9,
  title: "City E-Waste Cleanup Rally",
  caption: "Participating in municipal awareness drive.",
  category: "Recycling Drive", // Choose: 'Awareness Campaign', 'Workshop', 'Field Visit', 'Campus Activity', 'Recycling Drive', 'Seminar'
  date: "October 01, 2026",
  location: "Dadar Beach, Mumbai",
  image: "./gallery/clean-drive-2.jpg",
  activityType: "Cleanliness Drive"
}
```

The photo will automatically render inside the Pinterest Masonry grid and enable full-screen Lightbox viewing.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at http://localhost:3000
```

### Production Build
```bash
# Generate production bundle inside /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Instructions

### Option 1: GitHub Pages

1. Install `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run deployment:
   ```bash
   npm run deploy
   ```

---

### Option 2: Netlify

1. Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2. Set Build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
3. Click **Deploy Site**. (The included `netlify.toml` automatically handles single-page route rewrites).

---

### Option 3: Vercel

1. Import repository on [Vercel](https://vercel.com/).
2. Framework Preset: **Vite**.
3. Click **Deploy**. (The included `vercel.json` ensures smooth client-side routing).

---

## 📜 License & Credits

Created by **Faaeq Sayed** for **Vidyalankar Institute of Technology (VIT, Mumbai)** coursework in *E-Waste & Environmental Management*.
