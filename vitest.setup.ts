/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest's jsdom environment does not always instantiate the Web Storage API —
// jsdom only creates `localStorage`/`sessionStorage` for a non-opaque origin,
// which the environment doesn't supply. Polyfill an in-memory implementation so
// hooks/tests that use storage work.
class MemoryStorage implements Storage {
  private store = new Map<string, string>()
  get length(): number {
    return this.store.size
  }
  clear(): void {
    this.store.clear()
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) ?? null) : null
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }
}

function ensureStorage(name: 'localStorage' | 'sessionStorage'): Storage {
  const storage = new MemoryStorage()
  Object.defineProperty(globalThis, name, { value: storage, configurable: true, writable: true })
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, name, { value: storage, configurable: true, writable: true })
  }
  return storage
}

const localStorageMock = ensureStorage('localStorage')
const sessionStorageMock = ensureStorage('sessionStorage')

afterEach(() => {
  cleanup()
  localStorageMock.clear()
  sessionStorageMock.clear()
})
