import { createContext } from 'react'

export type ReactContextType = {
  count: number
  incrementCount: () => void
  setCount: (count: number | ((prev: number) => number)) => void
}

export const defaultReactContextValue: ReactContextType = {
  count: 0,
  incrementCount: () => {},
  setCount: () => {},
}

export const ReactContext = createContext(defaultReactContextValue)
