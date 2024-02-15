import { useCallback, useMemo } from 'react'
import { createObservable } from '../util/createObservable'

export const useItems = <Item>() => {
  const {
    getValue: getItems,
    publish: publishItems,
    subscribe: subscribeToItems,
  } = useMemo(() => createObservable<Item[]>([]), [])

  const addItem = useCallback(
    (item: Item) => {
      publishItems(getItems().concat(item))
    },
    [getItems, publishItems],
  )

  const removeItem = useCallback(
    (item: Item) => {
      const items = getItems()

      const itemIndex = items.indexOf(item)

      const nextItems = items
        .slice(0, itemIndex)
        .concat(items.slice(itemIndex + 1))

      publishItems(nextItems)
    },
    [getItems, publishItems],
  )

  return {
    addItem,
    getItems,
    removeItem,
    subscribeToItems,
  }
}

export default useItems
