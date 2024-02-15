import {
  type Component,
  type ParentComponent,
  createEffect,
  createSignal,
  For,
  onCleanup,
  untrack,
} from 'solid-js'

export type SolidBridgeContainerType = {
  getChildren: () => Component[]
  subscribeToChildren: (
    subscriber: (children: Component[]) => void,
  ) => () => void
}

export const SolidBridgeContainer: ParentComponent<SolidBridgeContainerType> = (
  props,
) => {
  const [children, setChildren] = createSignal(
    untrack(() => props.getChildren()),
  )

  createEffect(() => {
    const unsubscribe = props.subscribeToChildren((_children) => {
      setChildren(_children)
    })

    onCleanup(() => {
      unsubscribe()
    })
  })

  return <For each={children()}>{(ChildComponent) => <ChildComponent />}</For>
}

export default SolidBridgeContainer
