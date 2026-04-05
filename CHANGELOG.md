# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-04-05

### Added

- **PWA Support**: Converted the web app into a Progressive Web App (PWA) using `vite-plugin-pwa`, including offline support and a custom installation trigger.
- **Enhanced Animations**: Integrated rich entrance and scroll-based animations across the platform for a more dynamic user experience.
- **Performance Optimizations**: Optimized Largest Contentful Paint (LCP) and reduced main-thread block time by implementing WebP assets and lazy-loading heavy illustrations.

## [0.2.0] - 2026-04-04

### Added

- **Playlist Migration**: Integrated real-time playlist migration between YouTube Music and Spotify.
- **Dual-Path Architecture**: Implemented native WebSocket support with automatic HTTPS fallback via TanStack Query.
- **Real-time Feedback**: Added live progress tracking with track-by-track updates in the migration dialog.
- **Enhanced UI**: Refined migration dialog with glassmorphic design, Lottie animations, and vibrant gradients.
- **Filtering**: Added filtering capabilities (Found, Flagged, Missing) to the migration success view.

### Changed

- Refactored `useMigration` hook to use native browser WebSocket API.
- Modularized `MigrationDialog` into specialized sub-components for better maintainability.

## [0.1.0] - 2026-03-20

### Added

- Initial project structure with TanStack Start and React 19.
- Basic landing page and hero section.
- Platform detection logic for Spotify and YouTube Music URLs.
