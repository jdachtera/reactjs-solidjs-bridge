import {
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { type ParentComponent, Component, JSX as SolidJSX } from 'solid-js'
import { createStore } from 'solid-js/store'
import { DOMElement } from 'solid-js/types/jsx'
import { Portal } from 'solid-js/web'
import { SolidBridgeContainer } from '../solid/SolidBridgeContainer'
import { SolidToReactPortalElement } from '../solid/SolidToReactPortalElement'
import { ReactToSolidBridgeContext } from './ReactToSolidBridgeContext'
import { useItems } from './useItems'

export type ReactToSolidBridgeProps<
  Props extends Record<string, unknown> | undefined,
> = {
  children: ReactNode
  props: Props
} & (
  | {
      getSolidComponent: (props: {
        getChildren: () => SolidJSX.Element
        props: Props
      }) => SolidJSX.Element
      solidComponent?: never
    }
  | {
      solidComponent: Component<Props> | ParentComponent<Props>
      getSolidComponent?: never
    }
)

export function ReactToSolidBridge<
  Props extends Record<string, unknown> | undefined,
>(props: ReactToSolidBridgeProps<Props>) {
  const { addSolidChild, removeSolidChild } = useContext(
    ReactToSolidBridgeContext,
  )

  const {
    addItem: addSolidGrandchild,
    getItems: getSolidGrandchildren,
    removeItem: removeSolidGrandchild,
    subscribeToItems: subscribeToSolidGrandchildren,
  } = useItems<Component>()

  const [portalDomElement, setPortalDomElement] = useState<DOMElement>()

  const parentDomElement = useRef<HTMLDivElement>(null)

  const getSolidComponentRef = useRef(props.getSolidComponent)

  useEffect(() => {
    getSolidComponentRef.current = props.getSolidComponent
  }, [props.getSolidComponent])

  const solidComponentRef = useRef(props.solidComponent)

  useEffect(() => {
    solidComponentRef.current = props.solidComponent
  }, [props.solidComponent])

  const [solidProps, setSolidProps] = useMemo(() => {
    const [store, setStore] = createStore<Record<string, unknown>>(
      props.props ?? {},
    )
    return [store, setStore]
  }, [])

  useEffect(() => {
    setSolidProps((prevProps) => ({ ...prevProps, ...props.props }))
  }, [props.props])

  useEffect(() => {
    if (!addSolidChild) {
      throw new Error(
        'You need to wrap `ReactToSolidBridge` in a `ReactToSolidBridgeProvider` component at the top-level of your React app.',
      )
    }

    const getSolidChildren = () => [
      SolidToReactPortalElement({
        getChildElement: (domElement) => setPortalDomElement(domElement),
      }),
      SolidBridgeContainer({
        getChildren: getSolidGrandchildren,
        subscribeToChildren: subscribeToSolidGrandchildren,
      }),
    ]

    const SolidChildComponent = () =>
      Portal({
        get children() {
          if (solidComponentRef.current) {
            const proxy = new Proxy(
              {
                get children() {
                  return getSolidChildren()
                },
              } as Props & { children: SolidJSX.Element[] },
              {
                get: (_proxy, propertyName) => {
                  return solidProps[propertyName as string]
                },
              },
            )

            return solidComponentRef.current(proxy)
          }

          return getSolidComponentRef.current?.({
            getChildren: getSolidChildren,
            props: solidProps as Props,
          })
        },
        mount: parentDomElement.current ?? undefined,
      })

    addSolidChild(SolidChildComponent)

    return () => {
      removeSolidChild(SolidChildComponent)
    }
  }, [
    addSolidChild,
    getSolidGrandchildren,
    removeSolidChild,
    subscribeToSolidGrandchildren,
  ])

  const providerValue = useMemo(
    () => ({
      addSolidChild: addSolidGrandchild,
      removeSolidChild: removeSolidGrandchild,
    }),
    [addSolidGrandchild, removeSolidGrandchild],
  )

  return (
    <div ref={parentDomElement}>
      <ReactToSolidBridgeContext.Provider value={providerValue}>
        {props.children &&
          portalDomElement &&
          createPortal(props.children, portalDomElement)}
      </ReactToSolidBridgeContext.Provider>
    </div>
  )
}

// function createSolidPropsRef<
//   Props extends Record<string, unknown>,
// >(solidSignals: {
//   [K in keyof Props]: Signal<Props[K]>
// }) {
//   return fromEntries(
//     objectEntries(solidSignals).map(([key, value]) => [key, value[0]]),
//   )
// }

// function createOrUpdateSolidSignals<Props extends Record<string, unknown>>(
//   props: Props,
//   propsRef: React.MutableRefObject<Props>,
//   solidSignalsRef?: React.MutableRefObject<{
//     [K in keyof Props]: Signal<Props[K]>
//   }>,
// ) {
//   let solidSignals = solidSignalsRef?.current

//   objectEntries(props).forEach(([prop, value]) => {
//     const currentSignal = solidSignals?.[prop]
//     if (typeof value === 'function') {
//       if (!currentSignal) {
//         solidSignals = {
//           ...solidSignals,
//           [prop]: [
//             () => {
//               const getter = propsRef.current[prop] as Accessor<
//                 Props[keyof Props]
//               >
//               return getter()
//             },
//             () => {},
//           ],
//         } as {
//           [K in keyof Props]: Signal<Props[K]>
//         }
//       }
//     } else if (!currentSignal) {
//       solidSignals = {
//         ...solidSignals,
//         // eslint-disable-next-line solid/reactivity
//         [prop]: createSignal(props[prop]),
//       } as {
//         [K in keyof Props]: Signal<Props[K]>
//       }
//     } else {
//       const setter = currentSignal[1]
//       setter(props[prop] as Parameters<typeof setter>[0])
//     }
//   })

//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   return solidSignals!
// }

export default ReactToSolidBridge
