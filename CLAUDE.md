# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based travel website focused on Khon Kaen tourism in Thailand. The site showcases travel routes and local attractions, with Thai language content and tourism-focused features.

## Development Commands

- **Install dependencies**: `npm install`
- **Development server**: `npm run dev` or `npm start`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Format code**: Use Prettier (configured with prettier-plugin-astro)

## Architecture

### Framework Stack
- **Astro 3.x** - Static site generator with component islands
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety (configured in tsconfig.json)
- **Sass** - CSS preprocessing for custom styles

### Project Structure
```
src/
├── assets/         # Static images and media files
├── components/     # Reusable Astro components (Nav, Header, Footer, etc.)
├── icons/          # Icon assets
├── layouts/        # Layout components (Layout.astro, Page.astro)
├── pages/          # File-based routing (index.astro, about.astro, etc.)
├── scripts/        # Client-side JavaScript
└── styles/         # Global SCSS stylesheets
```

### Key Components
- **Layout.astro**: Main layout with Thai language support, includes Header/Footer
- **Header.astro/Footer.astro**: Site navigation and footer components
- **Navigation components**: NavMode.astro, NavSize.astro for different nav states

### Styling
- **Global styles**: Located in `src/styles/global.scss`
- **Tailwind configuration**: Standard setup in `tailwind.config.mjs`
- **Custom fonts**: Google Fonts (Caveat, IBM Plex Sans Thai, Rajdhani)
- **SCSS support**: Available for component-level styling

### Content Management
- **Static assets**: Images stored in `src/assets/`
- **Pages**: File-based routing in `src/pages/`
- **Responsive images**: Uses picture elements with different sources for mobile/desktop

## Site Configuration

- **Site URL**: https://promptpage.org/
- **Language**: Thai (lang="th")
- **Integrations**: robots.txt, sitemap, Tailwind CSS
- **SEO**: Configured with meta descriptions and sitemap generation