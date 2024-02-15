import { ReactNode } from 'react'
import { createContext } from 'solid-js'

export type SolidToReactBridgeContextType = {
  addReactChild: (reactComponent: ReactNode) => void
  removeReactChild: (reactComponent: ReactNode) => void
}

export const defaultSolidToReactBridgeContextValue: SolidToReactBridgeContextType =
  {
    addReactChild: () => {},
    removeReactChild: () => {},
  }

export const ReactToSolidBridgeContext = createContext(
  defaultSolidToReactBridgeContextValue,
)

export default ReactToSolidBridgeContext
