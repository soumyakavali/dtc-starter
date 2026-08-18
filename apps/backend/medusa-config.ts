import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    databaseDriverOptions: process.env.DATABASE_URL?.includes("sslmode=require")
      ? { connection: { ssl: { rejectUnauthorized: false } } }
      : {},
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*",
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET || "supersecretjwt",
      cookieSecret: process.env.COOKIE_SECRET || "supersecretcookie",
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/phonepe-payment",
            id: "phonepe",
            options: {
              merchantId: process.env.PHONEPE_MERCHANT_ID || "PHONEPE_DEMO_MID",
              saltKey: process.env.PHONEPE_SALT_KEY || "dummy_salt",
              saltIndex: 1,
              env: "UAT",
            },
          },
          {
            resolve: "./src/modules/paytm-payment",
            id: "paytm",
            options: {
              mid: process.env.PAYTM_MID || "PAYTM_DEMO_MID",
              mkey: process.env.PAYTM_MERCHANT_KEY || "dummy_mkey",
              website: "WEBSTAGING",
              env: "STAGE",
            },
          },
        ],
      },
    },
  ],
})
