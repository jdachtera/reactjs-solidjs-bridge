import { ClassicComponentClass, FunctionComponent, createElement } from 'react'
import { ParentComponent } from 'solid-js'
import { SolidToReactBridge } from './SolidToReactBridge'

export function convertToSolidComponent<Props extends Record<string, unknown>>(
  ReactComponent: FunctionComponent<Props> | ClassicComponentClass<Props>,
) {
  const ConvertedReactComponent: ParentComponent<Omit<Props, 'children'>> = (
    props,
  ) => (
    <SolidToReactBridge
      props={props}
      getReactComponent={({ getChildren }) =>
        createElement(
          ReactComponent,
          new Proxy(props, {
            get: (_, key) => {
              if (key === 'children') {
                return getChildren()
              }
              return props[key as string]
            },
          }) as Props,
        )
      }
    >
      {props.children}
    </SolidToReactBridge>
  )

  Object.defineProperty(ConvertedReactComponent, 'name', {
    value: `${ReactComponent.displayName ?? ReactComponent.name}`,
    writable: false,
  })

  return ConvertedReactComponent
}

export default convertToSolidComponent
