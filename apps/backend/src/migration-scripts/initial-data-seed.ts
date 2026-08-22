import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductOptionsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function seedBioTillData({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  )
  const salesChannelModuleService = container.resolve(
    ModuleRegistrationName.SALES_CHANNEL
  )
  const storeModuleService = container.resolve(ModuleRegistrationName.STORE)

  logger.info("Seeding BIOTILL AGRI PRIVATE LIMITED catalog...")

  const [store] = await storeModuleService.listStores()
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  })

  if (!defaultSalesChannel.length) {
    const { result: newSalesChannel } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    })
    defaultSalesChannel = newSalesChannel
  }

  await createStoresWorkflow(container).run({
    input: {
      id: store.id,
      name: "BIOTILL AGRI PRIVATE LIMITED",
      supported_currencies: [
        {
          currency_code: "inr",
          is_default: true,
        },
      ],
      default_sales_channel_id: defaultSalesChannel[0].id,
    },
  })

  // 1. Create Indian Agricultural Region
  logger.info("Configuring India (Karnataka) Region...")
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "India (Karnataka & National Delivery)",
          currency_code: "inr",
          countries: ["in"],
          payment_providers: ["pp_system_default", "pp_phonepe"],
        },
      ],
    },
  })
  const region = regionResult[0]

  await createTaxRegionsWorkflow(container).run({
    input: [
      {
        country_code: "in",
        rate: 0, // Agricultural bio-inputs often exempt / 0% GST
        name: "GST (Exempt/0% for Agricultural Bio-inputs)",
      },
    ],
  })

  // 2. Shipping Profiles and Stock Location
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "BioTill Agri Central Warehouse (Karnataka)",
          address: {
            city: "Bangalore",
            country_code: "in",
            address_1: "BioTill Agri Hub, Karnataka",
          },
        },
      ],
    },
  })
  const stockLocation = stockLocationResult[0]

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      sales_channel_ids: [defaultSalesChannel[0].id],
    },
  })

  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  })
  const defaultShippingProfile = shippingProfiles[0]

  const fulfillmentSet =
    await fulfillmentModuleService.createFulfillmentSets({
      name: "BioTill Express Farm Delivery",
      type: "shipping",
      service_zones: [
        {
          name: "Pan India Direct Farm Delivery",
          geo_zones: [
            {
              country_code: "in",
              type: "country",
            },
          ],
        },
      ],
    })

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  })

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Direct Farm Delivery (3-5 Days)",
        price_type: "flat",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: defaultShippingProfile.id,
        provider_id: "manual_manual",
        type: {
          label: "Farm Express",
          description: "Delivered directly to farm / village address",
          code: "farm-express",
        },
        prices: [
          {
            currency_code: "inr",
            amount: 50,
          },
          {
            region_id: region.id,
            amount: 50,
          },
        ],
        rules: [],
      },
      {
        name: "Free Shipping on Orders above ₹999",
        price_type: "flat",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: defaultShippingProfile.id,
        provider_id: "manual_manual",
        type: {
          label: "Free Delivery",
          description: "Free delivery for bulk farmer orders",
          code: "free-farm-delivery",
        },
        prices: [
          {
            currency_code: "inr",
            amount: 0,
          },
          {
            region_id: region.id,
            amount: 0,
          },
        ],
        rules: [],
      },
    ],
  })

  // 3. Create Collections & Categories
  logger.info("Creating Product Collections and Categories...")
  const { result: collectionsResult } = await createCollectionsWorkflow(
    container
  ).run({
    input: {
      collections: [
        {
          title: "ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (Powder Bio-Inputs @ ₹150)",
          handle: "powder-products",
        },
        {
          title: "ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (Liquid Bio-Inputs @ ₹350)",
          handle: "liquid-products",
        },
      ],
    },
  })
  const powderCollection = collectionsResult.find((c) => c.handle === "powder-products")!
  const liquidCollection = collectionsResult.find((c) => c.handle === "liquid-products")!

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "ಪೌಡರ್ ಜೈವಿಕ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು (Powder Formulations)",
          handle: "powder-products",
          description: "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ, ಕೀಟನಾಶಕ ಮತ್ತು ಗೊಬ್ಬರ ಪೌಡರ್ ಪ್ಯಾಕ್‌ಗಳು - ₹150/- (1 ಕೆಜಿ)",
        },
        {
          name: "ಲಿಕ್ವಿಡ್ ಜೈವಿಕ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು (Liquid Formulations)",
          handle: "liquid-products",
          description: "ಹನಿ ನೀರಾವರಿ (ಡ್ರಿಪ್) ಹಾಗೂ ಸಿಂಪರಣೆಗೆ ಸಾಂದ್ರೀಕೃತ ಜೈವಿಕ ಲಿಕ್ವಿಡ್ - ₹350/- (1 ಲೀಟರ್)",
        },
      ],
    },
  })

  // 4. Create the 10 BioTill Agricultural Products
  logger.info("Seeding 10 BioTill Bio-Agricultural Products with matching images...")
  const { result: products } = await createProductsWorkflow(container).run({
    input: {
      products: [
        // ==================== POWDER PRODUCTS (@ ₹150) ====================
        {
          title: "ಟ್ರೈಕೋಡರ್ಮಾ ಪೌಡರ್ (Trichoderma Viride Bio-Fungicide)",
          subtitle: "ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ • ಬೇರು ಕೊಳೆತ ಮತ್ತು ಸೊರಗು ರೋಗ ತಡೆಗಟ್ಟಲು • 1 ಕೆಜಿ",
          description:
            "ಟ್ರೈಕೋಡರ್ಮಾ (Trichoderma viride 2×10⁶ CFU/g) ನೈಸರ್ಗಿಕ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕವಾಗಿದ್ದು, ಬೆಳೆಗಳಲ್ಲಿ ಬರುವ ಬೇರು ಕೊಳೆತ, ಕಾಂಡ ಕೊಳೆತ, ಸೊರಗು ರೋಗ (Wilt), ಮತ್ತು ತೇವ ಸಸಿ ಕೊಳೆತ ರೋಗಗಳನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತದೆ.",
          handle: "trichoderma-powder",
          collection_id: powderCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)", values: ["1 Kg Pack (1 ಕೆಜಿ)"] }],
          variants: [
            {
              title: "1 Kg Pack (1 ಕೆಜಿ)",
              sku: "BT-TRI-PWD-1KG",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 150 },
                { region_id: region.id, amount: 150 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)": "1 Kg Pack (1 ಕೆಜಿ)" },
            },
          ],
        },
        {
          title: "ಸುಡೋಮೊನಾಸ್ ಪೌಡರ್ (Pseudomonas Fluorescens Bio-Bactericide)",
          subtitle: "ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ • ಎಲೆ ಚುಕ್ಕೆ ಮತ್ತು ಕರಕಲು ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ • 1 ಕೆಜಿ",
          description:
            "ಸುಡೋಮೊನಾಸ್ ಫ್ಲೋರೊಸೆನ್ಸ್ (Pseudomonas fluorescens 1×10⁸ CFU/g) ಪ್ರಬಲ ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ ಮತ್ತು ಸಸ್ಯ ಬೆಳವಣಿಗೆ ಪ್ರವರ್ಧಕ (PGPR). ಇದು ಎಲೆ ಚುಕ್ಕೆ ರೋಗ, ದುಂಡಾಣು ಕರಕಲು ಮತ್ತು ಬೂದಿ ರೋಗಗಳಿಂದ ಬೆಳೆಯನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.",
          handle: "pseudomonas-powder",
          collection_id: powderCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)", values: ["1 Kg Pack (1 ಕೆಜಿ)"] }],
          variants: [
            {
              title: "1 Kg Pack (1 ಕೆಜಿ)",
              sku: "BT-PSE-PWD-1KG",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 150 },
                { region_id: region.id, amount: 150 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)": "1 Kg Pack (1 ಕೆಜಿ)" },
            },
          ],
        },
        {
          title: "ಮೆಟಾರೈಸಿಯಂ ಪೌಡರ್ (Metarhizium Anisopliae Bio-Insecticide)",
          subtitle: "ಜೈವಿಕ ಕೀಟನಾಶಕ • ಗೊಣ್ಣೆ ಹುಳು, ಗೆದ್ದಲು ಮತ್ತು ಬೇರು ಕೀಟಗಳ ನಾಶಕ್ಕೆ • 1 ಕೆಜಿ",
          description:
            "ಮೆಟಾರೈಸಿಯಂ ಅನಿಸೊಪ್ಲಿಯೆ (Metarhizium anisopliae 1×10⁸ CFU/g) ನೈಸರ್ಗಿಕ ಜೈವಿಕ ಕೀಟನಾಶಕವಾಗಿದ್ದು, ಮಣ್ಣಿನಲ್ಲಿರುವ ಹಾನಿಕಾರಕ ಗೊಣ್ಣೆ ಹುಳು (White Grub), ಗೆದ್ದಲು (Termites), ಕಂಬಳಿ ಹುಳು ಹಾಗೂ ಕಡ್ಡಿ ಹುಳುಗಳನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ನಾಶಪಡಿಸುತ್ತದೆ.",
          handle: "metarhizium-powder",
          collection_id: powderCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)", values: ["1 Kg Pack (1 ಕೆಜಿ)"] }],
          variants: [
            {
              title: "1 Kg Pack (1 ಕೆಜಿ)",
              sku: "BT-MET-PWD-1KG",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 150 },
                { region_id: region.id, amount: 150 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)": "1 Kg Pack (1 ಕೆಜಿ)" },
            },
          ],
        },
        {
          title: "ವ್ಯಾಮ್ ಮೈಕೋರೈಜಾ ಪೌಡರ್ (VAM Mycorrhiza Bio-Fertilizer)",
          subtitle: "ಜೈವಿಕ ರಂಜಕ ಗೊಬ್ಬರ • ಬೇರಿನ ತ್ವರಿತ ವೃದ್ಧಿ ಮತ್ತು ಪೋಷಕಾಂಶ ಹೀರಿಕೆಗೆ • 1 ಕೆಜಿ",
          description:
            "ವ್ಯಾಮ್ (Vesicular Arbuscular Mycorrhiza) ಬೇರುಗಳೊಂದಿಗೆ ಒಡನಾಟ ಬೆಳೆಸಿ ಮಣ್ಣಿನಲ್ಲಿರುವ ಸ್ಥಿರ ರಂಜಕ (Phosphorus), ಸತು ಹಾಗೂ ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳನ್ನು ಗಿಡಗಳಿಗೆ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುತ್ತದೆ.",
          handle: "vam-powder",
          collection_id: powderCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)", values: ["1 Kg Pack (1 ಕೆಜಿ)"] }],
          variants: [
            {
              title: "1 Kg Pack (1 ಕೆಜಿ)",
              sku: "BT-VAM-PWD-1KG",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 150 },
                { region_id: region.id, amount: 150 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)": "1 Kg Pack (1 ಕೆಜಿ)" },
            },
          ],
        },
        {
          title: "ಪೆಸಿಲೋಮೈಸಿಸ್ ಪೌಡರ್ (Paecilomyces Lilacinus Bio-Nematicide)",
          subtitle: "ಜೈವಿಕ ನೆಮಟೋಡ್ ನಿಯಂತ್ರಕ • ಬೇರು ಗಂಟು ಜಂತುಹುಳು ನಾಶಕ್ಕೆ • 1 ಕೆಜಿ",
          description:
            "ಪೆಸಿಲೋಮೈಸಿಸ್ ಲಿಲಾಸಿನಸ್ (Paecilomyces lilacinus 1×10⁸ CFU/g) ಮಣ್ಣಿನಲ್ಲಿರುವ ಅಪಾಯಕಾರಿ ಬೇರು ಗಂಟು ಜಂತುಹುಳು (Root-knot Nematodes) ಹಾಗೂ ಅವುಗಳ ಮೊಟ್ಟೆಗಳನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ನಾಶಮಾಡುತ್ತದೆ.",
          handle: "paecilomyces-powder",
          collection_id: powderCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)", values: ["1 Kg Pack (1 ಕೆಜಿ)"] }],
          variants: [
            {
              title: "1 Kg Pack (1 ಕೆಜಿ)",
              sku: "BT-PAE-PWD-1KG",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 150 },
                { region_id: region.id, amount: 150 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)": "1 Kg Pack (1 ಕೆಜಿ)" },
            },
          ],
        },
        {
          title: "ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್ ಪೌಡರ್ (Compost Culture Bio-Decomposer)",
          subtitle: "ಜೈವಿಕ ಡಿಕಂಪೋಸರ್ • ಕೃಷಿ ತ್ಯಾಜ್ಯದಿಂದ ತ್ವರಿತ ಸಾವಯವ ಗೊಬ್ಬರ ತಯಾರಿಕೆಗೆ • 1 ಕೆಜಿ",
          description:
            "ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್ ಕೃಷಿ ತ್ಯಾಜ್ಯ, ಸಗಣಿ, ಒಣ ಎಲೆಗಳು ಮತ್ತು ತ್ಯಾಜ್ಯಗಳನ್ನು ಅತ್ಯಂತ ವೇಗವಾಗಿ ಕಳಿಸಿ ಅತ್ಯುನ್ನತ ಗುಣಮಟ್ಟದ ಫಲವತ್ತಾದ ಸಾವಯವ ಕಾಂಪೋಸ್ಟ್ ಗೊಬ್ಬರವನ್ನಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ.",
          handle: "compost-culture-powder",
          collection_id: powderCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)", values: ["1 Kg Pack (1 ಕೆಜಿ)"] }],
          variants: [
            {
              title: "1 Kg Pack (1 ಕೆಜಿ)",
              sku: "BT-CMP-PWD-1KG",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 150 },
                { region_id: region.id, amount: 150 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)": "1 Kg Pack (1 ಕೆಜಿ)" },
            },
          ],
        },

        // ==================== LIQUID PRODUCTS (@ ₹350) ====================
        {
          title: "ಟ್ರೈಕೋಡರ್ಮಾ ಲಿಕ್ವಿಡ್ (Trichoderma Liquid Concentrate)",
          subtitle: "ಸಾಂದ್ರೀಕೃತ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ • ಡ್ರಿಪ್ ಹಾಗೂ ಸಿಂಪಡಣೆಗೆ • 1 ಲೀಟರ್",
          description:
            "ಸಾಂದ್ರೀಕೃತ ದ್ರವ ರೂಪದ ಟ್ರೈಕೋಡರ್ಮಾ (Trichoderma Liquid). ಹನಿ ನೀರಾವರಿ (Drip irrigation) ಮೂಲಕ ಮಣ್ಣಿಗೆ ನೀಡಲು ಹಾಗೂ ಎಲೆಗಳ ಮೇಲಿನ ಸಿಂಪರಣೆಗೆ ಅತ್ಯಂತ ಸುಲಭ.",
          handle: "trichoderma-liquid",
          collection_id: liquidCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)", values: ["1 Litre Bottle (1 ಲೀಟರ್)"] }],
          variants: [
            {
              title: "1 Litre Bottle (1 ಲೀಟರ್)",
              sku: "BT-TRI-LIQ-1L",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 350 },
                { region_id: region.id, amount: 350 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)": "1 Litre Bottle (1 ಲೀಟರ್)" },
            },
          ],
        },
        {
          title: "ಸುಡೋಮೊನಾಸ್ ಲಿಕ್ವಿಡ್ (Pseudomonas Fluorescens Liquid)",
          subtitle: "ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ ದ್ರವ • ಡ್ರಿಪ್ ಹಾಗೂ ಎಲೆ ಸಿಂಪರಣೆಗೆ • 1 ಲೀಟರ್",
          description:
            "ಲಿಕ್ವಿಡ್ ರೂಪದ ಸುಡೋಮೊನಾಸ್ (Pseudomonas fluorescens Liquid) ಸಸ್ಯಗಳಲ್ಲಿನ ದುಂಡಾಣು ಕರಕಲು, ಸೊರಗು ರೋಗಗಳನ್ನು ನಿವಾರಿಸಿ ಸಸ್ಯದ ಸಮೃದ್ಧ ಬೆಳವಣಿಗೆಗೆ ನೆರವಾಗುತ್ತದೆ.",
          handle: "pseudomonas-liquid",
          collection_id: liquidCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)", values: ["1 Litre Bottle (1 ಲೀಟರ್)"] }],
          variants: [
            {
              title: "1 Litre Bottle (1 ಲೀಟರ್)",
              sku: "BT-PSE-LIQ-1L",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 350 },
                { region_id: region.id, amount: 350 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)": "1 Litre Bottle (1 ಲೀಟರ್)" },
            },
          ],
        },
        {
          title: "ಮೆಟಾರೈಸಿಯಂ ಲಿಕ್ವಿಡ್ (Metarhizium Liquid Concentrate)",
          subtitle: "ಜೈವಿಕ ಕೀಟನಾಶಕ ದ್ರವ • ಗೆದ್ದಲು, ಗೊಣ್ಣೆ ಹುಳು ಮತ್ತು ಕೀಟ ನಾಶಕ್ಕೆ • 1 ಲೀಟರ್",
          description:
            "ದ್ರವ ರೂಪದ ಮೆಟಾರೈಸಿಯಂ (Metarhizium Liquid) ಮಣ್ಣಿನಲ್ಲಿರುವ ಬೇರು ಕೀಟಗಳು, ಗೊಣ್ಣೆ ಹುಳು, ಗೆದ್ದಲುಗಳನ್ನು ಹನಿ ನೀರಾವರಿ ಮೂಲಕ ಸುಲಭವಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತದೆ.",
          handle: "metarhizium-liquid",
          collection_id: liquidCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)", values: ["1 Litre Bottle (1 ಲೀಟರ್)"] }],
          variants: [
            {
              title: "1 Litre Bottle (1 ಲೀಟರ್)",
              sku: "BT-MET-LIQ-1L",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 350 },
                { region_id: region.id, amount: 350 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)": "1 Litre Bottle (1 ಲೀಟರ್)" },
            },
          ],
        },
        {
          title: "ಬಯೋ ಎನ್ಪಿಕೆ ಕನ್ಸಾರ್ಸಿಯಂ ಲಿಕ್ವಿಡ್ (Bio NPK Liquid Consortium)",
          subtitle: "ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಶ್ ಒದಗಿಸುವ ಜೈವಿಕ ದ್ರವ ಗೊಬ್ಬರ • 1 ಲೀಟರ್",
          description:
            "ಬಯೋ ಎನ್ಪಿಕೆ ಕನ್ಸಾರ್ಸಿಯಂ (Bio NPK Liquid Consortium) ರೈಜೋಬಿಯಂ, ಅಜೋಟೋಬ್ಯಾಕ್ಟರ್, ಪಿ.ಎಸ್.ಬಿ (PSB) ಮತ್ತು ಕೆ.ಎಂ.ಬಿ (KMB) ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳ ಸಮೃದ್ಧ ಮಿಶ್ರಣವಾಗಿದೆ.",
          handle: "bio-npk-consortium-liquid",
          collection_id: liquidCollection.id,
          status: ProductStatus.PUBLISHED,
          thumbnail:
            "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
          images: [
            {
              url: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
          options: [{ title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)", values: ["1 Litre Bottle (1 ಲೀಟರ್)"] }],
          variants: [
            {
              title: "1 Litre Bottle (1 ಲೀಟರ್)",
              sku: "BT-NPK-LIQ-1L",
              manage_inventory: true,
              prices: [
                { currency_code: "inr", amount: 350 },
                { region_id: region.id, amount: 350 },
              ],
              options: { "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)": "1 Litre Bottle (1 ಲೀಟರ್)" },
            },
          ],
        },
      ],
    },
  })

  // 5. Initialize Inventory Levels
  logger.info("Setting product inventory levels...")
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })

  if (inventoryItems.length) {
    const inventoryLevels = inventoryItems.map((item: { id: string }) => ({
      location_id: stockLocation.id,
      stocked_quantity: 500,
      inventory_item_id: item.id,
    }))

    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: inventoryLevels,
      },
    })
  }

  // 6. Create Publishable API Key
  const { result: apiKeys } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "BioTill Agri Web Storefront",
          type: "publishable",
          created_by: "system_seed",
        },
      ],
    },
  })
  const publishableApiKey = apiKeys[0]

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      sales_channel_ids: [defaultSalesChannel[0].id],
    },
  })

  logger.info("BIOTILL AGRI PRIVATE LIMITED catalog seeded successfully!")
  logger.info(`Publishable API Key: ${publishableApiKey.token}`)
}
