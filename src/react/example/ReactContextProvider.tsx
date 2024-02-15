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
}

export const ReactContextProvider: FunctionComponent<
  ReactContextProviderProps
> = (props) => {
  const [count, setCount] = useState(0)

  const incrementCount = useCallback(() => {
    setCount((localCount) => localCount + 1)
  }, [])

  const providerValue = useMemo(
    () => ({
      count,
      incrementCount,
      setCount,
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
