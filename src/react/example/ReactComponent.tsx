import { FunctionComponent, type ReactNode } from 'react'

export type ReactComponentProps = {
  children?: ReactNode
}

export const ReactComponent: FunctionComponent<ReactComponentProps> = (
  props,
) => (
  <fieldset>
    <div>React component.</div>

    {props.children ? (
      <div>
        with children.
        <fieldset>
          <h3>Solid children show up here:</h3>

          <div>{props.children}</div>
        </fieldset>
      </div>
    ) : (
      <div>with no children.</div>
    )}
  </fieldset>
)

export default ReactComponent
