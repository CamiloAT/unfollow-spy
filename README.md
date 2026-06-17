# UnfollowSpy

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.13.2-CA4245?style=flat&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![jsPDF](https://img.shields.io/badge/jsPDF-4.2.1-D32F2F?style=flat&logo=file-icons&logoColor=white)](https://parall.ax/genteam-jspdf)
[![Lucide](https://img.shields.io/badge/Lucide_React-1.18.0-000000?style=flat&logo=lucide&logoColor=white)](https://lucide.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat)](https://opensource.org/licenses/MIT)

A **100% local and secure** web tool that audits your Instagram followers directly in your browser. Upload your official Meta data export, and UnfollowSpy cross-references your followers and following lists instantly — no passwords, no servers, no risk of bans.

---

## Main Features

* **Total Privacy:** All processing runs locally in your browser. No data is ever sent to external servers.
* **Cross-Reference Analysis:** Instantly detects "traitors" — accounts you follow that don't follow you back — by cross-referencing your followers and following lists.
* **Time Tracking:** Decodes UNIX timestamps from Meta exports to show exactly how many days since someone started following you.
* **PDF Reports:** Download a detailed PDF report with selected data. Choose which sections (traitors, followers, following) to include before exporting.
* **Dark Mode:** Automatic theme detection based on system preference. Toggle between light and dark modes with persistent preference saved in localStorage.
* **Smart Sorting & Search:** Filter and sort users alphabetically (A-Z, Z-A), by most recent, or oldest. Search by username instantly.
* **Interactive Tutorial:** Includes a 22-step guided walkthrough showing users exactly how to request their Instagram data from Meta's Accounts Center.

---

## Pages & Views

| View | Description |
|------|-------------|
| `/home` | Landing page with hero section, "How It Works" interactive carousel (3 auto-rotating steps), and feature highlight cards. |
| `/analyze` | Core analysis workspace — upload `followers_1.json` and `following.json`, run the cross-reference analysis, browse results in tabbed lists, and generate downloadable PDF reports. |

---

## Execution and Development Guide

This is a React application built with Vite. To run it locally you only need Node.js installed.

### 1. Clone the repository

```bash
git clone https://github.com/CamiloAT/UnfollowSpy.git
cd "Proyecto Instagram"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

Navigate to the local address provided by the terminal (default: `http://localhost:5173`).

### How to Get Your Instagram Data

1. Go to the **Accounts Center** / Account Settings on Instagram (App or Web).
2. Navigate to **Your activity** > **Download your information**.
3. Request a copy of your data and select **JSON** format.
4. Once notified, download and extract the `.zip` file on your computer.
5. Launch UnfollowSpy and upload the `followers_1.json` and `following.json` files (found inside `connections/followers_and_following`).

> **Note:** This tool does not interact with Instagram's API. It only reads the official data export you download from Meta's Accounts Center. Your credentials are never required.

---

## Project Structure

```text
unfollow-spy/
│
├── index.html                        ← Vite HTML entry point
├── package.json                      ← Project manifest and dependencies
├── vite.config.js                    ← Vite config with React plugin
│
└── src/
    ├── main.jsx                      ← App entry point
    ├── App.jsx                       ← Root component & routing
    ├── App.css                       ← Legacy Vite template styles
    ├── index.css                     ← Base/reset styles
    │
    ├── components/
    │   ├── LandingPage.jsx           ← Hero section, features, how-it-works
    │   ├── Header.jsx                ← Sticky navigation header + dark mode toggle
    │   ├── Footer.jsx                ← Footer with privacy/terms modals
    │   ├── AnalyzePage.jsx           ← Upload & analysis view
    │   ├── UploadSection.jsx         ← Dual file upload cards with validation
    │   ├── UserList.jsx              ← Reusable user list with search & sort
    │   ├── TutorialModal.jsx         ← 22-step tutorial modal
    │   ├── ReportModal.jsx           ← PDF report selection & generation
    │   └── DarkModeProvider.jsx      ← Dark mode context provider
    │
    ├── context/
    │   └── DarkModeContext.jsx        ← Dark mode React context definition
    │
    ├── hooks/
    │   ├── useInstagramData.js       ← Core hook: JSON parsing & cross-referencing
    │   └── useDarkMode.js            ← Dark mode toggle hook
    │
    ├── styles/
    │   └── index.css                 ← Component & layout styles (~2150 lines)
    │
    └── assets/
        ├── logo.png                  ← Full app logo
        ├── logo_recorted.png         ← Cropped logo (header/favicon)
        ├── landing_page_image.png    ← Landing page illustration
        ├── hero.png                  ← Hero section image
        └── tutorial_step_*.png       ← 22 tutorial screenshots
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 |
| Routing | React Router DOM v7 |
| Build Tool | Vite 8 |
| Styling | Custom CSS (Variables, Keyframe Animations, Flexbox/Grid) |
| Icons | Lucide React |
| PDF Generation | jsPDF |
| Theme | Dark Mode (System preference + manual toggle) |
| Architecture | SPA (Single Page Application) |

---

## Authors

| Name | GitHub |
|------|--------|
| **Arias Tenjo Camilo Andres** | [@CamiloAT](https://github.com/CamiloAT) |

*Web Application Development*
