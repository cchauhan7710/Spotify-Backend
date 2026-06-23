# sportify(Backend)

Simple Express backend for a music app (Spotify-like demo).

## Features
- User auth (register/login)
- Music and album models
- Storage service for uploads

## Requirements
- Node.js 18+ (or compatible)
- MongoDB (connection string in `.env`)

## Quickstart

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with at minimum:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/sportify
# Add any storage/AWS credentials if required by `storage.service`
```

3. Start the server

```bash
npm start
# or
node server.js
```

4. API
- Check `src/routes` for available endpoints (auth, music).

## Development
- Use `nodemon server.js` for auto-reload (install globally or as dev dep).

## License
MIT
