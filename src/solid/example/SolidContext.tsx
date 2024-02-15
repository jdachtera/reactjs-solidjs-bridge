import { JSXElement, createContext, createMemo, useContext } from 'solid-js'

export type SolidContextType = {
  count: () => number
  incrementCount: () => void
  setCount: (newCount: number) => void
}

export const defaultSolidContextValue: SolidContextType = {
  count: () => -1,
  incrementCount: () => {},
  setCount: () => {},
}

export const SolidContext = createContext(defaultSolidContextValue)

export const SolidContextExposer = (props: {
  children: (context: SolidContextType) => JSXElement
}) => {
  const context = useContext(SolidContext)

  const renderedChildren = createMemo(() => props.children(context))

  return <>{renderedChildren()}</>
}

export default SolidContext
