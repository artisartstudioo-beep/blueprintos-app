# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Development

Start both the frontend and backend together with:

```bash
npm run dev
```

If the backend fails to start with an `EADDRINUSE` error on port `5000`, a previous Node process may still be holding that port. Stop the stale process, then rerun `npm run dev`.

Currently, the frontend defaults to `http://localhost:5174` and the backend listens on `http://localhost:5000`.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
