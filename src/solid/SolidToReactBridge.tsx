import { type ReactElement, createElement } from 'react'
import {
  type ParentComponent,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
} from 'solid-js'
import { Portal } from 'solid-js/web'
import { ReactToSolidPortalElement } from '../react/ReactToSolidPortalElement'
import { ReactToSolidBridgeContext } from './SolidToReactBridgeContext'

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
  const [portalDomElement, setPortalDomElement] = createSignal<HTMLDivElement>()

  const { addReactChild, removeReactChild } = useContext(
    ReactToSolidBridgeContext,
  )

  let solidToReactElement: HTMLDivElement | undefined

  createEffect(() => {
    const component = props.getReactComponent({
      getChildren: () =>
        createElement(ReactToSolidPortalElement, {
          getChildElement: (domElement: HTMLDivElement) => {
            setPortalDomElement(domElement)
          },
        }),
    })

    addReactChild(component)

    onCleanup(() => {
      removeReactChild(component)
    })
  })

  return (
    <div ref={solidToReactElement}>
      {props.children && portalDomElement() && (
        <Portal mount={portalDomElement()}>{props.children}</Portal>
      )}
    </div>
  )
}

export default SolidToReactBridge
