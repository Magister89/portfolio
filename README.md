<div align="center">

# giorgio.cembran

[![Deploy to GitHub Pages](https://github.com/Magister89/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Magister89/portfolio/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, responsive personal portfolio showcasing professional experience, certifications, and activities.

[**View Live Site**](https://giorgiocembran.io/)

</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **Dark/Light Mode** | Theme preference with localStorage persistence and OS preference detection |
| **Internationalization** | Full i18n support for English and Italian with localStorage persistence |
| **Responsive Design** | Optimized for desktop, tablet, and mobile |
| **Accessibility** | Skip-to-content, focus management, ARIA attributes, keyboard navigation, dynamic aria-labels |
| **Performance** | Lazy loading with IntersectionObserver, code splitting, AbortController for fetch cleanup |
| **Blog** | Markdown-based blog with sidebar navigation, XSS-safe link rendering, focus management |
| **Certifications** | Native card-based display with data from GitHub Gist, links to Credly verification |
| **Activities** | Dynamic content (readings, courses, hobbies) fetched from GitHub Gist |
| **Error Handling** | Error boundary for graceful error recovery |
| **Security** | URL allowlist for markdown links, proper fetch abort handling |

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3
- **Components:** shadcn/ui (Radix UI primitives)
- **Routing:** React Router DOM 7
- **Icons:** Lucide React, Material Symbols
- **Markdown:** react-markdown
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Magister89/portfolio.git
cd portfolio

# Install dependencies
bun install  # or npm install

# Start development server (requires Node.js 20.19+)
bun run dev  # or npm run dev

# Build for production
bun run build  # or npm run build
```

## Project Structure

```
portfolio/
├── public/              # Static assets, favicon, 404.html for SPA routing
├── src/
│   ├── components/      # React components
│   │   └── ui/          # shadcn/ui components (Button, Card, Dialog, etc.)
│   ├── content/posts/   # Markdown blog posts
│   ├── context/         # React context providers (Theme, Language)
│   ├── hooks/           # Custom hooks (useCookiePolicy, useDocumentTitle)
│   ├── lib/             # Utilities (cn helper for class merging)
│   └── pages/           # Route page components
├── index.html
├── tailwind.config.js
└── vite.config.js
```

## Architecture Highlights

### Data Fetching
- **GitHub Gist Integration:** Activities and Certifications data fetched from GitHub Gist for easy updates without code changes
- **AbortController:** All fetch requests properly cancelled on component unmount to prevent memory leaks
- **Lazy Loading:** Sections load data only when entering viewport using IntersectionObserver

### Security
- **XSS Protection:** Markdown links use URL allowlist (https, http, mailto, relative paths only)
- **Safe External Links:** All external links use `rel="noopener noreferrer"`

### Accessibility
- **Focus Management:** Programmatic focus on route changes for screen reader users
- **Dynamic Labels:** Theme toggle announces current state ("Switch to light/dark mode")
- **Skip Links:** Keyboard users can skip navigation to main content

## Deployment

This project uses **GitHub Actions** for CI/CD. Any push to `main` triggers an automatic build and deployment to GitHub Pages.

The site uses a custom 404.html redirect to support SPA client-side routing on GitHub Pages.

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with React by [Giorgio Cembran](https://github.com/Magister89)**

</div>
