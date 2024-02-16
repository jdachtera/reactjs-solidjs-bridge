import { ReactNode } from 'react'
import { createContext } from 'solid-js'

export type SolidToReactBridgeContextType = {
  addReactChild: (reactComponent: ReactNode) => void
  removeReactChild: (reactComponent: ReactNode) => void
  isRoot: boolean
}

export const defaultSolidToReactBridgeContextValue: SolidToReactBridgeContextType =
  {
    addReactChild: () => {},
    isRoot: true,
    removeReactChild: () => {},
  }

export const ReactToSolidBridgeContext = createContext(
  defaultSolidToReactBridgeContextValue,
)

export default ReactToSolidBridgeContext
