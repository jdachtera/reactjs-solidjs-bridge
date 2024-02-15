import { ParentComponent, createSignal } from 'solid-js'
import { SolidContext } from './SolidContext'

export type SolidContextProviderProps =
  | {
      count: number
      setCount: (count: number) => void
    }
  | {
      count?: never
      setCount?: never
    }

export const SolidContextProvider: ParentComponent<
  SolidContextProviderProps
> = (props) => {
  const [get, set] = createSignal(0)
  const [count, setCount] = [
    () => {
      if (typeof props.count === 'number') return props.count
      return get()
    },
    (value: number) => {
      if (typeof props.setCount === 'function') {
        props.setCount(value)
      } else {
        set(value)
      }
    },
  ]

  const incrementCount = () => {
    setCount(count() + 1)
  }

  return (
    <SolidContext.Provider
      value={{
        count,
        incrementCount,
        setCount,
      }}
    >
      {props.children}
    </SolidContext.Provider>
  )
}

export default SolidContextProvider
