import { createRoot } from 'react-dom/client'
import { SolidComponent } from '../../solid/example/SolidComponent'
import { SolidContextConsumer } from '../../solid/example/SolidContextConsumer'
import SolidContextProvider from '../../solid/example/SolidContextProvider'
import { SolidStatefulComponent } from '../../solid/example/SolidStatefulComponent'
import { ReactToSolidBridgeProvider } from '../ReactToSolidBridgeProvider'
import { convertToReactComponent } from '../convertToReactComponent'
import ReactComponent from './ReactComponent'
import { ReactContext } from './ReactContext'
import ReactContextConsumer from './ReactContextConsumer'
import ReactContextProvider from './ReactContextProvider'
import ReactStatefulComponent from './ReactStatefulComponent'

const ConvertedSolidContextConsumer =
  convertToReactComponent(SolidContextConsumer)
const ConvertedSolidContextProvider =
  convertToReactComponent(SolidContextProvider)
const ConvertedSolidComponent = convertToReactComponent(SolidComponent)
const ConvertedSolidStatefulComponent = convertToReactComponent(
  SolidStatefulComponent,
)

const reactRoot = createRoot(
  document.getElementById('react-root') as HTMLDivElement,
)

reactRoot.render(
  <ReactToSolidBridgeProvider>
    <ReactContextProvider>
      <ReactContextConsumer />

      <ReactContext.Consumer>
        {({ count, setCount }) => (
          <ConvertedSolidContextProvider
            count={count}
            setCount={setCount}
          >
            <ConvertedSolidContextConsumer />

            <ConvertedSolidComponent>
              <ReactContextConsumer />

              <ReactComponent>
                <ConvertedSolidContextConsumer />

                <ConvertedSolidStatefulComponent count={count} />

                <ReactContextConsumer />
                <ReactStatefulComponent count={count} />
              </ReactComponent>
            </ConvertedSolidComponent>
          </ConvertedSolidContextProvider>
        )}
      </ReactContext.Consumer>
    </ReactContextProvider>
  </ReactToSolidBridgeProvider>,
)

if (import.meta.hot) {
  import.meta.hot.accept()

  import.meta.hot.dispose(() => {
    reactRoot.unmount()
  })
}
