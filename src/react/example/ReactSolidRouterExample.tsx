/* eslint-disable import/no-extraneous-dependencies */
import { Cube as SolidCube, Horse as SolidHorse } from 'phosphor-solid'
import { FunctionComponent } from 'react'
import { Link as SolidLink, Router as SolidRouter } from 'solid-app-router'
import convertToReactComponent from '../convertToReactComponent'

const Cube = convertToReactComponent(SolidCube)
const Horse = convertToReactComponent(SolidHorse)
const Link = convertToReactComponent(SolidLink)
const Router = convertToReactComponent(SolidRouter)

export const ReactSolidRouterExample: FunctionComponent = () => (
  <fieldset>
    <Router>
      <Link href="/">Home</Link>

      {/* <ReactToSolidBridge
        props={{}}
        getSolidComponent={({ getChildren }) =>
          Routes({
            get children() {
              return Route({ element: getChildren(), path: '/' })
            },
          })
        }
      >
        <Horse
          color="pink"
          size={64}
        />
      </ReactToSolidBridge>

      <ReactToSolidBridge
        props={{}}
        getSolidComponent={({ getChildren }) =>
          Routes({
            get children() {
              return Route({
                element: getChildren(),
                path: '/about',
              })
            },
          })
        }
      >
        <Cube
          color={() => (Math.round(Math.random()) ? 'teal' : 'blue')}
          size={64}
          weight="duotone"
        />
      </ReactToSolidBridge> */}
    </Router>
  </fieldset>
)

export default ReactSolidRouterExample
