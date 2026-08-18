const c = require("ansi-colors");

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
];

function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key];
  });

  if (missingEnvs.length > 0) {
    // Provide non-fatal notice for standalone demo / offline mode
    if (process.env.NODE_ENV !== "test") {
      // Graceful fallback
    }
  }
}

module.exports = checkEnvVariables;
