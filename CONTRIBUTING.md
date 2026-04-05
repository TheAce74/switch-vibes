# Contributing to SwitchVibes

First off, thank you for considering contributing to SwitchVibes! We welcome contributions to make seamless music playlist migration even better for everyone.

> **Note:** This repository houses the frontend web client. If you are looking to contribute to the backend API services for SwitchVibes, please visit the [Backend Repository](https://github.com/Onyenso/Switch-Vibes).

---

## 🚀 Standard Contribution Flow

If you don't have push access to this repository, you must contribute via a **Fork + Pull Request** workflow.

### 1. Fork the Repository

Go to the project on GitHub and click the **Fork** button. This creates a copy of the repository under your own GitHub account.

### 2. Clone Your Fork Locally

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git clone https://github.com/YOUR_USERNAME/switch-vibes.git
cd switch-vibes
```

### 3. Add the Original Repo as "upstream"

This allows you to keep your local copy in sync with the main project:

```bash
git remote add upstream https://github.com/TheAce74/switch-vibes.git
```

### 4. Create a New Branch

Never work directly on `main`. Create a branch for your changes using our [naming conventions](#branch-naming-conventions):

```bash
git checkout -b feature/my-new-improvement
```

### 5. Make Your Changes & Commit

After making your changes, stage them and commit using our [commit message conventions](#commit-message-conventions):

```bash
git add .
git commit -m "feature(app): add new cool feature"
```

### 6. Push to Your Fork

```bash
git push origin feature/my-new-improvement
```

### 7. Open a Pull Request (PR)

Go to your fork on GitHub. You should see a "Compare & pull request" button. Click it to describe your changes and submit the PR to the original repository.

---

## 🧠 Contribution Conventions

Following these conventions helps maintainers review and merge your code faster.

### Branch Naming Conventions

Branches should follow the pattern: `type/branch-name`

- **feature/**: For new features or improvements.
- **fix/**: For bug fixes.
- **chore/**: For maintenance tasks.
- **style/**: For UI/CSS adjustments.
- **docs/**: For documentation updates.

### Commit Message Conventions

Commit messages should follow the pattern: `type(domain): message`

- **Type**: `feature`, `fix`, `chore`, `style`, `docs`.
- **Domain**: The aspect of the project modified (e.g., `app`, `migration`, `landing`, `ui`).
- **Example**: `feature(migration): implement Apple Music detection`

---

## 🛠️ Local Development Setup

1. **Install dependencies**
   We use `pnpm` as our package manager. If you don't have it installed, you can get it via `npm install -g pnpm`.

   ```bash
   pnpm install
   ```

2. **Environment Variables**
   Copy the example environment file to create your local `.env` file:

   ```bash
   cp .example.env .env
   ```

3. **Run the development server**
   ```bash
   pnpm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## ✨ Code Quality & Tooling

We enforce strict formatting and linting rules using **Biome**. The repository is also protected by **Husky** Git hooks.

- **Format your code**: `pnpm format`
- **Lint your code**: `pnpm lint`
- **Run the full check**: `pnpm check`
- **Typecheck the codebase**: `pnpm typecheck`

> **TIP:**
> Husky will automatically run `pnpm check` and `pnpm typecheck` before any commit is finalized, and `pnpm build` before any push!

---

## 🔍 Pro Tips

- **Keep Your Fork Updated**: Before starting new work, sync your main branch:
  ```bash
  git fetch upstream
  git checkout main
  git merge upstream/main
  ```
- **Make Small PRs**: Focus on one issue or feature per PR to make review easier.
- **Open an Issue First**: For significant changes, it's best to open an issue to discuss the approach before coding.

Thank you for contributing to SwitchVibes!
