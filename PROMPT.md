# SwitchVibes AI Developer Context (PROMPT.md)

This document serves as the high-context base prompt for any AI-assisted development on the SwitchVibes project. It outlines the architecture, coding standards, design patterns, and conventions that MUST be followed when making any modifications to the codebase.

---

## 🚀 Project Overview & Vision

SwitchVibes is a high-performance, premium web utility for seamless music playlist migration between music streaming platforms.

- **Goal**: Dead-simple, one-click migration without account access (link-based).
- **Aesthetic**: Premium, glassmorphic UI with vibrant gradients and smooth animations.
- **Priority**: Performance (LCP/TBT), offline capability, and accessibility.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (React 19 + Vite)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) (File-based in `src/routes`)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) & [Axios](https://axios-http.com)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & [shadcn/ui](https://ui.shadcn.com)
- **Animation**: [Motion](https://motion.dev) & [Lottie React](https://github.com/Gamote/lottie-react)
- **Validation**: [Zod](https://zod.dev)
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- **Tooling**: [Biome](https://biomejs.dev) (Linting/Formatting), [Husky](https://typicode.github.io/husky/)
  > Refer to [package.json](package.json) for full package details (versions and all).

---

## 📂 Codebase Structure & Layering

### Project Tree

- `src/assets/`: Static SVGs, logos, illustrations and lottie files.
- `src/components/`:
  - `ui/`: Atom-level Shadcn/UI primitives.
  - `layout/`: Shared layout components (VibeSection).
  - `hocs/`: Higher order components.
  - `migration/`: Specialized components for the migration process.
  - `*.tsx`: Domain-specific sections (HeroSection, AboutSection, etc.).
- `src/hooks/`: Custom React hooks. Each mutation/service function should have its own hook.
- `src/lib/`: Core logic:
  - `axios.ts`: Configured Axios instance with base URL.
  - `constants.ts`: Platform metadata and URL patterns.
  - `schema.ts`: Shared Zod schemas.
  - `utils.ts`: Low-level helpers (platform detection, cn, logger).
- `src/services/`: Direct API interaction layer for REST services.
- `src/types/`: TypeScript definitions focusing on `client.ts` (UI state) and `server.ts` (API/Socket responses).
- `src/routes/`: TanStack Router file-based route definitions.
- `src/styles.css`: Global Tailwind v4 imports and custom theme variables.

---

## 📏 Coding Standards & Conventions

### Typing System

- **Strict Typing Only**: The use of `any` is strictly prohibited.
- **Fallback**: If a type is unknown or complex beyond current context, use `unknown`.
- **Validation**: Always use Zod schemas from `#/lib/schema` for form validation and API response parsing where possible.

### File Naming

- **Files/Folders**: `kebab-case` (e.g., `migration-dialog.tsx`, `use-migration.ts`).
- **Components**: `PascalCase` (e.g., `HeroSection`, `Button`).

### Patterns

- **Hooks & Mutations**: Every REST mutation must have its own custom hook (e.g., `use-migrate-spotify-to-yt.ts`).
- **Orchestration**: The `useMigration` hook is the main orchestrator between WebSocket updates and REST fallbacks.
- **Service Layer**: Keep `src/services` pure; handle state and toasts in the hooks.

---

## 🎨 UI & Design System Patterns

- **UI Consistency**: All UI changes must follow the established "Vibe" aesthetic.
- **Themes**: Dark-first components using OKLCH colors and glassmorphic overlays (`bg-white/10 backdrop-blur-md`).
- **Typography**: Inter (Sans) and Bricolage Grotesque (Heading).
- **Animations**: Use `motion/react` for entry/exit animations. Do not replace with standard CSS transitions unless performance-critical.

---

## ⚡ Performance & Optimization

- **Asset Optimization**:
  - Hero images must use **WebP** with **eager** loading and **high** fetchpriority.
  - Heavy SVG illustrations must use **lazy** loading and **async** decoding.
- **Bundle Management**:
  - Conditionally import and render DevTools using `import.meta.env.DEV`.
  - Lazy load heavy components (Modals, specialized sections) using `lazy()`.
- **Optimization Mindset**: Always implement changes in the most performant and highly optimized way possible.

---

## 🔗 Related Documentation

For more context on how to commit code, set up the environment, or run build scripts, refer to:

- [README.md](README.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
