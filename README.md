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
| **Accessibility** | Skip-to-content, focus traps, ARIA attributes, keyboard navigation |
| **Performance** | Lazy loading, code splitting, memoized components |
| **Blog** | Markdown-based blog with sidebar navigation and dynamic page titles |
| **Error Handling** | Error boundary for graceful error recovery |

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Components:** Base UI
- **Icons:** React Icons
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Magister89/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server (requires Node.js 20.19+)
npm run dev

# Build for production
npm run build
```

## Project Structure

```
portfolio/
├── public/              # Static assets and 404.html for SPA routing
├── src/
│   ├── components/      # React components
│   ├── content/posts/   # Markdown blog posts
│   ├── context/         # React context providers (Theme, Language)
│   ├── hooks/           # Custom hooks (useCookiePolicy, useDocumentTitle)
│   └── pages/           # Route page components
├── index.html
└── vite.config.js
```

## Deployment

This project uses **GitHub Actions** for CI/CD. Any push to `main` triggers an automatic build and deployment to GitHub Pages.

The site uses a custom 404.html redirect to support SPA client-side routing on GitHub Pages.

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with React by [Giorgio Cembran](https://github.com/Magister89)**

</div>
