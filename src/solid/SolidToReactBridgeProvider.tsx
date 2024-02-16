import { ReactNode, createElement } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import {
  ParentProps,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  useContext,
} from 'solid-js'
import ReactBridgeContainer from '../react/ReactBridgeContainer'
import SolidToReactBridgeContext from './SolidToReactBridgeContext'
import useItems from './useItems'

type SolidToReactBridgeProviderProps = ParentProps

const SolidToReactBridgeProvider = (props: SolidToReactBridgeProviderProps) => {
  const parentContext = useContext(SolidToReactBridgeContext)

  const {
    addItem: addReactChild,
    getValue: getReactChildren,
    removeItem: removeReactChild,
    subscribeToItems: subscribeToReactChildren,
  } = useItems<ReactNode>()

  const [parentDomElement, setParentDomElement] = createSignal<HTMLDivElement>()

  const reactRoot = createMemo(() => {
    if (!parentContext.isRoot) return undefined

    const element = parentDomElement()
    if (!element) return undefined

    return createRoot(element)
  })

  createEffect(() => {
    const reactElement = createElement(ReactBridgeContainer, {
      getChildren: getReactChildren,
      subscribeToChildren: subscribeToReactChildren,
    })

    if (parentContext.isRoot) {
      const root = reactRoot()
      root?.render(reactElement)

      onCleanup(() => {
        root?.unmount()
      })
    } else {
      const domElement = parentDomElement()
      if (!domElement) return

      const portalElement = createPortal(reactElement, domElement)

      parentContext.addReactChild(portalElement)

      onCleanup(() => {
        parentContext.removeReactChild(portalElement)
      })
    }
  })

  return (
    <SolidToReactBridgeContext.Provider
      value={{ addReactChild, isRoot: false, removeReactChild }}
    >
      {props.children}
      <div ref={setParentDomElement} />
    </SolidToReactBridgeContext.Provider>
  )
}

export { SolidToReactBridgeProvider }
