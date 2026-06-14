# UnfollowSpy

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![jsPDF](https://img.shields.io/badge/jsPDF-D32F2F?style=for-the-badge&logo=file-icons&logoColor=white)

A **100% local and secure** web tool that audits your Instagram followers directly in your browser. Upload your official Meta data export, and UnfollowSpy cross-references your followers and following lists instantly — no passwords, no servers, no risk of bans.

---

## Key Features

* **Total Privacy:** All processing runs locally in your browser. No data is ever sent to external servers.
* **Modern Interface:** Polished UI with brand-inspired SVG gradients, sequential animations, and a clean, distraction-free environment.
* **Comprehensive Time Analysis:** Decodes UNIX timestamps from Meta exports to show exactly how many days since someone started following you.
* **Smart Validations:** Prevents errors through rigorous verification of the original export files (`followers_1.json` and `following.json`).
* **Optimal Performance:** Super-fast SPA architecture with instant cross-referencing of data.
* **PDF Reports:** Download a detailed PDF report with selected data (traitors, followers, following). Choose what to include before exporting.

---

## How to Get Your Instagram Data

1. Go to the **Accounts Center** / Account Settings on Instagram (App or Web).
2. Navigate to **Your activity** > **Download your information**.
3. Request a copy of your data and select **JSON** format.
4. Once notified, download and extract the `.zip` file on your computer.
5. Launch UnfollowSpy and upload the `followers_1.json` and `following.json` files (found inside `connections/followers_and_following`).

---

## Installation & Development Guide

This is a React application built with Vite. To run it locally you only need Node.js installed.

### 1. Clone the repository

```bash
git clone https://github.com/user/unfollow-spy.git
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

---

## Project Structure

```text
Proyecto Instagram/
│
├── index.html
├── package.json
├── vite.config.js
│
└── src/
    ├── main.jsx                     ← App entry point
    ├── App.jsx                      ← Root component & routing
    ├── App.css                      ← Global app styles
    ├── index.css                    ← Base/reset styles
    │
    ├── components/
    │   ├── LandingPage.jsx          ← Hero section, features, how-it-works
    │   ├── Header.jsx               ← Navigation header
    │   ├── Footer.jsx               ← Footer component
    │   ├── AnalyzePage.jsx          ← Upload & analysis view
    │   ├── UserList.jsx             ← Followers/following list display
    │   ├── UploadSection.jsx        ← File upload component
    │   ├── TutorialModal.jsx        ← Step-by-step tutorial modal
    │   └── ReportModal.jsx          ← PDF report selection & generation
    │
    ├── hooks/
    │   └── useInstagramData.js      ← Custom hook for data parsing & processing
    │
    ├── styles/
    │   └── index.css                ← Component & layout styles
    │
    └── assets/
        ├── logo.png                 ← App logo
        ├── landing_page_image.png   ← Landing page illustration
        ├── hero.png                 ← Hero image
        └── tutorial_step_*.png      ← Tutorial step screenshots
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 |
| Routing | React Router DOM v7 |
| Build Tool | Vite 8 |
| Styling | Custom CSS (Variables, Keyframe Animations, Flexbox/Grid) |
| PDF Generation | jsPDF |
| Architecture | SPA (Single Page Application) |

---

## Authors

* **Arias Tenjo Camilo Andres**

*Web Application Development*
