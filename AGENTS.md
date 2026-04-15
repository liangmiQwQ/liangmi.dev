# liangmi.dev Development Guide for AI Agents

## Project Setup

`pnpm` is the package manager. We use `eslint` and `@antfu/eslint-config` to lint and format code. No tests for now.

Run `pnpm run lint:fix` and `pnpm run typecheck` after modifying code. And fix the errors if possible before telling me you've finished the task.

This project use UnoCSS for styling. We use `wind4` present and enabled `presetAttributify` and `transformerVariantGroup`. Load UnoCSS skills if you want to modify styles to use the preset and transformer correctly and as much as possible.

Use `presetAttributify` on elements but not components.

Keep AGENTS.md updated with the project codebase. Consider if there is need to modify AGENTS.md after your changes. Don't write something weird like project structure or project status in AGENTS.md.

Write simple code and make function reusable if possible. Use Unix philosophy to design your code (Every function should only do one thing and should not be too long or complex.).

## UI Guidelines

- **Icons**: Use Phosphor icons via UnoCSS (e.g., `i-ph-chat`, `i-ph-gear`). Available icons: https://icones.js.org/collection/ph
- **Responsive**: Design for both mobile and desktop simultaneously using responsive breakpoints
- **No emojis**: Use icons instead of emojis throughout the UI
- **Color system (Stone + Amber)**: Use `stone` as the base neutral palette for backgrounds, borders, and text — it reads warmer than zinc. Use `amber` sparingly for accents (icon backgrounds, hover states, key highlights). Prefer `bg-stone-*`, `text-stone-*`, `border-stone-*` with dark variants (e.g. `bg-stone-50 text-stone-950 dark:bg-stone-950 dark:text-stone-50`). Do not introduce unrelated color families.
- **Flat style**: Prefer flat UI with borders only (no heavy gradients/shadows/background animations unless explicitly requested).
- **Bold and Unique UI**: If you are requested to modify like a index page UI, Don't be afraid to make bold and unique design choices. This is a personal website, so we can be creative and experimental. But when you are edting pages like blog reading page, make sure it's simple and readable.
