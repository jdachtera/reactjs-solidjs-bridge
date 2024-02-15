import { type FunctionComponent, useCallback, useState } from 'react'
import { mergeProps } from 'solid-js'

export type ReactStatefulComponentProps = {
  count: number
}

export const ReactStatefulComponent: FunctionComponent<
  ReactStatefulComponentProps
> = (_props) => {
  const props = mergeProps({ count: 0 }, _props)
  const [localCount, setLocalCount] = useState(0)

  const incrementLocalCount = useCallback(() => {
    setLocalCount((_localCount) => _localCount + 1)
  }, [])

  return (
    <fieldset>
      <div>React stateful component.</div>

      <button
        onClick={incrementLocalCount}
        type="button"
      >
        <div>Local: {localCount}</div>
        <div>Controlled: {props.count}</div>
      </button>
    </fieldset>
  )
}

export default ReactStatefulComponent
