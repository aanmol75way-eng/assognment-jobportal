# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Hire Hub

    Hire Hub is a lightweight job board frontend built with React, TypeScript and Vite. It demonstrates a small recruitment workflow with job listings, application forms, mocked APIs, and a clean component-driven UI.

    Key technologies
    - React + TypeScript
    - Vite
    - Tailwind CSS
    - Redux Toolkit + React Query
    - MSW (Mock Service Worker) for local API mocking

    Getting started

    Prerequisites
    - Node.js 18+ (or compatible)
    - npm, yarn or pnpm

    Install

    ```bash
    npm install
    ```

    Available scripts
    - `npm run dev` — Run the app in development mode (Vite + HMR)
    - `npm run build` — Build the production bundle (`tsc -b && vite build`)
    - `npm run preview` — Preview the production build locally
    - `npm run lint` — Run ESLint

    Mocked API (MSW)

    This project includes MSW handlers under `src/mocks` and the worker file at `public/mockServiceWorker.js`. In development the mock server is enabled so the app runs without a real backend.

    Project structure (high level)
    - `src/` — application source
      - `components/` — UI components and pages
      - `mocks/` — MSW handlers and mock data
      - `shared/` — API clients
      - `store/` — Redux store and thunks

    Notes
    - The project uses Vite; the `dev` script starts a fast local server.
    - If you need to connect to a real API, disable MSW initialization in `src/main.tsx` or remove the mock handlers.

    Contributing
    - Feel free to open issues or PRs. Keep changes focused and add tests for new behavior.

    License
    - Open for the repo owner to decide.

    File: [README.md](README.md#L1)
