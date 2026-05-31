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

## Deployment to Render

This app is a full-stack React + Node.js application. In production, the Express backend serves the built Vite frontend from `dist`, and all API routes remain under `/api`.

Render settings:

- Build Command: `npm run build`
- Start Command: `npm start`
- Environment Variables:
  - `PORT` (Render sets this automatically)
  - `NODE_ENV=production`
  - `JWT_SECRET` (set a strong secret)
  - `CLIENT_URL` (optional; only needed if CORS requests come from another domain)

To deploy on Render:

1. Connect the GitHub repository to Render.
2. Set the Service type to `Web Service`.
3. Use the Build Command above.
4. Use the Start Command above.
5. Add the required environment variables.

If you want a separate frontend and backend deployment, Render can also host them as two services, but the simplest option is a single full-stack app with backend serving `dist`.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
