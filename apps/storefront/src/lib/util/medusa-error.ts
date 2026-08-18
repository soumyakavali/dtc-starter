type MedusaError = {
  response?: {
    data: { message?: string } | string
    status: number
    headers: unknown
  }
  request?: unknown
  message?: string
  config?: { url: string; baseURL?: string }
}

export default function medusaError(error: unknown): never {
  const err = error as MedusaError
  if (err?.response) {
    try {
      if (err.config?.url) {
        const u = new URL(err.config.url, err.config.baseURL || "http://localhost:9000")
        console.error("Resource:", u.toString())
      }
      if (err.response.data) console.error("Response data:", err.response.data)
      if (err.response.status) console.error("Status code:", err.response.status)
    } catch {}

    const data = err.response.data
    const message =
      typeof data === "object" && data !== null
        ? data.message || JSON.stringify(data)
        : data

    const strMessage = String(message || "An error occurred.")
    throw new Error(strMessage.charAt(0).toUpperCase() + strMessage.slice(1) + ".")
  } else if (err?.request) {
    throw new Error("No response received: " + String(err.request))
  } else {
    throw new Error(err?.message || "An error occurred setting up the request.")
  }
}
