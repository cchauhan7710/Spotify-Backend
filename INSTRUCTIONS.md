# Instructions for sportify(Backend)

This file explains how to set up, run, and deploy the `sportify(Backend)` project locally and in a container.

## Prerequisites
- Node.js 18+ installed
- npm (comes with Node)
- MongoDB (local or remote connection URI)
- (Optional) Docker if running in a container

## Install
1. Clone the repo (if needed) and change into the project folder:

```bash
git clone https://github.com/cchauhan7710/Spotify-Backend.git
cd Spotify-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with these minimum variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/sportify
# Add storage or cloud credentials if required by src/services/storage.service.js
```

## Run locally

Start the server:

```bash
npm start
# or
node server.js
```

During development, consider installing `nodemon` and running:

```bash
npx nodemon server.js
```

## Docker

Example `Dockerfile` (place in project root):

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t sportify-backend .
docker run -e MONGO_URI="your-mongo-uri" -p 3000:3000 sportify-backend
```

## Heroku / Procfile

If deploying to Heroku, add a `Procfile` with:

```
web: node server.js
```

Set config vars on the Heroku dashboard (`PORT` is provided by Heroku). Provide `MONGO_URI` as a config var.

## Notes
- Check `src/routes` and `src/controllers` for available endpoints and expected request bodies.
- Keep sensitive credentials out of the repo — use environment variables or secrets management.

If you want, I can add a `Dockerfile`, `Procfile`, and a GitHub Actions workflow next. Tell me which to add.
