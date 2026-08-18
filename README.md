# 🌾 BioTill Agri - Direct Farmer E-Commerce Platform

> **BIOTILL AGRI PRIVATE LIMITED**  
> High-potency biological inputs, bio-fungicides, and microbial consortia directly delivered to farmers across Karnataka.

---

## 🚀 Quick Start Options

You can run this project locally using either **Docker (Recommended - 1 Command)** or **Local Node.js**.

---

## Method 1: Run with Docker Compose (Fastest & Easiest)

### Prerequisites:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Steps:
1. **Clone the repository**:
   ```bash
   git clone <YOUR_REPO_URL>
   cd <REPO_FOLDER>
   ```

2. **Start all services (Postgres, Redis, Medusa Backend & Next.js Storefront)**:
   ```bash
   docker compose up --build
   ```

3. **Access the Applications**:
   * 🛒 **Storefront (Farmer Portal)**: [http://localhost:3000](http://localhost:3000)
   * ⚙️ **Medusa Admin Dashboard**: [http://localhost:9000/app](http://localhost:9000/app)
   * 📡 **Medusa Backend API**: [http://localhost:9000](http://localhost:9000)

4. **Stop the containers**:
   ```bash
   docker compose down
   ```

---

## Method 2: Run Locally with Node.js & npm / pnpm

### Prerequisites:
* **Node.js**: `v20+` or `v22+`
* **PostgreSQL**: `v15+` running locally on port `5432`
* **Redis** (optional for local dev): port `6379`
* **npm** or **pnpm**

---

### Step 1: Install Dependencies
From the repository root:
```bash
npm install
# or if using pnpm:
pnpm install
```

---

### Step 2: Configure & Start Medusa Backend

1. **Set up backend environment variables**:
   ```bash
   cp apps/backend/.env.template apps/backend/.env
   ```

2. **Ensure your database URL is configured in `apps/backend/.env`**:
   ```env
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa-biotill
   JWT_SECRET=biotill_super_secure_jwt_secret_key_2026
   COOKIE_SECRET=biotill_super_secure_cookie_secret_key_2026
   STORE_CORS=http://localhost:3000,http://127.0.0.1:3000
   ADMIN_CORS=http://localhost:9000,http://localhost:7001
   AUTH_CORS=http://localhost:3000,http://localhost:9000
   ```

3. **Run database migrations & create admin user**:
   ```bash
   cd apps/backend
   npx medusa db:migrate
   npx medusa user -e admin@biotill.in -p supersecret
   ```

4. **Seed initial 10 BioTill Bio-Products catalog & Karnataka region**:
   ```bash
   npm run seed
   # or from root: npm run backend:seed
   ```

5. **Start Medusa backend dev server**:
   ```bash
   npm run dev
   ```
   *Medusa runs on `http://localhost:9000` (Admin at `http://localhost:9000/app`).*

---

### Step 3: Configure & Start Next.js Storefront

1. Open a new terminal tab:
   ```bash
   cd apps/storefront
   ```

2. **Create local environment file**:
   ```bash
   cp .env.template .env.local
   ```

3. **Verify `apps/storefront/.env.local`**:
   ```env
   PORT=3000
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   MEDUSA_BACKEND_URL=http://localhost:9000
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key
   NEXT_PUBLIC_DEFAULT_REGION=in
   ```

4. **Start the Storefront**:
   ```bash
   npm run dev
   ```
   *The Farmer Storefront is live at [http://localhost:3000](http://localhost:3000).*

---

### Starting Both Apps Simultaneously (Turbo)
From the root directory:
```bash
npm run dev
```

---

## 🧪 Running Automated Test Suites

The codebase includes end-to-end tests for product pricing, payment gateway integrations (PhonePe / Paytm), Karnataka address validation, and complete purchasing journeys.

To run all unit & workflow tests:
```bash
cd apps/backend
npm run test:unit
```

### Key Test Suites Included:
| Test File | Description |
|-----------|-------------|
| `buying-and-delivery-status.unit.spec.ts` | Order lifecycle from payment captured, warehouse dispatch, tracking to farm delivery |
| `address-check-validation.unit.spec.ts` | 6-digit Karnataka PIN codes, 10-digit Indian mobile number validation, farm landmarks |
| `payment-validation.unit.spec.ts` | PhonePe UPI Intent QR payloads (`pa=biotillagri@ybl`), Paytm wallet sessions, rupee-to-paise integrity |
| `complete-end-to-end.unit.spec.ts` | Farmer registration (No OTP) $\to$ Login $\to$ Cart $\to$ Free delivery threshold ₹999 $\to$ UPI payment $\to$ Delivered |
| `biotill-workflow.unit.spec.ts` | Complete 10 bio-products catalog validation (₹150 powders & ₹350 liquids) |

---

## 🛒 BioTill Agri Product Catalog & Pricing

### 6 Powder Products (₹150 / 1 Kg Pack):
1. **Trichoderma Viride Bio-Fungicide** (`₹150`) - 1 Kg Pack
2. **Pseudomonas Fluorescens Bio-Bactericide** (`₹150`) - 1 Kg Pack
3. **Metarhizium Anisopliae Bio-Insecticide** (`₹150`) - 1 Kg Pack
4. **VAM Mycorrhiza Bio-Fertilizer** (`₹150`) - 1 Kg Pack
5. **Paecilomyces Lilacinus Bio-Nematicide** (`₹150`) - 1 Kg Pack
6. **Compost Culture Bio-Decomposer** (`₹150`) - 1 Kg Pack

### 4 Liquid Products (₹350 / 1 Litre Bottle):
7. **Trichoderma Liquid Concentrate** (`₹350`) - 1 Litre Bottle
8. **Pseudomonas Fluorescens Liquid** (`₹350`) - 1 Litre Bottle
9. **Metarhizium Liquid Concentrate** (`₹350`) - 1 Litre Bottle
10. **Bio NPK Liquid Consortium** (`₹350`) - 1 Litre Bottle

---

## 🛠️ Project Structure

```text
.
├── apps/
│   ├── backend/                  # Medusa v2 eCommerce Backend (@dtc/backend)
│   │   ├── src/
│   │   │   ├── __tests__/        # Unit & E2E Test Suites
│   │   │   ├── api/              # Custom API endpoints (Farmer auth, PhonePe/Paytm Webhooks)
│   │   │   └── modules/          # Payment providers & custom modules
│   │   └── Dockerfile
│   └── storefront/               # Next.js 15 Farmer Web Storefront (@dtc/storefront)
│       ├── src/
│       │   ├── app/              # App router pages (Home, Products, Cart, Checkout, Account)
│       │   └── modules/          # Farmer search, Kannada localization, UPI QR modal
│       └── Dockerfile
├── docker-compose.yml            # Multi-container orchestration (DB, Redis, API, Web)
├── package.json                  # Turborepo root workspace
└── README.md
```

---

## 📞 Support & Farmer Helpline
* **Support Phone**: `+91 94800 00000` (Mon - Sat: 8:00 AM - 8:00 PM)
* **Company**: BIOTILL AGRI PRIVATE LIMITED
