# Contributing to `smart-mailto`

Thank you for your interest in contributing to `smart-mailto`! We welcome bug fixes, documentation improvements, provider updates, and feature suggestions.

## Development Setup

This repository is organized as a `pnpm` monorepo:

* `packages/smart-mailto`: The core library, React hooks, and UI components.
* `apps/web`: The interactive documentation and playground web app.

### Prerequisites
* Node.js >= 18
* `pnpm` >= 9 (`corepack enable pnpm` or `npm i -g pnpm`)

### Installation
```bash
git clone https://github.com/akm2006/smart-mailto.git
cd smart-mailto
pnpm install
```

### Running the Playground
```bash
pnpm dev
```
Starts the interactive playground app at `http://localhost:5173`.

### Running Tests
```bash
pnpm test
```
Runs the full Vitest suite covering device detection, URL generation, popup handling, and React hook state.

### Building
```bash
pnpm build
```
Builds both the library bundle (via `tsup`) and the demo application.

## Submitting a Pull Request
1. Fork the repo and create your branch from `main`.
2. Ensure your changes pass typecheck (`pnpm typecheck`) and tests (`pnpm test`).
3. If adding a new provider or feature, include corresponding unit tests in `packages/smart-mailto/tests/`.
4. Open a Pull Request with a clear description of the problem and proposed solution.
