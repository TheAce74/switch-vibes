# Contributing to SwitchVibes

First off, thank you for considering contributing to SwitchVibes! We welcome contributions to make seamless music playlist migration even better for everyone.

> **Note:** This repository houses the frontend web client. If you are looking to contribute to the backend API services for SwitchVibes, please visit the [Backend Repository](https://github.com/Onyenso/Switch-Vibes).

## Local Development Setup

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheAce74/switch-vibes.git
   cd switch-vibes
   ```

2. **Install dependencies**
   We use `pnpm` as our package manager. If you don't have it installed, you can get it via `npm install -g pnpm`.
   ```bash
   pnpm install
   ```

3. **Environment Variables**
   Copy the example environment file to create your local `.env` file:
   ```bash
   cp .example.env .env
   ```

4. **Run the development server**
   ```bash
   pnpm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Code Quality & Tooling

We enforce strict formatting and linting rules using **Biome**. The repository is also protected by **Husky** Git hooks to ensure quality code.

- **Format your code**:
  ```bash
  pnpm format
  ```
- **Lint your code**:
  ```bash
  pnpm lint
  ```
- **Run the full check (Format, Lint, Optimize Imports)**:
  ```bash
  pnpm check
  ```
- **Typecheck the codebase**:
  ```bash
  pnpm typecheck
  ```

*Note: Husky will automatically run `pnpm check` and `pnpm typecheck` before any commit is finalized, and `pnpm build` before any push!*

## Pull Request Process
1. Check out a new branch from `main`.
2. Ensure that your code passes all type checks and linting rules (`pnpm check` && `pnpm typecheck`).
3. Submit a Pull Request with a clear description of your changes.
4. Wait for a code review! 

Thank you for contributing to SwitchVibes!
