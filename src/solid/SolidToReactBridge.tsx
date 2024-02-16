import { type ReactElement, createElement } from 'react'
import { createPortal } from 'react-dom'
import {
  type ParentComponent,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
  createMemo,
} from 'solid-js'
import { Portal } from 'solid-js/web'
import { ReactToSolidPortalElement } from '../react/ReactToSolidPortalElement'
import { ReactToSolidBridgeContext } from './SolidToReactBridgeContext'
import { SolidToReactBridgeProvider } from './SolidToReactBridgeProvider'

export type SolidToReactBridgeProps = {
  getReactComponent: ({
    getChildren,
  }: {
    getChildren: () => ReactElement
  }) => ReactElement
  props?: Record<string, unknown>
}

export const SolidToReactBridge: ParentComponent<SolidToReactBridgeProps> = (
  props,
) => {
  const { addReactChild, removeReactChild } = useContext(
    ReactToSolidBridgeContext,
  )

  const [portalDomElement, setPortalDomElement] = createSignal<HTMLDivElement>()
  const [solidToReactElement, setSolidReactElement] = createSignal<
    HTMLDivElement | undefined
  >()

  const reactComponent = createMemo(() =>
    props.getReactComponent({
      getChildren: () =>
        createElement(ReactToSolidPortalElement, {
          getChildElement: (domElement: HTMLDivElement) => {
            setPortalDomElement(domElement)
          },
        }),
    }),
  )

  const componentName = createMemo(() => {
    const component = reactComponent()

    if (typeof component.type === 'function') {
      return component.type.name
    }

    return component.type
  })

  createEffect(() => {
    const element = solidToReactElement()
    const component = reactComponent()

    if (!element) return

    const reactPortal = createPortal(component, element)

    addReactChild(reactPortal)

    onCleanup(() => removeReactChild(reactPortal))
  })

  return (
    <div
      ref={setSolidReactElement}
      data-react-component={componentName()}
    >
      {props.children && portalDomElement() && (
        <SolidToReactBridgeProvider>
          <Portal mount={portalDomElement()}>{props.children}</Portal>
        </SolidToReactBridgeProvider>
      )}
    </div>
  )
}

export default SolidToReactBridge
