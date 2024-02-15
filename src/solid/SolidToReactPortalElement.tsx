import { JSXElement } from 'solid-js'

export const SolidToReactPortalElement = (props: {
  getChildElement: (domElement: HTMLElement) => void
}): JSXElement => {
  const domElement = <div />

  props.getChildElement(domElement as HTMLDivElement)

  return domElement
}

export default SolidToReactPortalElement
