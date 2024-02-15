import { ReactNode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ParentProps,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
} from 'solid-js'
import ReactBridgeContainer from '../react/ReactBridgeContainer'
import SolidToReactBridgeContext from './SolidToReactBridgeContext'
import useItems from './useItems'

type SolidToReactBridgeProviderProps = ParentProps

const SolidToReactBridgeProvider = (props: SolidToReactBridgeProviderProps) => {
  const {
    addItem: addReactChild,
    getValue: getReactChildren,
    removeItem: removeReactChild,
    subscribeToItems: subscribeToReactChildren,
  } = useItems<ReactNode>()

  const [parentDomElement, setParentDomElement] = createSignal<HTMLDivElement>()

  const reactRoot = createMemo(() => {
    const element = parentDomElement()
    if (!element) return undefined

    return createRoot(element)
  })

  createEffect(() => {
    const root = reactRoot()

    const reactElement = createElement(ReactBridgeContainer, {
      getChildren: getReactChildren,
      subscribeToChildren: subscribeToReactChildren,
    })

    root?.render(reactElement)
  })

  onCleanup(() => {
    reactRoot()?.unmount()
  })

  const providerValue = {
    addReactChild,
    removeReactChild,
  }

  return (
    <SolidToReactBridgeContext.Provider value={providerValue}>
      {props.children}
      <div ref={setParentDomElement} />
    </SolidToReactBridgeContext.Provider>
  )
}

export { SolidToReactBridgeProvider }
