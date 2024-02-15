import {
  type FunctionComponent,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { ReactContext } from './ReactContext'

export type ReactContextProviderProps = {
  children: ReactNode
} & (
  | {
      count: number
      setCount: (count: number) => void
    }
  | {
      count?: never
      setCount?: never
    }
)

export const ReactContextProvider: FunctionComponent<
  ReactContextProviderProps
> = (props) => {
  const [count, setCount] = useState(0)

  const incrementCount = useCallback(() => {
    if (typeof props.setCount === 'function') {
      props.setCount(props.count + 1)
    } else {
      setCount((localCount) => localCount + 1)
    }
  }, [])

  const providerValue = useMemo(
    () => ({
      count: typeof props.setCount === 'function' ? props.count : count,
      incrementCount,
      setCount: (newCount: number) => {
        if (typeof props.setCount === 'function') {
          props.setCount(newCount)
        } else {
          setCount(newCount)
        }
      },
    }),
    [count, incrementCount],
  )

  return (
    <ReactContext.Provider value={providerValue}>
      {props.children}
    </ReactContext.Provider>
  )
}

export default ReactContextProvider
