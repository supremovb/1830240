# 1,271 Days Together

A romantic monthsary website built as an interactive digital love letter.

This project celebrates a relationship that began on **December 3, 2022** and presents the story through a cinematic intro video, animated sections, a photo gallery, music controls, scrapbook layouts, 3D accents, and a premium love letter experience.

## Features

- Vite + React + Tailwind CSS static site
- Framer Motion animations and page reveals
- Responsive cinematic intro video using `public/video/vid.mp4`
- Romantic background music player for `public/music/ill-be.mp3`
- Fixed mini music player with play/pause, mute, volume, progress, and visual effects
- 51-image gallery support from `public/images/`
- Gallery categories, fullscreen viewing, swipe navigation, pinch zoom, and favorite animation
- Animated love letter envelope with preserved UTF-8 text formatting
- Timeline, stats, memory cards, scrapbook, film reel, love jar, and final promise scenes
- Lightweight 3D effects using Three.js, React Three Fiber, and Drei
- GitHub Pages deployment workflow included

## Project Structure

```text
public/
  favicon.svg
  images/
  music/
  video/
src/
  components/
  App.jsx
  index.css
  main.jsx
.github/workflows/pages.yml
index.html
package.json
vite.config.js
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

## Assets

Place photos in:

```text
public/images/
```

The app currently references images `1.jpg` through `51.jpg`, with support for the existing PNG files in the earlier set.

Place the intro video at:

```text
public/video/vid.mp4
```

Place the local background song at:

```text
public/music/ill-be.mp3
```

The site does not stream music from the internet.

## Build

For local production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages

This repository includes a GitHub Actions workflow:

```text
.github/workflows/pages.yml
```

On every push to `main`, GitHub Actions builds the site with:

```text
VITE_BASE_PATH=/1830240/
```

Expected live URL:

```text
https://supremovb.github.io/1830240/
```

If GitHub Pages is not enabled yet, open the repository settings and set:

- **Settings > Pages**
- Source: **GitHub Actions**

## Customization

- Update relationship copy in `src/components/`
- Update image list in `src/App.jsx`
- Update the love letter in `src/components/LoveLetter.jsx`
- Update the song filename in `src/App.jsx` if the music file name changes
- Update the deployment base path in `.github/workflows/pages.yml` if the repository name changes

## Notes

The site is fully static and can be hosted on GitHub Pages or any static hosting provider.
