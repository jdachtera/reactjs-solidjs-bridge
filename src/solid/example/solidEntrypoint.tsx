import { render } from 'solid-js/web'
import { ReactComponent } from '../../react/example/ReactComponent'
import ReactContextConsumer from '../../react/example/ReactContextConsumer'
import ReactContextProvider from '../../react/example/ReactContextProvider'
import ReactStatefulComponent from '../../react/example/ReactStatefulComponent'
import { SolidToReactBridgeProvider } from '../SolidToReactBridgeProvider'
import { convertToSolidComponent } from '../convertToSolidComponent'
import SolidComponent from './SolidComponent'
import { SolidContextExposer } from './SolidContext'
import SolidContextConsumer from './SolidContextConsumer'
import { SolidContextProvider } from './SolidContextProvider'
import SolidStatefulComponent from './SolidStatefulComponent'

const ConvertedReactContextConsumer =
  convertToSolidComponent(ReactContextConsumer)
const ConvertedReactContextProvider =
  convertToSolidComponent(ReactContextProvider)
const ConvertedReactComponent = convertToSolidComponent(ReactComponent)
const ConvertedReactStatefulComponent = convertToSolidComponent(
  ReactStatefulComponent,
)

const dispose = render(
  () => (
    <SolidToReactBridgeProvider>
      <SolidContextProvider>
        <SolidContextConsumer />

        <SolidContextExposer>
          {({ count, setCount }) => (
            <ConvertedReactContextProvider
              count={count()}
              setCount={setCount}
            >
              <ConvertedReactContextConsumer />

              <ConvertedReactComponent>
                <SolidContextConsumer />

                <SolidComponent>
                  <ConvertedReactContextConsumer />

                  <ConvertedReactStatefulComponent count={count()} />

                  <SolidContextConsumer />
                  <SolidStatefulComponent count={count()} />
                </SolidComponent>
              </ConvertedReactComponent>
            </ConvertedReactContextProvider>
          )}
        </SolidContextExposer>
      </SolidContextProvider>
    </SolidToReactBridgeProvider>
  ),
  document.getElementById('solid-root') as HTMLDivElement,
)

if (import.meta.hot) {
  import.meta.hot.accept()

  import.meta.hot.dispose(dispose)
}
