# liangmi.dev Development Guide for AI Agents

## Project Setup

`pnpm` is the package manager. We use `eslint` and `@antfu/eslint-config` to lint and format code. No tests for now.

Run `pnpm run lint:fix` and `pnpm run typecheck` after modifying code. And fix the errors if possible before telling me you've finished the task.

This project uses **Void** (`void@npm:@void-sdk/void`) as the framework, deployed to Cloudflare Workers via `void deploy`. Dev: `pnpm dev` (`void dev`). Build: `pnpm build` (`void build`).

Pages are in `pages/`, server data loaders in `.server.ts` sibling files. Middleware in `middleware/`. Shared code in `src/`.

No auto-imports — always import explicitly from Vue (`import { ref } from 'vue'`), VueUse, and `~/` alias (`src/`).

This project use UnoCSS for styling. We use `wind4` present and enabled `presetAttributify` and `transformerVariantGroup`. Load UnoCSS skills if you want to modify styles to use the preset and transformer correctly and as much as possible.

Use `presetAttributify` on elements but not components.

Keep AGENTS.md updated with the project codebase. Consider if there is need to modify AGENTS.md after your changes. Don't write something weird like project structure or project status in AGENTS.md.

Write simple code and make function reusable if possible. Use Unix philosophy to design your code (Every function should only do one thing and should not be too long or complex.).

## UI Guidelines

- **Icons**: Use Phosphor icons via UnoCSS (e.g., `i-ph-chat`, `i-ph-gear`). Available icons: https://icones.js.org/collection/ph
- **Responsive**: Design for both mobile and desktop simultaneously using responsive breakpoints
- **No emojis**: Use icons instead of emojis throughout the UI
