# 🐳 Docker Deployment Guide — BioTill Agri Storefront

Yes, you can easily deploy the **BioTill Next.js Storefront** using Docker! All Docker configurations, multi-stage build pipelines, and production optimizations have been verified and configured.

---

## 🛠️ Summary of Fixes & Enhancements Made

1. **Production Multi-Stage Dockerfile (`apps/storefront/Dockerfile`)**:
   - Upgraded to a 4-stage build: `base` $\to$ `deps` $\to$ `builder` $\to$ `runner`.
   - Uses lightweight **Node 20 Alpine** base image.
   - Adds non-root system user (`nextjs:nodejs`, UID 1001) for strict container security.
   - Supports build arguments (`ARG`) and runtime environment variables (`ENV`) for Medusa URL and publishable keys.

2. **Monorepo File Tracing (`apps/storefront/next.config.js`)**:
   - Added `outputFileTracingRoot: path.join(__dirname, "../../")` for Turborepo workspace dependency resolution.
   - Verified `next build` compiles all 18 static/dynamic routes cleanly with 0 errors.

3. **Added `.dockerignore` Files**:
   - Created root `/.dockerignore` and `/apps/storefront/.dockerignore` to prevent local `node_modules`, `.next`, and cache directories from bloating the build context or causing OS/arch mismatch errors.

4. **Standalone & Connected Dual-Mode**:
   - The Storefront Docker container runs **standalone** (with instant offline farmer catalog, ₹150/₹350 pricing, dosage calculator, and cart) OR seamlessly connected to a live Medusa v2 backend API.

---

## 🚀 Option 1: Deploy Only the Storefront Container (Standalone)

### Step 1: Build the Docker Image
Run from the root of the repository:

```bash
docker build -t biotill-storefront -f apps/storefront/Dockerfile .
```

*Optional — Pass custom build arguments:*
```bash
docker build \
  --build-arg NEXT_PUBLIC_BASE_URL=https://your-domain.com \
  --build-arg NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.your-domain.com \
  --build-arg NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_live_key \
  --build-arg NEXT_PUBLIC_DEFAULT_REGION=in \
  -t biotill-storefront \
  -f apps/storefront/Dockerfile .
```

### Step 2: Run the Container
```bash
docker run -d \
  --name biotill-storefront \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NEXT_PUBLIC_BASE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_DEFAULT_REGION=in \
  biotill-storefront
```

Open your browser at **`http://localhost:3000`** or your server's public IP.

---

## 🌐 Option 2: Deploy Full Stack with Docker Compose

To run the complete ecosystem together (**Storefront + Medusa v2 Backend + PostgreSQL 16 + Redis 7**):

```bash
# 1. Start all containers in the background
docker compose up -d --build

# 2. Check running status
docker compose ps

# 3. Seed initial products & Karnataka agricultural taxonomy
docker compose exec backend npm run seed
```

### Service Map:
| Service | Container Name | Port | Description |
|---|---|---|---|
| **Storefront** | `biotill-storefront` | `3000` | Next.js 15 eCommerce Front |
| **Backend** | `biotill-backend` | `9000` | Medusa v2 REST API & Admin (`/app`) |
| **Postgres** | `biotill-postgres` | `5432` | PostgreSQL 16 Database |
| **Redis** | `biotill-redis` | `6379` | Cache & Event Bus |

---

## ☁️ Option 3: Deploying to Cloud Platforms

### 1. Google Cloud Run / AWS App Runner / DigitalOcean App Platform
1. Push the built image to your registry (e.g. Docker Hub, AWS ECR, GCP Artifact Registry):
   ```bash
   docker tag biotill-storefront your-dockerhub-username/biotill-storefront:latest
   docker push your-dockerhub-username/biotill-storefront:latest
   ```
2. Deploy the container and expose Port **3000**.
3. Set environment variables:
   - `PORT=3000`
   - `NEXT_PUBLIC_BASE_URL=https://your-custom-domain.com`
   - `NEXT_PUBLIC_DEFAULT_REGION=in`
   - `NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-medusa-backend.com`
   - `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_live_xxxx`

### 2. VPS with Coolify / Portainer / Dokku
- Point the service to `apps/storefront/Dockerfile` with Docker context `.`.
- Configure Port mapping `3000:3000`.

---

## 🔍 Verification & Health Check

You can verify that the container is healthy by running:
```bash
# Check container logs
docker logs -f biotill-storefront

# Test health check endpoint
curl -I http://localhost:3000/in
```
