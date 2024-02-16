import { render } from 'solid-js/web'
import { ReactComponent } from '../../react/example/ReactComponent'
import { ReactContextConsumer } from '../../react/example/ReactContextConsumer'
import { ReactContextProvider } from '../../react/example/ReactContextProvider'
import { ReactStatefulComponent } from '../../react/example/ReactStatefulComponent'
import { SolidToReactBridgeProvider } from '../SolidToReactBridgeProvider'
import { convertToSolidComponent } from '../convertToSolidComponent'
import { SolidComponent } from './SolidComponent'
import { SolidContextConsumer } from './SolidContextConsumer'
import { SolidContextProvider } from './SolidContextProvider'
import { SolidStatefulComponent } from './SolidStatefulComponent'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'solid-devtools'

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
    <SolidContextProvider>
      <SolidToReactBridgeProvider>
        <SolidContextConsumer />
        <ConvertedReactContextProvider>
          <ConvertedReactContextConsumer />

          <ConvertedReactComponent>
            <SolidContextConsumer />

            <SolidComponent>
              <ConvertedReactContextConsumer />

              <ConvertedReactStatefulComponent count={1} />

              <SolidContextConsumer />
              <SolidStatefulComponent count={2} />
            </SolidComponent>
          </ConvertedReactComponent>
        </ConvertedReactContextProvider>
      </SolidToReactBridgeProvider>
    </SolidContextProvider>
  ),
  document.getElementById('solid-root') as HTMLDivElement,
)

if (import.meta.hot) {
  import.meta.hot.accept()

  import.meta.hot.dispose(dispose)
}
