import { HttpTypes } from "@medusajs/types"

export const DEFAULT_MOCK_REGION: HttpTypes.StoreRegion = {
  id: "reg_in",
  name: "India (Karnataka & National Delivery)",
  currency_code: "inr",
  countries: [
    {
      id: "c_in",
      iso_2: "in",
      iso_3: "ind",
      name: "India",
      num_code: "356",
      region_id: "reg_in",
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const MOCK_COLLECTIONS: HttpTypes.StoreCollection[] = [
  {
    id: "col_powder",
    title: "ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (Powder Bio-Inputs @ ₹150)",
    handle: "powder-products",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    products: [],
  },
  {
    id: "col_liquid",
    title: "ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (Liquid Bio-Inputs @ ₹350)",
    handle: "liquid-products",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    products: [],
  },
]

export const MOCK_CATEGORIES: (HttpTypes.StoreProductCategory & {
  category_children?: HttpTypes.StoreProductCategory[]
  products?: HttpTypes.StoreProduct[]
})[] = [
  {
    id: "cat_bio_fertilizers",
    name: "Bio-Fertilizers & VAM (ಜೈವಿಕ ಗೊಬ್ಬರ & ವ್ಯಾಮ್)",
    handle: "bio-fertilizers",
    description:
      "ರಂಜಕ, ಸಾರಜನಕ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ಒದಗಿಸುವ ಜೈವಿಕ ರಂಜಕ ಗೊಬ್ಬರ ಹಾಗೂ ಲಿಕ್ವಿಡ್ ಎನ್.ಪಿ.ಕೆ ಕನ್ಸಾರ್ಸಿಯಂ - ಬೇರು ವೃದ್ಧಿ ಹಾಗೂ ಅಧಿಕ ಇಳುವರಿಗೆ.",
    is_active: true,
    is_internal: false,
    rank: 0,
    parent_category: null,
    parent_category_id: null,
    category_children: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat_bio_pesticides",
    name: "Bio-Pesticides & Insecticides (ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು)",
    handle: "bio-pesticides",
    description:
      "ಮಣ್ಣಿನ ಗೊಣ್ಣೆ ಹುಳು, ಗೆದ್ದಲು, ಬೇರು ಹುಳು ಹಾಗೂ ಕೀಟಗಳನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ನಿಯಂತ್ರಿಸುವ ಗ್ರೀನ್ ಮಸ್ಕಾರ್ಡಿನ್ ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು.",
    is_active: true,
    is_internal: false,
    rank: 1,
    parent_category: null,
    parent_category_id: null,
    category_children: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat_bio_fungicides",
    name: "Bio-Fungicides & Bactericides (ಜೈವಿಕ ಶಿಲೀಂಧ್ರ & ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ)",
    handle: "bio-fungicides",
    description:
      "ಬೇರು ಕೊಳೆತ, ಕಾಂಡ ಕೊಳೆತ, ಸೊರಗು ರೋಗ (Wilt), ಎಲೆ ಚುಕ್ಕೆ ಮತ್ತು ದುಂಡಾಣು ರೋಗಗಳನ್ನು ತಡೆಯುವ ನೈಸರ್ಗಿಕ ಜೈವಿಕ ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳು.",
    is_active: true,
    is_internal: false,
    rank: 2,
    parent_category: null,
    parent_category_id: null,
    category_children: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat_bio_decomposers",
    name: "Bio-Decomposers & Nematicides (ಡಿಕಂಪೋಸರ್ & ನೆಮಟೋಡ್ ನಿಯಂತ್ರಕ)",
    handle: "bio-decomposers",
    description:
      "ಕೃಷಿ ತ್ಯಾಜ್ಯದಿಂದ 30 ದಿನಗಳಲ್ಲಿ ಉತ್ಕೃಷ್ಟ ಕಾಂಪೋಸ್ಟ್ ತಯಾರಿಸುವ ಡಿಕಂಪೋಸರ್ ಹಾಗೂ ಬೇರು ಗಂಟು ಜಂತುಹುಳು ನಾಶಕಗಳು.",
    is_active: true,
    is_internal: false,
    rank: 3,
    parent_category: null,
    parent_category_id: null,
    category_children: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat_powder",
    name: "ಪೌಡರ್ ಜೈವಿಕ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು (Powder Formulations @ ₹150)",
    handle: "powder-products",
    description:
      "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ, ಕೀಟನಾಶಕ ಮತ್ತು ಗೊಬ್ಬರ ಪೌಡರ್ ಪ್ಯಾಕ್‌ಗಳು - ₹150/- (1 ಕೆಜಿ)",
    is_active: true,
    is_internal: false,
    rank: 4,
    parent_category: null,
    parent_category_id: null,
    category_children: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat_liquid",
    name: "ಲಿಕ್ವಿಡ್ ಜೈವಿಕ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು (Liquid Formulations @ ₹350)",
    handle: "liquid-products",
    description:
      "ಹನಿ ನೀರಾವರಿ (ಡ್ರಿಪ್) ಹಾಗೂ ಸಿಂಪರಣೆಗೆ ಸಾಂದ್ರೀಕೃತ ಜೈವಿಕ ಲಿಕ್ವಿಡ್ - ₹350/- (1 ಲೀಟರ್)",
    is_active: true,
    is_internal: false,
    rank: 5,
    parent_category: null,
    parent_category_id: null,
    category_children: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const MOCK_PRODUCTS: (HttpTypes.StoreProduct & {
  metadata?: Record<string, string>
})[] = [
  // ==================== POWDER PRODUCTS (@ ₹150) ====================
  {
    id: "prod_trichoderma_powder",
    title: "ಟ್ರೈಕೋಡರ್ಮಾ ಪೌಡರ್ (Trichoderma Viride / Harzianum Bio-Fungicide)",
    subtitle: "ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ • ಬೇರು ಕೊಳೆತ, ಕಾಂಡ ಕೊಳೆತ ಮತ್ತು ಸೊರಗು ರೋಗ ತಡೆಗಟ್ಟಲು • 1 ಕೆಜಿ",
    description:
      "ಟ್ರೈಕೋಡರ್ಮಾ (Trichoderma viride 2×10⁶ CFU/g) ನೈಸರ್ಗಿಕ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕವಾಗಿದ್ದು, ಬೆಳೆಗಳಲ್ಲಿ ಬರುವ ಶಿಲೀಂಧ್ರ ರೋಗಗಳಾದ ಬೇರು ಕೊಳೆತ (Root Rot), ಕಾಂಡ ಕೊಳೆತ (Collar Rot), ಸೊರಗು ರೋಗ (Fusarium Wilt), ತೇವ ಸಸಿ ಕೊಳೆತ (Damping off) ಮತ್ತು ಕಪ್ಪುಕಲೆ ರೋಗಗಳನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಇದು ಸಸ್ಯದ ಬೇರುಗಳ ಸುತ್ತ ರಕ್ಷಣಾತ್ಮಕ ಕವಚ ನಿರ್ಮಿಸಿ ರೋಗಾಣುಗಳನ್ನು ನಾಶಪಡಿಸುತ್ತದೆ.",
    handle: "trichoderma-harzianum-powder",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_tri_pwd_1",
        url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80",
      },
      {
        id: "img_tri_pwd_2",
        url: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_powder",
    metadata: {
      scientific_name: "Trichoderma viride / harzianum (CFU 2 x 10^6 / gm)",
      category_kannada: "ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ (Bio-Fungicide)",
      pack_type: "1 Kg Sealed Moisture-Proof Agri Pouch",
      price_tag: "₹150/- (1 Kg Pack)",
      target_disease: "ಬೇರು ಕೊಳೆತ, ಸೊರಗು ರೋಗ, ಕಾಂಡ ಕೊಳೆತ, ಡ್ಯಾಂಪಿಂಗ್ ಆಫ್ (Root Rot, Wilt, Collar Rot)",
      dosage: "ಬೀಜೋಪಚಾರ: 10 ಗ್ರಾಂ/ಕೆಜಿ ಬೀಜ; ಮಣ್ಣು ಸಂಸ್ಕರಣೆ: 2-4 ಕೆಜಿ / ಎಕರೆಗೆ 200 ಕೆಜಿ ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ ಮಿಶ್ರಣ",
      suitable_crops: "ಅಡಿಕೆ, ಕಾಳುಮೆಣಸು, ಶುಂಠಿ, ಟೊಮ್ಯಾಟೊ, ಮೆಣಸಿನಕಾಯಿ, ಹತ್ತಿ, ದಾಳಿಂಬೆ, ಬಾಳೆ ಮತ್ತು ಎಲ್ಲಾ ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳು.",
      application_guide: "1. ಬೀಜೋಪಚಾರ: ಪ್ರತಿ ಕೆಜಿ ಬೀಜಕ್ಕೆ 10 ಗ್ರಾಂ ಬೆರೆಸಿ ಬಿತ್ತನೆ ಮಾಡಿ. 2. ಮಣ್ಣು ಚಿಕಿತ್ಸೆ: 2-4 ಕೆಜಿ ಟ್ರೈಕೋಡರ್ಮಾ ಪುಡಿಯನ್ನು 100-200 ಕೆಜಿ ಹಸುವಿನ ತಿಪ್ಪೆ ಗೊಬ್ಬರ ಅಥವಾ ಎರೆಹುಳು ಗೊಬ್ಬರದಲ್ಲಿ ಮಿಶ್ರಣ ಮಾಡಿ, ನೆರಳಿನಲ್ಲಿ 5-7 ದಿನ ತೇವಾಂಶವಿಟ್ಟು ನಂತರ ಗಿಡಗಳ ಬೇರುಗಳ ಹತ್ತಿರ ಹಾಕಿ.",
    },
    options: [
      {
        id: "opt_tri_pwd_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)",
        product_id: "prod_trichoderma_powder",
        values: [
          { id: "opt_val_tri_pwd_1kg", value: "1 Kg Pack (1 ಕೆಜಿ)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_tri_pwd_1kg",
        title: "1 Kg Pack (1 ಕೆಜಿ)",
        sku: "BT-TRI-PWD-1KG",
        barcode: "8908001",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 250,
        calculated_price: {
          id: "cp_tri_pwd_1",
          calculated_amount: 150,
          original_amount: 180,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_tri_p1", value: "1 Kg Pack (1 ಕೆಜಿ)", option_id: "opt_tri_pwd_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_pseudomonas_powder",
    title: "ಸುಡೋಮೊನಾಸ್ ಪೌಡರ್ (Pseudomonas Fluorescens Bio-Bactericide)",
    subtitle: "ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ • ಎಲೆ ಚುಕ್ಕೆ, ಕರಕಲು ಮತ್ತು ದುಂಡಾಣು ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ • 1 ಕೆಜಿ",
    description:
      "ಸುಡೋಮೊನಾಸ್ ಫ್ಲೋರೊಸೆನ್ಸ್ (Pseudomonas fluorescens 1×10⁸ CFU/g) ಪ್ರಬಲ ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ ಮತ್ತು ಸಸ್ಯ ಬೆಳವಣಿಗೆ ಪ್ರವರ್ಧಕ (PGPR). ಇದು ಎಲೆ ಚುಕ್ಕೆ ರೋಗ, ದುಂಡಾಣು ಕರಕಲು (Bacterial Blight), ಎಲೆ ಒಣಗು ರೋಗ ಮತ್ತು ಶಿಲೀಂಧ್ರ ರೋಗಗಳಿಂದ ಗಿಡವನ್ನು ರಕ್ಷಿಸಿ ನೈಸರ್ಗಿಕ ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    handle: "pseudomonas-fluorescens-powder",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_pse_pwd_1",
        url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_powder",
    metadata: {
      scientific_name: "Pseudomonas fluorescens (CFU 1 x 10^8 / gm)",
      category_kannada: "ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ (Bio-Bactericide & PGPR)",
      pack_type: "1 Kg Sealed Agri Pouch",
      price_tag: "₹150/- (1 Kg Pack)",
      target_disease: "ದುಂಡಾಣು ಕರಕಲು, ಎಲೆ ಚುಕ್ಕೆ ರೋಗ, ಕಪ್ಪು ಕೊಳೆತ, ಶೀತ ರೋಗ (Bacterial Blight, Leaf Spot)",
      dosage: "ಬೀಜೋಪಚಾರ: 10 ಗ್ರಾಂ/ಕೆಜಿ; ಎಲೆ ಸಿಂಪರಣೆ: 10 ಗ್ರಾಂ/ಲೀಟರ್ ನೀರು; ಮಣ್ಣಿಗೆ: 2-3 ಕೆಜಿ/ಎಕರೆ",
      suitable_crops: "ಭತ್ತ, ಅಡಿಕೆ, ತರಕಾರಿಗಳು (ಟೊಮ್ಯಾಟೊ, ಬದನೆ, ಕ್ಯಾಪ್ಸಿಕಂ), ದಾಳಿಂಬೆ, ಮಾವು, ಶುಂಠಿ, ಹೂವಿನ ಬೆಳೆಗಳು.",
      application_guide: "1. ಎಲೆ ಸಿಂಪಡಣೆ: ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 10 ಗ್ರಾಂ ಸುಡೋಮೊನಾಸ್ ಬೆರೆಸಿ ಸಂಜೆ ವೇಳೆ ಸಿಂಪಡಿಸಿ. 2. ಮಣ್ಣು ಸಂಸ್ಕರಣೆ: 2-3 ಕೆಜಿ ಪುಡಿಯನ್ನು 100 ಕೆಜಿ ಕಾಂಪೋಸ್ಟ್ ಜೊತೆ ಬೆರೆಸಿ ಗಿಡಗಳ ಸಾಲಿಗೆ ನೀಡಿ.",
    },
    options: [
      {
        id: "opt_pse_pwd_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)",
        product_id: "prod_pseudomonas_powder",
        values: [
          { id: "opt_val_pse_pwd_1kg", value: "1 Kg Pack (1 ಕೆಜಿ)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_pse_pwd_1kg",
        title: "1 Kg Pack (1 ಕೆಜಿ)",
        sku: "BT-PSE-PWD-1KG",
        barcode: "8908002",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 250,
        calculated_price: {
          id: "cp_pse_pwd_1",
          calculated_amount: 150,
          original_amount: 180,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_pse_p1", value: "1 Kg Pack (1 ಕೆಜಿ)", option_id: "opt_pse_pwd_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_metarhizium_powder",
    title: "ಮೆಟಾರೈಸಿಯಂ ಪೌಡರ್ (Metarhizium Anisopliae Bio-Insecticide)",
    subtitle: "ಜೈವಿಕ ಕೀಟನಾಶಕ • ಗೊಣ್ಣೆ ಹುಳು, ಗೆದ್ದಲು ಮತ್ತು ಬೇರು ಕೀಟಗಳ ನಾಶಕ್ಕೆ • 1 ಕೆಜಿ",
    description:
      "ಮೆಟಾರೈಸಿಯಂ ಅನಿಸೊಪ್ಲಿಯೆ (Metarhizium anisopliae 2 x 10^8 CFU/g / 1×10⁸ CFU/g) ಗ್ರೀನ್ ಮಸ್ಕಾರ್ಡಿನ್ ಜೈವಿಕ ಕೀಟನಾಶಕವಾಗಿದೆ. ಇದು ಮಣ್ಣಿನಲ್ಲಿ ಅಡಗಿರುವ ಅಪಾಯಕಾರಿ ಗೊಣ್ಣೆ ಹುಳುಗಳು (White Grubs), ಗೆದ್ದಲುಗಳು (Termites), ಕಂಬಳಿ ಹುಳು, ಬೇರು ಕೊರೆಯುವ ಹುಳು ಹಾಗೂ ದುಂಬಿಗಳನ್ನು ನೈಸರ್ಗಿಕವಾಗಿ ಸೋಂಕು ತಗುಲಿಸಿ ನಾಶಮಾಡುತ್ತದೆ.",
    handle: "metarhizium-anisopliae-powder",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_met_pwd_1",
        url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_powder",
    metadata: {
      scientific_name: "Metarhizium anisopliae (CFU 1 x 10^8 / gm)",
      category_kannada: "ಜೈವಿಕ ಕೀಟನಾಶಕ (Entomopathogenic Bio-Pesticide)",
      pack_type: "1 Kg High-Grade Pouch",
      price_tag: "₹150/- (1 Kg Pack)",
      target_disease: "ಗೊಣ್ಣೆ ಹುಳು, ಗೆದ್ದಲು, ಬೇರು ಹುಳು, ಸುಳಿ ಕೊರೆಯುವ ಕೀಟ (White Grubs, Termites, Root Borer)",
      dosage: "ಮಣ್ಣು ಬಳಕೆ: 3-5 ಕೆಜಿ / ಎಕರೆಗೆ; ಹನಿ ನೀರಾವರಿ ಅಥವಾ ತಿಪ್ಪೆ ಗೊಬ್ಬರದಲ್ಲಿ ಮಿಶ್ರಣ",
      suitable_crops: "ಕಬ್ಬು, ಅಡಿಕೆ, ತೆಂಗು, ಶೇಂಗಾ, ಶುಂಠಿ, ಮೆಕ್ಕೆಜೋಳ, ಏಲಕ್ಕಿ, ಹಣ್ಣಿನ ತೋಟಗಳು.",
      application_guide: "3-4 ಕೆಜಿ ಮೆಟಾರೈಸಿಯಂ ಪುಡಿಯನ್ನು 100 ಕೆಜಿ ಕಳಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು 20 ಕೆಜಿ ಬೇವು ಹಿಂಡಿಯೊಂದಿಗೆ ಬೆರೆಸಿ, ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶವಿರುವಾಗ ಸಾಲುಗಳಿಗೆ ಅಥವಾ ಗಿಡಗಳ ಬುಡಕ್ಕೆ ಹಾಕಿ ಮಣ್ಣು ಮುಚ್ಚಿ.",
    },
    options: [
      {
        id: "opt_met_pwd_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)",
        product_id: "prod_metarhizium_powder",
        values: [
          { id: "opt_val_met_pwd_1kg", value: "1 Kg Pack (1 ಕೆಜಿ)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_met_pwd_1kg",
        title: "1 Kg Pack (1 ಕೆಜಿ)",
        sku: "BT-MET-PWD-1KG",
        barcode: "8908003",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 200,
        calculated_price: {
          id: "cp_met_pwd_1",
          calculated_amount: 150,
          original_amount: 180,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_met_p1", value: "1 Kg Pack (1 ಕೆಜಿ)", option_id: "opt_met_pwd_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_vam_powder",
    title: "ವ್ಯಾಮ್ ಮೈಕೋರೈಜಾ ಪೌಡರ್ (VAM Mycorrhiza Bio-Fertilizer)",
    subtitle: "ಜೈವಿಕ ರಂಜಕ ಗೊಬ್ಬರ • ಬೇರಿನ ತ್ವರಿತ ವೃದ್ಧಿ, ರಂಜಕ ಹೀರಿಕೆ ಮತ್ತು ಬರ ನಿರೋಧಕತೆ • 1 ಕೆಜಿ",
    description:
      "ವ್ಯಾಮ್ (Vesicular Arbuscular Mycorrhiza - 100 IP/g) ಸಸ್ಯಗಳ ಬೇರುಗಳೊಂದಿಗೆ ಸಹಜೀವನ ನಡೆಸಿ ಬೇರಿನ ವ್ಯಾಪ್ತಿಯನ್ನು 300% ವರೆಗೆ ವಿಸ್ತರಿಸುತ್ತದೆ. ಮಣ್ಣಿನಲ್ಲಿ ಕರಗದ ರೂಪದಲ್ಲಿರುವ ರಂಜಕ (Phosphorus), ಸತು (Zinc), ಕಬ್ಬಿಣ ಮತ್ತು ನೀರಿನ ಹೀರಿಕೆಯನ್ನು ಅಗಾಧವಾಗಿ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    handle: "vam-bio-fertilizer-powder",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_vam_pwd_1",
        url: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_powder",
    metadata: {
      scientific_name: "Endomycorrhizal Glomus spp. (100 IP / gm)",
      category_kannada: "ಜೈವಿಕ ರಂಜಕ ಗೊಬ್ಬರ (Mycorrhizal Bio-Fertilizer)",
      pack_type: "1 Kg Bio Carrier Pack",
      price_tag: "₹150/- (1 Kg Pack)",
      target_disease: "ರಂಜಕದ ಕೊರತೆ, ದುರ್ಬಲ ಬೇರುಗಳು, ನೀರಿನ ಕೊರತೆ (Phosphorus Deficiency & Weak Rooting)",
      dosage: "ನಾಟಿ ಮಾಡುವಾಗ: 4-5 ಕೆಜಿ / ಎಕರೆಗೆ; ಮರಗಳಿಗೆ: 50-100 ಗ್ರಾಂ / ಮರಕ್ಕೆ",
      suitable_crops: "ಅಡಿಕೆ, ತೆಂಗು, ಕಾಫಿ, ರಬ್ಬರ್, ಬಾಳೆ, ತರಕಾರಿ ಸಸಿಗಳು, ಹಣ್ಣಿನ ಗಿಡಗಳು, ಹೂವುಗಳು.",
      application_guide: "ಸಸಿ ನಾಟಿ ಮಾಡುವಾಗ ಪ್ರತಿ ಗುಂಡಿಗೆ 10-20 ಗ್ರಾಂ ವ್ಯಾಮ್ ಪುಡಿ ಹಾಕಿ ನೆಡಿ ಅಥವಾ ಸಾಲುಗಳಲ್ಲಿ ಬಿತ್ತನೆ ಗೊಬ್ಬರದೊಂದಿಗೆ 4-5 ಕೆಜಿ / ಎಕರೆಗೆ ಬೆರೆಸಿ ಕೊಡಿ.",
    },
    options: [
      {
        id: "opt_vam_pwd_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)",
        product_id: "prod_vam_powder",
        values: [
          { id: "opt_val_vam_pwd_1kg", value: "1 Kg Pack (1 ಕೆಜಿ)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_vam_pwd_1kg",
        title: "1 Kg Pack (1 ಕೆಜಿ)",
        sku: "BT-VAM-PWD-1KG",
        barcode: "8908004",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 300,
        calculated_price: {
          id: "cp_vam_pwd_1",
          calculated_amount: 150,
          original_amount: 190,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_vam_p1", value: "1 Kg Pack (1 ಕೆಜಿ)", option_id: "opt_vam_pwd_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_paecilomyces_powder",
    title: "ಪೆಸಿಲೋಮೈಸಿಸ್ ಪೌಡರ್ (Paecilomyces Lilacinus Bio-Nematicide)",
    subtitle: "ಜೈವಿಕ ನೆಮಟೋಡ್ ನಿಯಂತ್ರಕ • ಬೇರು ಗಂಟು ಜಂತುಹುಳು ನಾಶಕ್ಕೆ • 1 ಕೆಜಿ",
    description:
      "ಪೆಸಿಲೋಮೈಸಿಸ್ ಲಿಲಾಸಿನಸ್ (Paecilomyces lilacinus 1×10⁸ CFU/g) ಜೈವಿಕ ಜಂತುಹುಳು ನಾಶಕವಾಗಿದೆ. ಇದು ಮಣ್ಣಿನಲ್ಲಿರುವ ಬೇರು ಗಂಟು ಜಂತುಹುಳುಗಳು (Root-knot Nematodes), ಅವುಗಳ ಮೊಟ್ಟೆಗಳು ಹಾಗೂ ಲಾರ್ವಾಗಳನ್ನು ತಿಂದು ನಾಶಪಡಿಸಿ, ಬೇರುಗಳಲ್ಲಿ ಗಂಟುಗಳು ಉಂಟಾಗುವುದನ್ನು ತಡೆಯುತ್ತದೆ.",
    handle: "paecilomyces-lilacinus-powder",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_pae_pwd_1",
        url: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_powder",
    metadata: {
      scientific_name: "Paecilomyces lilacinus (Purpureocillium) (CFU 1 x 10^8 / gm)",
      category_kannada: "ಜೈವಿಕ ನೆಮಟೋಡ್ ನಾಶಕ (Bio-Nematicide)",
      pack_type: "1 Kg Moisture-Barrier Pack",
      price_tag: "₹150/- (1 Kg Pack)",
      target_disease: "ಬೇರು ಗಂಟು ಜಂತುಹುಳು, ಸಿಸ್ಟ್ ನೆಮಟೋಡ್ (Root-knot & Cyst Nematodes)",
      dosage: "ಮಣ್ಣು ಸಂಸ್ಕರಣೆ: 2-3 ಕೆಜಿ / ಎಕರೆಗೆ; ಗಿಡದ ಬುಡಕ್ಕೆ: 25-50 ಗ್ರಾಂ",
      suitable_crops: "ದಾಳಿಂಬೆ, ಟೊಮ್ಯಾಟೊ, ಬದನೆ, ಬಾಳೆ, ಪಾಲಿಹೌಸ್ ತರಕಾರಿಗಳು, ಹೂವಿನ ತೋಟಗಳು.",
      application_guide: "2 ಕೆಜಿ ಪೆಸಿಲೋಮೈಸಿಸ್ ಪುಡಿಯನ್ನು 100 ಕೆಜಿ ಕಳಿತ ಗೊಬ್ಬರಕ್ಕೆ ಬೆರೆಸಿ 7 ದಿನ ನೆರಳಿನಲ್ಲಿಟ್ಟು ನಂತರ ಬಾಧಿತ ಬೆಳೆಗಳ ಬುಡಕ್ಕೆ ಹಾಕಿ ನೀರು ಕೊಡಿ.",
    },
    options: [
      {
        id: "opt_pae_pwd_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)",
        product_id: "prod_paecilomyces_powder",
        values: [
          { id: "opt_val_pae_pwd_1kg", value: "1 Kg Pack (1 ಕೆಜಿ)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_pae_pwd_1kg",
        title: "1 Kg Pack (1 ಕೆಜಿ)",
        sku: "BT-PAE-PWD-1KG",
        barcode: "8908005",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 180,
        calculated_price: {
          id: "cp_pae_pwd_1",
          calculated_amount: 150,
          original_amount: 180,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_pae_p1", value: "1 Kg Pack (1 ಕೆಜಿ)", option_id: "opt_pae_pwd_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_compost_culture_powder",
    title: "ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್ ಪೌಡರ್ (Compost Culture Bio-Decomposer)",
    subtitle: "ಜೈವಿಕ ಡಿಕಂಪೋಸರ್ • ಕೃಷಿ ತ್ಯಾಜ್ಯ, ಸಗಣಿ, ಎಲೆಗಳನ್ನು 30-40 ದಿನಗಳಲ್ಲಿ ಫಲವತ್ತಾದ ಸಾವಯವ ಗೊಬ್ಬರವಾಗಿಸಲು • 1 ಕೆಜಿ",
    description:
      "ಕಾಂಪೊಸ್ಟ್ ಕಲ್ಚರ್ ಕೃಷಿ ತ್ಯಾಜ್ಯ, ಒಣ ಎಲೆ, ಕಬ್ಬಿನ ರವದಿ, ತೆಂಗು-ಅಡಿಕೆ ಸಿಪ್ಪೆ, ಸಗಣಿ ಮತ್ತು ಹೊಲದ ಕಸವನ್ನು ದುರ್ವಾಸನೆ ರಹಿತವಾಗಿ ತ್ವರಿತವಾಗಿ ಕಳಿಸಿ ಉತ್ಕೃಷ್ಟ ಸಾವಯವ ಕಾಂಪೋಸ್ಟ್ ಆಗಿ ಪರಿವರ್ತಿಸುವ ಪ್ರಯೋಜನಕಾರಿ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಮತ್ತು ಎಂಜೈಮ್‌ಗಳ ಸಮೃದ್ಧ ಮಿಶ್ರಣವಾಗಿದೆ.",
    handle: "dr-soil-organic-decomposer-culture",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_cmp_pwd_1",
        url: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_powder",
    metadata: {
      scientific_name: "Cellulolytic & Lignolytic Microbial Consortium",
      category_kannada: "ಜೈವಿಕ ಡಿಕಂಪೋಸರ್ (Bio-Decomposer Accelerator)",
      pack_type: "1 Kg Sealed Agri Pack",
      price_tag: "₹150/- (1 Kg Pack)",
      target_disease: "ಕೃಷಿ ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ ಮತ್ತು ಕಾಂಪೋಸ್ಟಿಂಗ್ (Organic Waste Fast Composting)",
      dosage: "1-2 ಕೆಜಿ ಪ್ರತಿ 1 ಟನ್ ಕೃಷಿ ತ್ಯಾಜ್ಯಕ್ಕೆ",
      suitable_crops: "ಕಬ್ಬಿನ ರವದಿ, ಅಡಿಕೆ ಗರಿಗಳು, ಭತ್ತದ ಹುಲ್ಲು, ತೋಟಗಾರಿಕಾ ತ್ಯಾಜ್ಯ ಮತ್ತು ಹಟ್ಟಿ ಗೊಬ್ಬರ ತಯಾರಿಕೆ.",
      application_guide: "1 ಕೆಜಿ ಪುಡಿಯನ್ನು 50 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಕದಡಿ, 1 ಟನ್ ತ್ಯಾಜ್ಯದ ಪದರಗಳ ಮೇಲೆ ಚಿಮುಕಿಸಿ, ತೇವಾಂಶ ಕಾಪಾಡಿಕೊಂಡು 15 ದಿನಕ್ಕೊಮ್ಮೆ ಮಗುಚಿ ಹಾಕಿ.",
    },
    options: [
      {
        id: "opt_cmp_pwd_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Pack Size)",
        product_id: "prod_compost_culture_powder",
        values: [
          { id: "opt_val_cmp_pwd_1kg", value: "1 Kg Pack (1 ಕೆಜಿ)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_cmp_pwd_1kg",
        title: "1 Kg Pack (1 ಕೆಜಿ)",
        sku: "BT-CMP-PWD-1KG",
        barcode: "8908006",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 250,
        calculated_price: {
          id: "cp_cmp_pwd_1",
          calculated_amount: 150,
          original_amount: 180,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_cmp_p1", value: "1 Kg Pack (1 ಕೆಜಿ)", option_id: "opt_cmp_pwd_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ==================== LIQUID PRODUCTS (@ ₹350) ====================
  {
    id: "prod_trichoderma_liquid",
    title: "ಟ್ರೈಕೋಡರ್ಮಾ ಲಿಕ್ವಿಡ್ (Trichoderma Liquid Concentrate)",
    subtitle: "ಸಾಂದ್ರೀಕೃತ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ • ಹನಿ ನೀರಾವರಿ (ಡ್ರಿಪ್) ಹಾಗೂ ಎಲೆ ಸಿಂಪಡಣೆಗೆ • 1 ಲೀಟರ್",
    description:
      "ಸಾಂದ್ರೀಕೃತ ದ್ರವ ರೂಪದ ಟ್ರೈಕೋಡರ್ಮಾ (Trichoderma 1×10⁸ CFU/ml). ಇದು ಹನಿ ನೀರಾವರಿ ನಾಳಗಳಲ್ಲಿ ಕಟ್ಟಿಕೊಳ್ಳದೆ ಸುಲಭವಾಗಿ ಹರಿಯುತ್ತದೆ. ಬೇರು ಕೊಳೆತ, ಕಾಂಡ ಕೊಳೆತ, ಕೊಳೆ ರೋಗ ಮತ್ತು ಸೊರಗು ರೋಗಗಳನ್ನು ತಡೆಗಟ್ಟಿ ಗಿಡಗಳಲ್ಲಿ ಹಚ್ಚಹಸಿರನ್ನು ತರುತ್ತದೆ.",
    handle: "trichoderma-liquid",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_tri_liq_1",
        url: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_liquid",
    metadata: {
      scientific_name: "Trichoderma harzianum Liquid (CFU 1 x 10^8 / ml)",
      category_kannada: "ಲಿಕ್ವಿಡ್ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ (Liquid Bio-Fungicide)",
      pack_type: "1 Litre Leak-Proof Bottle",
      price_tag: "₹350/- (1 Litre Bottle)",
      target_disease: "ಬೇರು ಕೊಳೆತ, ಮಹಾಳಿ ರೋಗ, ಸೊರಗು ರೋಗ (Root Rot, Wilt, Koleroga)",
      dosage: "ಹನಿ ನೀರಾವರಿಗೆ: 1 ಲೀಟರ್ / ಎಕರೆಗೆ; ಸಿಂಪಡಣೆಗೆ: 5 ಮಿಲಿ / ಲೀಟರ್ ನೀರಿಗೆ",
      suitable_crops: "ಅಡಿಕೆ, ಕಾಳುಮೆಣಸು, ಏಲಕ್ಕಿ, ಶುಂಠಿ, ದಾಳಿಂಬೆ, ಟೊಮ್ಯಾಟೊ, ಪಪ್ಪಾಯ, ಹತ್ತಿ.",
      application_guide: "1 ಲೀಟರ್ ದ್ರಾವಣವನ್ನು ವೆಂಚುರಿ ಮೂಲಕ ಹನಿ ನೀರಾವರಿಯಲ್ಲಿ ಎಕರೆಗೆ ಬಿಡಿ ಅಥವಾ 5 ಮಿಲಿ / ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.",
    },
    options: [
      {
        id: "opt_tri_liq_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)",
        product_id: "prod_trichoderma_liquid",
        values: [
          { id: "opt_val_tri_liq_1l", value: "1 Litre Bottle (1 ಲೀಟರ್)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_tri_liq_1l",
        title: "1 Litre Bottle (1 ಲೀಟರ್)",
        sku: "BT-TRI-LIQ-1L",
        barcode: "8908007",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 150,
        calculated_price: {
          id: "cp_tri_liq_1",
          calculated_amount: 350,
          original_amount: 420,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_tri_l1", value: "1 Litre Bottle (1 ಲೀಟರ್)", option_id: "opt_tri_liq_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_pseudomonas_liquid",
    title: "ಸುಡೋಮೊನಾಸ್ ಲಿಕ್ವಿಡ್ (Pseudomonas Fluorescens Liquid)",
    subtitle: "ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ ದ್ರವ ರೂಪ • ಡ್ರಿಪ್ ಹಾಗೂ ಎಲೆ ಸಿಂಪರಣೆಗೆ • 1 ಲೀಟರ್",
    description:
      "ಲಿಕ್ವಿಡ್ ರೂಪದ ಸುಡೋಮೊನಾಸ್ (Pseudomonas fluorescens 1×10⁸ CFU/ml) ಸಸ್ಯಗಳಲ್ಲಿನ ದುಂಡಾಣು ಕರಕಲು, ಸೊರಗು ರೋಗ ಹಾಗೂ ಎಲೆ ಚುಕ್ಕೆಗಳನ್ನು ನಿವಾರಿಸಿ ಸಸ್ಯದ ಸಮೃದ್ಧ ಬೆಳವಣಿಗೆಗೆ ನೆರವಾಗುತ್ತದೆ. ಹನಿ ನೀರಾವರಿಗೆ ಪ್ರಶಸ್ತವಾಗಿದೆ.",
    handle: "pseudomonas-liquid",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_pse_liq_1",
        url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_liquid",
    metadata: {
      scientific_name: "Pseudomonas fluorescens Liquid (CFU 1 x 10^8 / ml)",
      category_kannada: "ಲಿಕ್ವಿಡ್ ಜೈವಿಕ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ (Liquid Bio-Bactericide)",
      pack_type: "1 Litre Agri Grade Bottle",
      price_tag: "₹350/- (1 Litre Bottle)",
      target_disease: "ದುಂಡಾಣು ಎಲೆ ಕರಕಲು, ಬೂದಿ ರೋಗ, ಕೊಳೆತ ರೋಗಗಳು (Bacterial Blight, Powdery Mildew)",
      dosage: "ಹನಿ ನೀರಾವರಿಗೆ: 1 ಲೀಟರ್ / ಎಕರೆ; ಸಿಂಪಡಣೆಗೆ: 5-7 ಮಿಲಿ / ಲೀಟರ್ ನೀರು",
      suitable_crops: "ತರಕಾರಿ ಬೆಳೆಗಳು, ದಾಳಿಂಬೆ, ಮಾವು, ಭತ್ತ, ಅಡಿಕೆ, ಸಿಟ್ರಸ್ ಬೆಳೆಗಳು.",
      application_guide: "1 ಲೀಟರ್ ಸುಡೋಮೊನಾಸ್ ಲಿಕ್ವಿಡ್ ಅನ್ನು ಡ್ರಿಪ್ ಮೂಲಕ ಬೇರು ವಲಯಕ್ಕೆ ನೀಡಿ ಅಥವಾ ರೋಗ ಲಕ್ಷಣ ಕಂಡಾಗ ಎಲೆಗಳಿಗೆ ಸಿಂಪಡಿಸಿ.",
    },
    options: [
      {
        id: "opt_pse_liq_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)",
        product_id: "prod_pseudomonas_liquid",
        values: [
          { id: "opt_val_pse_liq_1l", value: "1 Litre Bottle (1 ಲೀಟರ್)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_pse_liq_1l",
        title: "1 Litre Bottle (1 ಲೀಟರ್)",
        sku: "BT-PSE-LIQ-1L",
        barcode: "8908008",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 160,
        calculated_price: {
          id: "cp_pse_liq_1",
          calculated_amount: 350,
          original_amount: 420,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_pse_l1", value: "1 Litre Bottle (1 ಲೀಟರ್)", option_id: "opt_pse_liq_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_metarhizium_liquid",
    title: "ಮೆಟಾರೈಸಿಯಂ ಲಿಕ್ವಿಡ್ (Metarhizium Liquid Concentrate)",
    subtitle: "ಜೈವಿಕ ಕೀಟನಾಶಕ ದ್ರವ • ಗೆದ್ದಲು, ಗೊಣ್ಣೆ ಹುಳು ಮತ್ತು ಕೀಟ ನಾಶಕ್ಕೆ • 1 ಲೀಟರ್",
    description:
      "ದ್ರವ ರೂಪದ ಮೆಟಾರೈಸಿಯಂ (Metarhizium anisopliae Liquid 1×10⁸ CFU/ml) ಮಣ್ಣಿನಲ್ಲಿರುವ ಬೇರು ಕೀಟಗಳು, ಗೊಣ್ಣೆ ಹುಳು, ಗೆದ್ದಲುಗಳನ್ನು ಹನಿ ನೀರಾವರಿ ಮೂಲಕ ನೇರವಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತದೆ. ರಾಸಾಯನಿಕ ಮುಕ್ತ ಶುದ್ಧ ಜೈವಿಕ ಕೀಟನಾಶಕ.",
    handle: "metarhizium-liquid",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_met_liq_1",
        url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_liquid",
    metadata: {
      scientific_name: "Metarhizium anisopliae Liquid (CFU 1 x 10^8 / ml)",
      category_kannada: "ಲಿಕ್ವಿಡ್ ಜೈವಿಕ ಕೀಟನಾಶಕ (Liquid Bio-Pesticide)",
      pack_type: "1 Litre Bottle",
      price_tag: "₹350/- (1 Litre Bottle)",
      target_disease: "ಗೊಣ್ಣೆ ಹುಳು, ಗೆದ್ದಲು, ಬೇರು ತಿನ್ನುವ ಕೀಟಗಳು (White Grubs & Termites)",
      dosage: "ಹನಿ ನೀರಾವರಿ / ಡ್ರೆಂಚಿಂಗ್: 1-2 ಲೀಟರ್ / ಎಕರೆಗೆ",
      suitable_crops: "ಕಬ್ಬು, ಅಡಿಕೆ, ತೆಂಗು, ಶುಂಠಿ, ಶೇಂಗಾ, ಏಲಕ್ಕಿ, ಹಣ್ಣಿನ ತೋಟಗಳು.",
      application_guide: "1-2 ಲೀಟರ್ ದ್ರವವನ್ನು 200 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಮಿಶ್ರಣ ಮಾಡಿ ಗಿಡಗಳ ಬೇರುಗಳ ಬುಡಕ್ಕೆ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿ ಅಥವಾ ಡ್ರಿಪ್ ಮೂಲಕ ಹಾಯಿಸಿ.",
    },
    options: [
      {
        id: "opt_met_liq_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)",
        product_id: "prod_metarhizium_liquid",
        values: [
          { id: "opt_val_met_liq_1l", value: "1 Litre Bottle (1 ಲೀಟರ್)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_met_liq_1l",
        title: "1 Litre Bottle (1 ಲೀಟರ್)",
        sku: "BT-MET-LIQ-1L",
        barcode: "8908009",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 140,
        calculated_price: {
          id: "cp_met_liq_1",
          calculated_amount: 350,
          original_amount: 420,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_met_l1", value: "1 Litre Bottle (1 ಲೀಟರ್)", option_id: "opt_met_liq_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod_bio_npk_liquid",
    title: "ಬಯೋ ಎನ್ಪಿಕೆ ಕನ್ಸಾರ್ಸಿಯಂ ಲಿಕ್ವಿಡ್ (Bio NPK Liquid Consortium)",
    subtitle: "ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಶ್ ಒದಗಿಸುವ ಜೈವಿಕ ದ್ರವ ಗೊಬ್ಬರ (N + P + K) • 1 ಲೀಟರ್",
    description:
      "ಬಯೋ ಎನ್ಪಿಕೆ ಕನ್ಸಾರ್ಸಿಯಂ (Bio NPK Liquid 1×10⁸ CFU/ml) ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ (Azotobacter), ರಂಜಕ ಕರಗಿಸುವ (PSB) ಮತ್ತು ಪೊಟ್ಯಾಷ್ ಒದಗಿಸುವ (KMB) ಬ್ಯಾಕ್ಟೀರಿಯಾಗಳ ಪ್ರಬಲ ಮಿಶ್ರಣ. ಇದು ರಾಸಾಯನಿಕ ಯೂರಿಯಾ ಮತ್ತು ಡಿಎಪಿ ಗೊಬ್ಬರದ ವೆಚ್ಚವನ್ನು 25-30% ರಷ್ಟು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
    handle: "liquid-npk-consortium",
    is_giftcard: false,
    status: "published",
    thumbnail:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
    images: [
      {
        id: "img_npk_liq_1",
        url: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
      },
    ],
    collection_id: "col_liquid",
    metadata: {
      scientific_name: "Liquid N.P.K Consortium (Azotobacter + PSB + KMB)",
      category_kannada: "ಸಂಪೂರ್ಣ ಜೈವಿಕ ದ್ರವ ಗೊಬ್ಬರ (Bio NPK Liquid Consortium)",
      pack_type: "1 Litre Heavy-Duty Bottle",
      price_tag: "₹350/- (1 Litre Bottle)",
      target_disease: "ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಶ್ ಪೋಷಕಾಂಶ ಕೊರತೆ ನಿವಾರಣೆ (Complete Plant Nutrition)",
      dosage: "ಹನಿ ನೀರಾವರಿಗೆ: 1 ಲೀಟರ್ / ಎಕರೆ; ಸಿಂಪಡಣೆಗೆ: 5 ಮಿಲಿ / ಲೀಟರ್ ನೀರಿಗೆ",
      suitable_crops: "ಎಲ್ಲಾ ಕೃಷಿ, ತೋಟಗಾರಿಕೆ, ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು, ಧಾನ್ಯಗಳು, ಹಣ್ಣು ಮತ್ತು ತರಕಾರಿಗಳು.",
      application_guide: "ಬೆಳೆಯ ಬೆಳವಣಿಗೆಯ ಆರಂಭ ಹಾಗೂ ಹೂವು-ಕಾಯಿ ಹಂತದಲ್ಲಿ 1 ಲೀಟರ್ ಬಯೋ ಎನ್ಪಿಕೆಯನ್ನು ಡ್ರಿಪ್ ಮೂಲಕ ಎಕರೆಗೆ ನೀಡಿ ಅಥವಾ ಸಿಂಪಡಿಸಿ.",
    },
    options: [
      {
        id: "opt_npk_liq_size",
        title: "ಪ್ಯಾಕಿಂಗ್ ಗಾತ್ರ (Bottle Size)",
        product_id: "prod_bio_npk_liquid",
        values: [
          { id: "opt_val_npk_liq_1l", value: "1 Litre Bottle (1 ಲೀಟರ್)" },
        ],
      },
    ],
    variants: [
      {
        id: "var_npk_liq_1l",
        title: "1 Litre Bottle (1 ಲೀಟರ್)",
        sku: "BT-NPK-LIQ-1L",
        barcode: "8908010",
        manage_inventory: true,
        allow_backorder: false,
        inventory_quantity: 200,
        calculated_price: {
          id: "cp_npk_liq_1",
          calculated_amount: 350,
          original_amount: 450,
          currency_code: "inr",
          is_calculated_price_tax_inclusive: true,
        },
        options: [
          { id: "opt_rel_npk_l1", value: "1 Litre Bottle (1 ಲೀಟರ್)", option_id: "opt_npk_liq_size" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Assign categories and collections
const categoryProductMap: Record<string, string[]> = {
  cat_bio_fertilizers: ["prod_vam_powder", "prod_bio_npk_liquid"],
  cat_bio_pesticides: ["prod_metarhizium_powder", "prod_metarhizium_liquid"],
  cat_bio_fungicides: [
    "prod_trichoderma_powder",
    "prod_trichoderma_liquid",
    "prod_pseudomonas_powder",
    "prod_pseudomonas_liquid",
  ],
  cat_bio_decomposers: [
    "prod_paecilomyces_powder",
    "prod_compost_culture_powder",
  ],
  cat_powder: [
    "prod_trichoderma_powder",
    "prod_pseudomonas_powder",
    "prod_metarhizium_powder",
    "prod_vam_powder",
    "prod_paecilomyces_powder",
    "prod_compost_culture_powder",
  ],
  cat_liquid: [
    "prod_trichoderma_liquid",
    "prod_pseudomonas_liquid",
    "prod_metarhizium_liquid",
    "prod_bio_npk_liquid",
  ],
}

MOCK_PRODUCTS.forEach((product) => {
  product.categories = MOCK_CATEGORIES.filter((cat) =>
    categoryProductMap[cat.id]?.includes(product.id)
  )
})

MOCK_CATEGORIES.forEach((cat) => {
  const prodIds = categoryProductMap[cat.id] || []
  cat.products = MOCK_PRODUCTS.filter((p) => prodIds.includes(p.id))
})

// Assign products to collections
MOCK_COLLECTIONS[0].products = MOCK_PRODUCTS.filter(
  (p) => p.collection_id === "col_powder"
)
MOCK_COLLECTIONS[1].products = MOCK_PRODUCTS.filter(
  (p) => p.collection_id === "col_liquid"
)
