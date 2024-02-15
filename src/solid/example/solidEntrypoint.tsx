import { render } from 'solid-js/web'
import { ReactComponent } from '../../react/example/ReactComponent'
import { SolidToReactBridgeProvider } from '../SolidToReactBridgeProvider'
import { convertToSolidComponent } from '../convertToSolidComponent'
import { SolidComponent } from './SolidComponent'
import { SolidContextConsumer } from './SolidContextConsumer'
import { SolidContextProvider } from './SolidContextProvider'

const ConvertedReactComponent = convertToSolidComponent(ReactComponent)

const dispose = render(
  () => (
    <SolidToReactBridgeProvider>
      <SolidContextProvider>
        <SolidContextConsumer />

        <ConvertedReactComponent>
          <ConvertedReactComponent />
          <SolidComponent />
          <SolidContextConsumer />
        </ConvertedReactComponent>
      </SolidContextProvider>
    </SolidToReactBridgeProvider>
  ),
  document.getElementById('solid-root') as HTMLDivElement,
)

if (import.meta.hot) {
  import.meta.hot.accept()

  import.meta.hot.dispose(dispose)
}
