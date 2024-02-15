import { type ReactNode, useEffect, useMemo, useRef } from 'react'
import { type Component } from 'solid-js'
import { render } from 'solid-js/web'
import { SolidBridgeContainer } from '../solid/SolidBridgeContainer'
import { ReactToSolidBridgeContext } from './ReactToSolidBridgeContext'
import { useItems } from './useItems'

export type ReactToSolidBridgeProviderType = {
  children: ReactNode
  getSolidComponent?: () => Component
}

export const ReactToSolidBridgeProvider = (
  props: ReactToSolidBridgeProviderType,
) => {
  const {
    addItem: addSolidChild,
    getItems: getSolidChildren,
    removeItem: removeSolidChild,
    subscribeToItems: subscribeToSolidChildren,
  } = useItems<Component>()

  const parentDomElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dispose = render(
      () =>
        SolidBridgeContainer({
          getChildren: getSolidChildren,
          subscribeToChildren: subscribeToSolidChildren,
        }),
      parentDomElement.current as HTMLDivElement,
    )

    return () => {
      dispose()
    }
  }, [getSolidChildren, subscribeToSolidChildren])

  const providerValue = useMemo(
    () => ({
      addSolidChild,
      removeSolidChild,
    }),
    [],
  )

  return (
    <div ref={parentDomElement}>
      <ReactToSolidBridgeContext.Provider value={providerValue}>
        {props.children}
      </ReactToSolidBridgeContext.Provider>
    </div>
  )
}

export default ReactToSolidBridgeProvider
