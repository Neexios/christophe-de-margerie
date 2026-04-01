# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive scrollytelling website presenting an Intelligence Economique (IE) investigation into the death of Christophe de Margerie (CEO of Total), who died on October 20, 2014 at Vnukovo airport in Moscow. Built as a companion to a university presentation.

**Live site:** https://neexios.github.io/christophe-de-margerie/

## Architecture

Single-file HTML application (`index.html`, ~3900 lines) containing all CSS, HTML, and JavaScript inline. No build system, no bundler, no framework.

### External Dependencies (CDN)
- **Three.js r128** — 3D globe with strategic points, flight path animation
- **GSAP 3.12.5 + ScrollTrigger** — All scroll-based animations, transitions, counters
- **Google Fonts** — Special Elite (typewriter), Inter, Playfair Display, Source Code Pro

### Structure within index.html

```
<style>      — All CSS (~1500 lines)
<body>       — HTML content:
  #loading-screen    — "Accès aux fichiers classifiés" loading
  #intro             — Landing with photo, title, "Ouvrir le dossier" button
  #dossier-overlay   — Folder-opening animation
  #newspaper-layer   — Flying newspaper transition
  #tv-static-overlay — Breaking news TV transition (scene 3)
  #surveillance-overlay — CCTV transition (scene 3)
  #flash-photo-overlay  — Paparazzi flash transition (scene 4)
  #rec-tape-overlay     — Recording tape transition (scene 5)
  #scene-1 to #scene-7  — 7 content scenes
  #scene-end           — Final quote + "Dossier clos"
  #progress-bar        — Bottom navigation dots
  #spotlight-overlay   — Flashlight effect (toggle)
  #presentation-bar    — Presentation mode HUD
<script>     — All JavaScript (~1800 lines)
```

### Scene Map
| Scene | data-scene | Topic |
|-------|-----------|-------|
| 1 | "1" | "Big Moustache" — Who was CDM |
| 2 | "2" | Geopolitical tensions — sanctions, petrodollar |
| 3 | "3" | The accident — October 20, 2014 |
| 4 | "4" | Cui Bono — who benefits matrix |
| 5 | "5" | Information warfare — competing narratives |
| 6 | "6" | IE lessons — Key Person Risk |
| 7 | "7" | Conclusion — systemic revelations |

### Key JavaScript Systems
- **3D Globe** (`init3D()`, `animate3D()`) — Three.js globe with labeled strategic points (Paris, Moscow, Vnukovo, Yamal, Brussels, Washington), arcs, and animated flight path
- **Scroll Animations** (`initScrollAnims()`) — Each scene has a unique entry transition (typewriter, iron curtain, flash explosion, page turn, etc.)
- **Inter-scene Transitions** — Surveillance cam, paparazzi flash, recording tape overlays triggered via ScrollTrigger
- **Counter Animation** (`animCounter()`) — Animated number counters on `.data-value[data-target]` elements
- **Presentation Mode** — Toggled with P key, fullscreen + auto-scroll 12s/scene
- **Keyboard Navigation** — Arrow keys, Page Up/Down, keys 1-7
- **Parallax** — Vanilla JS RAF-based parallax on titles/tags/data grids
- **Sound** — Web Audio API procedural sounds (typewriter, wind, TV static), off by default
- **Spotlight** — Mouse-following flashlight overlay, toggled via button
- **Red Strings** — Dynamic SVG connections between scenes with pins, drawn on scroll

### CSS Conventions
- CSS variables defined in `:root` — `--bg`, `--paper`, `--gold`, `--red`, `--red-light`, `--typewriter`, etc.
- Typewriter font: `var(--typewriter)` = 'Special Elite'
- Theme: dark investigation/reportage with red accents and gold highlights

## Development

```bash
# Open in browser (no build needed)
start index.html

# Deploy: push to master, GitHub Pages auto-deploys
git push origin master
```

The site is hosted via GitHub Pages from the `master` branch root.

## Content Source

Content is based on the team's IE research document (Google Docs). The document analyzes the geopolitical context of CDM's death through an Intelligence Economique lens — sanctions, petrodollar threat, cui bono matrix, information warfare.
