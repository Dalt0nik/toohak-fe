# Empty initial Front End Repository

Build tool: [Vite](https://vite.dev/)

## Prerequisites
- Latest LTS version of Node.js. [Link](https://nodejs.org/en/download)
    - Recommendation - use [node version manager](https://github.com/coreybutler/nvm-windows).

## Setup
- Install dependencies: `npm install`
- Start local dev server: `npm run dev`

## `.env` Configuration

Create a `.env.local` file in the root of the project with the following variables:
```sh
VITE_AUTH0_DOMAIN=your-auth0-domain (e.g. your-app.eu.auth0.com)
VITE_AUTH0_AUDIENCE=your-auth0-audience (e.g. https://your-api)
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_API_BASE_URL="http://localhost:8080/api"
```

All secret keys are in team's Discord server, `#secrets` channel

