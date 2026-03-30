# BTL_LT_WEB

## Production Deploy

1. Create your production env file from the sample:

```powershell
Copy-Item .env.prod.example .env.prod
```

2. Edit `.env.prod` and replace at least:
- `SERVER_NAME`
- `SPRING_DATASOURCE_*`
- `MOVIEAPP_JWT_SECRET`
- `CLOUDINARY_*`
- `MOVIEAPP_FRONTEND_URL`
- `NEXT_PUBLIC_MEDIA_BASE_URL`

3. Start the production stack:

```powershell
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

4. Check the containers:

```powershell
docker compose --env-file .env.prod -f docker-compose.prod.yml ps
docker compose --env-file .env.prod -f docker-compose.prod.yml logs -f
```

Notes:
- Production compose only exposes Nginx on port `80`; backend and frontend stay internal.
- If you terminate TLS on the host or another reverse proxy, keep `HTTP_PORT` internal and point your proxy to this stack.
- Image upload is handled by Cloudinary, so production no longer needs a local uploads volume.

### Frontend Local Dev

Use a local env file inside `frontend` for VS Code development:

```powershell
Copy-Item frontend\.env.local.example frontend\.env.local
```

You can then point:
- `NEXT_PUBLIC_BACKEND_URL` to your local backend
- `NEXT_PUBLIC_MEDIA_BASE_URL` to a public media host or another dev media URL
