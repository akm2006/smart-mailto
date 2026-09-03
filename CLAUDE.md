# CLAUDE.md — Claude Code Project Guidelines

See [`AGENTS.md`](./AGENTS.md) for the complete comprehensive specification.

## Quick Commands
- **Test**: `pnpm test` (Runs Vitest on `packages/smart-mailto/tests/`)
- **Typecheck**: `pnpm -r typecheck` (Runs `tsc --noEmit` across all packages)
- **Build**: `pnpm -r build` (Builds monorepo with `tsup` and `vite`)
- **Dev Server**: `pnpm --filter web dev` (Starts web app on `http://localhost:5173/`)

## Key Invariants
- **Package Manager**: Always use `pnpm`.
- **Zero Runtime Dependencies**: `packages/smart-mailto` has 0 dependencies. Keep it that way.
- **SSR Safe**: Guard all browser access with `typeof window !== 'undefined'`.
- **Icons**: Use `lucide-react` for UI components. No generic emojis or inline custom SVG paths.
- **Git Push Constraint**: Never push to public GitHub or remote remotes without explicit user permission. All commits must remain local.
