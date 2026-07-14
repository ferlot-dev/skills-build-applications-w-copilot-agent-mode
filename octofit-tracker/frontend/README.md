# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit multi-tier application.

## Environment configuration

Define Vite environment variables in a local file such as .env.local:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs with:

https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

Safe fallback is implemented when VITE_CODESPACE_NAME is unset:

http://localhost:8000/api/[component]/

This prevents invalid URLs such as https://undefined-8000.app.github.dev.

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
