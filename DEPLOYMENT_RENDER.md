# 🚀 Deploying BioTill Monorepo to Render (Backend, Frontend & Database)

This repository is configured as a Turborepo monorepo with:
1. **Medusa v2 Backend** (`apps/backend`)
2. **Next.js 15 Storefront** (`apps/storefront`)
3. **PostgreSQL Database** (Render Managed PostgreSQL)

---

## 🌟 Option A: 1-Click Blueprint Deployment (Recommended)

Render supports Infrastructure as Code via the `render.yaml` file located in the root of this repository.

### Step 1: Push Code to GitHub / GitLab
Ensure this repository is pushed to your GitHub or GitLab account.

### Step 2: Create a Blueprint Instance on Render
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Blueprint**.
3. Select your repository (`biotill-monorepo`).
4. Render will parse `render.yaml` and provision:
   - **`biotill-postgres`**: PostgreSQL Database (Managed)
   - **`biotill-backend`**: Medusa v2 Node.js Web Service
   - **`biotill-storefront`**: Next.js 15 Web Service
5. Click **Apply**.

---

## 🛠️ Option B: Manual Service-by-Service Deployment

If you prefer to configure the services manually in the Render UI:

### 1. Create PostgreSQL Database
1. Go to **New +** → **PostgreSQL**.
2. **Name**: `biotill-postgres`
3. **Database**: `medusa_biotill`
4. **User**: `medusa_user`
5. **Region**: Choose the closest region (e.g. *Oregon* or *Singapore*).
6. **Plan**: *Starter* or *Free*.
7. Once created, copy the **Internal Database URL** (e.g., `postgres://medusa_user:password@dpg-...:5432/medusa_biotill`).

---

### 2. Create Medusa Backend Web Service
1. Go to **New +** → **Web Service**.
2. Connect your Git repository.
3. **Name**: `biotill-backend`
4. **Environment**: `Node`
5. **Root Directory**: (Leave blank or `.`)
6. **Build Command**:
   ```bash
   npm install && cd apps/backend && npx medusa db:migrate && npm run build
   ```
7. **Start Command**:
   ```bash
   cd apps/backend && npm run start
   ```
8. **Add Environment Variables**:
   | Key | Value | Notes |
   |---|---|---|
   | `NODE_ENV` | `production` | Production mode |
   | `DATABASE_URL` | `<Internal Database URL>` | From Step 1 |
   | `JWT_SECRET` | `<random_32_char_string>` | e.g. generate via `openssl rand -hex 32` |
   | `COOKIE_SECRET` | `<random_32_char_string>` | e.g. generate via `openssl rand -hex 32` |
   | `STORE_CORS` | `https://<your-storefront-url>.onrender.com,http://localhost:3000` | Storefront origin |
   | `ADMIN_CORS` | `https://<your-backend-url>.onrender.com,http://localhost:9000` | Medusa dashboard |
   | `AUTH_CORS` | `https://<your-backend-url>.onrender.com,https://<your-storefront-url>.onrender.com` | Auth origin |
   | `PHONEPE_MERCHANT_ID` | `PHONEPE_DEMO_MID` | PhonePe credentials |
   | `PHONEPE_SALT_KEY` | `dummy_salt` | PhonePe Salt Key |
   | `PAYTM_MID` | `PAYTM_DEMO_MID` | Paytm Merchant ID |
   | `PAYTM_MERCHANT_KEY` | `dummy_mkey` | Paytm Merchant Key |

---

### 3. Seed Initial Agricultural Catalog & Admin User (One-Time)
After the backend service is deployed:
1. Go to the **biotill-backend** service on Render.
2. Open the **Shell** tab.
3. Run the seed script:
   ```bash
   cd apps/backend && npx medusa exec ./src/migration-scripts/initial-data-seed.ts
   ```
4. Create an Admin user to access the Medusa Admin Dashboard:
   ```bash
   npx medusa user -e admin@biotill.agri -p Admin@BioTill2026
   ```
5. Copy the generated **Publishable API Key** from the seed output or Admin Dashboard (`/app`).

---

### 4. Create Next.js Storefront Web Service
1. Go to **New +** → **Web Service**.
2. Connect your Git repository.
3. **Name**: `biotill-storefront`
4. **Environment**: `Node`
5. **Root Directory**: (Leave blank or `.`)
6. **Build Command**:
   ```bash
   npm install && cd apps/storefront && npm run build
   ```
7. **Start Command**:
   ```bash
   cd apps/storefront && npm run start
   ```
8. **Add Environment Variables**:
   | Key | Value | Notes |
   |---|---|---|
   | `NODE_ENV` | `production` | Production mode |
   | `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `https://biotill-backend.onrender.com` | Live backend URL from Step 2 |
   | `NEXT_PUBLIC_BASE_URL` | `https://biotill-storefront.onrender.com` | Live storefront URL |
   | `NEXT_PUBLIC_DEFAULT_REGION` | `in` | Default India region |
   | `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | `pk_...` | From Step 3 seed command |

---

## 🔍 Verification Checklist

- [ ] Database is accessible and migrations applied (`npx medusa db:migrate`).
- [ ] Backend health check responds: `https://biotill-backend.onrender.com/health` returns `200 OK`.
- [ ] Medusa Admin dashboard is accessible: `https://biotill-backend.onrender.com/app`.
- [ ] Next.js Storefront displays all 10 certified bio products, category filters, and dosage calculator.
- [ ] Checkout flow calculates totals in INR (₹) with free delivery threshold (₹999+) and PhonePe / Paytm / UPI options.
