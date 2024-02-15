import { ReactNode, useEffect, useRef } from 'react'

export type ReactToSolidPortalElementProps = {
  getChildElement: (domElement: HTMLDivElement) => void
}

export const ReactToSolidPortalElement = (
  props: ReactToSolidPortalElementProps,
): ReactNode => {
  const domElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    props.getChildElement(
      domElementRef.current as HTMLDivElement, // We know better on how React works. This will always have a DOM element. It can never be `null`.
    )
  }, [])

  return <div ref={domElementRef} />
}

export default ReactToSolidPortalElement
