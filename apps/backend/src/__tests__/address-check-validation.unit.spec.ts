import { describe, it, expect } from "@jest/globals"

export interface FarmerAddress {
  first_name: string
  last_name?: string
  phone: string
  address_1: string
  address_2?: string
  village?: string
  taluk?: string
  district?: string
  city: string
  province: string
  postal_code: string
  country_code: string
}

export function validateFarmerAddress(address: Partial<FarmerAddress>): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  // 1. Name Check
  if (!address.first_name || address.first_name.trim().length < 2) {
    errors.first_name = "Farmer first name is required (at least 2 characters)."
  }

  // 2. Indian 10-Digit Mobile Check
  const cleanPhone = (address.phone || "").replace(/[^0-9]/g, "")
  const validMobileRegex = /^[6-9]\d{9}$/
  if (!cleanPhone || !validMobileRegex.test(cleanPhone)) {
    errors.phone = "Valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 is required."
  }

  // 3. Indian 6-Digit PIN Code Check
  const cleanPin = (address.postal_code || "").trim()
  const pinRegex = /^[1-9]\d{5}$/
  if (!cleanPin || !pinRegex.test(cleanPin)) {
    errors.postal_code = "Valid 6-digit postal PIN code is required."
  } else {
    // Karnataka PIN codes typically start with 56, 57, 58, 59
    const karnatakaPinPrefixes = ["56", "57", "58", "59"]
    const isKarnatakaPin = karnatakaPinPrefixes.some((prefix) => cleanPin.startsWith(prefix))
    if (address.province?.toLowerCase() === "karnataka" && !isKarnatakaPin) {
      errors.postal_code = "PIN code does not match Karnataka postal zone (should start with 56-59)."
    }
  }

  // 4. Street / Farm Plot Address Check
  if (!address.address_1 || address.address_1.trim().length < 5) {
    errors.address_1 = "Farm plot / Village address is required for dispatch."
  }

  // 5. City / Taluk Check
  if (!address.city || address.city.trim().length < 2) {
    errors.city = "City, Taluk or Town is required."
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

describe("Farmer Address & Delivery Location Validations", () => {
  it("1. Should validate valid Karnataka farm addresses across various agricultural districts", () => {
    const validAddresses: FarmerAddress[] = [
      {
        first_name: "Basavaraj",
        last_name: "Patil",
        phone: "9876543210",
        address_1: "Farm Survey No. 42, Near Milk Dairy",
        village: "Tikota",
        taluk: "Vijayapura",
        district: "Vijayapura",
        city: "Vijayapura",
        province: "Karnataka",
        postal_code: "586101",
        country_code: "in",
      },
      {
        first_name: "Mallikarjun",
        last_name: "Gowda",
        phone: "8765432109",
        address_1: "Sugarcane Farm Road, Near Canara Bank",
        village: "Sankeshwar",
        taluk: "Hukkeri",
        district: "Belagavi",
        city: "Belagavi",
        province: "Karnataka",
        postal_code: "591313",
        country_code: "in",
      },
      {
        first_name: "Sharanappa",
        phone: "7654321098",
        address_1: "Cotton Field Road, APMC Yard",
        city: "Ballari",
        province: "Karnataka",
        postal_code: "583101",
        country_code: "in",
      },
      {
        first_name: "Ramesh",
        last_name: "Hegde",
        phone: "6361234567",
        address_1: "Arecanut Plantation, Post Sirsi",
        city: "Uttara Kannada",
        province: "Karnataka",
        postal_code: "581401",
        country_code: "in",
      },
    ]

    validAddresses.forEach((addr) => {
      const result = validateFarmerAddress(addr)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })
  })

  it("2. Should reject invalid phone numbers (landline, short numbers, international without 10 digits)", () => {
    const invalidPhones = ["12345", "08022345678", "5555555555", "abc9876543", ""]

    invalidPhones.forEach((phone) => {
      const result = validateFarmerAddress({
        first_name: "Farmer",
        phone,
        address_1: "Farm House No. 1",
        city: "Hubli",
        province: "Karnataka",
        postal_code: "580020",
      })

      expect(result.isValid).toBe(false)
      expect(result.errors.phone).toBeDefined()
    })
  })

  it("3. Should reject invalid PIN codes (< 6 digits, letters, mismatched Karnataka prefix)", () => {
    const invalidPins = [
      { pin: "58610", reason: "5 digits" },
      { pin: "5861011", reason: "7 digits" },
      { pin: "58A101", reason: "alphanumeric" },
      { pin: "110001", reason: "Delhi PIN for Karnataka state" },
    ]

    invalidPins.forEach(({ pin }) => {
      const result = validateFarmerAddress({
        first_name: "Farmer",
        phone: "9876543210",
        address_1: "Farm House No. 1",
        city: "Vijayapura",
        province: "Karnataka",
        postal_code: pin,
      })

      expect(result.isValid).toBe(false)
      expect(result.errors.postal_code).toBeDefined()
    })
  })

  it("4. Should require mandatory farm location details", () => {
    const emptyAddress = validateFarmerAddress({})
    expect(emptyAddress.isValid).toBe(false)
    expect(emptyAddress.errors.first_name).toBeDefined()
    expect(emptyAddress.errors.phone).toBeDefined()
    expect(emptyAddress.errors.address_1).toBeDefined()
    expect(emptyAddress.errors.city).toBeDefined()
    expect(emptyAddress.errors.postal_code).toBeDefined()
  })
})
