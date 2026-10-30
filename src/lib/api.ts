import axios from 'axios'

// Shared HTTP client; the base URL comes from VITE_API_URL in .env (e.g. https://host/api/v1)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

/** While the backend isn't ready, VITE_USE_MOCK_API=true answers calls from src/mocks */
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

/** Every failed call is turned into this, matching the API's { error: { code, message } } body */
export class ApiError extends Error {
  readonly status: number
  readonly code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

api.interceptors.response.use(undefined, (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as { error?: { code?: string; message?: string } } | undefined
    throw new ApiError(
      error.response?.status ?? 0,
      body?.error?.code ?? (error.response ? 'INTERNAL_ERROR' : 'NETWORK_ERROR'),
      body?.error?.message ?? error.message,
    )
  }
  throw error
})
