# 🐳 Deploying Storefront to Render Using Docker (Fixed & Verified)

## 🔍 Cause of the Build Error in Your Log

In your Render build log:
```text
#11 ERROR: failed to calculate checksum of ref: "/turbo.json": not found
#12 ERROR: failed to calculate checksum of ref: "/apps/storefront": not found
Dockerfile:24
>>> COPY apps/storefront ./apps/storefront
```

**Why this happened:**
When configuring a Web Service on Render with **Root Directory** set to `apps/storefront` (or when Docker runs inside `apps/storefront`), the build context is already *inside* `apps/storefront`. The old Dockerfile was expecting monorepo root files (`turbo.json`, `apps/storefront`).

---

## 🛠️ Solution: Two Easy Ways to Deploy on Render

### ⭐ Method 1: Root Directory = `apps/storefront` (Cleanest & Recommended)

1. Go to **Render Dashboard** $\to$ **New +** $\to$ **Web Service**.
2. Connect your GitHub repository (`soumyakavali/dtc-starter`).
3. Set the following fields in the Render UI:

| Setting | Value | Notes |
|---|---|---|
| **Name** | `biotill-storefront` | Service name |
| **Language / Runtime** | **`Docker`** | ⚠️ Select **Docker** (not Node) |
| **Branch** | `main` | Production branch |
| **Root Directory** | **`apps/storefront`** | Points directly to the storefront folder |
| **Dockerfile Path** | `Dockerfile` (or `apps/storefront/Dockerfile`) | In `apps/storefront`, it's just `Dockerfile` |
| **Docker Context** | `.` | Current directory (`apps/storefront`) |
| **Instance Type** | **Free** or **Starter** | |

4. **Environment Variables**:
   - `PORT`: `3000`
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_BASE_URL`: `https://biotill-storefront.onrender.com` *(your Render URL)*
   - `NEXT_PUBLIC_DEFAULT_REGION`: `in`

5. Click **Create Web Service** (or **Manual Deploy** $\to$ **Deploy latest commit**).

---

### ⭐ Method 2: Root Directory = Empty / `.` (Monorepo Root)

If you prefer leaving **Root Directory** empty in Render:

| Setting | Value |
|---|---|
| **Root Directory** | *(Leave blank)* |
| **Dockerfile Path** | `Dockerfile` (or `apps/storefront/Dockerfile`) |
| **Docker Context** | `.` |
| **Environment Variables** | `PORT=3000`, `NODE_ENV=production`, `NEXT_PUBLIC_DEFAULT_REGION=in` |

Both methods are now supported and have their own dedicated multi-stage Dockerfiles.

---

## 🚀 Standalone Storefront Features Running in the Container

Even with **zero backend and no database**:
- 🌾 **Full BioTill Organic Catalog**: Trichoderma, Pseudomonas, Metarhizium, Verticillium, Paecilomyces, Azotobacter, Rhizobium, PSB, KMB, etc.
- 💰 **Fixed Farmer Pricing**: ₹150 for 1 Kg Powder / ₹350 for 1 L Liquid Concentrate.
- 🧮 **Interactive Crop Dosage Calculator**: Acreage-based dosage calculations for Arecanut, Sugarcane, Paddy, Banana, Cotton, and Vegetables.
- 🛒 **Cart & Session Engine**: Line-item management, quantity adjustment, and coupon code support (`FARMER10`).
- 🚚 **Village Delivery & Indian PIN Code Checkout**: Fast postal PIN validation with UPI (PhonePe, GPay, Paytm) and Cash on Delivery simulations.
- 🗣️ **Kannada & English Language Support**: Instant header toggle for Kannada agricultural translations.
