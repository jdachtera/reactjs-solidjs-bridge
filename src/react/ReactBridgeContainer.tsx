import React, { ReactNode, useEffect, useState } from 'react'

type ReactBrideContainerProps = {
  subscribeToChildren: (
    setChildren: (children: ReactNode[]) => void,
  ) => () => void
  getChildren: () => ReactNode[]
}

const ReactBridgeContainer = ({
  getChildren,
  subscribeToChildren,
}: ReactBrideContainerProps): ReactNode => {
  const [localChildren, setLocalChildren] = useState(getChildren())

  useEffect(() => {
    setLocalChildren(getChildren())
    const unsubscribe = subscribeToChildren(setLocalChildren)

    return () => {
      unsubscribe()
    }
  }, [getChildren, subscribeToChildren])

  return localChildren.map((node, index) => (
    <React.Fragment key={index}>{node}</React.Fragment>
  ))
}

export default ReactBridgeContainer
