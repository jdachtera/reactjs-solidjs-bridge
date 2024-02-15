import { PropsWithChildren, memo } from 'react'
import { ParentComponent, ParentProps } from 'solid-js'
import { ReactToSolidBridge } from './ReactToSolidBridge'

export function convertToReactComponent<Props extends Record<string, unknown>>(
  SolidComponent: ParentComponent<Props>,
) {
  const ConvertedSolidComponent = (
    props: PropsWithChildren<Omit<Props, 'children'>>,
  ) => {
    return (
      <ReactToSolidBridge
        getSolidComponent={({ getChildren, props: _props }) =>
          SolidComponent(
            new Proxy(_props, {
              get: (_, key) => {
                if (key === 'children') {
                  return getChildren()
                }
                return _props[key as string]
              },
            }) as ParentProps<Props>,
          )
        }
        props={props}
      >
        {props.children}
      </ReactToSolidBridge>
    )
  }

  const MemoizedConvertedSolidComponent = memo(ConvertedSolidComponent)

  MemoizedConvertedSolidComponent.displayName = `ConvertedSolidComponent(${SolidComponent.name})`
  return MemoizedConvertedSolidComponent
}

export default convertToReactComponent
